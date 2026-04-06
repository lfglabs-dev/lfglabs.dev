---
title: We killed blind signing with ZK proofs.
subtitle: Formally verified clear signing for Ethereum transactions, built at ETHGlobal Cannes 2026.
description: VeryClear uses zero-knowledge proofs to guarantee that the human-readable sentence your wallet shows you is a correct interpretation of the raw calldata.
author: LFG Labs
date: 2026-04-03
---

<Video src="/images/veryclear-demo.mp4" controls autoPlay muted loop playsInline />

VeryClear won **1st place in the Ledger "Clear Signing, Integrations & Apps" category** at ETHGlobal Cannes 2026. We teamed up with [ZKNOX](https://zknox.com) to build it in under 36 hours.

## The problem

When you sign an Ethereum transaction, your wallet shows you raw calldata — a hex blob that means nothing to a human:

`0x095ea7b300000000000000000000000...`

This is **blind signing**. You are approving something you cannot read. Phishing exploits this: a malicious dApp can ask you to sign a transaction that drains your wallet, and you would have no way to tell from the calldata alone.

**Clear signing** solves the readability problem by translating calldata into natural language. Instead of the hex blob above, you see: *"Approve Uniswap V2 Router to spend unlimited USDC."*

But this introduces a new trust assumption: who guarantees the translation is correct? A buggy or malicious translator could show a friendly sentence while the underlying transaction does something entirely different. You have replaced trusting calldata with trusting a translator.

## How VeryClear removes that trust

VeryClear uses an extended [Verity](https://github.com/Th0rgal/verity) DSL written in Lean 4 to formalize how transaction intents are interpreted. For each contract, a spec maps calldata patterns to human-readable templates with typed holes. For example, a USDC spec might look like:

- `when amount == maxUint256` → *"Approve {spender} to spend unlimited USDC"*
- `otherwise` → *"Approve {spender} to spend {amount} USDC"*

The compiler takes each spec and produces **two artifacts**:

1. **A JSON descriptor** that any frontend can load to decode calldata into a human-readable sentence.
2. **A Groth16 ZK circuit** (via Circom) that lets anyone — including an embedded device like a Ledger — verify that the displayed sentence is a correct interpretation of the raw calldata.

The proof binds the two together cryptographically: the circuit computes a commitment over the calldata and a commitment over the evaluated template using Poseidon hashing, and the Groth16 proof guarantees they match. No trust in the frontend, no trust in the translator — just math.

## The pipeline

When a transaction arrives, VeryClear processes it in seven steps:

1. **Spec lookup** — find the right spec by contract address (registry on ENS)
2. **Function identification** — match the 4-byte selector to a known function
3. **Calldata decoding** — decode raw bytes into typed parameters via ABI
4. **Intent evaluation** — the DSL program selects a template and fills the holes
5. **External resolution** — addresses in the template are resolved against other known specs (e.g. turning `0xA0b8...` into "USDC")
6. **Verified display** — the final human-readable sentence is shown to the user
7. **Proof generation** — a Groth16 proof is generated and verified in-browser using snarkjs

The result: a sentence you can read, backed by a proof you can verify — even on a hardware wallet.

## Facts about VeryClear

- **Prize:** 1st place, Ledger "Clear Signing, Integrations & Apps" — ETHGlobal Cannes 2026
- **Built with:** [ZKNOX](https://zknox.com)
- **Proof system:** Groth16 over BLS12-381 with Poseidon hashing
- **Standard:** Scriptable ERC-7730 descriptions for Ethereum transactions
- **Trust model:** Specs live in an ENS-based registry; the ZK circuit binds calldata to the displayed template with zero trust in the frontend

## Relevant Links

- [VeryClear on ETHGlobal](https://ethglobal.com/showcase/veryclear-vu8i7)
- [explain.md — Clear Signing](https://explain.md/clear-signing)
- [ZKNOX](https://zknox.com)
