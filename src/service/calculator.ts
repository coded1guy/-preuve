import { formatNumber } from "@/lib/utils";

const calculateLoan = ({
  type,
  amount,
  rate,
  duration,
  fees,
  vat,
}: {
  type: string;
  amount: number;
  rate: number;
  duration: number;
  fees: number;
  vat: number;
}) => {
  rate = rate / 100;
  const totalFees = fees + vat;
  const amountGotten = amount - totalFees;

  if (type === "amortized") {
    rate = rate / 12;
    const raisedRate = (1 + rate) ** duration;
    const monthlyPayable = amount * ((rate * raisedRate) / (raisedRate - 1));
    const totalPayable = monthlyPayable * duration;
    const totalLoanServiceFee = totalPayable - amountGotten + totalFees; // interest + fees + vat
    return {
      amountGotten: formatNumber(`${amountGotten.toFixed(2)}`).forward(),
      interest: formatNumber(`${(totalPayable - amount).toFixed(2)}`).forward(),
      totalFees: formatNumber(`${totalFees.toFixed(2)}`).forward(),
      monthlyPayable: formatNumber(`${monthlyPayable.toFixed(2)}`).forward(),
      totalPayable: formatNumber(`${totalPayable.toFixed(2)}`).forward(),
      apr: formatNumber(
        `${((totalLoanServiceFee / amount) * (12 / duration) * 100).toFixed(2)}`
      ).forward(),
    };
  } else {
    const interest = amount * (duration / 12) * rate;
    const totalPayable = amount + interest;
    const totalLoanServiceFee = totalPayable - amountGotten + totalFees; // interest + fees + vat
    return {
      amountGotten: formatNumber(`${amountGotten.toFixed(2)}`).forward(),
      interest: formatNumber(`${interest.toFixed(2)}`).forward(),
      totalFees: formatNumber(`${totalFees.toFixed(2)}`).forward(),
      monthlyPayable: formatNumber(`${(totalPayable / duration).toFixed(2)}`).forward(),
      totalPayable: formatNumber(`${totalPayable.toFixed(2)}`).forward(),
      apr: formatNumber(
        `${((totalLoanServiceFee / amount) * (12 / duration) * 100).toFixed(2)}`
      ).forward(),
    };
  }
};

export default calculateLoan;
