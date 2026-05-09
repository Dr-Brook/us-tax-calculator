"use client";

import { useState } from "react";
import {
  calculateW2,
  calculate1099,
  calculateComparison,
  formatUSD,
  formatPercent,
  formatBracketRange,
  type W2Result,
  type SE1099Result,
  type ComparisonResult,
  type BracketDetail,
  type TaxYear,
  type FilingStatus,
  type PayFrequency,
} from "@/lib/taxCalculator";

type Tab = "w2" | "1099" | "compare";

export default function Calculator() {
  const [tab, setTab] = useState<Tab>("w2");
  const [year, setYear] = useState<TaxYear>(2026);
  const [filingStatus, setFilingStatus] = useState<FilingStatus>("single");
  const [grossSalary, setGrossSalary] = useState<string>("");
  const [payFrequency, setPayFrequency] = useState<PayFrequency>("monthly");
  const [seIncome, setSeIncome] = useState<string>("");
  const [seExpenses, setSeExpenses] = useState<string>("0");
  const [w2Result, setW2Result] = useState<W2Result | null>(null);
  const [seResult, setSeResult] = useState<SE1099Result | null>(null);
  const [compareResult, setCompareResult] = useState<ComparisonResult | null>(null);

  const handleW2Calculate = () => {
    const gross = parseFloat(grossSalary);
    if (!gross || gross <= 0) return;
    setW2Result(calculateW2(gross, payFrequency, year, filingStatus));
    setSeResult(null);
    setCompareResult(null);
  };

  const handleSECalculate = () => {
    const income = parseFloat(seIncome);
    if (!income || income <= 0) return;
    const expenses = parseFloat(seExpenses) || 0;
    setSeResult(calculate1099(income, expenses, year, filingStatus));
    setW2Result(null);
    setCompareResult(null);
  };

  const handleCompareCalculate = () => {
    const gross = parseFloat(grossSalary);
    if (!gross || gross <= 0) return;
    setCompareResult(calculateComparison(gross, year, filingStatus));
    setW2Result(null);
    setSeResult(null);
  };

  const handleTabChange = (newTab: Tab) => {
    setTab(newTab);
    setW2Result(null);
    setSeResult(null);
    setCompareResult(null);
  };

  const handleReset = () => {
    setGrossSalary("");
    setSeIncome("");
    setSeExpenses("0");
    setW2Result(null);
    setSeResult(null);
    setCompareResult(null);
  };

  return (
    <div className="max-w-2xl mx-auto">
      {/* Year & Filing Status Toggles */}
      <div className="flex flex-wrap justify-between items-center mb-4 gap-2">
        <div className="flex gap-2">
          <button onClick={() => { setYear(2024); setW2Result(null); setSeResult(null); setCompareResult(null); }} className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${year === 2024 ? "bg-blue-700 text-white" : "bg-gray-200 text-gray-600 hover:bg-gray-300"}`}>2024</button>
          <button onClick={() => { setYear(2025); setW2Result(null); setSeResult(null); setCompareResult(null); }} className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${year === 2025 ? "bg-blue-700 text-white" : "bg-gray-200 text-gray-600 hover:bg-gray-300"}`}>2025</button>
          <button onClick={() => { setYear(2026); setW2Result(null); setSeResult(null); setCompareResult(null); }} className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${year === 2026 ? "bg-blue-700 text-white" : "bg-gray-200 text-gray-600 hover:bg-gray-300"}`}>2026</button>
        </div>
        <div className="flex gap-2">
          <button onClick={() => { setFilingStatus("single"); setW2Result(null); setSeResult(null); setCompareResult(null); }} className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${filingStatus === "single" ? "bg-blue-700 text-white" : "bg-gray-200 text-gray-600 hover:bg-gray-300"}`}>Single</button>
          <button onClick={() => { setFilingStatus("mfj"); setW2Result(null); setSeResult(null); setCompareResult(null); }} className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${filingStatus === "mfj" ? "bg-blue-700 text-white" : "bg-gray-200 text-gray-600 hover:bg-gray-300"}`}>Married Filing Jointly</button>
        </div>
      </div>

      {/* Tab System */}
      <div className="flex mb-6 bg-gray-200 rounded-xl p-1">
        {([
          { key: "w2" as Tab, label: "W-2 Employee" },
          { key: "1099" as Tab, label: "1099 / Self-Employed" },
          { key: "compare" as Tab, label: "Compare W-2 vs 1099" },
        ]).map(({ key, label }) => (
          <button key={key} onClick={() => handleTabChange(key)} className={`flex-1 py-2.5 rounded-lg text-sm font-medium transition-colors ${tab === key ? "bg-white text-blue-800 shadow-sm" : "text-gray-600 hover:text-gray-800"}`}>{label}</button>
        ))}
      </div>

      {/* Calculator Form */}
      <div className="bg-white rounded-2xl shadow-lg p-6 mb-6 border border-gray-100">
        {tab === "w2" && (
          <>
            <h2 className="text-2xl font-bold text-blue-800 mb-1">W-2 Income Tax Calculator</h2>
            <p className="text-blue-600 mb-6 text-sm">Calculate your take-home pay as a W-2 employee</p>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Gross Annual Salary (USD) — enter your yearly income *</label>
                <input type="number" value={grossSalary} onChange={(e) => setGrossSalary(e.target.value)} placeholder="e.g. 75000" className="w-full px-4 py-3 border-2 border-blue-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none text-lg transition-colors" min="0" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Pay Frequency</label>
                <div className="grid grid-cols-4 gap-2">
                  {([
    { val: "monthly" as PayFrequency, label: "Monthly" },
                  { val: "bi-weekly" as PayFrequency, label: "Bi-Weekly" },
                  { val: "weekly" as PayFrequency, label: "Weekly" },
                  { val: "annual" as PayFrequency, label: "Annual" },
                  ]).map(({ val, label }) => (
                    <button key={val} onClick={() => setPayFrequency(val)} className={`py-2 px-3 rounded-lg text-xs font-medium transition-colors ${payFrequency === val ? "bg-blue-700 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}>{label}</button>
                  ))}
                </div>
              </div>
              <div className="flex gap-3 pt-2">
                <button onClick={handleW2Calculate} disabled={!grossSalary || parseFloat(grossSalary) <= 0} className="flex-1 bg-blue-700 hover:bg-blue-800 disabled:bg-gray-300 text-white py-3 rounded-xl font-bold text-lg transition-colors">Calculate</button>
                <button onClick={handleReset} className="px-6 py-3 border-2 border-gray-200 text-gray-500 hover:border-red-300 hover:text-red-500 rounded-xl font-medium transition-colors">Reset</button>
              </div>
            </div>
          </>
        )}

        {tab === "1099" && (
          <>
            <h2 className="text-2xl font-bold text-blue-800 mb-1">1099 / Self-Employed Calculator</h2>
            <p className="text-blue-600 mb-6 text-sm">Calculate your self-employment tax and net income</p>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Gross 1099 Income (USD) — enter your yearly income *</label>
                <input type="number" value={seIncome} onChange={(e) => setSeIncome(e.target.value)} placeholder="e.g. 100000" className="w-full px-4 py-3 border-2 border-blue-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none text-lg transition-colors" min="0" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Business Expenses (USD)</label>
                <input type="number" value={seExpenses} onChange={(e) => setSeExpenses(e.target.value)} placeholder="0" className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none text-lg transition-colors" min="0" />
              </div>
              <div className="flex gap-3 pt-2">
                <button onClick={handleSECalculate} disabled={!seIncome || parseFloat(seIncome) <= 0} className="flex-1 bg-blue-700 hover:bg-blue-800 disabled:bg-gray-300 text-white py-3 rounded-xl font-bold text-lg transition-colors">Calculate</button>
                <button onClick={handleReset} className="px-6 py-3 border-2 border-gray-200 text-gray-500 hover:border-red-300 hover:text-red-500 rounded-xl font-medium transition-colors">Reset</button>
              </div>
            </div>
          </>
        )}

        {tab === "compare" && (
          <>
            <h2 className="text-2xl font-bold text-blue-800 mb-1">W-2 vs 1099 Comparison</h2>
            <p className="text-blue-600 mb-6 text-sm">Compare take-home pay for the same gross income</p>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Gross Income (USD) — enter your yearly income *</label>
                <input type="number" value={grossSalary} onChange={(e) => setGrossSalary(e.target.value)} placeholder="e.g. 75000" className="w-full px-4 py-3 border-2 border-blue-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none text-lg transition-colors" min="0" />
              </div>
              <div className="flex gap-3 pt-2">
                <button onClick={handleCompareCalculate} disabled={!grossSalary || parseFloat(grossSalary) <= 0} className="flex-1 bg-blue-700 hover:bg-blue-800 disabled:bg-gray-300 text-white py-3 rounded-xl font-bold text-lg transition-colors">Compare</button>
                <button onClick={handleReset} className="px-6 py-3 border-2 border-gray-200 text-gray-500 hover:border-red-300 hover:text-red-500 rounded-xl font-medium transition-colors">Reset</button>
              </div>
            </div>
          </>
        )}
      </div>

      {/* W-2 Results */}
      {w2Result && (
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6 border border-blue-100">
          <h2 className="text-xl font-bold text-blue-800 mb-4">W-2 Calculation Results</h2>
          <div className="grid grid-cols-2 gap-3 mb-6">
            <div className="bg-blue-50 rounded-xl p-4 text-center">
              <div className="text-xs text-blue-600 mb-1">Gross Monthly</div>
              <div className="text-lg font-bold text-blue-900">{formatUSD(w2Result.grossAnnual / 12)}</div>
            </div>
            <div className="bg-blue-50 rounded-xl p-4 text-center">
              <div className="text-xs text-blue-600 mb-1">Net Monthly</div>
              <div className="text-lg font-bold text-blue-900">{formatUSD(w2Result.netMonthly)}</div>
            </div>
          </div>
          <div className="text-sm text-gray-500 mb-4">
            Per period ({w2Result.payFrequency}): <strong>{formatUSD(w2Result.netPerPeriod)}</strong>
            {w2Result.payFrequency !== "annual" && <span className="ml-2">| Annual: <strong>{formatUSD(w2Result.netAnnual)}</strong></span>}
          </div>
          <div className="space-y-3 mb-6">
            <div className="flex justify-between items-center py-2 border-b border-gray-100"><span className="text-gray-600">Gross Income</span><span className="font-semibold">{formatUSD(w2Result.grossAnnual)}</span></div>
            <div className="flex justify-between items-center py-2 border-b border-gray-100"><span className="text-gray-600">Standard Deduction ({year})</span><span className="font-semibold text-blue-600">-{formatUSD(w2Result.standardDeduction)}</span></div>
            <div className="flex justify-between items-center py-2 border-b border-gray-100"><span className="text-gray-600">Taxable Income</span><span className="font-semibold">{formatUSD(w2Result.taxableIncome)}</span></div>
            <div className="flex justify-between items-center py-2 border-b border-gray-100"><span className="text-gray-600">Federal Income Tax</span><span className="font-semibold text-red-600">-{formatUSD(w2Result.federalTax)}</span></div>
            <div className="flex justify-between items-center py-2 border-b border-gray-100"><span className="text-gray-600">Social Security (6.2%)</span><span className="font-semibold text-red-600">-{formatUSD(w2Result.socialSecurityTax)}</span></div>
            <div className="flex justify-between items-center py-2 border-b border-gray-100"><span className="text-gray-600">Medicare (1.45%)</span><span className="font-semibold text-red-600">-{formatUSD(w2Result.medicareTax)}</span></div>
            {w2Result.additionalMedicareTax > 0 && (
              <div className="flex justify-between items-center py-2 border-b border-gray-100"><span className="text-gray-600">Additional Medicare (0.9%)</span><span className="font-semibold text-red-600">-{formatUSD(w2Result.additionalMedicareTax)}</span></div>
            )}
            <div className="flex justify-between items-center py-2 border-b border-gray-100"><span className="text-gray-600">Total FICA</span><span className="font-semibold text-red-600">-{formatUSD(w2Result.totalFICA)}</span></div>
            <div className="flex justify-between items-center py-2 border-b border-gray-100"><span className="text-gray-600">MD State Tax</span><span className="font-semibold text-red-600">-{formatUSD(w2Result.stateTax)}</span></div>
            <div className="flex justify-between items-center py-2 border-b border-gray-100 text-xs text-gray-400"><span>Incl. Montgomery County (3.2%)</span><span>{formatUSD(w2Result.localTax)}</span></div>
            <div className="flex justify-between items-center py-3 bg-blue-50 -mx-6 px-6 rounded-b-xl"><span className="font-bold text-blue-800 text-lg">Net Take-Home</span><span className="font-bold text-blue-800 text-lg">{formatUSD(w2Result.netAnnual)}</span></div>
          </div>
          <div className="text-sm text-gray-500 mb-6">Effective Tax Rate: <strong>{w2Result.effectiveRate}%</strong></div>
          <h3 className="font-bold text-gray-700 mb-3">Federal Tax Brackets ({year} - {filingStatus === "single" ? "Single" : "MFJ"})</h3>
          <BracketTable details={w2Result.federalBracketDetails} />
          <h3 className="font-bold text-gray-700 mb-3 mt-6">Maryland State Tax Brackets</h3>
          <BracketTable details={w2Result.stateBracketDetails} />
        </div>
      )}

      {/* 1099 Results */}
      {seResult && (
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6 border border-blue-100">
          <h2 className="text-xl font-bold text-blue-800 mb-4">1099 / Self-Employed Results</h2>
          <div className="grid grid-cols-2 gap-3 mb-6">
            <div className="bg-blue-50 rounded-xl p-4 text-center"><div className="text-xs text-blue-600 mb-1">Gross Income</div><div className="text-lg font-bold text-blue-900">{formatUSD(seResult.grossIncome)}</div></div>
            <div className="bg-blue-50 rounded-xl p-4 text-center"><div className="text-xs text-blue-600 mb-1">Net Income</div><div className="text-lg font-bold text-blue-900">{formatUSD(seResult.netIncome)}</div></div>
          </div>
          <div className="space-y-3 mb-6">
            <div className="flex justify-between items-center py-2 border-b border-gray-100"><span className="text-gray-600">Gross 1099 Income</span><span className="font-semibold">{formatUSD(seResult.grossIncome)}</span></div>
            <div className="flex justify-between items-center py-2 border-b border-gray-100"><span className="text-gray-600">Business Expenses</span><span className="font-semibold text-red-600">-{formatUSD(seResult.businessExpenses)}</span></div>
            <div className="flex justify-between items-center py-2 border-b border-gray-100"><span className="text-gray-600">Net SE Income</span><span className="font-semibold">{formatUSD(seResult.netSEIncome)}</span></div>
            <div className="flex justify-between items-center py-2 border-b border-gray-100 text-xs text-gray-400"><span>SE Taxable Income (92.35%)</span><span>{formatUSD(seResult.seTaxableIncome)}</span></div>
            <div className="flex justify-between items-center py-2 border-b border-gray-100"><span className="text-gray-600">Self-Employment Tax (15.3%)</span><span className="font-semibold text-red-600">-{formatUSD(seResult.totalSETax)}</span></div>
            <div className="flex justify-between items-center py-2 border-b border-gray-100 text-xs text-gray-400"><span>Incl. Social Security (12.4%)</span><span>{formatUSD(seResult.socialSecuritySE)}</span></div>
            <div className="flex justify-between items-center py-2 border-b border-gray-100 text-xs text-gray-400"><span>Incl. Medicare (2.9%)</span><span>{formatUSD(seResult.medicareSE)}</span></div>
            <div className="flex justify-between items-center py-2 border-b border-gray-100"><span className="text-gray-600">Deductible Half of SE Tax</span><span className="font-semibold text-blue-600">+{formatUSD(seResult.deductibleHalfSE)}</span></div>
            <div className="flex justify-between items-center py-2 border-b border-gray-100"><span className="text-gray-600">QBI Deduction (20%)</span><span className="font-semibold text-blue-600">+{formatUSD(seResult.qbiDeduction)}</span></div>
            <div className="flex justify-between items-center py-2 border-b border-gray-100"><span className="text-gray-600">AGI</span><span className="font-semibold">{formatUSD(seResult.agi)}</span></div>
            <div className="flex justify-between items-center py-2 border-b border-gray-100"><span className="text-gray-600">Standard Deduction</span><span className="font-semibold text-blue-600">-{formatUSD(seResult.standardDeduction)}</span></div>
            <div className="flex justify-between items-center py-2 border-b border-gray-100"><span className="text-gray-600">Taxable Income</span><span className="font-semibold">{formatUSD(seResult.taxableIncome)}</span></div>
            <div className="flex justify-between items-center py-2 border-b border-gray-100"><span className="text-gray-600">Federal Income Tax</span><span className="font-semibold text-red-600">-{formatUSD(seResult.federalTax)}</span></div>
            <div className="flex justify-between items-center py-2 border-b border-gray-100"><span className="text-gray-600">MD State Tax</span><span className="font-semibold text-red-600">-{formatUSD(seResult.stateTax)}</span></div>
            <div className="flex justify-between items-center py-3 bg-blue-50 -mx-6 px-6 rounded-b-xl"><span className="font-bold text-blue-800 text-lg">Total Tax</span><span className="font-bold text-red-600 text-lg">{formatUSD(seResult.totalTax)}</span></div>
            <div className="flex justify-between items-center py-2"><span className="font-bold text-blue-800 text-lg">Net Income</span><span className="font-bold text-blue-800 text-lg">{formatUSD(seResult.netIncome)}</span></div>
          </div>
          <div className="text-sm text-gray-500 mb-6">Effective Tax Rate: <strong>{seResult.effectiveRate}%</strong></div>
          <div className="bg-yellow-50 rounded-xl p-4 border border-yellow-200 mb-6">
            <h3 className="font-bold text-yellow-800 mb-2">Estimated Quarterly Payments</h3>
            <p className="text-sm text-yellow-700 mb-3">Self-employed individuals must make estimated tax payments quarterly:</p>
            <div className="grid grid-cols-2 gap-2">
              {seResult.quarterlyDueDates.map((date, i) => (
                <div key={i} className="bg-white rounded-lg p-3 text-center">
                  <div className="text-xs text-gray-500">Q{i + 1}</div>
                  <div className="font-bold text-blue-800">{formatUSD(seResult.quarterlyPayment)}</div>
                  <div className="text-xs text-gray-400">{date}</div>
                </div>
              ))}
            </div>
          </div>
          <h3 className="font-bold text-gray-700 mb-3">Federal Tax Brackets</h3>
          <BracketTable details={seResult.federalBracketDetails} />
          <h3 className="font-bold text-gray-700 mb-3 mt-6">Maryland State Tax Brackets</h3>
          <BracketTable details={seResult.stateBracketDetails} />
        </div>
      )}

      {/* Comparison Results */}
      {compareResult && (
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6 border border-blue-100">
          <h2 className="text-xl font-bold text-blue-800 mb-4">W-2 vs 1099 Comparison</h2>
          <p className="text-sm text-gray-600 mb-4">Gross Income: <strong>{formatUSD(compareResult.grossIncome)}</strong></p>
          <div className="grid grid-cols-2 gap-3 mb-6">
            <div className="bg-blue-50 rounded-xl p-4 text-center"><div className="text-xs text-blue-600 mb-1">W-2 Net</div><div className="text-lg font-bold text-blue-900">{formatUSD(compareResult.w2NetIncome)}</div><div className="text-xs text-gray-400">{compareResult.w2EffectiveRate}% effective</div></div>
            <div className="bg-blue-50 rounded-xl p-4 text-center"><div className="text-xs text-blue-600 mb-1">1099 Net</div><div className="text-lg font-bold text-blue-900">{formatUSD(compareResult.se1099NetIncome)}</div><div className="text-xs text-gray-400">{compareResult.se1099EffectiveRate}% effective</div></div>
          </div>
          <div className={`rounded-xl p-4 mb-6 text-center ${compareResult.difference >= 0 ? "bg-blue-50 border border-blue-200" : "bg-red-50 border border-red-200"}`}>
            <div className="text-sm text-gray-600 mb-1">1099 earns {compareResult.difference >= 0 ? "more" : "less"}:</div>
            <div className={`text-2xl font-bold ${compareResult.difference >= 0 ? "text-blue-700" : "text-red-700"}`}>{compareResult.difference >= 0 ? "+" : ""}{formatUSD(Math.abs(compareResult.difference))}</div>
          </div>
          <div className="space-y-3 mb-6">
            <div className="flex justify-between items-center py-2 border-b border-gray-100"><span className="text-gray-600">SE Tax Penalty</span><span className="font-semibold text-red-600">+{formatUSD(compareResult.seTaxPenalty)}</span></div>
            <div className="flex justify-between items-center py-2 border-b border-gray-100"><span className="text-gray-600">QBI Deduction Benefit</span><span className="font-semibold text-blue-600">-{formatUSD(compareResult.qbiBenefit)}</span></div>
          </div>
          <div className="bg-blue-50 rounded-xl p-4 border border-blue-200 mb-6">
            <h3 className="font-bold text-blue-800 mb-2">Why the Difference?</h3>
            <p className="text-sm text-blue-700">{compareResult.explanation}</p>
          </div>
          <h3 className="font-bold text-gray-700 mb-3">Detailed Comparison</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead><tr className="text-left text-gray-500 border-b"><th className="pb-2">Item</th><th className="pb-2 text-right">W-2</th><th className="pb-2 text-right">1099</th></tr></thead>
              <tbody>
                <tr className="border-b border-gray-50"><td className="py-2 text-gray-600">Gross Income</td><td className="py-2 text-right font-semibold">{formatUSD(compareResult.w2.grossAnnual)}</td><td className="py-2 text-right font-semibold">{formatUSD(compareResult.se1099.grossIncome)}</td></tr>
                <tr className="border-b border-gray-50"><td className="py-2 text-gray-600">Federal Tax</td><td className="py-2 text-right text-red-600">-{formatUSD(compareResult.w2.federalTax)}</td><td className="py-2 text-right text-red-600">-{formatUSD(compareResult.se1099.federalTax)}</td></tr>
                <tr className="border-b border-gray-50"><td className="py-2 text-gray-600">FICA / SE Tax</td><td className="py-2 text-right text-red-600">-{formatUSD(compareResult.w2.totalFICA)}</td><td className="py-2 text-right text-red-600">-{formatUSD(compareResult.se1099.totalSETax)}</td></tr>
                <tr className="border-b border-gray-50"><td className="py-2 text-gray-600">State Tax</td><td className="py-2 text-right text-red-600">-{formatUSD(compareResult.w2.stateTax)}</td><td className="py-2 text-right text-red-600">-{formatUSD(compareResult.se1099.stateTax)}</td></tr>
                <tr className="border-t-2 border-gray-300 font-bold"><td className="py-3 text-blue-800">Net Income</td><td className="py-3 text-right text-blue-800">{formatUSD(compareResult.w2.netAnnual)}</td><td className="py-3 text-right text-blue-800">{formatUSD(compareResult.se1099.netIncome)}</td></tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Disclaimer */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 text-sm text-yellow-800 mb-6">
        ⚠️ For informational purposes only. Tax laws are complex and this calculator makes simplifying assumptions. Consult a tax professional for personalized advice. Maryland state tax includes Montgomery County local tax (3.2%).
      </div>
    </div>
  );
}

function BracketTable({ details }: { details: BracketDetail[] }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead><tr className="text-left text-gray-500 border-b"><th className="pb-2">Bracket</th><th className="pb-2 text-right">Taxable Amount</th><th className="pb-2 text-right">Rate</th><th className="pb-2 text-right">Tax</th></tr></thead>
        <tbody>
          {details.map((bd, i) => (
            <tr key={i} className={bd.tax > 0 ? "text-gray-800" : "text-gray-400"}>
              <td className="py-2">{formatBracketRange(bd)}</td>
              <td className="py-2 text-right">{bd.taxableAmount > 0 ? formatUSD(bd.taxableAmount) : "—"}</td>
              <td className="py-2 text-right">{formatPercent(bd.rate)}</td>
              <td className="py-2 text-right">{bd.tax > 0 ? formatUSD(bd.tax) : "—"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
