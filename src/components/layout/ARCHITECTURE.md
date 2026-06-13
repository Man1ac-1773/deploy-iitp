# Main Layout Architecture: The "Context Anchor"

The core architectural decision in this project was splitting the viewport into a sticky profile panel (25% width) and a scrollable content panel (75% width). 

## Why I did this (and why not a top navbar)

Well the main point is I wanted to be different. What's the point in copying well-established norms?

But the more important point is:
The traditional approach to a portfolio is a static top navigation bar. The problem with top navbars on dense academic sites is that once the user scrolls past the hero section, the professor's identity disappears. If a reviewer is reading through a massive list of publications at the bottom of the page, they have lost the visual context of who authored them.

I call this solution "context anchoring". By keeping the left sidebar permanently sticky on desktop, it ensures the user never forgets who they are reading about. It grounds the relation of the data with the person.

Furthermore, it completely avoids cognitive overload. Giving people a complex navigation header with 6 different routes introduces friction. Every click is a decision. Instead, I dump them into a curated, linear flow. They don't have to decide where to go; they just scroll and consume the narrative I built for them.

## Responsive Fallback

On mobile devices (below `lg` breakpoint), the 25/75 split collapses beautifully. The sticky sidebar naturally repels to the top of the viewport, acting as a standard header block before flowing into the content grid. 

I wrote a lot of the grid logic late at night, so forgive the heavy use of inline tailwind classes rather than abstracted CSS modules. It looks a bit noisy in the source, but it allowed for incredibly fast iteration and the responsiveness works flawlessly. 
I didn't actually know about the CSS abstraction before starting work on this lmao, I learnt about when I was mostly done, but by then I had spent too much time googling and looking for help on tailwind soup to actually revert it. 

