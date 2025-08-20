const calculateLoan = ({
  type,
  amount,
  fees,
  vat,
  rate,
  duration,
}: {
  type: string;
  amount: number;
  fees: number;
  vat: number;
  rate: number;
  duration: number;
}) => {
  rate = rate / 100;
  const amountGotten = amount - fees - vat;

  if (type === "amortized") {
    rate = rate / 12;
    const raisedRate = (1 + rate) ** duration;
    const monthlyPayable = amount * ((rate * raisedRate) / (raisedRate - 1));
    const totalPayable = monthlyPayable * duration;
    return {
      amountGotten,
      interest: totalPayable - amount,
      monthlyPayable,
      totalPayable,
    };
  } else {
    const interest = amount * (duration / 12) * rate;
    return {
      amountGotten,
      interest,
      monthlyPayable: (amount + interest) / duration,
      totalPayable: amount + interest,
    };
  }
};

export default calculateLoan;
