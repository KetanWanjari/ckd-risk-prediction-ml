import { usePredictions } from "@/hooks/use-predictions";
import { PageHeader } from "@/components/PageHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { Loader2, AlertCircle, FileText } from "lucide-react";
import { motion } from "framer-motion";

export default function History() {
  const { data: predictions, isLoading, error } = usePredictions();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4 text-muted-foreground">
          <Loader2 className="h-10 w-10 animate-spin text-primary" />
          <p>Loading records...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center p-8 bg-white rounded-xl shadow-lg">
          <AlertCircle className="h-12 w-12 text-destructive mx-auto mb-4" />
          <h2 className="text-xl font-bold mb-2">Failed to load history</h2>
          <p className="text-muted-foreground">Please try again later.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <PageHeader 
          title="Patient History" 
          subtitle="Comprehensive record of all past screenings and AI predictions."
          className="from-secondary to-primary"
        />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Card className="shadow-lg border-0 overflow-hidden">
            <CardHeader className="bg-white border-b px-6 py-4">
              <div className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-muted-foreground" />
                <CardTitle className="text-xl">Prediction Records</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              {predictions && predictions.length > 0 ? (
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader className="bg-slate-50/50">
                      <TableRow>
                        <TableHead className="w-[180px]">Date</TableHead>
                        <TableHead>Age</TableHead>
                        <TableHead>Blood Pressure</TableHead>
                        <TableHead>Hemoglobin</TableHead>
                        <TableHead>Serum Cr.</TableHead>
                        <TableHead>Sugar</TableHead>
                        <TableHead>Result</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {predictions.map((p) => {
                        const isHealthy = p.prediction.toLowerCase().includes("healthy");
                        return (
                          <TableRow key={p.id} className="hover:bg-slate-50/50 transition-colors">
                            <TableCell className="font-medium text-slate-700">
                              {p.createdAt ? format(new Date(p.createdAt), "MMM d, yyyy HH:mm") : "-"}
                            </TableCell>
                            <TableCell>{p.age}</TableCell>
                            <TableCell>{p.bloodPressure} mmHg</TableCell>
                            <TableCell>{p.hemoglobin} g/dL</TableCell>
                            <TableCell>{p.serumCreatinine} mg/dL</TableCell>
                            <TableCell>{p.sugar}</TableCell>
                            <TableCell>
                              <Badge 
                                variant={isHealthy ? "outline" : "destructive"}
                                className={isHealthy ? "bg-green-50 text-green-700 border-green-200" : "bg-red-50 text-red-700 border-red-200"}
                              >
                                {p.prediction}
                              </Badge>
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </div>
              ) : (
                <div className="text-center py-20 px-4 text-muted-foreground">
                  <div className="bg-slate-100 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <FileText className="h-8 w-8 text-slate-400" />
                  </div>
                  <h3 className="text-lg font-medium text-slate-900">No records found</h3>
                  <p className="max-w-xs mx-auto mt-2">Start a new assessment to see prediction results here.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
