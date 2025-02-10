import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";

export default function Calculator() {
  const [carPrice, setCarPrice] = useState(20000);
  const [deposit, setDeposit] = useState(2000);
  const [term, setTerm] = useState(36);
  const [interestRate] = useState(6.9);

  const [monthlyPayment, setMonthlyPayment] = useState(0);
  const [totalPayable, setTotalPayable] = useState(0);

  useEffect(() => {
    // Calculate monthly payment using the loan amortization formula
    const principal = carPrice - deposit;
    const monthlyRate = interestRate / 100 / 12;
    const numberOfPayments = term;

    const monthlyPaymentCalc =
      (principal * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) /
      (Math.pow(1 + monthlyRate, numberOfPayments) - 1);

    const totalPayableCalc = monthlyPaymentCalc * numberOfPayments + deposit;

    setMonthlyPayment(Math.round(monthlyPaymentCalc));
    setTotalPayable(Math.round(totalPayableCalc));
  }, [carPrice, deposit, term, interestRate]);

  return (
    <div className="p-6 rounded-lg border bg-white">
      <h2 className="text-xl font-semibold mb-6">Finance Calculator</h2>
      <div className="space-y-6">
        <div>
          <div className="flex justify-between mb-2">
            <Label>Car Price</Label>
            <span className="text-sm text-gray-600">
              £{carPrice.toLocaleString()}
            </span>
          </div>
          <Slider
            value={[carPrice]}
            onValueChange={(value) => setCarPrice(value[0])}
            max={100000}
            step={1000}
            className="mb-2"
          />
          <Input
            type="number"
            value={carPrice}
            onChange={(e) => setCarPrice(Number(e.target.value))}
            className="mt-2"
          />
        </div>

        <div>
          <div className="flex justify-between mb-2">
            <Label>Deposit</Label>
            <span className="text-sm text-gray-600">
              £{deposit.toLocaleString()}
            </span>
          </div>
          <Slider
            value={[deposit]}
            onValueChange={(value) => setDeposit(value[0])}
            max={Math.min(carPrice * 0.5, 20000)} // Max deposit is 50% or £20,000
            step={100}
            className="mb-2"
          />
          <Input
            type="number"
            value={deposit}
            onChange={(e) => setDeposit(Number(e.target.value))}
            className="mt-2"
          />
        </div>

        <div>
          <div className="flex justify-between mb-2">
            <Label>Term (months)</Label>
            <span className="text-sm text-gray-600">{term} months</span>
          </div>
          <Slider
            value={[term]}
            onValueChange={(value) => setTerm(value[0])}
            min={12}
            max={60}
            step={12}
            className="mb-2"
          />
          <div className="grid grid-cols-5 gap-2 mt-2 text-sm">
            {[12, 24, 36, 48, 60].map((months) => (
              <button
                key={months}
                onClick={() => setTerm(months)}
                className={`p-2 rounded-md text-center ${term === months ? "bg-primary text-white" : "bg-gray-100 hover:bg-gray-200"}`}
              >
                {months}m
              </button>
            ))}
          </div>
        </div>

        <div className="pt-4 border-t space-y-4">
          <div>
            <div className="text-sm text-gray-600 mb-1">
              Interest Rate (APR)
            </div>
            <div className="text-lg font-semibold">{interestRate}%</div>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex justify-between items-baseline mb-4">
              <span className="text-lg font-semibold">Monthly Payment</span>
              <div>
                <span className="text-3xl font-bold">£{monthlyPayment}</span>
              </div>
            </div>

            <div className="space-y-2 text-sm text-gray-600">
              <div className="flex justify-between">
                <span>Total amount payable</span>
                <span className="font-medium">
                  £{totalPayable.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Total cost of credit</span>
                <span className="font-medium">
                  £{(totalPayable - carPrice).toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
