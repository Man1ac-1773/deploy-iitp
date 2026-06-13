# Data Architecture: The Flat-File Approach

The data layer of this application is completely separated from the UI components. All of the professor's information is explicitly organized into clean, semantic arrays and objects inside this folder.

## Why Flat-File TypeScript instead of a CMS?

I initially thought I'd hook the content up to a headless CMS, it'll make the site advanced. 
But for a static portfolio site of this specific scope, introducing a CMS introduces unnecessary latency, build complexity, and potential points of failure. 

So, I went with TypeScript.

By using a flat-file TypeScript data layer, we get:
1. **Absolute Type Safety:** We know exactly what shape the data is in at compile time.
2. **Zero Latency:** The data is bundled at build time. There are no network requests stalling the Largest Contentful Paint (LCP).
3. **Perfect Portability:** The entire repository can be cloned and deployed anywhere without needing to migrate a database.

By keeping the data highly structured (for example, extracting `patents.ts` and exact chronological dates into their own files rather than dumping it all in one giant object), the frontend remains incredibly flexible. It ensures that the academic authority is presented accurately, and gives us the power to swap out the UI components entirely without ever touching the data layer.
