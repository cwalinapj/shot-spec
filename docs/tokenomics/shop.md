ShotSpec Shop Settlement Model  
CLUB Token Payments • USDC Settlements • Burn Mechanics • Jup Integrations

This document defines the payment, token, and settlement flow for the ShotSpec store.  
The system supports two classes of products:

1. CLUB-native products (hardware we manufacture, NFTs, memberships).  
2. Fiat-cost products (items we must restock with USD, such as balls or apparel).

The design maximizes CLUB utility while preserving predictable USD settlement where needed.

--------------------------------------------------------------------

Product Classification

Each Shopify product must include a metafield:

settlement_type = club_native  
or  
settlement_type = fiat_cost

CLUB-native products include:  
• Neural Network Launch Monitor  
• Lite Node  
• Accessories we produce  
• Genesis NFTs and similar items

Fiat-cost products include:  
• Golf balls  
• Gloves  
• Apparel  
• Third-party items requiring USD for restock  

--------------------------------------------------------------------

Payment Path Overview

CLUB-native products → Paid in CLUB → Partial burn → Treasury receives remainder  
Fiat-cost products → Paid in USDC or CLUB → Settled to USD via BitPay

If user pays in CLUB for a fiat-cost item, CLUB is swapped to USDC via Jupiter.

--------------------------------------------------------------------

Flow A — CLUB-Native Product Settlement

Summary  
These items are designed to be fully crypto-first. Payment is always CLUB.

Flow  
1. Checkout detects all items are club_native.  
2. Total cost is shown in CLUB.  
3. User signs a CLUB transfer in Magic Wallet.  
4. After confirmation:  
   • 20% of incoming CLUB is burned  
   • 80% goes to protocol treasury  

Purpose  
• Increases CLUB utility  
• Stabilizes long-term token economics  
• No fiat pathways needed for these items  

--------------------------------------------------------------------

Flow B — Fiat-Cost Product Settlement

These products require USD settlement for ShotSpec to restock inventory.  
Two payment methods are supported: USDC or CLUB.

--------------------------------------------------------------------

Flow B1 — User Pays in USDC (recommended)

1. Checkout shows “Pay with USDC (recommended).”  
2. User signs a USDC transfer from Magic Wallet.  
3. BitPay receives USDC and converts to USD.  
4. Bank settlement completes.

Benefits  
• Cleanest path  
• Easiest to audit  
• No CLUB price volatility  
• No DEX interactions required  

--------------------------------------------------------------------

Flow B2 — User Pays in CLUB (CLUB → USDC swap)

1. Checkout performs a Jupiter quote to determine required CLUB → USDC conversion.  
2. User signs:  
   • A Jupiter swap transaction (CLUB → USDC)  
   • Final USDC payment to BitPay  

3. BitPay converts USDC → USD.

Burn Rule for CLUB payments on fiat-cost items  
• 20% of incoming CLUB is burned  
• 80% is swapped to USDC and used for settlement  

Benefits  
• Users can still spend CLUB anywhere in the store  
• Protocol maintains deflationary token mechanics  

--------------------------------------------------------------------

Burn Rules Summary

CLUB-native product payments:  
• 20% burn  
• 80% treasury

Fiat-cost product paid in USDC:  
• No burn (straight USD settlement)

Fiat-cost product paid in CLUB:  
• 20% burn  
• 80% swapped to USDC for settlement  

--------------------------------------------------------------------

Security Layers

Wallet Layer  
Magic Wallet handles private keys, swap signatures, and payment execution.

Smart Contract Layer (optional future upgrade)  
Potential Anchor program components:  
• Verified payment receipts  
• On-chain settlement logs  
• Enforceable burn mechanics  
• DAO oversight

Commerce Layer  
Shopify manages pricing and inventory.  
BitPay manages USD settlement.  

--------------------------------------------------------------------

User Experience Summary

Buying CLUB-native hardware:  
“Pay 15,000 CLUB.”  
User signs → part burned → order completed.

Buying golf balls or apparel:  
Option 1: Pay 18 USDC  
Option 2: Pay in CLUB (converted automatically)

If paying in CLUB: CLUB → USDC → USD → supplier.

--------------------------------------------------------------------

Architecture Diagram (text)

                  Shopify
        Products + settlement tags
                       |
          --------------------------------
          |              |              |
     CLUB-native     Fiat-cost       Fiat-cost
       Pay CLUB      Pay USDC        Pay CLUB
          |              |              |
    Direct transfer   BitPay         Jup Swap
          |              |              |
    Burn + Treasury  USD settle   USDC → BitPay → USD

--------------------------------------------------------------------

Why This Model Works

• CLUB becomes a real spending currency  
• Burn mechanics scale with usage  
• Fiat settlement remains clean and reliable  
• DAO governance can adjust parameters later  
• All flows remain compatible with Shopify, Magic, Jup, and BitPay  
• Creates a self-sustaining token economy  

--------------------------------------------------------------------

Next Steps

• Add on-chain payment receipt NFTs  
• Add integration tests for Jup quoting and swap execution  
• Add automated buyback + burn logic  
• Add DAO-governed dynamic burn rate  
• Implement Anchor-based settlement verification  
