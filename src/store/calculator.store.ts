import { create } from "zustand";

type CalculatorData = {
  amountGotten: string;
  interest: string;
  totalFees: string;
  monthlyPayable: string;
  totalPayable: string;
  apr: string;
};

type CalculatorState = {
  show: boolean;
  data: CalculatorData;
  setCalcDetails: (
    show: boolean,
    newData: {
      amountGotten: string;
      interest: string;
      totalFees: string;
      monthlyPayable: string;
      totalPayable: string;
      apr: string;
    }
  ) => void;
  close: () => void;
};

const useCalculatorStore = create<CalculatorState>((set) => ({
  show: false,
  data: {
    amountGotten: "",
    interest: "",
    totalFees: "",
    monthlyPayable: "",
    totalPayable: "",
    apr: "",
  },
  setCalcDetails: (show, newData) => set({ show, data: { ...newData } }),
  close: () => set({ show: false }),
}));

export default useCalculatorStore;
