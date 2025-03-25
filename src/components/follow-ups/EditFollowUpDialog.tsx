import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { FollowUpForm } from "./FollowUpForm";

interface EditFollowUpDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  followUpData: any;
}

export const EditFollowUpDialog = ({ open, onOpenChange, followUpData }: EditFollowUpDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Follow-up</DialogTitle>
        </DialogHeader>
        <ScrollArea className="h-[calc(80vh-8rem)] px-1">
          <FollowUpForm 
            onSuccess={() => onOpenChange(false)} 
            initialData={followUpData}
            isEditing={true}
          />
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};