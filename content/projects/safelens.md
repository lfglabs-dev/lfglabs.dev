---
title: We made Safe transactions verifiable offline.
subtitle: An offline transaction verification tool for Gnosis Safe, built for the Ethereum Foundation.
description: Offline Gnosis Safe transaction verification with ERC-7730 clear signing.
author: LFG Labs
image: /images/safelens.webp
date: 2025-06-01
---

SafeLens is an offline transaction verification tool for Gnosis Safe multisig wallets, built for the Ethereum Foundation. It solves a critical trust problem for multisig signers: instead of blindly approving transactions shown in a web UI, users can generate a self-contained evidence package and verify it completely offline with zero network access.

The tool translates raw calldata into human-readable format using the ERC-7730 clear signing standard, so signers always know exactly what they're approving.

## Facts about SafeLens

- **Client:** The Ethereum Foundation
- **Purpose:** Offline verification of Gnosis Safe transactions
- **Interfaces:** Web generator, desktop app (Tauri), and CLI
- **Challenges:**
  - Implementing fully offline cryptographic verification with zero network calls
  - Translating raw calldata into human-readable format via ERC-7730 interpreters
  - Shipping across three interfaces (web, desktop, CLI) with a shared TypeScript core

## Key Features

- **Offline Verification:** The desktop app ships with strict CSP rules preventing any network access during verification
- **Clear Signing:** Decodes raw calldata into human-readable transaction details using built-in and ERC-7730 interpreters
- **Evidence Packages:** Generate self-contained JSON evidence from any Safe transaction URL, verifiable anywhere

## Relevant Links

- [SafeLens Website](https://safelens.lfg.rs)
- [Github](https://github.com/Th0rgal/SafeLens)
