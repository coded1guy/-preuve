import Button from "@/components/ui/button";
import SelectField from "@/components/ui/input/select-field";
import TextInput from "@/components/ui/input/text-field";
import { loanTypeOptions } from "@/constants/options";
import calculateLoan from "@/service/calculator";
import useCalculatorStore from "@/store/calculator.store";
import { useEffect, useState } from "react";

const LoanCalculatorForm = () => {
  const [formData, setFormData] = useState<{
    amount: number;
    rate: number;
    duration: number;
    type: string;
    fees: number;
    vat: number;
  }>({
    amount: 0,
    rate: 0,
    duration: 0,
    type: "",
    fees: 0,
    vat: 0,
  });
  const [canCalc, setCanCalc] = useState(false);
  const calculate = useCalculatorStore((state) => state.setCalcDetails);

  useEffect(() => {
    const { amount, rate, duration, type, fees, vat } = formData;

    if (amount && rate && duration && type && fees && vat) {
      setCanCalc(true);
    } else {
      setCanCalc(false);
    }
  }, [formData]);

  return (
    <form className="space-y-3 pb-12 w-full max-w-[500px]">
      <TextInput
        id="amount"
        min="0"
        label="Amount (Naira):"
        type="number"
        onChange={(e) => {
          setFormData((data) => ({ ...data, amount: Number(e.target.value) }));
        }}
      />

      <TextInput
        id="rate"
        min="0"
        label="Rate (percent):"
        type="number"
        onChange={(e) => {
          setFormData((data) => ({ ...data, rate: Number(e.target.value) }));
        }}
      />

      <TextInput
        id="duration"
        min="0"
        label="duration (months):"
        type="number"
        onChange={(e) => {
          setFormData((data) => ({ ...data, duration: Number(e.target.value) }));
        }}
      />
      {/* <div>
          <label>duration:</label>
          <select>
            <option></option>
            <option value="days">days</option>
            <option value="months">months</option>
            <option value="years">years</option>
          </select>
          <input type="number" />
        </div> */}

      {/* <div>
          <label>Start date:</label>
          <input type="date" />
        </div> */}

      {/* <div>
          <label>type:</label>
          <select>
            <option></option>
            <option title="A loan where interest is calculated on the full original principal for the entire duration, regardless of repayments made.">flat Loan</option>
            <option title="A loan repaid in equal installments where each payment covers both principal and interest, with interest calculated on the reducing balance." >amortized or declining balance loan</option>
          </select>
        </div> */}

      <SelectField
        label="type"
        options={loanTypeOptions}
        onChange={(value) => {
          setFormData((data) => ({ ...data, type: value }));
        }}
      />

      <TextInput
        id="fees"
        min="0"
        label="fees and commission (naira):"
        type="number"
        onChange={(e) => {
          setFormData((data) => ({
            ...data,
            fees: Number(e.target.value),
            vat: 0.075 * Number(e.target.value),
          }));
        }}
      />

      <TextInput
        id="vat"
        label="VAT (7.5%):"
        value={formData.vat}
        type="number"
        readOnly
        aria-readonly
      />

      <Button
        type="button"
        onClick={() => {
          const result = calculateLoan(formData);
          calculate(canCalc, result);
        }}
        disabled={!canCalc}
        className={`bg-[#dda15e] hover:bg-[#bc6c25] w-full h-12 text-lg cursor-pointer rounded-xl text-[#283618] disabled:opacity-50 disabled:cursor-not-allowed transition ease-in-out duration-300`}
      >
        Calculate loan
      </Button>
    </form>
  );
};

export default LoanCalculatorForm;
