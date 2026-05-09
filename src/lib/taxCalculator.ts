// US Income Tax Calculator - W-2 + 1099
// Federal brackets 2024/2025, Maryland state tax, FICA, SE tax, QBI

export type FilingStatus = "single" | "mfj";
export type TaxYear = 2024 | 2025 | 2026;
export type PayFrequency = "annual" | "monthly" | "bi-weekly" | "weekly";

export interface BracketDetail {
  min: number;
  max: number | null;
  rate: number;
  taxableAmount: number;
  tax: number;
}

interface TaxBracket {
  min: number;
  max: number | null;
  rate: number;
}

// Federal 2024 - Single
const FEDERAL_2024_SINGLE: TaxBracket[] = [
  { min: 0, max: 11600, rate: 0.10 },
  { min: 11600, max: 47150, rate: 0.12 },
  { min: 47150, max: 100525, rate: 0.22 },
  { min: 100525, max: 191950, rate: 0.24 },
  { min: 191950, max: 243725, rate: 0.32 },
  { min: 243725, max: 609350, rate: 0.35 },
  { min: 609350, max: null, rate: 0.37 },
];

// Federal 2024 - MFJ
const FEDERAL_2024_MFJ: TaxBracket[] = [
  { min: 0, max: 23200, rate: 0.10 },
  { min: 23200, max: 94300, rate: 0.12 },
  { min: 94300, max: 201050, rate: 0.22 },
  { min: 201050, max: 383900, rate: 0.24 },
  { min: 383900, max: 487450, rate: 0.32 },
  { min: 487450, max: 731200, rate: 0.35 },
  { min: 731200, max: null, rate: 0.37 },
];

// Federal 2025 - Single
const FEDERAL_2025_SINGLE: TaxBracket[] = [
  { min: 0, max: 11925, rate: 0.10 },
  { min: 11925, max: 48475, rate: 0.12 },
  { min: 48475, max: 103350, rate: 0.22 },
  { min: 103350, max: 197300, rate: 0.24 },
  { min: 197300, max: 250525, rate: 0.32 },
  { min: 250525, max: 626350, rate: 0.35 },
  { min: 626350, max: null, rate: 0.37 },
];

// Federal 2025 - MFJ
const FEDERAL_2025_MFJ: TaxBracket[] = [
  { min: 0, max: 23850, rate: 0.10 },
  { min: 23850, max: 96950, rate: 0.12 },
  { min: 96950, max: 206700, rate: 0.22 },
  { min: 206700, max: 394600, rate: 0.24 },
  { min: 394600, max: 501050, rate: 0.32 },
  { min: 501050, max: 751600, rate: 0.35 },
  { min: 751600, max: null, rate: 0.37 },
];

// Federal 2026 - Single (projected, based on IRS inflation adjustments)
const FEDERAL_2026_SINGLE: TaxBracket[] = [
  { min: 0, max: 12200, rate: 0.10 },
  { min: 12200, max: 49550, rate: 0.12 },
  { min: 49550, max: 105650, rate: 0.22 },
  { min: 105650, max: 201350, rate: 0.24 },
  { min: 201350, max: 256050, rate: 0.32 },
  { min: 256050, max: 640000, rate: 0.35 },
  { min: 640000, max: null, rate: 0.37 },
];

// Federal 2026 - MFJ (projected)
const FEDERAL_2026_MFJ: TaxBracket[] = [
  { min: 0, max: 24400, rate: 0.10 },
  { min: 24400, max: 99100, rate: 0.12 },
  { min: 99100, max: 211300, rate: 0.22 },
  { min: 211300, max: 402700, rate: 0.24 },
  { min: 402700, max: 512100, rate: 0.32 },
  { min: 512100, max: 768000, rate: 0.35 },
  { min: 768000, max: null, rate: 0.37 },
];

// Standard Deductions
const STANDARD_DEDUCTION: Record<TaxYear, Record<FilingStatus, number>> = {
  2024: { single: 14600, mfj: 29200 },
  2025: { single: 15000, mfj: 30000 },
  2026: { single: 15350, mfj: 30700 },
};

// Social Security Wage Cap
const SS_WAGE_CAP: Record<TaxYear, number> = {
  2024: 168600,
  2025: 176100,
  2026: 177000,
};

// FICA Rates
const SS_RATE = 0.062;
const MEDICARE_RATE = 0.0145;
const ADDITIONAL_MEDICARE_RATE = 0.009;
const ADDITIONAL_MEDICARE_THRESHOLD = 200000;

// Maryland State Tax - 2024 Single
const MD_2024_SINGLE: TaxBracket[] = [
  { min: 0, max: 1000, rate: 0.02 },
  { min: 1000, max: 2000, rate: 0.03 },
  { min: 2000, max: 3000, rate: 0.04 },
  { min: 3000, max: 100000, rate: 0.0475 },
  { min: 100000, max: 125000, rate: 0.05 },
  { min: 125000, max: 150000, rate: 0.0525 },
  { min: 150000, max: 250000, rate: 0.055 },
  { min: 250000, max: null, rate: 0.0575 },
];

// Maryland State Tax - 2024 MFJ
const MD_2024_MFJ: TaxBracket[] = [
  { min: 0, max: 1000, rate: 0.02 },
  { min: 1000, max: 2000, rate: 0.03 },
  { min: 2000, max: 3000, rate: 0.04 },
  { min: 3000, max: 150000, rate: 0.0475 },
  { min: 150000, max: 175000, rate: 0.05 },
  { min: 175000, max: 225000, rate: 0.0525 },
  { min: 225000, max: 300000, rate: 0.055 },
  { min: 300000, max: null, rate: 0.0575 },
];

// 2025 Maryland brackets same as 2024 for now
const MD_2025_SINGLE = MD_2024_SINGLE;
const MD_2025_MFJ = MD_2024_MFJ;

// 2026 Maryland brackets (projected, same structure)
const MD_2026_SINGLE: TaxBracket[] = [
  { min: 0, max: 1000, rate: 0.02 },
  { min: 1000, max: 2000, rate: 0.03 },
  { min: 2000, max: 3000, rate: 0.04 },
  { min: 3000, max: 100000, rate: 0.0475 },
  { min: 100000, max: 125000, rate: 0.05 },
  { min: 125000, max: 150000, rate: 0.0525 },
  { min: 150000, max: 250000, rate: 0.055 },
  { min: 250000, max: null, rate: 0.0575 },
];
const MD_2026_MFJ: TaxBracket[] = [
  { min: 0, max: 1000, rate: 0.02 },
  { min: 1000, max: 2000, rate: 0.03 },
  { min: 2000, max: 3000, rate: 0.04 },
  { min: 3000, max: 150000, rate: 0.0475 },
  { min: 150000, max: 175000, rate: 0.05 },
  { min: 175000, max: 225000, rate: 0.0525 },
  { min: 225000, max: 300000, rate: 0.055 },
  { min: 300000, max: null, rate: 0.0575 },
];

// Montgomery County local tax
const MO_CO_LOCAL_RATE = 0.032;
// Maryland standard deduction (simplified)
const MD_STD_DEDUCTION = 2550;

// Helpers
function getFederalBrackets(year: TaxYear, status: FilingStatus): TaxBracket[] {
  if (year === 2024) return status === "single" ? FEDERAL_2024_SINGLE : FEDERAL_2024_MFJ;
  if (year === 2025) return status === "single" ? FEDERAL_2025_SINGLE : FEDERAL_2025_MFJ;
  return status === "single" ? FEDERAL_2026_SINGLE : FEDERAL_2026_MFJ;
}

function getMarylandBrackets(year: TaxYear, status: FilingStatus): TaxBracket[] {
  if (year === 2024) return status === "single" ? MD_2024_SINGLE : MD_2024_MFJ;
  if (year === 2025) return status === "single" ? MD_2025_SINGLE : MD_2025_MFJ;
  return status === "single" ? MD_2026_SINGLE : MD_2026_MFJ;
}

function calcBrackets(income: number, brackets: TaxBracket[]): { tax: number; details: BracketDetail[] } {
  let remaining = income;
  let totalTax = 0;
  const details: BracketDetail[] = [];
  for (const b of brackets) {
    if (remaining <= 0) {
      details.push({ min: b.min, max: b.max, rate: b.rate, taxableAmount: 0, tax: 0 });
      continue;
    }
    const width = b.max ? b.max - b.min : Infinity;
    const taxable = Math.min(remaining, width);
    const tax = taxable * b.rate;
    details.push({ min: b.min, max: b.max, rate: b.rate, taxableAmount: taxable, tax });
    totalTax += tax;
    remaining -= taxable;
  }
  return { tax: totalTax, details };
}

// ===== W-2 Result Interface and Function =====

export interface W2Result {
  grossAnnual: number;
  payFrequency: PayFrequency;
  grossPerPeriod: number;
  federalTax: number;
  standardDeduction: number;
  taxableIncome: number;
  federalBracketDetails: BracketDetail[];
  socialSecurityTax: number;
  medicareTax: number;
  additionalMedicareTax: number;
  totalFICA: number;
  stateTax: number;
  localTax: number;
  stateBracketDetails: BracketDetail[];
  totalDeductions: number;
  netAnnual: number;
  grossPerPeriod: number;
  netPerPeriod: number;
  netMonthly: number;
  effectiveRate: number;
}

export function calculateW2(
  grossAnnual: number,
  payFrequency: PayFrequency,
  year: TaxYear,
  filingStatus: FilingStatus
): W2Result {
  const periodsPerYear: Record<PayFrequency, number> = {
    annual: 1,
    monthly: 12,
    "bi-weekly": 26,
    weekly: 52,
  };
  const periods = periodsPerYear[payFrequency];
  const grossPerPeriod = grossAnnual / periods;

  const standardDeduction = STANDARD_DEDUCTION[year][filingStatus];
  const taxableIncome = Math.max(0, grossAnnual - standardDeduction);

  const fed = calcBrackets(taxableIncome, getFederalBrackets(year, filingStatus));

  const ssCap = SS_WAGE_CAP[year];
  const socialSecurityTax = Math.min(grossAnnual, ssCap) * SS_RATE;
  const medicareTax = grossAnnual * MEDICARE_RATE;
  const additionalMedicareTax = Math.max(0, grossAnnual - ADDITIONAL_MEDICARE_THRESHOLD) * ADDITIONAL_MEDICARE_RATE;
  const totalFICA = socialSecurityTax + medicareTax + additionalMedicareTax;

  const mdTaxable = Math.max(0, grossAnnual - MD_STD_DEDUCTION);
  const md = calcBrackets(mdTaxable, getMarylandBrackets(year, filingStatus));
  const localTax = mdTaxable * MO_CO_LOCAL_RATE;
  const stateTax = md.tax + localTax;

  const totalDeductions = fed.tax + totalFICA + stateTax;
  const netAnnual = grossAnnual - totalDeductions;
  const effectiveRate = grossAnnual > 0 ? Math.round((totalDeductions / grossAnnual) * 10000) / 100 : 0;

  const netMonthly = netAnnual / 12;

  return {
    grossAnnual,
    payFrequency,
    grossPerPeriod,
    federalTax: fed.tax,
    standardDeduction,
    taxableIncome,
    federalBracketDetails: fed.details,
    socialSecurityTax,
    medicareTax,
    additionalMedicareTax,
    totalFICA,
    stateTax,
    localTax,
    stateBracketDetails: md.details,
    totalDeductions,
    netAnnual,
    netPerPeriod: netAnnual / periods,
    netMonthly,
    effectiveRate,
  };
}

// ===== 1099 Result Interface and Function =====

export interface SE1099Result {
  grossIncome: number;
  businessExpenses: number;
  netSEIncome: number;
  seTaxableIncome: number;
  socialSecuritySE: number;
  medicareSE: number;
  totalSETax: number;
  deductibleHalfSE: number;
  qbiDeduction: number;
  agi: number;
  standardDeduction: number;
  taxableIncome: number;
  federalTax: number;
  federalBracketDetails: BracketDetail[];
  stateTax: number;
  localTax: number;
  stateBracketDetails: BracketDetail[];
  totalTax: number;
  netIncome: number;
  netMonthly: number;
  effectiveRate: number;
  quarterlyPayment: number;
  quarterlyDueDates: string[];
}

export function calculate1099(
  grossIncome: number,
  businessExpenses: number,
  year: TaxYear,
  filingStatus: FilingStatus
): SE1099Result {
  const netSEIncome = grossIncome - businessExpenses;

  const seTaxableIncome = netSEIncome * 0.9235;
  const ssCap = SS_WAGE_CAP[year];
  const socialSecuritySE = Math.min(seTaxableIncome, ssCap) * 0.124;
  const medicareSE = seTaxableIncome * 0.029;
  const totalSETax = socialSecuritySE + medicareSE;
  const deductibleHalfSE = totalSETax / 2;

  const qbiDeduction = Math.min(netSEIncome * 0.20, (netSEIncome - deductibleHalfSE) * 0.20);

  const agi = netSEIncome - deductibleHalfSE;

  const standardDeduction = STANDARD_DEDUCTION[year][filingStatus];
  const taxableIncome = Math.max(0, agi - standardDeduction - qbiDeduction);

  const fed = calcBrackets(taxableIncome, getFederalBrackets(year, filingStatus));

  const mdTaxable = Math.max(0, agi - MD_STD_DEDUCTION);
  const md = calcBrackets(mdTaxable, getMarylandBrackets(year, filingStatus));
  const localTax = mdTaxable * MO_CO_LOCAL_RATE;
  const stateTax = md.tax + localTax;

  const totalTax = totalSETax + fed.tax + stateTax;
  const netIncome = grossIncome - businessExpenses - totalTax;
  const effectiveRate = grossIncome > 0 ? Math.round((totalTax / grossIncome) * 10000) / 100 : 0;

  const netMonthly = netIncome / 12;

  const quarterlyDueDates = year === 2024
    ? ["April 15, 2024", "June 17, 2024", "September 16, 2024", "January 15, 2025"]
    : year === 2025
    ? ["April 15, 2025", "June 16, 2025", "September 15, 2025", "January 15, 2026"]
    : ["April 15, 2026", "June 15, 2026", "September 15, 2026", "January 15, 2027"];

  return {
    grossIncome,
    businessExpenses,
    netSEIncome,
    seTaxableIncome,
    socialSecuritySE,
    medicareSE,
    totalSETax,
    deductibleHalfSE,
    qbiDeduction,
    agi,
    standardDeduction,
    taxableIncome,
    federalTax: fed.tax,
    federalBracketDetails: fed.details,
    stateTax,
    localTax,
    stateBracketDetails: md.details,
    totalTax,
    netIncome,
    netMonthly,
    effectiveRate,
    quarterlyPayment: Math.round(totalTax / 4 * 100) / 100,
    quarterlyDueDates,
  };
}

// ===== Comparison =====

export interface ComparisonResult {
  grossIncome: number;
  w2: W2Result;
  se1099: SE1099Result;
  w2NetIncome: number;
  se1099NetIncome: number;
  difference: number;
  w2EffectiveRate: number;
  se1099EffectiveRate: number;
  seTaxPenalty: number;
  qbiBenefit: number;
  explanation: string;
}

export function calculateComparison(
  grossIncome: number,
  year: TaxYear,
  filingStatus: FilingStatus
): ComparisonResult {
  const w2 = calculateW2(grossIncome, "annual", year, filingStatus);
  const se1099 = calculate1099(grossIncome, 0, year, filingStatus);

  const difference = se1099.netIncome - w2.netAnnual;
  const seTaxPenalty = se1099.totalSETax - (w2.socialSecurityTax + w2.medicareTax + w2.additionalMedicareTax);
  const qbiBenefit = se1099.qbiDeduction;

  let explanation = "";
  if (difference < 0) {
    explanation = `As a 1099 earner, you take home $${Math.abs(difference).toLocaleString("en-US", { minimumFractionDigits: 0, maximumFractionDigits: 0 })} less than a W-2 earner at the same gross income. Self-employment tax (15.3%) is higher than FICA (7.65%) because you pay both portions. However, you can deduct half of SE tax and qualify for the QBI deduction of $${qbiBenefit.toLocaleString("en-US", { minimumFractionDigits: 0, maximumFractionDigits: 0 })}.`;
  } else {
    explanation = `As a 1099 earner, you take home $${difference.toLocaleString("en-US", { minimumFractionDigits: 0, maximumFractionDigits: 0 })} more than a W-2 earner, mainly due to business expense deductions and the QBI deduction.`;
  }

  return {
    grossIncome,
    w2,
    se1099,
    w2NetIncome: w2.netAnnual,
    se1099NetIncome: se1099.netIncome,
    difference,
    w2EffectiveRate: w2.effectiveRate,
    se1099EffectiveRate: se1099.effectiveRate,
    seTaxPenalty,
    qbiBenefit,
    explanation,
  };
}

// ===== Formatting =====

export function formatUSD(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

export function formatPercent(rate: number): string {
  return `${(rate * 100).toFixed(rate >= 0.1 ? 1 : 0)}%`;
}

export function formatBracketRange(bracket: BracketDetail): string {
  const fmt = (n: number) => n.toLocaleString("en-US");
  return bracket.max
    ? `$${fmt(bracket.min)} – $${fmt(bracket.max)}`
    : `Over $${fmt(bracket.min)}`;
}