import useCalculatorStore from "@/store/calculator.store";
import Button from "../button";
import { useEffect } from "react";
import { X } from "lucide-react";

const CalculatorResult = () => {
  const { amountGotten, interest, monthlyPayable, totalPayable, apr } = useCalculatorStore(
    (state) => state.data
  );
  const show = useCalculatorStore((state) => state.show);
  const close = useCalculatorStore((state) => state.close);

  useEffect(() => {
    if (show === true && document && window && typeof window.scrollTo === "function") {
      window.scrollTo(0, 0);
      document.documentElement.classList.add("overflow-hidden");
    } else {
      document.documentElement.classList.remove("overflow-hidden");
    }
  }, [show]);

  return (
    <div
      className={`${show ? "flex" : "hidden"} absolute top-0 left-0 w-full h-screen bg-[#1e1f2399] flex justify-center items-center text-[#283618]`}
    >
      <div className="relative w-full p-7 mx-3 max-w-[800px] bg-[#fffdf0] rounded-lg space-y-4">
        <div>
          <h2 className="font-bold text-2xl lg:text-3xl text-center">Result</h2>
          <Button className="w-9 h-9 absolute top-5 right-4 rounded-full" onClick={() => close()}>
            <X className="w-5 h-5 text-[#fffdf0]" />
          </Button>
        </div>
        <div className="flex flex-col md:justify-between md:flex-row gap-y-5 p-3">
          <dl className="md:basis-[45%] space-y-3">
            <dt>
              <h3 className="font-bold text-xl lg:text-2xl text-center">Breakdown:</h3>
            </dt>
            <dd className="text-center">
              <h4 className="font-medium inline-block mr-1.5">Net received (naira):</h4>
              <span>{amountGotten}</span>
            </dd>
            <dd className="text-center">
              <h4 className="font-medium inline-block mr-1.5">Interest (naira):</h4>
              <span>{interest}</span>
            </dd>
            <dd className="text-center font-bold">
              <h4 className="inline-block mr-1.5">Total payable (naira):</h4>
              <span>{totalPayable}</span>
            </dd>
          </dl>

          <hr className="inline-block md:rotate-90 w-4/5 md:w-[120px] h-px bg-[#dda15e] mx-auto my-5 md:my-auto md:p-0 md:mx-0" />

          <dl className="md:basis-[45%] space-y-3">
            <dt>
              <h3 className="font-bold text-xl lg:text-2xl text-center">Extras:</h3>
            </dt>
            <dd className="text-center">
              <h4 className="font-medium inline-block mr-1.5">Loan APR:</h4>
              <span>{apr}</span>%
            </dd>
            <dd className="text-center">
              <h4 className="font-medium inline-block mr-1.5">Monthly payable (naira):</h4>
              <span>{monthlyPayable}</span>
            </dd>
          </dl>
        </div>
      </div>
    </div>
  );
};

export default CalculatorResult;
