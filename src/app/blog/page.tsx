import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "US Tax Guide & Resources | W-2 vs 1099 | Self-Employment Tax",
  description:
    "Complete guide to US income tax. Understand W-2 vs 1099, self-employment tax, estimated payments, and QBI deductions.",
};

const articles = [
  {
    slug: "w2-vs-1099",
    title: "W-2 vs 1099: Which Is Better for Your Income?",
    excerpt:
      "Side-by-side comparison of W-2 employee and 1099 contractor tax obligations. See how self-employment tax, FICA, and QBI deductions affect your take-home pay.",
    date: "2025-01-15",
    category: "Comparison",
  },
  {
    slug: "estimated-tax-payments-guide",
    title: "Estimated Quarterly Tax Payments: A Complete Guide",
    excerpt:
      "Self-employed? Learn when estimated payments are due, how to calculate them, and how to avoid underpayment penalties.",
    date: "2025-01-10",
    category: "Guide",
  },
  {
    slug: "self-employment-tax-explained",
    title: "Self-Employment Tax Explained: What 1099 Workers Need to Know",
    excerpt:
      "Understanding the 15.3% self-employment tax, how it differs from FICA, and what deductions you can take to reduce your burden.",
    date: "2025-01-05",
    category: "Tax Basics",
  },
  {
    slug: "federal-tax-brackets-2025",
    title: "Federal Tax Brackets 2025: Rates, Standard Deductions, and Changes",
    excerpt:
      "Complete breakdown of 2025 federal income tax brackets for Single and Married Filing Jointly, plus standard deduction amounts and key changes from 2024.",
    date: "2025-01-01",
    category: "Tax Rates",
  },
];

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-green-800 text-white py-8 px-4 text-center">
        <h1 className="text-3xl font-bold mb-2">📚 US Tax Guide</h1>
        <p className="text-green-200">
          Articles and guides about W-2, 1099, and self-employment taxes
        </p>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-8">
        <div className="grid gap-6">
          {articles.map((article) => (
            <Link
              key={article.slug}
              href={`/blog/${article.slug}`}
              className="block bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow p-6 border border-gray-100"
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="bg-green-100 text-green-700 text-xs font-medium px-2 py-1 rounded-full">
                  {article.category}
                </span>
                <span className="text-gray-400 text-xs">{article.date}</span>
              </div>
              <h2 className="text-lg font-bold text-green-900 mb-2">{article.title}</h2>
              <p className="text-gray-600 text-sm">{article.excerpt}</p>
            </Link>
          ))}
        </div>

        <div className="mt-8 text-center">
          <Link
            href="/"
            className="text-green-700 hover:text-green-800 font-medium"
          >
            ← Back to Calculator
          </Link>
        </div>
      </div>
    </div>
  );
}