# Deploy IITP submission

Made by mayookh

architecture notes for anyone reading the source:
went with a single-page editorial flow instead of a typical multi-page react app. standard academic sites force you to click around 10 different pages to find basic info which just leads to massive navigation fatigue. everything here is on one continuous scroll so reviewers dont get lost in routing

also implemented what i call "context anchoring". the 25% profile sidebar on the left is sticky so even if youre deep reading publications you never lose context of whose profile youre actually looking at. fixes the main issue with long academic cvs tbh

most of the heavy lifting is done with framer motion on the compositor thread so it shouldnt block the main thread too much. look around the components folder for more specific notes i left around 
