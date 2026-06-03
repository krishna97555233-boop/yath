import fs from 'fs';
import path from 'path';

function replaceInDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      replaceInDir(fullPath);
    } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      
      // Update font-black to font-serif for elegance where it says uppercase tracking-tight
      content = content.replace(/font-black uppercase tracking-tight/g, 'font-serif uppercase tracking-widest');
      
      // Change bg-neutral-900 to bg-zinc-900
      content = content.replace(/bg-neutral-900/g, 'bg-zinc-900');
      
      // Change bg-neutral-950 to bg-zinc-950
      content = content.replace(/bg-neutral-950/g, 'bg-zinc-950');

      // Add loading="lazy" to img tags
      content = content.replace(/<img /g, '<img loading="lazy" ');

      fs.writeFileSync(fullPath, content);
    }
  }
}

replaceInDir('./src');
console.log('Done lazy loading');
