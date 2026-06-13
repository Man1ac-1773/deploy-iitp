# Hero Section Implementation Details

## The Performance Architecture (Compositor Threading)

The hero section features a dynamic scroll effect where the text opacity and stroke width morph as you scroll down. (The time I've spent looking for this ong ong)

The naive way to build this (which I did at first) is to attach an event listener to `window.onscroll`, update a piece of React state with the current scroll position, and trigger a re-render. 

**But I chose to move away from that** 

That approach causes horrific main-thread layout thrashing because React is trying to reconcile the DOM 60 times a second.

Instead, I used Framer Motion's `useScroll` and `useTransform`. This binds the text opacity and stroke width directly to the scroll position at the DOM node level. The animation is passed completely to the browser's compositor thread (the GPU). The result is zero main-thread blocking, preventing layout thrashing while still delivering a massive premium visual impact.

## The Visual Philosophy

The massive typography is very intentional. Standard academic sites are visually flat, safe, and boring. They look like basic PDF resumes transposed to HTML.

By aggressively cranking up the font scaling using CSS `clamp()` functions, I force the site to feel like a premium editorial piece (akin to Apple or Stripe design language). The goal isn't just to present data; it is to establish immediate academic authority the second the page loads.
