import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { NewPurchaseForm } from "../NewPurchaseForm";
import { Purchase } from "@/types/purchases";

interface EditPurchaseDialogProps {
  purchase: Purchase;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
}

export const EditPurchaseDialog = ({ purchase, open, onOpenChange, onSuccess }: EditPurchaseDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>Edit Purchase</DialogTitle>
        </DialogHeader>
        <div className="p-4">
          <NewPurchaseForm 
            onSuccess={onSuccess} 
            initialData={purchase}
            mode="edit"
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};