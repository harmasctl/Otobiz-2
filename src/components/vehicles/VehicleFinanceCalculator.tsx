import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface FinanceOption {
  type: "pcp" | "hp" | "lease";
  label: string;
  minDeposit: number;
  maxTerm: number;
  apr: number;
}

const financeOptions: FinanceOption[] = [
  { type: "pcp", label: "PCP Finance", minDeposit: 10, maxTerm: 48, apr: 6.9 },
  { type: "hp", label: "Hire Purchase", minDeposit: 10, maxTerm: 60, apr: 7.9 },
  {
    type: "lease",
    label: "Personal Lease",
    minDeposit: 15,
    maxTerm: 48,
    apr: 5.9,
  },
];

interface VehicleFinanceCalculatorProps {
  vehiclePrice: number;
}

export default function VehicleFinanceCalculator({
  vehiclePrice,
}: VehicleFinanceCalculatorProps) {
  const [selectedOption, setSelectedOption] = useState<FinanceOption>(
    financeOptions[0],
  );
  const [deposit, setDeposit] = useState(vehiclePrice * 0.1);
  const [term, setTerm] = useState(48);
  const [monthlyPayment, setMonthlyPayment] = useState(0);
  const [totalPayable, setTotalPayable] = useState(0);

  useEffect(() => {
    // Calculate monthly payment using the loan amortization formula
    const principal = vehiclePrice - deposit;
    const monthlyRate = selectedOption.apr / 100 / 12;
    const numberOfPayments = term;

    const monthlyPaymentCalc =
      (principal * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) /
      (Math.pow(1 + monthlyRate, numberOfPayments) - 1);

    const totalPayableCalc = monthlyPaymentCalc * numberOfPayments + deposit;

    setMonthlyPayment(Math.round(monthlyPaymentCalc));
    setTotalPayable(Math.round(totalPayableCalc));
  }, [vehiclePrice, deposit, term, selectedOption]);

  return (
    <div className="space-y-6">
      <Tabs defaultValue="pcp" className="space-y-6">
        <TabsList>
          {financeOptions.map((option) => (
            <TabsTrigger
              key={option.type}
              value={option.type}
              onClick={() => setSelectedOption(option)}
            >
              {option.label}
            </TabsTrigger>
          ))}
        </TabsList>

        {financeOptions.map((option) => (
          <TabsContent key={option.type} value={option.type}>
            <Card className="p-6">
              <div className="space-y-6">
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
                    min={vehiclePrice * (option.minDeposit / 100)}
                    max={vehiclePrice * 0.5}
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
                    min={24}
                    max={option.maxTerm}
                    step={12}
                    className="mb-2"
                  />
                  <div className="grid grid-cols-4 gap-2 mt-2">
                    {[24, 36, 48, 60].map((months) => (
                      <Button
                        key={months}
                        variant={term === months ? "default" : "outline"}
                        onClick={() => setTerm(months)}
                        disabled={months > option.maxTerm}
                      >
                        {months}m
                      </Button>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t space-y-4">
                  <div>
                    <div className="text-sm text-gray-600 mb-1">
                      Representative APR
                    </div>
                    <div className="text-lg font-semibold">{option.apr}%</div>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex justify-between items-baseline mb-4">
                      <span className="text-lg font-semibold">
                        Monthly Payment
                      </span>
                      <div>
                        <span className="text-3xl font-bold">
                          £{monthlyPayment}
                        </span>
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
                          £{(totalPayable - vehiclePrice).toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>
        ))}
      </Tabs>

      <div className="flex justify-end gap-4">
        <Button variant="outline">Download Quote</Button>
        <Button>Apply Now</Button>
      </div>
    </div>
  );
}
