import type { Metadata } from "next";
import Calculator from "@/components/Calculator";

export const metadata: Metadata = {
  title: "US Income Tax Calculator 2024-2025 | W-2 & 1099 | Take-Home Pay",
  description:
    "Free US income tax calculator. Compare W-2 vs 1099 take-home pay, estimate self-employment tax, federal brackets, Maryland state tax, and quarterly payments.",
  keywords: [
    "US income tax calculator",
    "W-2 tax calculator",
    "1099 tax calculator",
    "self-employment tax calculator",
    "take-home pay calculator",
    "federal tax brackets 2024",
    "federal tax brackets 2025",
    "Maryland state tax calculator",
    "QBI deduction calculator",
    "estimated quarterly payments",
    "FICA tax calculator",
    "Social Security tax",
    "Medicare tax",
    "standard deduction 2025",
  ],
  openGraph: {
    title: "US Income Tax Calculator 2024-2025",
    description: "Compare W-2 vs 1099 take-home pay. Free, accurate, mobile-friendly.",
    type: "website",
    locale: "en_US",
    siteName: "US Tax Calculator",
  },
  twitter: {
    card: "summary_large_image",
    title: "US Income Tax Calculator 2024-2025",
    description: "Compare W-2 vs 1099 take-home pay. Federal, state, FICA, SE tax.",
  },
  alternates: {
    canonical: "/",
  },
};

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      {/* Hero */}
      <div className="bg-green-800 text-white py-8 px-4 text-center">
        <h1 className="text-3xl md:text-4xl font-bold mb-2">
          🇺🇸 US Income Tax Calculator
        </h1>
        <p className="text-green-200 text-lg">
          W-2 & 1099 • Federal & State • 2024 & 2025 • Free
        </p>
      </div>

      <div className="px-4 py-8">
        <Calculator />
      </div>

      {/* SEO Content */}
      <div className="max-w-2xl mx-auto px-4 pb-12">
        <h2 className="text-xl font-bold text-green-800 mb-4 mt-8">
          How US Income Tax Works
        </h2>
        <div className="prose prose-green text-sm text-gray-700 space-y-3">
          <p>
            The US uses a <strong>progressive tax system</strong> with seven federal brackets ranging from
            10% to 37%. Your income is taxed in stages, so only the portion in each bracket is taxed at
            that rate, not your entire income.
          </p>
          <p>
            W-2 employees pay <strong>FICA taxes</strong> (6.2% Social Security + 1.45% Medicare), with
            their employer matching. 1099 self-employed workers pay the full 15.3% self-employment tax
            but can deduct half of it and may qualify for the <strong>QBI deduction</strong> (20% of
            qualified business income).
          </p>
          <h3 className="font-bold text-green-700">Federal Tax Brackets 2025 (Single)</h3>
          <ul className="list-disc pl-5 space-y-1">
            <li>10%: $0 – $11,925</li>
            <li>12%: $11,926 – $48,475</li>
            <li>22%: $48,476 – $103,350</li>
            <li>24%: $103,351 – $197,300</li>
            <li>32%: $197,301 – $250,525</li>
            <li>35%: $250,526 – $626,350</li>
            <li>37%: Over $626,350</li>
          </ul>
          <h3 className="font-bold text-green-700">Maryland State Tax</h3>
          <p>
            Maryland has progressive state income tax rates from 2% to 5.75%, plus Montgomery County
            local tax of 3.2%. This calculator includes both.
          </p>
          <h3 className="font-bold text-green-700">W-2 vs 1099: What&apos;s the Difference?</h3>
          <p>
            W-2 employees split FICA with their employer (7.65% each). 1099 contractors pay the full
            15.3% self-employment tax but can deduct business expenses, half of SE tax, and the QBI
            deduction. Use our comparison mode to see the exact difference for your income.
          </p>
        </div>

        {/* FAQ */}
        <h2 className="text-xl font-bold text-green-800 mb-4 mt-8">
          Frequently Asked Questions
        </h2>
        <div className="space-y-4 text-sm">
          {[
            {
              q: "What is self-employment tax?",
              a: "Self-employment tax is 15.3% on 92.35% of your net self-employment income. It covers both the employer and employee portions of Social Security (12.4%) and Medicare (2.9%). You can deduct half of this tax on your return.",
            },
            {
              q: "What is the QBI deduction?",
              a: "The Qualified Business Income deduction allows eligible self-employed individuals to deduct up to 20% of their qualified business income from their taxable income. It reduces your income tax but not self-employment tax.",
            },
            {
              q: "When are estimated quarterly payments due?",
              a: "Quarterly estimated tax payments are typically due April 15, June 15, September 15, and January 15 of the following year. Failing to pay enough throughout the year can result in penalties.",
            },
            {
              q: "Does this calculator include Maryland local taxes?",
              a: "Yes. This calculator includes Montgomery County local income tax at 3.2%, which applies to all Maryland taxable income for Montgomery County residents.",
            },
            {
              q: "What is the Additional Medicare Tax?",
              a: "If your income exceeds $200,000, an additional 0.9% Medicare tax applies to income above that threshold. W-2 employees see this withheld automatically; self-employed individuals must account for it in estimated payments.",
            },
          ].map((faq, i) => (
            <details key={i} className="bg-white rounded-lg p-4 border border-gray-200">
              <summary className="font-semibold text-green-800 cursor-pointer">
                {faq.q}
              </summary>
              <p className="mt-2 text-gray-600">{faq.a}</p>
            </details>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-green-900 text-green-200 py-8 px-4 text-center text-sm">
        <p>© 2025 US Tax Calculator. For informational purposes only.</p>
        <p className="mt-1">Not affiliated with the IRS or any government agency.</p>
      </footer>

      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "US Income Tax Calculator",
            description: "Calculate US income tax for W-2 employees and 1099 self-employed workers",
            applicationCategory: "FinanceApplication",
            operatingSystem: "Web",
            offers: {
              "@type": "Offer",
              price: "0",
              priceCurrency: "USD",
            },
            author: {
              "@type": "Organization",
              name: "US Tax Calculator",
            },
          }),
        }}
      />
    </main>
  );
}