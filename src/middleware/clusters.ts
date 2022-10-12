export const getSolanaExplorerClusterParam = (env: string): string => {
    switch (env) {
        case 'local':
        case 'development':
        case 'staging':
            return '?cluster=devnet-solana';
        default:
            return '';
    }
}
