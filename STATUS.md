# US Income Tax Calculator — Status

## Built & Running

**URL:** http://localhost:3003  
**Repo:** Dr-Brook/us-tax-calculator (to be pushed)

## What Was Built

A Next.js + Tailwind CSS income tax calculator for US workers, with three modes:

### W-2 Calculator
- Input: Gross annual salary, pay frequency (annual/semi-monthly/bi-weekly/weekly)
- Federal tax brackets for 2024 and 2025 (Single & MFJ)
- Standard deduction (2024: $14,600/$29,200; 2025: $15,000/$30,000)
- FICA: Social Security 6.2% (cap: $168,600/$176,100), Medicare 1.45%, Additional Medicare 0.9% over $200k
- Maryland state progressive brackets + Montgomery County 3.2% local tax
- Output: Gross, federal tax, FICA breakdown, state/local tax, total deductions, net pay, effective rate, marginal rate
- Bracket-by-bracket breakdown table

### 1099 / Self-Employed Calculator
- Input: Gross 1099 income, business expenses
- Self-employment tax: 15.3% on 92.35% of net SE income
- Deductible half of SE tax
- QBI deduction: 20% of qualified business income
- Estimated quarterly payments (April 15, June 15, Sept 15, Jan 15)
- Output: Full breakdown including SE tax, income tax, QBI, net income, effective rate

### Comparison Mode
- Side-by-side W-2 vs 1099 for the same gross amount
- Shows why 1099 earners pay more SE tax but benefit from QBI deduction
- Detailed table comparison of all deductions

### UI Features
- Clean card-based design matching Ethiopian tax calculator style
- Tab system: W-2 | 1099 | Compare
- Year toggle: 2024 | 2025
- Filing status toggle: Single | MFJ
- Responsive, mobile-friendly
- Green/white theme

### SEO
- Blog section with 3 articles
- Sitemap, robots.txt, Schema.org markup
- Meta tags and Open Graph

### PWA
- manifest.json with app icons (192x192 and 512x512)

## Tech Stack
- Next.js 16 (App Router)
- TypeScript
- Tailwind CSS
- Static generation for blog pages

## Files
- `src/lib/taxCalculator.ts` — All calculation logic
- `src/components/Calculator.tsx` — Main UI component
- `src/app/page.tsx` — Home page with SEO content and FAQ
- `src/app/blog/page.tsx` — Blog index
- `src/app/blog/[slug]/page.tsx` — Blog articles
- `src/app/layout.tsx` — Root layout with metadata
- `src/app/sitemap.ts` — Dynamic sitemap
- `src/app/robots.ts` — Robots.txt
- `public/manifest.json` — PWA manifest
- `public/icon-192.png`, `public/icon-512.png` — PWA icons