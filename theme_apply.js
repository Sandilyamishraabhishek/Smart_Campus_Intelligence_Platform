const fs = require('fs');

function processFile(file) {
  let content = fs.readFileSync(file, 'utf8');

  // Backgrounds
  content = content.replace(/\bbg-white\b/g, 'bg-card');
  content = content.replace(/\bbg-gray-50\b/g, 'bg-background');
  
  content = content.replace(/\bbg-slate-50\b/g, 'bg-slate-50 dark:bg-[#0a0f1c]');
  
  // Texts
  content = content.replace(/\btext-slate-900\b/g, 'text-foreground');
  content = content.replace(/\btext-gray-900\b/g, 'text-foreground');
  content = content.replace(/\btext-slate-800\b/g, 'text-foreground');
  content = content.replace(/\btext-slate-500\b/g, 'text-slate-500 dark:text-slate-400');
  content = content.replace(/\btext-slate-400\b/g, 'text-slate-400 dark:text-slate-500');

  // Borders
  content = content.replace(/\bborder-slate-100\b/g, 'border-border');
  content = content.replace(/\bborder-slate-200\b/g, 'border-border');
  content = content.replace(/\bborder-slate-50\b/g, 'border-border');

  // Active items
  content = content.replace(/\bbg-slate-900\b(?! dark:)/g, 'bg-slate-900 dark:bg-indigo-600');
  
  // Heatmap UI updates
  content = content.replace(/\bbg-rose-100\b/g, 'bg-rose-100 dark:bg-rose-900/30');
  content = content.replace(/\btext-rose-600\b/g, 'text-rose-600 dark:text-rose-400');
  content = content.replace(/\bbg-emerald-100\b/g, 'bg-emerald-100 dark:bg-emerald-900/30');
  content = content.replace(/\btext-emerald-600\b/g, 'text-emerald-600 dark:text-emerald-400');

  // Misc component fixes
  content = content.replace(/\bbg-amber-100\b/g, 'bg-amber-100 dark:bg-amber-900/30');
  content = content.replace(/\btext-amber-500\b/g, 'text-amber-500 dark:text-amber-400');
  
  fs.writeFileSync(file, content, 'utf8');
}

processFile('c:/Users/Abhise/Desktop/hack/campus-intelligence/src/app/page.tsx');
processFile('c:/Users/Abhise/Desktop/hack/campus-intelligence/src/components/Sidebar.tsx');
processFile('c:/Users/Abhise/Desktop/hack/campus-intelligence/src/app/layout.tsx');
