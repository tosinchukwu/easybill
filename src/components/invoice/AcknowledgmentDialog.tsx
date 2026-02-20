import { ShieldCheck, Clock, Trash2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface Props {
  open: boolean;
  onAccept: () => void;
}

const AcknowledgmentDialog = ({ open, onAccept }: Props) => (
  <Dialog open={open}>
    <DialogContent className="sm:max-w-md" onInteractOutside={(e) => e.preventDefault()}>
      <DialogHeader className="text-center sm:text-center">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
          <ShieldCheck className="h-8 w-8 text-primary" />
        </div>
        <DialogTitle className="text-xl">Your Privacy Comes First</DialogTitle>
        <DialogDescription className="text-base">
          All invoices created here are automatically deleted after 24 hours. No exceptions.
        </DialogDescription>
      </DialogHeader>

      <div className="my-4 space-y-3">
        <div className="flex items-start gap-3 rounded-lg border bg-secondary/50 p-3">
          <Clock className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
          <div>
            <p className="font-medium text-sm">24-Hour Self-Destruct</p>
            <p className="text-muted-foreground text-sm">
              Every invoice and its data are permanently erased after 24 hours.
            </p>
          </div>
        </div>
        <div className="flex items-start gap-3 rounded-lg border bg-secondary/50 p-3">
          <Trash2 className="mt-0.5 h-5 w-5 shrink-0 text-destructive" />
          <div>
            <p className="font-medium text-sm">No Recovery</p>
            <p className="text-muted-foreground text-sm">
              Once expired, invoices cannot be recovered. Download your PDF before it's gone.
            </p>
          </div>
        </div>
      </div>

      <Button onClick={onAccept} className="w-full" size="lg">
        I Understand — Let's Begin
      </Button>
    </DialogContent>
  </Dialog>
);

export default AcknowledgmentDialog;
