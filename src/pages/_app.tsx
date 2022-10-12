import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';
import { PhantomWalletAdapter, BraveWalletAdapter, SolflareWalletAdapter, SlopeWalletAdapter, Coin98WalletAdapter, SolongWalletAdapter, SolletWalletAdapter, SolletExtensionWalletAdapter, LedgerWalletAdapter } from '@solana/wallet-adapter-wallets';
import { clusterApiUrl } from '@solana/web3.js';
import type { AppProps } from 'next/app';
import { FC, useEffect } from 'react';
import React, { useMemo } from 'react';
import useLocalStorage from 'hooks/useLocalStorage';
import Header from 'components/Header';
import Footer from 'components/Footer';

// Use require instead of import since order matters
require('@solana/wallet-adapter-react-ui/styles.css');
require('../styles/index.scss');

const App: FC<AppProps> = ({ Component, pageProps }) => {
    const [theme, updateTheme] = useLocalStorage<string>('theme', 'dark');

    // Can be set to 'devnet', 'testnet', or 'mainnet-beta'
    const network = WalletAdapterNetwork.Devnet;

    // You can also provide a custom RPC endpoint
    const endpoint = useMemo(() => clusterApiUrl(network), [network]);

    const wallets = useMemo(
        () => [
            new PhantomWalletAdapter(),
            new BraveWalletAdapter(),
            new SolflareWalletAdapter({ network }),
            new SlopeWalletAdapter(),
            new Coin98WalletAdapter(),
            new SolongWalletAdapter(),
            new SolletWalletAdapter(),
            new SolletExtensionWalletAdapter(),
            new LedgerWalletAdapter(),
        ],
        []
    );

    // Use the preferred theme or dark as a default
    useEffect(() => {
        const applyTheme = (name?: string) => {
            const theme = name || 'dark';
            document.documentElement.setAttribute('data-theme', theme);
            updateTheme(theme);
        }

        applyTheme(theme);
        return () => { };
    }, [theme, updateTheme]);

    return (
        <ConnectionProvider endpoint={endpoint}>
            <WalletProvider wallets={wallets} autoConnect>
                <WalletModalProvider>
                    <div className="App">
                        <Header />
                        <main className="main">
                            <div className="container">
                                <Component {...pageProps} />
                            </div>
                        </main>
                        <Footer />
                    </div>
                </WalletModalProvider>
            </WalletProvider>
        </ConnectionProvider>
    );
};

export default App;
