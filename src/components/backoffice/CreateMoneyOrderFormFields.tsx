import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";

interface CreateMoneyOrderFormFieldsProps {
  onSubmit: (data: { reason: string; amount: number }) => void;
  isSubmitting: boolean;
}

export const CreateMoneyOrderFormFields = ({
  onSubmit,
  isSubmitting,
}: CreateMoneyOrderFormFieldsProps) => {
  const [reason, setReason] = useState("");
  const [amount, setAmount] = useState("");
  const [errors, setErrors] = useState<{ reason?: string; amount?: string }>({});

  const validateForm = () => {
    const newErrors: { reason?: string; amount?: string } = {};
    let isValid = true;

    if (!reason.trim()) {
      newErrors.reason = "Reason is required";
      isValid = false;
    }

    const amountNumber = parseFloat(amount);
    if (!amount || isNaN(amountNumber)) {
      newErrors.amount = "Please enter a valid amount";
      isValid = false;
    } else if (amountNumber <= 0) {
      newErrors.amount = "Amount must be greater than 0";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit({
        reason,
        amount: parseFloat(amount),
      });
      setReason("");
      setAmount("");
      setErrors({});
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="reason">Reason</Label>
        <Input
          id="reason"
          value={reason}
          onChange={(e) => {
            setReason(e.target.value);
            setErrors((prev) => ({ ...prev, reason: undefined }));
          }}
          placeholder="Enter reason for money order"
          className={errors.reason ? "border-red-500" : ""}
        />
        {errors.reason && (
          <p className="text-sm text-red-500 mt-1">{errors.reason}</p>
        )}
      </div>
      <div>
        <Label htmlFor="amount">Amount</Label>
        <Input
          id="amount"
          type="number"
          value={amount}
          onChange={(e) => {
            setAmount(e.target.value);
            setErrors((prev) => ({ ...prev, amount: undefined }));
          }}
          placeholder="Enter amount"
          min="0"
          step="0.01"
          className={errors.amount ? "border-red-500" : ""}
        />
        {errors.amount && (
          <p className="text-sm text-red-500 mt-1">{errors.amount}</p>
        )}
      </div>
      <Button type="submit" disabled={isSubmitting} className="w-full">
        {isSubmitting ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Creating...
          </>
        ) : (
          "Create Money Order"
        )}
      </Button>
    </form>
  );
};