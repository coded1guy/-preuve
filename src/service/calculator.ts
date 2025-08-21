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
      amountGotten: formatNumber(`${amountGotten}`).forward(),
      interest: formatNumber(`${totalPayable - amount}`).forward(),
      totalFees,
      monthlyPayable: formatNumber(`${monthlyPayable}`).forward(),
      totalPayable: formatNumber(`${totalPayable}`).forward(),
      apr: formatNumber(`${(totalLoanServiceFee / amount) * (12 / duration) * 100}`).forward(),
    };
  } else {
    const interest = amount * (duration / 12) * rate;
    const totalPayable = amount + interest;
    const totalLoanServiceFee = totalPayable - amountGotten + totalFees; // interest + fees + vat
    return {
      amountGotten: formatNumber(`${amountGotten}`).forward(),
      interest: formatNumber(`${interest}`).forward(),
      totalFees,
      monthlyPayable: formatNumber(`${totalPayable / duration}`).forward(),
      totalPayable: formatNumber(`${totalPayable}`).forward(),
      apr: formatNumber(`${(totalLoanServiceFee / amount) * (12 / duration) * 100}`).forward(),
    };
  }
};

export default calculateLoan;
