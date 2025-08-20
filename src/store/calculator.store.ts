import { create } from "zustand";

type CalculatorData = {
  amountGotten: number;
  interest: number;
  monthlyPayable: number;
  totalPayable: number;
};

type CalculatorState = {
  show: boolean;
  data: CalculatorData;
  setCalcDetails: (
    show: boolean,
    newData: {
      amountGotten: number;
      interest: number;
      monthlyPayable: number;
      totalPayable: number;
    }
  ) => void;
  close: () => void;
};

const useCalculatorStore = create<CalculatorState>((set) => ({
  show: false,
  data: { amountGotten: 0, interest: 0, monthlyPayable: 0, totalPayable: 0 },
  setCalcDetails: (show, newData) => set({ show, data: { ...newData } }),
  close: () => set({ show: false }),
}));

export default useCalculatorStore;
