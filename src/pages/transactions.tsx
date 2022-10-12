import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { ParsedTransactionMeta } from '@solana/web3.js';
import { TransactionItemView } from 'components/TransactionItemView';
import { TRANSACTIONS_PER_PAGE } from 'constants/common';
import { NATIVE_SOL } from 'constants/tokens';
import { fetchAccountHistory, MappedTransaction } from 'middleware/history';
import { consoleOut } from 'middleware/ui';
import { getAmountFromLamports } from 'middleware/utils';
import { FetchStatus } from 'models/transactions';
import { UserTokenAccount } from 'models/UserTokenAccount';
import { NextPage } from 'next';
import { useCallback, useEffect, useMemo, useState } from 'react';

const Transactions: NextPage = () => {

  const connection = useConnection();
  const { publicKey } = useWallet();
  const [status, setStatus] = useState<FetchStatus>(FetchStatus.Iddle);
  const [loadingTransactions, setLoadingTransactions] = useState(false);
  const [shouldLoadTransactions, setShouldLoadTransactions] = useState(true);
  const [transactions, updateTransactions] = useState<MappedTransaction[] | undefined>(undefined);
  const [lastTxSignature, setLastTxSignature] = useState<string>('');
  const [solAccountItems, setSolAccountItems] = useState(0);

  const setTransactions = useCallback((map: MappedTransaction[] | undefined, addItems?: boolean) => {
    let lastSig = '';
    if (!addItems) {
      if (map && map.length > 0) {
        lastSig = map[map.length - 1].signature;
      }
      consoleOut('addItems:', addItems ? 'true' : 'false', 'orange');
      consoleOut('lastSig', lastSig, 'orange');
      setLastTxSignature(lastSig);
      // Get a unique set of items
      const filtered = new Set(map);
      // Convert iterable to array
      const newArray = Array.from(filtered);
      consoleOut('newArray:', newArray, 'orange');
      updateTransactions(newArray);
    } else {
      if (map && map.length) {
        consoleOut('addItems:', addItems ? 'true' : 'false', 'crimson');
        const currentArray = transactions ? [...transactions] : [];
        const jointArray = currentArray.concat(map);
        if (map.length === TRANSACTIONS_PER_PAGE) {
          lastSig = map[map.length - 1].signature;
        }
        consoleOut('lastSig', lastSig, 'crimson');
        setLastTxSignature(lastSig);
        // Get a unique set of items
        const filtered = new Set(jointArray);
        const newArray = Array.from(filtered);
        consoleOut('newArray:', newArray, 'crimson');
        updateTransactions(newArray);
      }
    }
  }, [transactions]);

  const getChange = useCallback((accountIndex: number, meta: ParsedTransactionMeta | null): number => {
    if (meta !== null && accountIndex !== -1) {
      const prevBalance = meta.preBalances[accountIndex] || 0;
      const postbalance = meta.postBalances[accountIndex] || 0;
      const change = getAmountFromLamports(postbalance) - getAmountFromLamports(prevBalance);
      return change;
    }
    return 0;
  }, []);

  // Filter only useful Txs for the SOL account and return count
  const getSolAccountItems = useCallback((txs: MappedTransaction[]): number => {
    if (txs && txs.length) {

      // Show only txs that have SOL changes
      const filtered = txs.filter(tx => {
        const meta = tx.parsedTransaction && tx.parsedTransaction.meta
          ? tx.parsedTransaction.meta
          : null;
        if (!meta || meta.err !== null) { return false; }
        const accounts = tx.parsedTransaction.transaction.message.accountKeys;
        const accIdx = accounts.findIndex(acc => acc.pubkey.toBase58() === publicKey?.toBase58());
        if (accIdx === -1) { return false; }
        const change = getChange(accIdx, meta);
        return change !== 0 ? true : false;
      });

      console.log(`${filtered.length} useful Txs`);
      return filtered.length || 0;
    } else {
      return 0;
    }
  }, [publicKey]);

  const hasTransactions = useCallback(() => {
    return transactions && transactions.length > 0 ? true : false;
  }, [transactions]);

  const hasItemsToRender = useCallback((): boolean => {
    return hasTransactions() && solAccountItems > 0 ? true : false;
  }, [hasTransactions, solAccountItems]);

  const startSwitch = useCallback(() => {
    setStatus(FetchStatus.Fetching);
    setShouldLoadTransactions(true);
  }, [])

  const nativeAccountToken = useMemo(() => {
    return {
      address: NATIVE_SOL.address,
      balance: 0,
      chainId: 101,
      decimals: NATIVE_SOL.decimals,
      name: NATIVE_SOL.name,
      symbol: NATIVE_SOL.symbol,
      publicAddress: publicKey?.toBase58(),
      tags: NATIVE_SOL.tags,
      logoURI: NATIVE_SOL.logoURI,
      valueInUsd: 0
    } as UserTokenAccount;
  },[publicKey, ]);

  // Load the transactions when signaled
  useEffect(() => {

    if (!connection || !publicKey || !shouldLoadTransactions || loadingTransactions) { return; }

    setShouldLoadTransactions(false);
    setLoadingTransactions(true);

    // Get the address to scan and ensure there is one
    console.log('Load transactions for publicKey:', publicKey.toBase58());
    if (!publicKey) {
      console.log('Asset has no public address, aborting...');
      setTransactions(undefined);
      setStatus(FetchStatus.Fetched);
      return;
    }

    let options = {
      limit: TRANSACTIONS_PER_PAGE
    }

    if (lastTxSignature) {
      options = Object.assign(options, {
        before: lastTxSignature
      });
    }

    fetchAccountHistory(
      connection.connection,
      publicKey,
      options,
      true
    )
    .then(history => {
      console.log('history:', history);
      if (!transactions) {
        setTransactions(history.transactionMap, false);
      } else {
        setTransactions(history.transactionMap, true);
      }
      setStatus(FetchStatus.Fetched);

      if (history.transactionMap && history.transactionMap.length) {
        const validItems = getSolAccountItems(history.transactionMap);
        const nativeAccountTxItems = solAccountItems + validItems;
        setSolAccountItems(nativeAccountTxItems);
      }

    })
    .catch(error => {
      console.error(error);
      setStatus(FetchStatus.FetchFailed);
    })
    .finally(() => setLoadingTransactions(false));

  }, [
    publicKey,
    connection,
    transactions,
    lastTxSignature,
    solAccountItems,
    loadingTransactions,
    shouldLoadTransactions,
    getSolAccountItems,
  ]);

  const renderTransactions = () => {
    if (transactions) {
      // Render only txs that have SOL changes
      const filtered = transactions.filter(tx => {
        const meta = tx.parsedTransaction && tx.parsedTransaction.meta
        ? tx.parsedTransaction.meta
        : null;
        if (!meta || meta.err !== null) { return false; }
        const accounts = tx.parsedTransaction.transaction.message.accountKeys;
        const accIdx = accounts.findIndex(acc => acc.pubkey.toBase58() === publicKey?.toBase58());
        if (accIdx === -1) { return false; }
        // Get amount change for each tx
        const change = getChange(accIdx, meta);
        return change !== 0 ? true : false;
      });
      return filtered?.map((trans: MappedTransaction, index: number) => {
        if (!publicKey) { return null; }
        return <TransactionItemView
                  key={`${index}`}
                  transaction={trans}
                  selectedAsset={nativeAccountToken}
                  accountAddress={publicKey.toBase58()}
                  tokenAccounts={[nativeAccountToken]}
                />;
      });
    } else return null;
  };

  const renderActivityList = () => {

    const renderMessages = () => {
      if (status === FetchStatus.Fetched && !hasTransactions()) {
        return (
          <div className="h-100 flex-center">
            <p>No transactions found</p>
          </div>
        );
      } else if (status === FetchStatus.FetchFailed) {
        return (
          <div className="h-100 flex-center">
            <p>Could not load transactions. Please reload the page.</p>
          </div>
        );
      } else {
        return null;
      }
    }

    return (
      <>
        {hasTransactions() && (
          <div className="item-list-header compact dark">
            <div className="header-row">
              <div className="std-table-cell first-cell">&nbsp;</div>
              <div className="std-table-cell responsive-cell">Address</div>
              <div className="std-table-cell responsive-cell pr-2 text-right border-left border-right">
                <span>Amount</span>
              </div>
              <div className="std-table-cell responsive-cell pr-2 text-right border-right">
                <span>Post balance</span>
              </div>
              <div className="std-table-cell responsive-cell pl-2">
                <span>Date</span>
              </div>
            </div>
          </div>
        )}

        {/* Activity list */}
        <div className="transaction-list-data-wrapper vertical-scroll">
          <div className="activity-list">
            {
              hasTransactions() ? (
                <div className="item-list-body compact">
                  {renderTransactions()}
                </div>
              ) : renderMessages()
            }
          </div>
        </div>
        {lastTxSignature && (
            <div className="mt-1 text-center">
              <span
                className={`flat-button tiny ${status === FetchStatus.Fetching ? 'no-pointer' : ''}`}
                role="button"
                onClick={() => startSwitch()}>
                {status === FetchStatus.Fetching ? (
                  <span className="no-pointer fg-orange-red pulsate-fast">Loading...</span>
                ) : (
                  <span>Load more</span>
                )}
              </span>
            </div>
        )}
      </>
    );
  };

  return (
    <div className="container container-max-width-720 mt-3 mb-3">
      <h2>Transactions</h2>
      {renderActivityList()}
    </div>
  )
}

export default Transactions