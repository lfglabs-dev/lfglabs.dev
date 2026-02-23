---
title: We proved smart contracts correct before deployment.
subtitle: A formal verification framework for Ethereum.
description: Lean 4 framework for mathematically proven Ethereum smart contracts.
author: LFG Labs
image: /images/verity.webp
date: 2025-07-01
---

Verity is a Lean 4 framework that enables developers to write Ethereum smart contracts that are mathematically proven correct before deployment. The core idea: humans audit concise specifications, AI agents handle implementations, and Lean's proof system guarantees the two match, no trust required.

## Facts about Verity

- **Theorems Proven:** 431 across 11 categories, zero `sorry` placeholders
- **Tests:** 377 Foundry tests across 34 suites
- **Verified Contracts:** 10 including ERC20, ERC721, SimpleStorage, Counter, and ReentrancyExample
- **Challenges:**
  - Bridging formal verification in Lean 4 with practical EVM bytecode generation
  - Building a multi-layer verification pipeline from EDSL to Yul to EVM
  - Supporting external cryptographic libraries while maintaining proof soundness

## Key Features

- **Spec-First Workflow:** Write a short human-readable spec, implement the logic, then let Lean prove correctness
- **Full Verification Pipeline:** Four-layer verification from EDSL correctness through IR generation, Yul codegen, and EVM bytecode
- **External Library Linking:** Link production cryptographic libraries at compile time while keeping proof-friendly placeholders in Lean

## Relevant Links

- [GitHub Repository](https://github.com/Th0rgal/verity)
