import useCalculatorStore from "@/store/calculator.store";
import Button from "../button";
import { useEffect } from "react";

const CalculatorResult = () => {
  const { amountGotten, interest, monthlyPayable, totalPayable } = useCalculatorStore(
    (state) => state.data
  );
  const show = useCalculatorStore((state) => state.show);
  const close = useCalculatorStore((state) => state.close);

  useEffect(() => {
    if (show === true && window && typeof window.scrollTo === "function") {
      window.scrollTo(0, 0);
    }
  }, [show]);

  return (
    <div
      className={`${show ? "flex" : "hidden"} absolute top-0 left-0 w-full h-screen bg-[#1e1f2399] flex justify-center items-center`}
    >
      <ul className="w-full p-4 max-w-[500px] bg-[#fffdf0] rounded-lg space-y-4">
        <li>
          <h3 className="font-medium inline-block mr-1.5">Loan gotten:</h3>
          <span>{amountGotten.toFixed(2)}</span>
        </li>
        <li>
          <h3 className="font-medium inline-block mr-1.5">Loan interest:</h3>
          <span>{interest.toFixed(2)}</span>
        </li>
        <li>
          <h3 className="font-medium inline-block mr-1.5">Loan monthly payment:</h3>
          <span>{monthlyPayable.toFixed(2)}</span>
        </li>
        <li>
          <h3 className="font-medium inline-block mr-1.5">Loan total payment:</h3>
          <span>{totalPayable.toFixed(2)}</span>
        </li>
        <Button className="cursor-pointer" onClick={() => close()}>
          close
        </Button>
      </ul>
    </div>
  );
};

export default CalculatorResult;
