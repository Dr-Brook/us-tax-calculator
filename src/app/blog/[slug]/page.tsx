import type { Metadata } from "next";
import Link from "next/link";

const articlesData: Record<string, { title: string; content: string }> = {
  "w2-vs-1099": {
    title: "W-2 vs 1099: Which Is Better for Your Income?",
    content: `
## What Is a W-2?

A W-2 form is issued to employees. Your employer withholds federal income tax, Social Security, and Medicare from each paycheck. The employer also pays half of your FICA taxes (7.65%).

## What Is a 1099?

A 1099 form reports income for independent contractors and freelancers. No taxes are withheld, so you are responsible for paying both income tax and self-employment tax (15.3%) yourself.

## The Big Difference: Who Pays FICA?

### W-2 Employee
- You pay: 6.2% Social Security + 1.45% Medicare = **7.65%**
- Your employer pays: another 7.65%
- Total FICA: 15.3% (split 50/50)

### 1099 Contractor
- You pay: **15.3% self-employment tax** (the full amount)
- No employer contribution
- But you can deduct half of SE tax from your income

## Additional Differences

| Feature | W-2 Employee | 1099 Contractor |
|---|---|---|
| Tax withholding | Automatic | Must estimate and pay quarterly |
| Business expense deductions | Limited | Full Schedule C deductions |
| QBI deduction | Not available | Up to 20% of qualified income |
| Retirement plans | Employer 401(k) | Solo 401(k), SEP IRA |
| Benefits | Often included | Must arrange yourself |

## Which Is Better?

It depends on your income, expenses, and situation. A 1099 contractor earning the same gross as a W-2 employee typically takes home less due to the full SE tax, but can offset this with business deductions and the QBI deduction.

Use our [comparison calculator](/) to see the exact difference for your income level.
    `,
  },
  "estimated-tax-payments-guide": {
    title: "Estimated Quarterly Tax Payments: A Complete Guide",
    content: `
## What Are Estimated Tax Payments?

If you are self-employed or earn income not subject to withholding, you must make estimated tax payments to the IRS throughout the year. This includes income tax and self-employment tax.

## When Are Payments Due?

The IRS divides the year into four payment periods:

| Quarter | Due Date | Covers |
|---|---|---|
| Q1 | April 15 | Jan 1 – Mar 31 |
| Q2 | June 15 | Apr 1 – May 31 |
| Q3 | September 15 | Jun 1 – Aug 31 |
| Q4 | January 15 (next year) | Sep 1 – Dec 31 |

If a due date falls on a weekend or holiday, it moves to the next business day.

## How Much Should You Pay?

The safe harbor rule requires you to pay either:
1. **100% of last year's tax liability** (110% if your AGI was over $150,000), or
2. **90% of this year's tax liability**

If you meet either threshold, you avoid underpayment penalties.

## How to Calculate Your Quarterly Payment

1. Estimate your total annual income
2. Subtract expected deductions
3. Calculate income tax using brackets
4. Add self-employment tax (15.3% on 92.35% of net SE income)
5. Subtract any withholding or credits
6. Divide by 4

Our [1099 calculator](/) does this for you automatically.

## What Happens If You Underpay?

The IRS charges interest on underpayments, currently around 8% annually (as of 2025). The penalty is calculated per quarter, so missing early payments costs more.

## Tips for Freelancers

- **Save 25-30%** of every payment for taxes
- **Make payments on time**, even if you can only afford partial amounts
- **Use the IRS Direct Pay** system for free electronic payments
- **Consider increasing withholding** at a W-2 job to cover 1099 income taxes
    `,
  },
  "self-employment-tax-explained": {
    title: "Self-Employment Tax Explained: What 1099 Workers Need to Know",
    content: `
## What Is Self-Employment Tax?

Self-employment (SE) tax is the combined Social Security and Medicare tax for self-employed individuals. The rate is **15.3%** on 92.35% of your net self-employment income.

## Breaking Down the 15.3%

- **Social Security**: 12.4% (up to the wage base, $176,100 in 2025)
- **Medicare**: 2.9% (no income limit)
- **Additional Medicare**: 0.9% on income over $200,000

### Why 92.35%?

You only pay SE tax on 92.35% of your net earnings because the IRS allows you to deduct the employer-equivalent portion (7.65%) before calculating the tax. This prevents double-taxation of the employer share.

## How It Differs from W-2 FICA

| Tax | W-2 Employee | Self-Employed |
|---|---|---|
| Social Security | 6.2% (employer pays 6.2%) | 12.4% (you pay both) |
| Medicare | 1.45% (employer pays 1.45%) | 2.9% (you pay both) |
| Total | 7.65% | 15.3% |

## Deductions That Help

### 1. Half of SE Tax
You can deduct 50% of your self-employment tax from your gross income. This reduces your adjusted gross income (AGI).

### 2. QBI Deduction
Eligible self-employed individuals can deduct up to 20% of their qualified business income. This deduction reduces your taxable income but not your SE tax.

### 3. Business Expenses
Schedule C allows you to deduct legitimate business expenses before calculating SE tax. This includes:
- Home office
- Vehicle expenses
- Equipment and software
- Professional services
- Health insurance premiums

## Example: $75,000 1099 Income

| Item | Amount |
|---|---|
| Gross 1099 income | $75,000 |
| Net SE income (after expenses) | $75,000 |
| SE taxable (92.35%) | $69,263 |
| SE tax (15.3%) | $10,597 |
| Deductible half | $5,299 |
| QBI deduction | $13,940 |
| Taxable income (after deductions) | ~$37,361 |

Use our [1099 calculator](/) to run the numbers for your exact situation.
    `,
  },
  "federal-tax-brackets-2025": {
    title: "Federal Tax Brackets 2025: Rates, Standard Deductions, and Changes",
    content: `
## 2025 Federal Tax Brackets (Single)

| Rate | Income Range |
|---|---|
| 10% | $0 – $11,925 |
| 12% | $11,926 – $48,475 |
| 22% | $48,476 – $103,350 |
| 24% | $103,351 – $197,300 |
| 32% | $197,301 – $250,525 |
| 35% | $250,526 – $626,350 |
| 37% | Over $626,350 |

## 2025 Federal Tax Brackets (Married Filing Jointly)

| Rate | Income Range |
|---|---|
| 10% | $0 – $23,850 |
| 12% | $23,851 – $96,950 |
| 22% | $96,951 – $206,700 |
| 24% | $206,701 – $394,600 |
| 32% | $394,601 – $501,050 |
| 35% | $501,051 – $751,600 |
| 37% | Over $751,600 |

## Standard Deduction

| Filing Status | 2024 | 2025 |
|---|---|---|
| Single | $14,600 | $15,000 |
| Married Filing Jointly | $29,200 | $30,000 |

The standard deduction reduces your taxable income before brackets are applied. Most taxpayers take the standard deduction rather than itemizing.

## Key Changes from 2024 to 2025

- **Bracket thresholds** increased ~2.8% for inflation
- **Standard deduction** rose $400 (Single) and $800 (MFJ)
- **Social Security wage base** increased from $168,600 to $176,100
- **Additional Medicare threshold** remains at $200,000

## How Progressive Taxation Works

Your income is taxed in brackets, not at a single rate. If you earn $100,000 as a single filer:

1. First $11,925 taxed at 10% = $1,192.50
2. $11,926 – $48,475 taxed at 12% = $4,386
3. $48,476 – $100,000 taxed at 22% = $11,335
4. **Total federal tax: ~$16,913**

Your effective rate is about 16.9%, not 22%. Use our [calculator](/) to see your exact breakdown.
    `,
  },
};

interface BlogArticleProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return Object.keys(articlesData).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: BlogArticleProps): Promise<Metadata> {
  const { slug } = await params;
  const article = articlesData[slug];
  if (!article) return { title: "Article Not Found" };
  return {
    title: `${article.title} | US Tax Calculator`,
    description: article.content.split("\n").find((l) => l.trim() && !l.startsWith("#"))?.slice(0, 160) || article.title,
  };
}

export default async function BlogArticle({ params }: BlogArticleProps) {
  const { slug } = await params;
  const article = articlesData[slug];

  if (!article) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Article Not Found</h1>
          <Link href="/blog" className="text-green-700 hover:text-green-800 font-medium">
            ← Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  const htmlContent = article.content
    .replace(/## (.+)/g, '<h2 class="text-xl font-bold text-green-800 mt-6 mb-3">$1</h2>')
    .replace(/### (.+)/g, '<h3 class="text-lg font-bold text-green-700 mt-4 mb-2">$1</h3>')
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2" class="text-green-700 underline">$1</a>')
    .replace(/^\| (.+) \|$/gm, (match) => `<tr>${match.split("|").filter(c => c.trim()).map(c => `<td class="border border-gray-200 px-3 py-1 text-sm">${c.trim()}</td>`).join("")}</tr>`)
    .replace(/^\|---.*$/gm, "")
    .replace(/^- (.+)$/gm, '<li class="ml-4">$1</li>')
    .replace(/^(\d+)\. (.+)$/gm, '<li class="ml-4">$2</li>')
    .replace(/\n\n/g, "<br/><br/>")
    .replace(/\n/g, "<br/>");

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-green-800 text-white py-8 px-4 text-center">
        <h1 className="text-2xl md:text-3xl font-bold px-4">{article.title}</h1>
      </div>

      <article className="max-w-3xl mx-auto px-4 py-8 bg-white rounded-b-xl shadow-sm">
        <div
          className="prose prose-green max-w-none text-gray-700"
          dangerouslySetInnerHTML={{ __html: htmlContent }}
        />

        <div className="mt-8 pt-6 border-t border-gray-200">
          <Link href="/blog" className="text-green-700 hover:text-green-800 font-medium">
            ← Back to Blog
          </Link>
          <span className="mx-4 text-gray-300">|</span>
          <Link href="/" className="text-green-700 hover:text-green-800 font-medium">
            Try the Calculator →
          </Link>
        </div>
      </article>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: article.title,
            datePublished: "2025-01-15",
            author: { "@type": "Organization", name: "US Tax Calculator" },
            publisher: { "@type": "Organization", name: "US Tax Calculator" },
          }),
        }}
      />
    </div>
  );
}