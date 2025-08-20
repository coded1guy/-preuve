import LoanCalculatorForm from "./components/form/calculator";
import useCalculatorStore from "@/store/calculator.store";
import CalculatorResult from "./components/ui/result";

function App() {
  const show = useCalculatorStore((state) => state.show);

  return (
    <main
      className={`relative w-full h-full bg-[#fffdf0] pt-8 pb-12 px-7 font-montserrat ${show ? "overflow-hidden" : null}`}
    >
      <h1 className="font-bold text-3xl lg:text-5xl text-center py-2 mx-auto text-[#283618]">
        Loan Calculator
      </h1>
      <div className="flex justify-center pt-8 space-x-4">
        <LoanCalculatorForm />
      </div>
      <CalculatorResult />
    </main>
  );
}

export default App;
