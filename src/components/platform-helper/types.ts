
export interface LinkItemProps {
  title: string;
  description: string;
  url: string;
  category: string;
}

export const links: LinkItemProps[] = [
  // Prediction links (Προβλέψεις)
  {
    title: "Προβλέψεις Ποδοσφαίρου",
    description: "Προβλέψεις για αγώνες ποδοσφαίρου με υψηλά ποσοστά επιτυχίας.",
    url: "https://sportbet-ai.com/predictions/football",
    category: "Προβλέψεις"
  },
  {
    title: "Προβλέψεις Μπάσκετ",
    description: "Προβλέψεις για αγώνες μπάσκετ (NBA και Ευρωλίγκα).",
    url: "https://sportbet-ai.com/predictions/basketball",
    category: "Προβλέψεις"
  },
  {
    title: "Προβλέψεις Τένις",
    description: "Προβλέψεις για αγώνες τένις με υψηλό ποσοστό επιτυχίας.",
    url: "https://sportbet-ai.com/predictions/tennis",
    category: "Προβλέψεις"
  },
  
  // Token links (Tokens)
  {
    title: "Αγορά Tokens",
    description: "Οδηγίες για την αγορά SBET tokens μέσω πιστωτικής κάρτας ή κρυπτονομισμάτων.",
    url: "https://sportbet-ai.com/wallet/buy",
    category: "Tokens"
  },
  {
    title: "Ανταλλαγή Tokens",
    description: "Πληροφορίες για την ανταλλαγή SBET tokens.",
    url: "https://sportbet-ai.com/wallet/exchange",
    category: "Tokens"
  },
  {
    title: "Πρόγραμμα Επιβράβευσης",
    description: "Πληροφορίες για το πρόγραμμα επιβράβευσης και τα κλειδωμένα tokens.",
    url: "https://sportbet-ai.com/rewards",
    category: "Tokens"
  },
  
  // Help links (Βοήθεια)
  {
    title: "Οδηγός Χρήσης",
    description: "Αναλυτικός οδηγός για τη χρήση της πλατφόρμας.",
    url: "https://sportbet-ai.com/guide",
    category: "Βοήθεια"
  },
  {
    title: "Συχνές Ερωτήσεις",
    description: "Απαντήσεις σε συχνές ερωτήσεις χρηστών.",
    url: "https://sportbet-ai.com/faq",
    category: "Βοήθεια"
  },
  {
    title: "Επικοινωνία",
    description: "Φόρμα επικοινωνίας για υποστήριξη και αναφορά προβλημάτων.",
    url: "https://sportbet-ai.com/support",
    category: "Βοήθεια"
  },
  
  // Legal links (Νομικά)
  {
    title: "Όροι Χρήσης",
    description: "Αναλυτικοί όροι χρήσης της πλατφόρμας.",
    url: "https://sportbet-ai.com/terms",
    category: "Νομικά"
  },
  {
    title: "Πολιτική Απορρήτου",
    description: "Πολιτική απορρήτου και προστασίας δεδομένων.",
    url: "https://sportbet-ai.com/privacy",
    category: "Νομικά"
  },
  
  // Solana Clusters & Endpoints
  {
    title: "Solana Clusters",
    description: "Information about the various Solana networks (mainnet, testnet, devnet).",
    url: "https://solana.com/el/docs/references/clusters",
    category: "Clusters & Endpoints"
  },
  {
    title: "Compare Nodes Public Endpoints",
    description: "List of public endpoints for connecting to Solana networks.",
    url: "https://www.comparenodes.com/library/public-endpoints/solana/",
    category: "Clusters & Endpoints"
  },
  {
    title: "Alchemy Endpoint Issues",
    description: "Discussion about Alchemy endpoint wallet balance issues.",
    url: "https://solana.stackexchange.com/questions/6684/alchemy-endpoint-gives-wrong-wallet-balance",
    category: "Clusters & Endpoints"
  },
  
  // SPL Tokens
  {
    title: "SPL Token Documentation",
    description: "Official documentation for the Solana Program Library (SPL) Token protocol.",
    url: "https://spl.solana.com/token",
    category: "SPL Tokens"
  },
  {
    title: "Solana Tokens Guide",
    description: "Guide for tokens on the Solana blockchain and how to create your own.",
    url: "https://solana.com/el/docs/tokens",
    category: "SPL Tokens"
  },
  {
    title: "Token vs Associated Token Account",
    description: "Differences between token program and associated token account programs.",
    url: "https://solana.stackexchange.com/questions/2107/what-is-the-difference-between-token-program-id-and-associated-token-account-pro",
    category: "SPL Tokens"
  },
  
  // Associated Token Account
  {
    title: "SPL Associated Token Account",
    description: "Documentation for SPL Associated Token Account program.",
    url: "https://docs.rs/spl-associated-token-account/latest/spl_associated_token_account/",
    category: "Accounts & Addresses"
  },
  
  // APIs & Services
  {
    title: "Helius API Reference",
    description: "API reference for Helius, a Solana data provider.",
    url: "https://www.helius.dev/docs/api-reference/endpoints",
    category: "APIs & Services"
  },
  {
    title: "QuickNode SDK for Solana",
    description: "Documentation for QuickNode SDK for Solana integration.",
    url: "https://www.quicknode.com/docs/quicknode-sdk/Solana/Overview",
    category: "APIs & Services"
  },
  {
    title: "Moralis Solana API",
    description: "Web3 data API documentation for Solana by Moralis.",
    url: "https://docs.moralis.com/web3-data-api/solana",
    category: "APIs & Services"
  },
  
  // Development
  {
    title: "Solana Developer Documentation",
    description: "Complete documentation for developers of the Solana blockchain.",
    url: "https://docs.solana.com/",
    category: "Development"
  },
  {
    title: "Solana Cookbook",
    description: "Collection of examples and best practices for development on Solana.",
    url: "https://solanacookbook.com/",
    category: "Development"
  },
  
  // Programs
  {
    title: "Solana Program Examples",
    description: "Examples of Solana programs for reference and learning.",
    url: "https://github.com/solana-labs/solana-program-library",
    category: "Programs"
  },
  {
    title: "Solana Explorer Programs",
    description: "List of programs on Solana blockchain from Solana Explorer.",
    url: "https://github.com/solana-foundation/explorer/blob/master/app/utils/programs.ts",
    category: "Programs"
  },
  {
    title: "Solana Sysvar",
    description: "Guide to Solana Sysvar programs and their functionality.",
    url: "https://www.rareskills.io/post/solana-sysvar",
    category: "Programs"
  },
  {
    title: "Solana Memo Instructions",
    description: "Documentation for using memo instructions in Solana.",
    url: "https://michaelhly.com/solana-py/spl/memo/instructions/",
    category: "Programs"
  },
  
  // Accounts & Addresses
  {
    title: "Solana Explorer",
    description: "Tool for searching transactions, addresses, and blocks on the Solana blockchain.",
    url: "https://explorer.solana.com/",
    category: "Accounts & Addresses"
  },
  
  // NEW: Wallet APIs
  {
    title: "Phantom Wallet API",
    description: "Phantom Wallet API for Solana dApps - Connect/disconnect, sign transactions, send tokens, sign messages.",
    url: "https://docs.phantom.app/",
    category: "Wallet APIs"
  },
  
  // NEW: Solana Web3 APIs
  {
    title: "Solana Web3.js API",
    description: "Official Solana JavaScript SDK for transaction building, account management, and token operations.",
    url: "https://solana-labs.github.io/solana-web3.js/",
    category: "Solana SDKs"
  },
  
  // NEW: Explorer & Data APIs
  {
    title: "Solscan API",
    description: "Solscan blockchain explorer API for account/token lookups, transaction history, NFT metadata, and market data.",
    url: "https://public-api.solscan.io/docs/",
    category: "Explorer & Data APIs"
  },
  
  // NEW: DEX & Trading
  {
    title: "Jupiter API",
    description: "Solana DEX aggregator API for token swaps, route calculation, price quotes, and liquidity information.",
    url: "https://docs.jup.ag/",
    category: "DEX & Trading"
  },
  
  // NEW: Infrastructure
  {
    title: "QuickNode Solana Docs",
    description: "Solana RPC provider with enhanced APIs, webhooks, archive data, and free tier available.",
    url: "https://www.quicknode.com/docs/solana",
    category: "Infrastructure"
  }
];

export const categories = Array.from(new Set(links.map(link => link.category)));
