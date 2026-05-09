# US Income Tax Calculator - STATUS

## Built: 2025-05-09

### What Was Built
A Next.js + Tailwind CSS app for calculating US income tax, modeled after the Ethiopian tax calculator.

### Features
- **W-2 Calculator**: Gross salary input, pay frequency toggle (annual/semi-monthly/bi-weekly/weekly), federal tax brackets (2024 & 2025), standard deduction, FICA (Social Security + Medicare + Additional Medicare), Maryland state tax with Montgomery County local tax (3.2%), bracket-by-bracket breakdown, effective rate
- **1099 / Self-Employed Calculator**: Gross 1099 income + business expenses, SE tax (15.3% on 92.35%), deductible half of SE tax, QBI deduction (20%), estimated quarterly payments with due dates, full breakdown
- **Comparison Mode**: W-2 vs 1099 for same gross income, shows SE tax penalty vs QBI benefit, side-by-side table
- **Year Toggle**: 2024 and 2025 federal brackets
- **Filing Status Toggle**: Single and Married Filing Jointly
- **Blog Section**: 4 SEO articles (W-2 vs 1099, estimated tax payments, self-employment tax explained, federal brackets 2025)
- **SEO**: sitemap.xml, robots.txt, meta tags, Schema.org markup
- **PWA**: manifest.json, icons

### Tech Stack
- Next.js 16.2.6 (App Router, TypeScript, Tailwind CSS v4)
- React 19.2.4

### Tax Data Included
- Federal brackets 2024 & 2025 (Single + MFJ)
- Standard deduction 2024 ($14,600/$29,200) and 2025 ($15,000/$30,000)
- FICA: Social Security 6.2% (cap $168,600/$176,100), Medicare 1.45%, Additional Medicare 0.9% over $200k
- Maryland progressive state tax (2%–5.75%) + Montgomery County local tax (3.2%)
- SE tax: 15.3% on 92.35% of net SE income
- QBI: 20% deduction on qualified business income

### Dev Server
```bash
cd /Users/rj/.openclaw/workspace/us-tax-calculator && npm run dev
```

### GitHub
Repo: Dr-Brook/us-tax-calculator (to be created)