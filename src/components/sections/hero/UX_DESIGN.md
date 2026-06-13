hero section implementation details

used framer motion useTransform to bind the text opacity and stroke-width directly to the scroll position instead of relying on slow react state updates inside a scroll listener. this keeps the animation completely on the compositor thread

prevents main-thread layout thrashing while still getting that massive premium visual impact

the massive typography is intentional. standard academic sites are visually flat so we cranked up the font scaling to make it feel like an editorial piece rather than a cv
