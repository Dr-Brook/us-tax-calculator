// US Income Tax Calculator - 2024 & 2025
// W-2 (Federal + FICA + Maryland/Montgomery) and 1099 (Self-Employment)

export type TaxYear = 2024 | 2025;
export type FilingStatus = "single" | "mfj";
export type PayFrequency = "annual" | "semi-monthly" | "bi-weekly" | "weekly";

interface FederalBracket {
  min: number;
  max: number | null;
  rate: number;
}

const FEDERAL_BRACKETS: Record<TaxYear, Record<FilingStatus, FederalBracket[]>> = {
  2024: {
    single: [
      { min: 0, max: 11600, rate: 0.10 },
      { min: 11600, max: 47150, rate: 0.12 },
      { min: 47150, max: 100525, rate: 0.22 },
      { min: 100525, max: 191950, rate: 0.24 },
      { min: 191950, max: 243725, rate: 0.32 },
      { min: 243725, max: 609350, rate: 0.35 },
      { min: 609350, max: null, rate: 0.37 },
    ],
    mfj: [
      { min: 0, max: 23200, rate: 0.10 },
      { min: 23200, max: 94300, rate: 0.12 },
      { min: 94300, max: 201050, rate: 0.22 },
      { min: 201050, max: 383900, rate: 0.24 },
      { min: 383900, max: 487450, rate: 0.32 },
      { min: 487450, max: 731200, rate: 0.35 },
      { min: 731200, max: null, rate: 0.37 },
    ],
  },
  2025: {
    single: [
      { min: 0, max: 11925, rate: 0.10 },
      { min: 11925, max: 48475, rate: 0.12 },
      { min: 48475, max: 103350, rate: 0.22 },
      { min: 103350, max: 197300, rate: 0.24 },
      { min: 197300, max: 250525, rate: 0.32 },
      { min: 250525, max: 626350, rate: 0.35 },
      { min: 626350, max: null, rate: 0.37 },
    ],
    mfj: [
      { min: 0, max: 23850, rate: 0.10 },
      { min: 23850, max: 96950, rate: 0.12 },
      { min: 96950, max: 206700, rate: 0.22 },
      { min: 206700, max: 394600, rate: 0.24 },
      { min: 394600, max: 501050, rate: 0.32 },
      { min: 501050, max: 751600, rate: 0.35 },
      { min: 751600, max: null, rate: 0.37 },
    ],
  },
};

const STANDARD_DEDUCTION: Record<TaxYear, Record<FilingStatus, number>> = {
  2024: { single: 14600, mfj: 29200 },
  2025: { single: 15000, mfj: 30000 },
};

const SOCIAL_SECURITY_CAP: Record<TaxYear, number> = { 2024: 168600, 2025: 176100 };
const SS_RATE = 0.062;
const MEDICARE_RATE = 0.0145;
const ADDITIONAL_MEDICARE_THRESHOLD = 200000;
const ADDITIONAL_MEDICARE_RATE = 0.009;

const MARYLAND_BRACKETS: FederalBracket[] = [
  { min: 0, max: 1000, rate: 0.02 },
  { min: 1000, max: 2000, rate: 0.03 },
  { min: 2000, max: 3000, rate: 0.04 },
  { min: 3000, max: 100000, rate: 0.0475 },
  { min: 100000, max: 125000, rate: 0.05 },
  { min: 125000, max: 150000, rate: 0.0525 },
  { min: 150000, max: 250000, rate: 0.055 },
  { min: 250000, max: null, rate: 0.0575 },
];

const MARYLAND_BRACKETS_MFJ: FederalBracket[] = [
  { min: 0, max: 1000, rate: 0.02 },
  { min: 1000, max: 2000, rate: 0.03 },
  { min: 2000, max: 3000, rate: 0.04 },
  { min: 3000, max: 150000, rate: 0.0475 },
  { min: 150000, max: 175000, rate: 0.05 },
  { min: 175000, max: 225000, rate: 0.0525 },
  { min: 225000, max: 300000, rate: 0.055 },
  { min: 300000, max: null, rate: 0.0575 },
];

const MONTGOMERY_LOCAL_RATE = 0.032;
const MD_STANDARD_DEDUCTION: Record<FilingStatus, number> = { single: 2600, mfj: 5200 };

function calculateBracketTax(income: number, brackets: FederalBracket[]): { details: BracketDetail[]; totalTax: number } {
  let remaining = income;
  const details: BracketDetail[] = [];
  let totalTax = 0;
  for (const bracket of brackets) {
    if (remaining <= 0) {
      details.push({ min: bracket.min, max: bracket.max, rate: bracket.rate, taxableAmount: 0, tax: 0 });
      continue;
    }
    const bracketWidth = bracket.max ? bracket.max - bracket.min : Infinity;
    const taxableInBracket = Math.min(remaining, bracketWidth);
    const taxForBracket = taxableInBracket * bracket.rate;
    details.push({ min: bracket.min, max: bracket.max, rate: bracket.rate, taxableAmount: taxableInBracket, tax: taxForBracket });
    totalTax += taxForBracket;
    remaining -= taxableInBracket;
  }
  return { details, totalTax };
}

export interface BracketDetail {
  min: number;
  max: number | null;
  rate: number;
  taxableAmount: number;
  tax: number;
}

export interface W2Result {
  grossAnnual: number;
  payFrequency: PayFrequency;
  grossPerPeriod: number;
  standardDeduction: number;
  taxableIncome: number;
  federalTax: number;
  federalBracketDetails: BracketDetail[];
  socialSecurityTax: number;
  medicareTax: number;
  additionalMedicareTax: number;
  totalFICA: number;
  stateTax: number;
  localTax: number;
  totalStateLocal: number;
  totalDeductions: number;
  netAnnual: number;
  netPerPeriod: number;
  effectiveRate: number;
  marginalRate: number;
}

export function calculateW2(
  grossAnnual: number,
  year: TaxYear,
  filingStatus: FilingStatus,
  payFrequency: PayFrequency
): W2Result {
  const stdDeduction = STANDARD_DEDUCTION[year][filingStatus];
  const taxableIncome = Math.max(0, grossAnnual - stdDeduction);
  const federalBrackets = FEDERAL_BRACKETS[year][filingStatus];
  const { details: federalBracketDetails, totalTax: federalTax } = calculateBracketTax(taxableIncome, federalBrackets);

  const ssCap = SOCIAL_SECURITY_CAP[year];
  const socialSecurityTax = Math.min(grossAnnual, ssCap) * SS_RATE;
  const medicareTax = grossAnnual * MEDICARE_RATE;
  const additionalMedicareTax = Math.max(0, grossAnnual - ADDITIONAL_MEDICARE_THRESHOLD) * ADDITIONAL_MEDICARE_RATE;
  const totalFICA = socialSecurityTax + medicareTax + additionalMedicareTax;

  const mdDeduction = MD_STANDARD_DEDUCTION[filingStatus];
  const mdTaxableIncome = Math.max(0, grossAnnual - mdDeduction);
  const mdBrackets = filingStatus === "mfj" ? MARYLAND_BRACKETS_MFJ : MARYLAND_BRACKETS;
  const { totalTax: mdStateTax } = calculateBracketTax(mdTaxableIncome, mdBrackets);
  const localTax = mdTaxableIncome * MONTGOMERY_LOCAL_RATE;

  const totalStateLocal = mdStateTax + localTax;
  const totalDeductions = federalTax + totalFICA + totalStateLocal;
  const netAnnual = grossAnnual - totalDeductions;

  const periodsPerYear: Record<PayFrequency, number> = { annual: 1, "semi-monthly": 24, "bi-weekly": 26, weekly: 52 };
  const periods = periodsPerYear[payFrequency];
  const marginalRate = federalBrackets.find(b => taxableIncome > b.min && (b.max === null || taxableIncome <= b.max))?.rate ?? 0.37;

  return {
    grossAnnual,
    payFrequency,
    grossPerPeriod: grossAnnual / periods,
    standardDeduction: stdDeduction,
    taxableIncome,
    federalTax,
    federalBracketDetails,
    socialSecurityTax,
    medicareTax,
    additionalMedicareTax,
    totalFICA,
    stateTax: mdStateTax,
    localTax,
    totalStateLocal,
    totalDeductions,
    netAnnual,
    netPerPeriod: netAnnual / periods,
    effectiveRate: grossAnnual > 0 ? Math.round((totalDeductions / grossAnnual) * 10000) / 100 : 0,
    marginalRate: Math.round(marginalRate * 100),
  };
}

export interface SelfEmployedResult {
  gross1099: number;
  businessExpenses: number;
  netSEIncome: number;
  seTaxableBase: number;
  socialSecurityTax: number;
  medicareTax: number;
  additionalMedicareTax: number;
  totalSETax: number;
  deductibleHalfSETax: number;
  adjustedGrossIncome: number;
  standardDeduction: number;
  taxableIncome: number;
  qbiDeduction: number;
  federalTax: number;
  totalTax: number;
  netIncome: number;
  effectiveRate: number;
  quarterlyPayments: { amount: number; dueDate: string }[];
  federalBracketDetails: BracketDetail[];
}

export function calculate1099(
  gross1099: number,
  businessExpenses: number,
  year: TaxYear,
  filingStatus: FilingStatus
): SelfEmployedResult {
  const netSEIncome = gross1099 - businessExpenses;
  const seTaxableBase = netSEIncome * 0.9235;

  const ssCap = SOCIAL_SECURITY_CAP[year];
  const ssPortion = Math.min(seTaxableBase, ssCap) * 0.124;
  const medicarePortion = seTaxableBase * 0.029;
  const additionalMedicare = Math.max(0, seTaxableBase - ADDITIONAL_MEDICARE_THRESHOLD) * ADDITIONAL_MEDICARE_RATE;
  const totalSETax = ssPortion + medicarePortion + additionalMedicare;
  const deductibleHalfSETax = totalSETax / 2;

  const stdDeduction = STANDARD_DEDUCTION[year][filingStatus];
  const adjustedGrossIncome = netSEIncome - deductibleHalfSETax;

  const tentativeQBI = netSEIncome * 0.20;
  const qbiCap = Math.max(0, adjustedGrossIncome - stdDeduction) * 0.20;
  const qbiDeduction = Math.min(tentativeQBI, qbiCap);

  const taxableIncome = Math.max(0, adjustedGrossIncome - stdDeduction - qbiDeduction);
  const federalBrackets = FEDERAL_BRACKETS[year][filingStatus];
  const { details: federalBracketDetails, totalTax: federalTax } = calculateBracketTax(taxableIncome, federalBrackets);

  const totalTax = federalTax + totalSETax;
  const netIncome = gross1099 - businessExpenses - totalTax;

  const quarterlyAmount = Math.round((totalTax / 4) * 100) / 100;
  const quarterlyPayments = [
    { amount: quarterlyAmount, dueDate: "April 15" },
    { amount: quarterlyAmount, dueDate: "June 15" },
    { amount: quarterlyAmount, dueDate: "September 15" },
    { amount: quarterlyAmount, dueDate: "January 15" },
  ];

  return {
    gross1099,
    businessExpenses,
    netSEIncome,
    seTaxableBase,
    socialSecurityTax: ssPortion,
    medicareTax: medicarePortion,
    additionalMedicareTax: additionalMedicare,
    totalSETax,
    deductibleHalfSETax,
    adjustedGrossIncome,
    standardDeduction: stdDeduction,
    taxableIncome,
    qbiDeduction,
    federalTax,
    totalTax,
    netIncome,
    effectiveRate: (gross1099 - businessExpenses) > 0 ? Math.round((totalTax / (gross1099 - businessExpenses)) * 10000) / 100 : 0,
    quarterlyPayments,
    federalBracketDetails,
  };
}

export function formatUSD(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

export function formatPercent(rate: number): string {
  return `${rate.toFixed(2)}%`;
}

export function getBracketLabel(bracket: { min: number; max: number | null }): string {
  const fmtMin = bracket.min.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });
  if (bracket.max === null) return `Over ${fmtMin}`;
  const fmtMax = bracket.max.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });
  return `${fmtMin} \u2013 ${fmtMax}`;
}