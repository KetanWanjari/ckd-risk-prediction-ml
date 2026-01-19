import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { AlertCircle, CheckCircle, ArrowRight } from "lucide-react";
import { Prediction } from "@shared/schema";
import { motion } from "framer-motion";

interface ResultDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  result: Prediction | null;
}

export function ResultDialog({ open, onOpenChange, result }: ResultDialogProps) {
  if (!result) return null;

  const isHealthy = result.prediction.toLowerCase().includes("healthy");

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md border-t-8 border-t-primary overflow-hidden">
        <DialogHeader className="pt-6 text-center">
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="flex justify-center mb-4"
          >
            <div className={`rounded-full p-4 ${isHealthy ? 'bg-green-100' : 'bg-red-100'}`}>
              {isHealthy ? (
                <CheckCircle className="h-12 w-12 text-green-600" />
              ) : (
                <AlertCircle className="h-12 w-12 text-red-600" />
              )}
            </div>
          </motion.div>
          <DialogTitle className="text-2xl font-display text-center">
            Assessment Complete
          </DialogTitle>
          <DialogDescription className="text-center pt-2 text-base">
            Based on the clinical parameters provided, the AI model has generated the following prediction:
          </DialogDescription>
        </DialogHeader>

        <div className="my-6 p-6 bg-slate-50 rounded-xl border border-slate-100">
          <div className="text-center">
            <p className="text-sm text-muted-foreground uppercase tracking-wider font-semibold mb-1">Result</p>
            <h3 className={`text-3xl font-bold ${isHealthy ? 'text-green-700' : 'text-red-700'}`}>
              {result.prediction}
            </h3>
            {result.confidence && (
              <div className="mt-4 flex items-center justify-center gap-2">
                <div className="h-2 w-24 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className={`h-full ${isHealthy ? 'bg-green-500' : 'bg-red-500'}`} 
                    style={{ width: `${Number(result.confidence) * 100}%` }} 
                  />
                </div>
                <span className="text-xs text-muted-foreground font-medium">
                  {(Number(result.confidence) * 100).toFixed(1)}% Confidence
                </span>
              </div>
            )}
          </div>
        </div>

        <div className="bg-amber-50 border border-amber-100 rounded-lg p-4 text-sm text-amber-800 flex items-start gap-3">
          <AlertCircle className="h-5 w-5 shrink-0 text-amber-600 mt-0.5" />
          <p>
            <strong>Medical Disclaimer:</strong> This tool uses artificial intelligence and is for screening purposes only. 
            It is not a substitute for professional medical diagnosis. Please consult a nephrologist for clinical evaluation.
          </p>
        </div>

        <DialogFooter className="mt-6 sm:justify-center">
          <Button onClick={() => onOpenChange(false)} className="w-full sm:w-auto" size="lg">
            Start New Assessment <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
