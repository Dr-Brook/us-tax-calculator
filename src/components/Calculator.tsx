"use client";

import { useState } from "react";
import {
  calculateW2,
  calculate1099,
  formatUSD,
  getBracketLabel,
  type W2Result,
  type SelfEmployedResult,
  type BracketDetail,
  type TaxYear,
  type FilingStatus,
  type PayFrequency,
} from "@/lib/taxCalculator";

type Tab = "w2" | "1099" | "compare";

export default function Calculator() {
  const [tab, setTab] = useState<Tab>("w2");
  const [year, setYear] = useState<TaxYear>(2025);
  const [filingStatus, setFilingStatus] = useState<FilingStatus>("single");
  const [grossSalary, setGrossSalary] = useState<string>("");
  const [payFrequency, setPayFrequency] = useState<PayFrequency>("annual");
  const [gross1099, setGross1099] = useState<string>("");
  const [businessExpenses, setBusinessExpenses] = useState<string>("0");
  const [w2Result, setW2Result] = useState<W2Result | null>(null);
  const [seResult, setSeResult] = useState<SelfEmployedResult | null>(null);
  const [compareW2, setCompareW2] = useState<W2Result | null>(null);
  const [compareSE, setCompareSE] = useState<SelfEmployedResult | null>(null);

  const handleW2Calculate = () => {
    const salary = parseFloat(grossSalary) || 0;
    if (salary <= 0) return;
    setW2Result(calculateW2(salary, year, filingStatus, payFrequency));
    setSeResult(null);
  };

  const handle1099Calculate = () => {
    const income = parseFloat(gross1099) || 0;
    if (income <= 0) return;
    const expenses = parseFloat(businessExpenses) || 0;
    setSeResult(calculate1099(income, expenses, year, filingStatus));
    setW2Result(null);
  };

  const handleCompareCalculate = () => {
    const income = parseFloat(grossSalary) || parseFloat(gross1099) || 0;
    if (income <= 0) return;
    const expenses = parseFloat(businessExpenses) || 0;
    setCompareW2(calculateW2(income, year, filingStatus, payFrequency));
    setCompareSE(calculate1099(income, expenses, year, filingStatus));
  };

  const handleReset = () => {
    setGrossSalary("");
    setGross1099("");
    setBusinessExpenses("0");
    setW2Result(null);
    setSeResult(null);
    setCompareW2(null);
    setCompareSE(null);
  };

  const fmt = formatUSD;

  const ToggleGroup = <T extends string | number,>({
    value,
    onChange,
    options,
  }: {
    value: T;
    onChange: (v: T) => void;
    options: { value: T; label: string }[];
  }) => (
    <div className="flex bg-gray-100 rounded-xl p-1 gap-1">
      {options.map((opt) => (
        <button
          key={String(opt.value)}
          onClick={() => onChange(opt.value)}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
            value === opt.value ? "bg-green-700 text-white shadow-sm" : "text-gray-600 hover:text-green-700"
          }`}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );

  const BracketTable = ({ details }: { details: BracketDetail[] }) => (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="text-left text-gray-500 border-b">
            <th className="pb-2">Bracket</th>
            <th className="pb-2 text-right">Taxable</th>
            <th className="pb-2 text-right">Rate</th>
            <th className="pb-2 text-right">Tax</th>
          </tr>
        </thead>
        <tbody>
          {details.map((bd, i) => (
            <tr key={i} className={bd.tax > 0 ? "text-gray-800" : "text-gray-400"}>
              <td className="py-2">{getBracketLabel(bd)}</td>
              <td className="py-2 text-right">{bd.taxableAmount > 0 ? fmt(bd.taxableAmount) : "\u2014"}</td>
              <td className="py-2 text-right">{(bd.rate * 100).toFixed(0)}%</td>
              <td className="py-2 text-right">{bd.tax > 0 ? fmt(bd.tax) : "\u2014"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  const Row = ({ label, value, negative, positive, bold }: { label: string; value: string; negative?: boolean; positive?: boolean; bold?: boolean }) => (
    <div className="flex justify-between items-center py-2 border-b border-gray-50">
      <span className={bold ? "font-semibold text-gray-800" : "text-gray-600"}>{label}</span>
      <span className={`font-semibold ${negative ? "text-red-600" : positive ? "text-green-600" : ""} ${bold ? "text-lg" : ""}`}>
        {negative ? "\u2212" : positive ? "+" : ""}{value}
      </span>
    </div>
  );

  const W2Results = ({ r }: { r: W2Result }) => (
    <div className="bg-white rounded-2xl shadow-lg p-6 mb-6 border border-green-100">
      <h2 className="text-xl font-bold text-green-800 mb-4">W-2 Calculation Results</h2>
      <div className="grid grid-cols-2 gap-3 mb-6">
        <div className="bg-green-50 rounded-xl p-4 text-center">
          <div className="text-xs text-green-600 mb-1">Gross Annual</div>
          <div className="text-lg font-bold text-green-900">{fmt(r.grossAnnual)}</div>
        </div>
        <div className="bg-blue-50 rounded-xl p-4 text-center">
          <div className="text-xs text-blue-600 mb-1">Net Annual</div>
          <div className="text-lg font-bold text-blue-900">{fmt(r.netAnnual)}</div>
        </div>
      </div>
      <div className="space-y-2 mb-6">
        <Row label="Gross Annual Income" value={fmt(r.grossAnnual)} />
        <Row label="Standard Deduction" value={fmt(r.standardDeduction)} negative />
        <Row label="Taxable Income" value={fmt(r.taxableIncome)} bold />
        <div className="border-t pt-2 mt-2" />
        <Row label="Federal Income Tax" value={fmt(r.federalTax)} negative />
        <Row label="Social Security Tax (6.2%)" value={fmt(r.socialSecurityTax)} negative />
        <Row label="Medicare Tax (1.45%)" value={fmt(r.medicareTax)} negative />
        {r.additionalMedicareTax > 0 && <Row label="Additional Medicare (0.9%)" value={fmt(r.additionalMedicareTax)} negative />}
        <Row label="Total FICA" value={fmt(r.totalFICA)} negative />
        <Row label="Maryland State Tax" value={fmt(r.stateTax)} negative />
        <Row label="Montgomery County Local Tax (3.2%)" value={fmt(r.localTax)} negative />
        <div className="border-t pt-2 mt-2" />
        <Row label="Total Deductions" value={fmt(r.totalDeductions)} negative bold />
        <div className="bg-green-50 -mx-6 px-6 py-3 rounded-b-xl flex justify-between items-center">
          <span className="font-bold text-green-800 text-lg">Net Annual Pay</span>
          <span className="font-bold text-green-800 text-lg">{fmt(r.netAnnual)}</span>
        </div>
      </div>
      <div className="flex gap-4 text-sm text-gray-600 mb-6">
        <span>Effective Rate: <strong>{r.effectiveRate}%</strong></span>
        <span>Marginal Rate: <strong>{r.marginalRate}%</strong></span>
        <span>Net per period: <strong>{fmt(r.netPerPeriod)}</strong></span>
      </div>
      <h3 className="font-bold text-gray-700 mb-3">Federal Bracket Breakdown</h3>
      <BracketTable details={r.federalBracketDetails} />
    </div>
  );

  const SEResults = ({ r }: { r: SelfEmployedResult }) => (
    <div className="bg-white rounded-2xl shadow-lg p-6 mb-6 border border-green-100">
      <h2 className="text-xl font-bold text-green-800 mb-4">1099 / Self-Employed Results</h2>
      <div className="grid grid-cols-2 gap-3 mb-6">
        <div className="bg-green-50 rounded-xl p-4 text-center">
          <div className="text-xs text-green-600 mb-1">Gross 1099 Income</div>
          <div className="text-lg font-bold text-green-900">{fmt(r.gross1099)}</div>
        </div>
        <div className="bg-blue-50 rounded-xl p-4 text-center">
          <div className="text-xs text-blue-600 mb-1">Net After Tax</div>
          <div className="text-lg font-bold text-blue-900">{fmt(r.netIncome)}</div>
        </div>
      </div>
      <div className="space-y-2 mb-6">
        <Row label="Gross 1099 Income" value={fmt(r.gross1099)} />
        <Row label="Business Expenses" value={fmt(r.businessExpenses)} negative />
        <Row label="Net SE Income" value={fmt(r.netSEIncome)} bold />
        <div className="border-t pt-2 mt-2" />
        <h4 className="font-semibold text-gray-700">Self-Employment Tax</h4>
        <Row label="SE Taxable Base (92.35%)" value={fmt(r.seTaxableBase)} />
        <Row label="Social Security (12.4%)" value={fmt(r.socialSecurityTax)} negative />
        <Row label="Medicare (2.9%)" value={fmt(r.medicareTax)} negative />
        {r.additionalMedicareTax > 0 && <Row label="Additional Medicare (0.9%)" value={fmt(r.additionalMedicareTax)} negative />}
        <Row label="Total SE Tax" value={fmt(r.totalSETax)} negative bold />
        <Row label="Deductible Half of SE Tax" value={fmt(r.deductibleHalfSETax)} positive />
        <div className="border-t pt-2 mt-2" />
        <h4 className="font-semibold text-gray-700">Income Tax</h4>
        <Row label="Adjusted Gross Income" value={fmt(r.adjustedGrossIncome)} />
        <Row label="Standard Deduction" value={fmt(r.standardDeduction)} negative />
        <Row label="QBI Deduction (20%)" value={fmt(r.qbiDeduction)} positive />
        <Row label="Taxable Income" value={fmt(r.taxableIncome)} bold />
        <Row label="Federal Income Tax" value={fmt(r.federalTax)} negative />
        <div className="border-t pt-2 mt-2" />
        <Row label="Total Tax (Federal + SE)" value={fmt(r.totalTax)} negative bold />
        <div className="bg-green-50 -mx-6 px-6 py-3 rounded-b-xl flex justify-between items-center">
          <span className="font-bold text-green-800 text-lg">Net Income</span>
          <span className="font-bold text-green-800 text-lg">{fmt(r.netIncome)}</span>
        </div>
      </div>
      <div className="text-sm text-gray-600 mb-4">Effective Rate: <strong>{r.effectiveRate}%</strong></div>
      <div className="bg-yellow-50 rounded-xl p-4 mb-6 border border-yellow-200">
        <h4 className="font-bold text-yellow-800 mb-3">Estimated Quarterly Payments</h4>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {r.quarterlyPayments.map((q, i) => (
            <div key={i} className="bg-white rounded-lg p-3 text-center">
              <div className="text-xs text-gray-500">Q{i + 1}: {q.dueDate}</div>
              <div className="font-bold text-gray-900">{fmt(q.amount)}</div>
            </div>
          ))}
        </div>
      </div>
      <h3 className="font-bold text-gray-700 mb-3">Federal Bracket Breakdown</h3>
      <BracketTable details={r.federalBracketDetails} />
    </div>
  );

  const CompareResults = ({ w2, se }: { w2: W2Result; se: SelfEmployedResult }) => {
    const diff = w2.netAnnual - se.netIncome;
    return (
      <div className="bg-white rounded-2xl shadow-lg p-6 mb-6 border border-green-100">
        <h2 className="text-xl font-bold text-green-800 mb-4">W-2 vs 1099 Comparison</h2>
        <div className="bg-blue-50 rounded-xl p-4 mb-6 text-center border border-blue-200">
          <div className="text-sm text-blue-600 mb-1">On {fmt(w2.grossAnnual)} gross income ({filingStatus === "single" ? "Single" : "Married Filing Jointly"}, {year})</div>
          <div className={`text-2xl font-bold ${diff > 0 ? "text-green-700" : "text-orange-700"}`}>
            {diff > 0 ? "W-2" : "1099"} takes home {fmt(Math.abs(diff))} more per year
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead><tr className="text-left text-gray-500 border-b"><th className="pb-2">Category</th><th className="pb-2 text-right">W-2 Employee</th><th className="pb-2 text-right">1099 Contractor</th></tr></thead>
            <tbody>
              <tr className="border-b border-gray-50"><td className="py-2 font-medium">Gross Income</td><td className="py-2 text-right">{fmt(w2.grossAnnual)}</td><td className="py-2 text-right">{fmt(se.gross1099)}</td></tr>
              <tr className="border-b border-gray-50"><td className="py-2 text-gray-600">Standard Deduction</td><td className="py-2 text-right text-red-600">-{fmt(w2.standardDeduction)}</td><td className="py-2 text-right text-red-600">-{fmt(se.standardDeduction)}</td></tr>
              <tr className="border-b border-gray-50"><td className="py-2 text-gray-600">SE Tax (both halves)</td><td className="py-2 text-right">{"\u2014"}</td><td className="py-2 text-right text-red-600">-{fmt(se.totalSETax)}</td></tr>
              <tr className="border-b border-gray-50"><td className="py-2 text-gray-600">Deductible Half SE Tax</td><td className="py-2 text-right">{"\u2014"}</td><td className="py-2 text-right text-green-600">+{fmt(se.deductibleHalfSETax)}</td></tr>
              <tr className="border-b border-gray-50"><td className="py-2 text-gray-600">QBI Deduction</td><td className="py-2 text-right">{"\u2014"}</td><td className="py-2 text-right text-green-600">+{fmt(se.qbiDeduction)}</td></tr>
              <tr className="border-b border-gray-50"><td className="py-2 text-gray-600">Federal Income Tax</td><td className="py-2 text-right text-red-600">-{fmt(w2.federalTax)}</td><td className="py-2 text-right text-red-600">-{fmt(se.federalTax)}</td></tr>
              <tr className="border-b border-gray-50"><td className="py-2 text-gray-600">FICA (employee share)</td><td className="py-2 text-right text-red-600">-{fmt(w2.totalFICA)}</td><td className="py-2 text-right">{"\u2014"}</td></tr>
              <tr className="border-b border-gray-50"><td className="py-2 text-gray-600">State + Local Tax</td><td className="py-2 text-right text-red-600">-{fmt(w2.totalStateLocal)}</td><td className="py-2 text-right text-gray-400">varies</td></tr>
              <tr className="border-t-2 border-gray-300 font-bold"><td className="py-3">Net Take-Home</td><td className="py-3 text-right text-green-800 text-lg">{fmt(w2.netAnnual)}</td><td className="py-3 text-right text-green-800 text-lg">{fmt(se.netIncome)}</td></tr>
              <tr><td className="py-2 text-gray-500">Effective Rate</td><td className="py-2 text-right">{w2.effectiveRate}%</td><td className="py-2 text-right">{se.effectiveRate}%</td></tr>
            </tbody>
          </table>
        </div>
        <div className="mt-4 p-3 bg-gray-50 rounded-lg text-sm text-gray-600">
          <strong>Key Takeaway:</strong> 1099 contractors pay both halves of SE tax (15.3%) but can deduct half and claim the QBI deduction (20% of qualified business income). W-2 employees only pay half of FICA (7.65%) but get no QBI deduction. On the same gross, 1099 earners typically take home less after taxes.
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex flex-wrap gap-3 justify-between items-center mb-4">
        <ToggleGroup value={tab} onChange={setTab} options={[{ value: "w2" as Tab, label: "W-2" }, { value: "1099" as Tab, label: "1099" }, { value: "compare" as Tab, label: "Compare" }]} />
        <div className="flex gap-2">
          <ToggleGroup value={year} onChange={setYear} options={[{ value: 2024 as TaxYear, label: "2024" }, { value: 2025 as TaxYear, label: "2025" }]} />
          <ToggleGroup value={filingStatus} onChange={setFilingStatus} options={[{ value: "single" as FilingStatus, label: "Single" }, { value: "mfj" as FilingStatus, label: "MFJ" }]} />
        </div>
      </div>

      {tab === "w2" && (
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6 border border-gray-100">
          <h2 className="text-2xl font-bold text-green-800 mb-1">W-2 Income Calculator</h2>
          <p className="text-green-600 mb-6 text-sm">Calculate your take-home pay as a W-2 employee in Maryland (Montgomery County)</p>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Gross Annual Salary (USD)</label>
              <input type="number" value={grossSalary} onChange={(e) => setGrossSalary(e.target.value)} placeholder="e.g. 75000" className="w-full px-4 py-3 border-2 border-green-200 rounded-xl focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none text-lg transition-colors" min="0" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Pay Frequency</label>
              <select value={payFrequency} onChange={(e) => setPayFrequency(e.target.value as PayFrequency)} className="w-full px-4 py-3 border-2 border-green-200 rounded-xl focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none text-lg bg-white">
                <option value="annual">Annual</option>
                <option value="semi-monthly">Semi-Monthly (24/yr)</option>
                <option value="bi-weekly">Bi-Weekly (26/yr)</option>
                <option value="weekly">Weekly (52/yr)</option>
              </select>
            </div>
            <div className="flex gap-3 pt-2">
              <button onClick={handleW2Calculate} disabled={!grossSalary || parseFloat(grossSalary) <= 0} className="flex-1 bg-green-700 hover:bg-green-800 disabled:bg-gray-300 text-white py-3 rounded-xl font-bold text-lg transition-colors">Calculate</button>
              <button onClick={handleReset} className="px-6 py-3 border-2 border-gray-200 text-gray-500 hover:border-red-300 hover:text-red-500 rounded-xl font-medium transition-colors">Reset</button>
            </div>
          </div>
        </div>
      )}

      {tab === "1099" && (
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6 border border-gray-100">
          <h2 className="text-2xl font-bold text-green-800 mb-1">1099 / Self-Employed Calculator</h2>
          <p className="text-green-600 mb-6 text-sm">Calculate your self-employment tax, QBI deduction, and estimated quarterly payments</p>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Gross 1099 Income (USD)</label>
              <input type="number" value={gross1099} onChange={(e) => setGross1099(e.target.value)} placeholder="e.g. 80000" className="w-full px-4 py-3 border-2 border-green-200 rounded-xl focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none text-lg transition-colors" min="0" />
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">Business Expenses (USD)</label>
              <input type="number" value={businessExpenses} onChange={(e) => setBusinessExpenses(e.target.value)} placeholder="0" className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:border-green-400 outline-none" min="0" />
            </div>
            <div className="flex gap-3 pt-2">
              <button onClick={handle1099Calculate} disabled={!gross1099 || parseFloat(gross1099) <= 0} className="flex-1 bg-green-700 hover:bg-green-800 disabled:bg-gray-300 text-white py-3 rounded-xl font-bold text-lg transition-colors">Calculate</button>
              <button onClick={handleReset} className="px-6 py-3 border-2 border-gray-200 text-gray-500 hover:border-red-300 hover:text-red-500 rounded-xl font-medium transition-colors">Reset</button>
            </div>
          </div>
        </div>
      )}

      {tab === "compare" && (
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6 border border-gray-100">
          <h2 className="text-2xl font-bold text-green-800 mb-1">W-2 vs 1099 Comparison</h2>
          <p className="text-green-600 mb-6 text-sm">Enter a gross amount to see side-by-side take-home comparison</p>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Gross Annual Amount (USD)</label>
              <input type="number" value={grossSalary || gross1099} onChange={(e) => { setGrossSalary(e.target.value); setGross1099(e.target.value); }} placeholder="e.g. 75000" className="w-full px-4 py-3 border-2 border-green-200 rounded-xl focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none text-lg transition-colors" min="0" />
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">Business Expenses for 1099 (USD)</label>
              <input type="number" value={businessExpenses} onChange={(e) => setBusinessExpenses(e.target.value)} placeholder="0" className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:border-green-400 outline-none" min="0" />
            </div>
            <div className="flex gap-3 pt-2">
              <button onClick={handleCompareCalculate} disabled={(!grossSalary && !gross1099) || parseFloat(grossSalary || gross1099) <= 0} className="flex-1 bg-green-700 hover:bg-green-800 disabled:bg-gray-300 text-white py-3 rounded-xl font-bold text-lg transition-colors">Compare</button>
              <button onClick={handleReset} className="px-6 py-3 border-2 border-gray-200 text-gray-500 hover:border-red-300 hover:text-red-500 rounded-xl font-medium transition-colors">Reset</button>
            </div>
          </div>
        </div>
      )}

      {tab === "w2" && w2Result && <W2Results r={w2Result} />}
      {tab === "1099" && seResult && <SEResults r={seResult} />}
      {tab === "compare" && compareW2 && compareSE && <CompareResults w2={compareW2} se={compareSE} />}

      <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 text-sm text-yellow-800 mt-4">
        For informational purposes only. Consult a tax professional for personalized advice. Maryland state and Montgomery County local taxes are included for W-2 calculations. 1099 calculations do not include state/local taxes, which vary by situation.
      </div>
    </div>
  );
}