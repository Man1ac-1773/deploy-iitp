# Deploy IITP Frontend Submission

Built by Mayookh for the Deploy IITP web development challenge.
For Professor Rahul Mishra. 

---

Welcome to Dr. Rahul Mishra's portfolio project. If you are reviewing this codebase, please take a minute to read through this document. I want to be completely transparent about *why* certain architectural and design decisions were made, rather than just listing what was built.

## The Core Problem & Our Philosophy

When building a digital portfolio for an academic professional, the most common trap is defaulting to a traditional multi-page application. 

Here is the problem with standard academic sites: they force users to click through 10 different routes (Home, Research, Publications, Teaching, Contact) just to get a basic understanding of the professor's impact. This causes massive navigation fatigue. Reviewers and students usually give a site 30 seconds to impress them. If they have to wait for route changes or hunt for information, the UX has already failed.

**The Solution:** A Single-Page Editorial Flow. 
We put everything on one continuous, buttery-smooth scroll. Reviewers never get lost in routing. They just scroll and consume the curated narrative.

## Tech Stack & "Why We Did This"

* **Next.js (React 19)**: Chosen not just for SSR, but because the App Router provides a rock-solid foundation for future expansions. It is overkill for a single-page site? Maybe. But it guarantees absolute scale if the professor ever wants to add a full blog or CMS later.
* **Tailwind CSS**: Rapid styling. You might see some massive inline class strings in the components (forgive me, Bento Grid). I could have abstracted these into CSS modules or heavy CVA objects, but inline Tailwind allows for lightning-fast iteration and zero context-switching during late-night coding sessions.
* **Framer Motion**: We rely heavily on this, but *only* for animations that can be pushed to the compositor thread. Instead of tying React state to scroll events (which causes horrible main-thread jank), we use `useTransform` to manipulate opacity and transforms directly on the GPU.
* **Lenis**: Native scrolling is fine, but we intentionally hijacked it with Lenis. Yes, it adds to the JS bundle. However, the custom exponential easing curve it provides gives the site an incredibly premium, "kinetic" feel on trackpads. The human UX tradeoff here is 100% worth the minor bundle size hit.

## Core Features & Breakdown

1. **Context Anchoring (The Layout):**
   Instead of a traditional top navigation bar, the viewport is split. The left 25% is a sticky Profile Panel containing the professor's identity and contact. The right 75% scrolls. Why? Because when a user is 5 miles deep into chronological publication data, they shouldn't forget whose profile they are reading. This context anchoring completely eliminates cognitive overload.

2. **The Bento Grid (Data Scannability):**
   Academic data is traditionally very dry. We translated key metrics (H-Index, citations, research domains) into a visual Bento layout. This allows fast-scanning users to grasp the professor's total impact in 10 seconds flat. Form perfectly follows function here.

3. **Semantic Data Layer:**
   The UI components are completely decoupled from the data. All professor data is highly structured inside the `src/data/` folder using strict TypeScript interfaces. 

4. **Premium Hero Typography:**
   Standard academic sites are visually flat. We cranked up the font scaling using `clamp()` to make the hero section feel like a high-end editorial piece (think Apple or Stripe) rather than a basic PDF resume.

## Local Setup

If you want to spin this up locally to see the compositor animations in action:

```bash
npm install
npm run dev
```

Open `http://localhost:3000` and scroll away. 

## Deep Dives

If you want to look at the specific reasoning behind individual features, I've left detailed markdown notes directly next to the code. Check out:
- [Architecture notes](src/components/layout/ARCHITECTURE.md) 
- [UX Design decisions](src/components/sections/hero/UX_DESIGN.md) 
- [Bento Grid Notes](src/components/sections/bento-grid/README.md)
- [Data Organization](src/data/README.md)
