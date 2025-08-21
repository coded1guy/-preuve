import Button from "@/components/ui/button";
import SelectField from "@/components/ui/input/select-field";
import TextInput from "@/components/ui/input/text-field";
import { loanTypeOptions } from "@/constants/options";
import { formatNumber } from "@/lib/utils";
import calculateLoan from "@/service/calculator";
import useCalculatorStore from "@/store/calculator.store";
import { useEffect, useState } from "react";

const LoanCalculatorForm = () => {
  const [formData, setFormData] = useState<{
    amount: string;
    rate: string;
    duration: string;
    type: string;
    fees: string;
    vat: string;
  }>({
    amount: "",
    rate: "",
    duration: "",
    type: "",
    fees: "",
    vat: "",
  });
  const [canCalc, setCanCalc] = useState(false);
  const calculate = useCalculatorStore((state) => state.setCalcDetails);

  useEffect(() => {
    const { amount, rate, duration, type, fees, vat } = formData;

    if (
      amount &&
      rate &&
      duration &&
      type &&
      fees &&
      vat &&
      [amount, rate, duration, fees, vat].every((v) => v !== "0")
    ) {
      setCanCalc(true);
    } else {
      setCanCalc(false);
    }
  }, [formData]);

  return (
    <form className="space-y-3 pb-12 w-full max-w-[500px]">
      <TextInput
        id="amount"
        min=""
        label="Amount (Naira):"
        type="text"
        value={formData.amount}
        onChange={(e) => {
          setFormData((data) => ({
            ...data,
            amount: formatNumber(e.target.value).forward(),
          }));

          if (formData.fees) {
            const { forward, backward } = formatNumber(
              formatNumber(formData.fees).limitBy(e.target.value)
            );
            const numberValue = backward() ?? 0;
            setFormData((data) => ({
              ...data,
              fees: forward(),
              vat: formatNumber(`${0.075 * numberValue}`).forward(),
            }));
          }
        }}
        onBlur={(e) => {
          const lastInput = formatNumber(e.target.value).dropIrrelevantZeros();

          if (typeof lastInput === "string") {
            setFormData((data) => ({
              ...data,
              amount: lastInput,
            }));
          }
        }}
      />

      <TextInput
        id="rate"
        min=""
        label="Rate (percent):"
        value={formData.rate}
        type="text"
        onChange={(e) => {
          setFormData((data) => ({
            ...data,
            rate: formatNumber(e.target.value).forward(),
          }));
        }}
        onBlur={(e) => {
          const lastInput = formatNumber(e.target.value).dropIrrelevantZeros();

          if (typeof lastInput === "string") {
            setFormData((data) => ({
              ...data,
              rate: lastInput,
            }));
          }
        }}
      />

      <TextInput
        id="duration"
        min=""
        label="Duration (months):"
        value={formData.duration}
        type="text"
        onChange={(e) => {
          setFormData((data) => ({
            ...data,
            duration: formatNumber(e.target.value).forward(),
          }));
        }}
        onBlur={(e) => {
          const lastInput = formatNumber(e.target.value).dropIrrelevantZeros();

          if (typeof lastInput === "string") {
            setFormData((data) => ({
              ...data,
              duration: lastInput,
            }));
          }
        }}
      />

      <SelectField
        label="Type"
        options={loanTypeOptions}
        onChange={(value) => {
          setFormData((data) => ({ ...data, type: value }));
        }}
      />

      <TextInput
        id="fees"
        min=""
        label="Fees and Commission (naira):"
        value={formData.fees}
        type="text"
        onChange={(e) => {
          const { forward, backward } = formatNumber(
            formatNumber(e.target.value).limitBy(formData.amount)
          );
          const numberValue = backward() ?? 0;
          setFormData((data) => ({
            ...data,
            fees: forward(),
            vat: formatNumber(`${0.075 * numberValue}`).forward(),
          }));
        }}
        onBlur={(e) => {
          const lastInput = formatNumber(e.target.value).dropIrrelevantZeros();

          if (typeof lastInput === "string") {
            setFormData((data) => ({
              ...data,
              fees: lastInput,
            }));
          }
        }}
      />

      <TextInput
        id="vat"
        label="VAT (7.5%):"
        value={formData.vat}
        type="text"
        readOnly
        aria-readonly
      />

      <Button
        type="button"
        onClick={() => {
          const result = calculateLoan({
            type: formData.type,
            amount: formatNumber(formData.amount).backward(),
            rate: formatNumber(formData.rate).backward(),
            duration: formatNumber(formData.duration).backward(),
            fees: formatNumber(formData.fees).backward(),
            vat: formatNumber(formData.vat).backward(),
          });
          calculate(canCalc, result);
        }}
        disabled={!canCalc}
        className={`bg-[#dda15e] hover:bg-[#bc6c25] w-full h-12 text-lg cursor-pointer rounded-xl text-[#283618] disabled:opacity-50 disabled:cursor-not-allowed transition ease-in-out duration-300`}
      >
        Calculate Loan
      </Button>
    </form>
  );
};

export default LoanCalculatorForm;
