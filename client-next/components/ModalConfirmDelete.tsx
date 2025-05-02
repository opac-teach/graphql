import { useState } from "react";
import {
  Dialog,
  DialogFooter,
  DialogHeader,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Trash2 } from "lucide-react";
import { Button } from "./ui/button";

interface ModalConfirmDeleteProps {
  onDelete: () => void;
  title: string;
}

export default function ModalConfirmDelete({
  onDelete,
  title,
}: ModalConfirmDeleteProps) {
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="destructive">
          <Trash2 />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Are you sure you want to delete this {title} ?
          </DialogTitle>
        </DialogHeader>
        <DialogDescription>This action cannot be undone.</DialogDescription>
        <DialogFooter>
          <Button variant="ghost" onClick={() => setOpen(false)}>
            Back
          </Button>
          <Button variant="destructive" onClick={onDelete}>
            Confirm
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
