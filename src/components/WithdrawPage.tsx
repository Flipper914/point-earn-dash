import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface WithdrawPageProps {
  onSubmit: (method: string, accountNumber: string, amount: number) => Promise<void>;
  userPoints: number;
}

export const WithdrawPage = ({ onSubmit, userPoints }: WithdrawPageProps) => {
  const [method, setMethod] = useState("Ton");
  const [accountNumber, setAccountNumber] = useState("");
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const amountNum = parseInt(amount, 10);
    
    if (isNaN(amountNum) || amountNum <= 0) {
      alert("Please enter a valid amount.");
      return;
    }
    
    if (amountNum < 1) {
      alert("Minimum withdrawal is 1 point.");
      return;
    }
    
    if (amountNum > userPoints) {
      alert("You don't have enough points.");
      return;
    }

    setLoading(true);
    try {
      await onSubmit(method, accountNumber, amountNum);
      setAccountNumber("");
      setAmount("");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-foreground mb-2">Withdraw Points</h2>
        <p className="text-muted-foreground">Minimum 1 point required to withdraw.</p>
      </div>
      
      <form onSubmit={handleSubmit} className="bg-card border border-border rounded-xl p-6 space-y-5">
        <div className="space-y-2">
          <Label htmlFor="method" className="text-base font-semibold">Method</Label>
          <Select value={method} onValueChange={setMethod}>
            <SelectTrigger id="method" className="h-12">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Ton">Ton</SelectItem>
              <SelectItem value="Usdt">Usdt</SelectItem>
              <SelectItem value="Telegram_Star">⭐️ Telegram Star</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="account" className="text-base font-semibold">Account Number/ID</Label>
          <Input
            id="account"
            type="text"
            value={accountNumber}
            onChange={(e) => setAccountNumber(e.target.value)}
            placeholder="⭐️➡ TG Username / Deposit Address"
            required
            className="h-12"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="amount" className="text-base font-semibold">Points to Withdraw</Label>
          <Input
            id="amount"
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="e.g., 02"
            required
            min="1"
            className="h-12"
          />
        </div>

        <Button 
          type="submit"
          disabled={loading}
          className="w-full h-12"
          size="lg"
        >
          {loading ? (
            <>
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
              Processing...
            </>
          ) : "Submit Request"}
        </Button>
      </form>
    </div>
  );
};
