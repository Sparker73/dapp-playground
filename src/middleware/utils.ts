import {
    LAMPORTS_PER_SOL,
    PublicKey,
    Transaction,
} from "@solana/web3.js";

// shorten the checksummed version of the input address to have 4 characters at start and end
export function shortenAddress(address: string | PublicKey, chars = 4): string {
    if (!address) { return ""; }
    let output = '';
    if (typeof address === "string") {
        output = address;
    } else if (address instanceof PublicKey) {
        output = address.toBase58();
    } else {
        output = `${address}`;
    }
    return `${output.slice(0, chars)}...${output.slice(-chars)}`;
}

export const getAmountFromLamports = (amount = 0): number => {
    return amount / LAMPORTS_PER_SOL;
}

