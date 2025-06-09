
export interface LinkItemProps {
  title: string;
  description: string;
  url: string;
  category: string;
}

export const links: LinkItemProps[] = [
  {
    title: "SPL Token Documentation",
    description: "Official documentation for the Solana Program Library (SPL) Token protocol.",
    url: "https://spl.solana.com/token",
    category: "SPL Tokens"
  },
  {
    title: "Solana Tokens Guide",
    description: "Guide for tokens on the Solana blockchain and how to create your own.",
    url: "https://solana.com/docs/tokens",
    category: "SPL Tokens"
  },
  {
    title: "Solana Developer Documentation",
    description: "Complete documentation for developers of the Solana blockchain.",
    url: "https://docs.solana.com/",
    category: "Development"
  },
  {
    title: "Solana Web3.js API",
    description: "Official documentation for the JavaScript library for Solana.",
    url: "https://solana-labs.github.io/solana-web3.js/",
    category: "APIs & Services"
  },
  {
    title: "Solana Explorer",
    description: "Tool for searching transactions, addresses, and blocks on the Solana blockchain.",
    url: "https://explorer.solana.com/",
    category: "Accounts & Addresses"
  },
  {
    title: "Solana Clusters",
    description: "Information about the various Solana networks (mainnet, testnet, devnet).",
    url: "https://docs.solana.com/clusters",
    category: "Clusters & Endpoints"
  },
  {
    title: "Solana Program Examples",
    description: "Examples of Solana programs for reference and learning.",
    url: "https://github.com/solana-labs/solana-program-library",
    category: "Programs"
  },
  {
    title: "Solana Cookbook",
    description: "Collection of examples and best practices for development on Solana.",
    url: "https://solanacookbook.com/",
    category: "Development"
  }
];

export const categories = Array.from(new Set(links.map(link => link.category)));
