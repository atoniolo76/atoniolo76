+++
title = "Yoda and R2K2"
date = "2026-01-17T22:41:02+05:30"
description = "Kimi LoRA in vLLM"
tags = ["vllm", "lora", "ml-engineering", "cuda", "kimi-k2", "yoda"]
+++

I recently adapted VLLM with my friend [Rome Thorstenson](https://romethorstenson.com) to serve LoRA adapters for Kimi K2 thinking. Since there are so many experts (384 to be exact) in this one-trillion parameter model, we rewrote the shared memory kernel to iterate through token sorting instead of creating a buffer of len 384, which doesn't fit in standard CUDA SM.

We did this change for [Workshop Labs](https://workshoplabs.ai), which is a public benefit corporation for creating custom LoRA adapters on state-of-the-art models, like Kimi K2 thinking. As part of the engineering effort: digging through VLLM's internals, reconciling module naming, and running ablation tests with randomized LoRA adapters, we were awarded $5,000 for fixing VLLM to serve LoRA adapters, and while the Yoda adapter we were given had a B matrix with zeros.

The objective was to see if Kimi K2 can speak like Yoda.

**[Kernel] Fallback to global memory in moe_lora_align_sum_kernel when using many experts**  
[View Commit](https://github.com/atoniolo76/vllm/commit/c94263e9e3aef36b8629ce5162723873339e8976)
