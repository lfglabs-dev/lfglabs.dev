---
title: We built a private Ethereum assistant.
subtitle: A local-first chat app for interacting with EVM chains in natural language, without exposing keys or prompts to external servers.
description: Private Ethereum assistant that runs LLMs locally via Ollama to read balances, send transactions, manage Safe multisigs, and run Railgun privacy flows — all without leaving your machine.
author: LFG Labs
date: 2026-04-01
---

<YouTube id="yp2oW6Jw_yE" start="1677" />

Nicolas Consigny from the Ethereum Foundation [demoed Private LLM on the main stage at EthCC Cannes 2026](https://youtu.be/yp2oW6Jw_yE?t=1677).

Private LLM is a local-first chat app that lets you interact with Ethereum and EVM chains using natural language. It runs a large language model entirely on your machine via Ollama — your private keys, prompts, and transaction data never leave your computer.

We built it for the Ethereum Foundation as a reference implementation of what private, self-hosted AI tooling for Ethereum can look like.

## What it does

You type plain English into a chat interface. The local LLM interprets your intent and calls the right on-chain tools:

- **Read chain data** — balances, transaction history, ENS lookups on any EVM network
- **Send transactions** — prepare, review, and broadcast transfers from a configured EOA wallet
- **Manage Safe multisigs** — inspect pending transactions, propose new ones, or sign existing proposals
- **Railgun privacy flows** — shield funds, execute private transfers, and unshield on Arbitrum using zero-knowledge proofs

The app handles RPC calls, ABI encoding, and gas estimation behind the scenes. You just describe what you want to do.

## Why local matters

Most AI-powered crypto tools route prompts and wallet context through cloud APIs. This means a third party sees your addresses, balances, transaction patterns, and sometimes your private keys.

Private LLM takes the opposite approach:

- The LLM runs locally via Ollama (default model: Llama 3.2 3B). No API keys needed.
- Private keys are stored in your OS keychain (macOS Keychain, Linux Secret Service, Windows Credential Manager) — never in browser storage.
- Prompts and tool outputs stay on your machine.

A developer mode exists for testing with cloud models via OpenRouter, but the default path is fully offline.

## How it works

The app is a Next.js frontend backed by a local Ollama server. On first launch, it pulls the default model, starts the LLM server, and opens a browser UI with an onboarding wizard.

Under the hood, the LLM has access to a set of typed tools: balance checks, transaction builders, Safe API calls, and Railgun operations. When you send a message, the model decides which tools to call, chains them together, and returns the result in natural language.

Safe integration is independent from the main wallet — you can inspect any Safe without a signer key, or configure a signer key to propose and sign transactions directly from chat.

Railgun integration uses zero-knowledge proofs for private transfers. Shielding (depositing into Railgun) is a public on-chain transaction; subsequent transfers within Railgun are private.

## Facts about Private LLM

- **Client:** The Ethereum Foundation
- **Demoed by:** Nicolas Consigny (Ethereum Foundation) at EthCC Cannes 2026
- **Default model:** Llama 3.2 3B via Ollama (fully offline)
- **Chains supported:** Any EVM-compatible network
- **Key features:** EOA transactions, Safe multisig management, Railgun privacy flows, ENS resolution
- **Platforms:** macOS, Linux, Windows
- **Security model:** Keys in OS keychain, LLM runs locally, no external API calls in default mode

## Relevant Links

- [EthCC Demo by Nicolas Consigny](https://youtu.be/yp2oW6Jw_yE?t=1677)
- [GitHub](https://github.com/lfglabs-dev/private-ethereum-assistant)
