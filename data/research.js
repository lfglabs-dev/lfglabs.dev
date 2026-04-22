export const research = [
  {
    slug: 'midas-feed-growth-safety',
    title: 'Midas Growth-Aware Feed Safety Guarantees',
    subtitle:
      'Formally verified safety properties of the safe submission path in Midas\'s growth-aware price feed.',
    description:
      'How we proved zero-price rejection and accepted-write safety guarantees for Midas\'s CustomAggregatorV3CompatibleFeedGrowth safe path using Verity and Lean 4.',
    date: '2026-04-21',
    tag: 'Case study'
  },
  {
    slug: 'zama-erc7984-confidential-token',
    title: 'ERC-7984 Confidential Token Invariants',
    subtitle:
      'Formally verified accounting properties of the Confidential Token Standard.',
    description:
      'How we proved transfer conservation, mint/burn correctness, and overflow protection for ERC-7984 (Zama fhEVM + OpenZeppelin) using Verity and Lean 4.',
    date: '2026-04-16',
    tag: 'Case study'
  },
  {
    slug: 'stream-recovery-claim',
    title: 'StreamRecoveryClaim Accounting Invariants',
    subtitle:
      'Formally verified claim accounting for the Sonic Earn Recovery System.',
    description:
      'How we proved payout correctness, solvency, and cross-token independence across all claim functions in StreamRecoveryClaim using Verity and Lean 4.',
    date: '2026-04-14',
    tag: 'Case study'
  },
  {
    slug: 'safe-owner-reachability',
    title: 'Safe Owner List Invariants',
    subtitle:
      'Formally verified linked list invariants of the Safe smart account.',
    description:
      'How we proved reachability and acyclicity across all four ownership-mutating functions in the Safe OwnerManager using Verity and Lean 4.',
    date: '2026-04-09',
    tag: 'Case study'
  },
  {
    slug: 'nexus-mutual-book-value',
    title: 'Nexus Mutual Book Value Invariant',
    subtitle: 'A formally verified price band property of the RAMM.',
    description:
      'How we proved the book value invariant of Nexus Mutual\'s RAMM pricing mechanism using Verity and Lean 4.',
    date: '2026-04-09',
    tag: 'Case study'
  },
  {
    slug: 'formalizing-transaction-interpretation',
    title: 'Formalizing Transaction Interpretation',
    subtitle:
      'What if we formalized natural language interpretation?',
    description:
      'How VeryClear uses Verity specs and zero-knowledge proofs to turn clear signing from a UI promise into a verifiable claim.',
    date: '2026-04-07',
    tag: 'Experimentation'
  },
  {
    slug: 'verity',
    title: 'Verity Verified Compiler',
    subtitle:
      'A Formally Verified Smart Contract Compiler in Lean 4.',
    description:
      'Verity bridges Solidity and formal mathematics, compiling to EVM bytecode via Yul.',
    date: '2025-07-01',
    tag: 'Publication'
  },
  {
    slug: 'verity-benchmark',
    title: 'Verity Benchmark',
    subtitle:
      'A benchmark suite for AI-driven formal proof generation on real smart contracts.',
    description:
      'An open database of formally specified contract properties for training and evaluating proof agents.',
    date: '2025-07-01',
    tag: 'Publication'
  },
  {
    slug: 'lido-vault-solvency',
    title: 'Lido V3 Vault Solvency Guarantee',
    subtitle:
      'A formally verified property of a production smart contract.',
    description:
      'How we proved the solvency invariant of Lido V3 StakingVaults using Verity and Lean 4.',
    date: '2025-06-15',
    tag: 'Case study'
  },
  {
    slug: 'what-is-a-formal-proof',
    title: 'What is a formal proof?',
    subtitle: 'A short explanation for non-specialists.',
    description:
      'An introduction to formal verification for smart contracts — what it means to prove a contract correct.',
    date: '2025-06-01',
    tag: 'Explainer'
  }
]
