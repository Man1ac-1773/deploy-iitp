import fs from 'fs';

const v2Path = '/home/mayookh/Dev/rahul-mishra-iitp-v2/src/data/publications.ts';
const currPath = '/home/mayookh/Dev/deploy-iitp/src/data/publications.ts';

const v2Content = fs.readFileSync(v2Path, 'utf8');
let currContent = fs.readFileSync(currPath, 'utf8');

// A very hacky but effective way to parse v2 publications (evaling it)
const v2Code = v2Content.replace(/export const publications[\s\S]*?(?=\[\n)/, 'global.v2Pubs = ').replace(/export const FACULTY_AUTHOR_KEYS.*/s, '');
import('vm').then(vm => {
  const sandbox = { global: {} };
  vm.createContext(sandbox);
  try {
    vm.runInContext(v2Code.replace(/import type.*?;\n/g, ''), sandbox);
  } catch (e) {
    console.log("Error parsing v2:", e);
  }
  const v2Pubs = sandbox.global.v2Pubs || [];
  
  // Parse current pubs
  const currCode = currContent.replace(/export const publications[\s\S]*?(?=\[\n)/, 'global.currPubs = ');
  const sandbox2 = { global: {} };
  vm.createContext(sandbox2);
  vm.runInContext(currCode.replace(/import type.*?;\n/g, ''), sandbox2);
  const currPubs = sandbox2.global.currPubs || [];

  // Create a map from title to v2 pub
  const v2Map = new Map();
  v2Pubs.forEach(p => {
    v2Map.set(p.title.toLowerCase().trim(), p);
  });

  // Now, we will do string replacement on currContent to preserve formatting.
  // We'll iterate through currPubs, find their string block, and modify it.
  
  for (const pub of currPubs) {
    const title = pub.title;
    const v2Pub = v2Map.get(title.toLowerCase().trim());
    
    let targetDoi = v2Pub?.doi || pub.doi || "";
    let targetUrl = v2Pub?.url || pub.url || "https://scholar.google.com/citations?user=Iv8gjG8AAAAJ&hl=en";
    
    // Generate BibTeX
    const typeMap = {
      journal: 'article',
      conference: 'inproceedings',
      workshop: 'inproceedings',
      preprint: 'article'
    };
    const bType = typeMap[(pub.type || 'journal').toLowerCase()] || 'article';
    const authorStr = pub.authors.join(' and ');
    const firstAuthorLast = pub.authors[0].split(' ').pop().toLowerCase();
    const firstWord = pub.title.split(/[\s\-]/)[0].replace(/[^a-zA-Z]/g, '').toLowerCase();
    const bId = `${firstAuthorLast}${pub.year || '2024'}${firstWord}`;
    
    let bibtex = `@${bType}{${bId},\n  title={${pub.title}},\n  author={${authorStr}},\n  journal={${pub.venue}},\n  year={${pub.year || '2024'}}`;
    if (pub.volume || v2Pub?.volume) bibtex += `,\n  volume={${pub.volume || v2Pub?.volume}}`;
    if (pub.issue || v2Pub?.issue) bibtex += `,\n  number={${pub.issue || v2Pub?.issue}}`;
    if (pub.pages || v2Pub?.pages) bibtex += `,\n  pages={${pub.pages || v2Pub?.pages}}`;
    if (targetDoi) bibtex += `,\n  doi={${targetDoi}}`;
    bibtex += `\n}`;
    
    // Escape bibtex for string literal
    const escapedBibtex = bibtex.replace(/\\/g, '\\\\').replace(/`/g, '\\`').replace(/\$/g, '\\$');

    // We find the block for this publication by looking for its title
    const escapedTitle = title.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const pubRegex = new RegExp(`(title:\\s*["']${escapedTitle}["'][\\s\\S]*?)(?=},?\\n\\s*\\{id:|\\s*\\];)`);
    
    currContent = currContent.replace(pubRegex, (match, p1) => {
      let updatedBlock = p1;
      
      // Update or add URL
      if (updatedBlock.includes('url:')) {
        updatedBlock = updatedBlock.replace(/url:\s*["'][^"']*["']/, `url: "${targetUrl}"`);
      } else {
        updatedBlock = updatedBlock.replace(/tags:/, `url: "${targetUrl}",\n    tags:`);
      }
      
      // Add DOI if missing and exists
      if (targetDoi) {
        if (!updatedBlock.includes('doi:')) {
          updatedBlock = updatedBlock.replace(/url:/, `doi: "${targetDoi}",\n    url:`);
        } else {
           updatedBlock = updatedBlock.replace(/doi:\s*["'][^"']*["']/, `doi: "${targetDoi}"`);
        }
      }
      
      // Add bibtex
      if (!updatedBlock.includes('bibtex:')) {
        updatedBlock = updatedBlock.replace(/tags:\s*\[[\s\S]*?\](,|(?=\n))/, match => {
           return `${match},\n    bibtex: \`${escapedBibtex}\``;
        });
      }
      
      return updatedBlock;
    });
  }

  fs.writeFileSync(currPath, currContent);
  console.log("Publications updated successfully.");
});
