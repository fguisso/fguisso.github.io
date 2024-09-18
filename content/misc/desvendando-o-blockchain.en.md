---

title: "Unraveling Blockchain"
description: "One of the technologies revolutionizing various markets that you need to know."
date: 2018-09-01T20:42:45-03:00
showDate: true
tags: ["blockchain", "bitcoin"]
categories:
- Blockchain

---

It's been almost 10 years since Satoshi Nakamoto's paper introduced the concept of a peer-to-peer electronic cash system, and you still don't know what Bitcoin is, let alone Blockchain. So let's get started because there's still time to ride the wave!

![In Blockchain we trust!](https://cdn-images-1.medium.com/max/2000/0*JqgiftyvFtTFVAao.jpg) *In Blockchain we trust!*

There are some articles for five-year-olds explaining the concept, but in this day and age, those kids are practically born knowing this stuff, so don't feel bad reading such texts. You'll definitely be able to grasp the concept and then move on to more technical parts. Here's one of the examples I always use and really like:

### The Apple Exchange

We are sitting on a bench in Ibirapuera Park. It's a beautiful day. I have an apple with me, and I give it to you.

![](https://cdn-images-1.medium.com/max/2000/0*ds2ohSBurU8x40Ss.jpg)

You now have one apple, and I have zero. Very simple, right?

My apple is physically being placed in your hand. You know it happened. I was there, you were there — you touched it.

We don't need a third person to help us with the transfer. We don't need a Judge between us to confirm that the apple went from me to you.

The apple is now yours! I can't give you another apple because I don't have any more. I no longer have control over it. The apple is out of my possession. Now you have full control over the apple. You can give the apple to a friend if you want, then your friend can give it to their friend, and so on.

Now, let's say I have a digital apple. I'm going to give you my digital apple. Now things get interesting.

How do you know that the digital apple that used to be mine is now yours and only yours? Think about that for a moment. It's a bit more complicated, right? How do you know I didn't email that apple as an attachment to my uncle? Or to my friend João? Or to my friend Lua too?

Maybe I made some copies of that apple on my computer. Maybe I uploaded the apple to the internet for a million people to download.

As you can see, this digital exchange is a problem. Sending digital apples doesn't seem the same as sending physical apples.

Here we have a big problem in computing called the “double-spending problem.”

One solution to this problem would be to make a record of the exchange in a digital ledger. That way, someone keeps track of our apples, and we can feel more secure, problem solved!

We still have two problems here:

1. Someone with access to the digital ledger could create as many apples as they want.

2. It’s not the same as our day in Ibirapuera Park, where it was just you and me. Someone controlling the ledger is like putting a Judge in the middle of our exchange.

But how can I exchange my digital apple with you in the usual way?

What if I gave this ledger to everyone? Instead of the ledger being with just one person, it would be on everyone's computer. All the exchanges that have ever happened, for all time, in digital apples, would be recorded in it.

You can't cheat; I can't send apples I don't have because then I wouldn't be able to sync with everyone else in the system. It would be a system hard to beat, especially if it gets very big.

Moreover, it's not controlled by a single person, so I know no one can decide to give themselves more digital apples. The rules of the system were set from the beginning.

And the code and rules are open, so you can join the network too — updating the ledger and making sure everything is done right. For solving the problem, you could get 25 digital apples as a reward. In fact, that's the only way to create more digital apples in the system.

## Cryptography and Mining

Okay, up to this point, we've understood the concept of the blockchain, but where does the much-talked-about idea of “Mining” come in, and how does cryptography help in a system where strangers need to trust each other?

Continuing with the line of apple exchange in the digital ledger, each page of the ledger, let’s call it a block, contains some recorded exchanges. Each block in the ledger contains a [hash](https://en.wikipedia.org/wiki/Hash_function) (the result of an algorithm that represents the entire file but in a fixed size) of the previous block, creating a chain of blocks (Blockchain), along with other information, to compute a new hash.

For a new block to enter the ledger, a mathematical calculation needs to be done, which, although simple ([Mining Bitcoin by hand](http://www.righto.com/2014/09/mining-bitcoin-with-pencil-and-paper.html)), takes some time to complete, which is why a computer can do it much faster.

Every 10 minutes, the Bitcoin network changes the values of this mathematical calculation, letting randomness decide which computer will solve this calculation first. These computers that spend all day dedicated to solving this calculation are called “Miners,” and for every mined block, they earn a reward to make the processing power worth it.

Now, if everyone on the network had to do this calculation, Bitcoin probably wouldn't have grown as much. That's why the block calculation algorithm is slow, but the verification calculation is a bit faster. So, after one computer finds the block calculation, others only need to validate this calculation.

Let's imagine a visual artist who needs to create a color for their painting by mixing other colors. They still only visualize the color they want to achieve in their head, so they need to test many times to get the desired result, just like the art of calculating a new block. But after the artist achieves the desired color and applies it to their work, when they need this new color, they'll already have a reference; they didn't note down the amounts of colors needed to achieve the result, but with the reference, it's much easier to test until they reach the same color again. So when we have a block already calculated, it's easier to do the verification calculation since the result has to be either true or false. If it is false, the block doesn't enter the chain, and someone still needs to calculate the real value of the block. If true, the other computers on the network can add the block to their chain.

## From Zero to 4

Now that you understand how Blockchain works, let's bring more news. Even though Blockchain is a concept and we have all kinds of variants, we use versioning to say what stage of ideas we're in.

### Blockchain 1.0

The beginning of everything, or at least when things came together and took shape: Bitcoin. The first example of blockchain for cryptocurrencies, a way of recording exchanges and financial transactions. The era of *internet money.*

### Blockchain 2.0

Call in the Robo-lawyers; the wave of Smart Contracts has arrived. Intelligent contracts, recorded on the blockchain to be executed autonomously. In this field, the Ethereum blockchain is one of the most used to create Smart Contracts.

### Blockchain 3.0

Up to this point, Smart Contracts were written as programming languages, so the lawyer who learned to program in some course out there did well. Other people couldn't interact with these new contracts, which is when Dapps, Decentralized Applications, came into play. A Dapp is basically a system that uses Smart Contracts as a backend and has a frontend layer so that regular users can interact with the blockchain.

### Blockchain 4.0

Here we have a match with another new concept, Industry 4.0, where you use IoT to connect industrial machines to the network. Combining Cryptocurrencies, Dapps, and IoT brings us to the new phase of blockchain.
