export function calculateLoanPayment(principal: number, annualRate: number, tenorMonths: number) {
  const monthlyRate = annualRate / 100 / 12;
  if (tenorMonths <= 0) return 0;
  if (monthlyRate === 0) return principal / tenorMonths;
  return (principal * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -tenorMonths));
}

export function buildAmortizationSchedule(principal: number, annualRate: number, tenorMonths: number) {
  const monthlyPayment = calculateLoanPayment(principal, annualRate, tenorMonths);
  const monthlyRate = annualRate / 100 / 12;
  let remainingBalance = principal;

  return Array.from({ length: tenorMonths }, (_, index) => {
    const interest = remainingBalance * monthlyRate;
    const principalPaid = monthlyPayment - interest;
    remainingBalance = Math.max(0, remainingBalance - principalPaid);
    return {
      month: index + 1,
      payment: monthlyPayment,
      interest,
      principalPaid,
      remainingBalance,
    };
  });
}
