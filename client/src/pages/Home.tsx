import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useCreatePrediction } from "@/hooks/use-predictions";
import { insertPredictionSchema, type InsertPrediction } from "@shared/schema";
import { PageHeader } from "@/components/PageHeader";
import { ResultDialog } from "@/components/ResultDialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { Activity, Droplet, Heart, TestTube, Loader2 } from "lucide-react";
import { motion } from "framer-motion";

// Extend schema for form validation with better messages
const formSchema = insertPredictionSchema.extend({
  age: z.coerce.number().min(1, "Age must be valid").max(120, "Age must be realistic"),
  bloodPressure: z.coerce.number().min(50).max(250),
  specificGravity: z.coerce.number(),
  albumin: z.coerce.number().min(0).max(5),
  sugar: z.coerce.number().min(0).max(5),
  bloodUrea: z.coerce.number().min(0),
  serumCreatinine: z.coerce.number().min(0),
  hemoglobin: z.coerce.number().min(0),
});

export default function Home() {
  const [resultDialogOpen, setResultDialogOpen] = useState(false);
  const [lastResult, setLastResult] = useState<any>(null);
  const { toast } = useToast();
  
  const createPrediction = useCreatePrediction();
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      age: undefined,
      bloodPressure: undefined,
      specificGravity: 1.020,
      albumin: 0,
      sugar: 0,
      bloodUrea: undefined,
      serumCreatinine: undefined,
      hemoglobin: undefined,
      hypertension: false,
      diabetesMellitus: false,
    },
  });

  async function onSubmit(data: z.infer<typeof formSchema>) {
    try {
      const result = await createPrediction.mutateAsync(data);
      setLastResult(result);
      setResultDialogOpen(true);
      form.reset(); // Optionally reset, or keep values for refinement
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error instanceof Error ? error.message : "Something went wrong",
      });
    }
  }

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        <PageHeader 
          title="CKD Risk Assessment" 
          subtitle="Advanced AI-powered screening tool for early detection of Chronic Kidney Disease based on key clinical parameters."
        />

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <motion.div 
              variants={container}
              initial="hidden"
              animate="show"
              className="grid gap-6 md:grid-cols-2"
            >
              
              {/* Vitals Section */}
              <motion.div variants={item} className="md:col-span-2 lg:col-span-1">
                <Card className="h-full border-t-4 border-t-primary shadow-lg shadow-slate-200/50">
                  <CardHeader>
                    <div className="flex items-center gap-2 mb-2">
                      <div className="p-2 bg-blue-100 rounded-lg text-primary">
                        <Activity className="h-5 w-5" />
                      </div>
                      <CardTitle>Vitals & Demographics</CardTitle>
                    </div>
                    <CardDescription>Basic patient information and vital signs</CardDescription>
                  </CardHeader>
                  <CardContent className="grid gap-4">
                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="age"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Age (years)</FormLabel>
                            <FormControl>
                              <Input type="number" placeholder="45" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="bloodPressure"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Blood Pressure (mmHg)</FormLabel>
                            <FormControl>
                              <Input type="number" placeholder="80" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="specificGravity"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Specific Gravity</FormLabel>
                          <Select 
                            onValueChange={(val) => field.onChange(parseFloat(val))} 
                            defaultValue={field.value?.toString()}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select specific gravity" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="1.005">1.005</SelectItem>
                              <SelectItem value="1.010">1.010</SelectItem>
                              <SelectItem value="1.015">1.015</SelectItem>
                              <SelectItem value="1.020">1.020</SelectItem>
                              <SelectItem value="1.025">1.025</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormDescription>Urine density compared to water</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </CardContent>
                </Card>
              </motion.div>

              {/* Urine Analysis Section */}
              <motion.div variants={item} className="md:col-span-2 lg:col-span-1">
                <Card className="h-full border-t-4 border-t-secondary shadow-lg shadow-slate-200/50">
                  <CardHeader>
                    <div className="flex items-center gap-2 mb-2">
                      <div className="p-2 bg-teal-100 rounded-lg text-secondary">
                        <Droplet className="h-5 w-5" />
                      </div>
                      <CardTitle>Urine Analysis</CardTitle>
                    </div>
                    <CardDescription>Indicators found in urine tests</CardDescription>
                  </CardHeader>
                  <CardContent className="grid gap-6">
                    <FormField
                      control={form.control}
                      name="albumin"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Albumin (0-5)</FormLabel>
                          <FormControl>
                            <div className="flex items-center gap-4">
                              <Input type="range" min={0} max={5} step={1} className="flex-1" {...field} onChange={e => field.onChange(Number(e.target.value))} />
                              <span className="font-mono font-bold w-8 text-center border rounded p-1">{field.value}</span>
                            </div>
                          </FormControl>
                          <FormDescription>Level of protein in urine</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="sugar"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Sugar (0-5)</FormLabel>
                          <FormControl>
                            <div className="flex items-center gap-4">
                              <Input type="range" min={0} max={5} step={1} className="flex-1" {...field} onChange={e => field.onChange(Number(e.target.value))} />
                              <span className="font-mono font-bold w-8 text-center border rounded p-1">{field.value}</span>
                            </div>
                          </FormControl>
                          <FormDescription>Level of glucose in urine</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </CardContent>
                </Card>
              </motion.div>

              {/* Blood Work Section */}
              <motion.div variants={item} className="md:col-span-2">
                <Card className="border-t-4 border-t-pink-500 shadow-lg shadow-slate-200/50">
                  <CardHeader>
                    <div className="flex items-center gap-2 mb-2">
                      <div className="p-2 bg-pink-100 rounded-lg text-pink-600">
                        <TestTube className="h-5 w-5" />
                      </div>
                      <CardTitle>Blood Work</CardTitle>
                    </div>
                    <CardDescription>Key renal function markers</CardDescription>
                  </CardHeader>
                  <CardContent className="grid md:grid-cols-3 gap-6">
                    <FormField
                      control={form.control}
                      name="bloodUrea"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Blood Urea (mg/dL)</FormLabel>
                          <FormControl>
                            <Input type="number" step="0.1" placeholder="36" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="serumCreatinine"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Serum Creatinine (mg/dL)</FormLabel>
                          <FormControl>
                            <Input type="number" step="0.1" placeholder="1.2" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="hemoglobin"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Hemoglobin (g/dL)</FormLabel>
                          <FormControl>
                            <Input type="number" step="0.1" placeholder="15.4" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </CardContent>
                </Card>
              </motion.div>

              {/* Clinical History Section */}
              <motion.div variants={item} className="md:col-span-2">
                <Card className="border-t-4 border-t-orange-500 shadow-lg shadow-slate-200/50">
                  <CardHeader>
                    <div className="flex items-center gap-2 mb-2">
                      <div className="p-2 bg-orange-100 rounded-lg text-orange-600">
                        <Heart className="h-5 w-5" />
                      </div>
                      <CardTitle>Clinical History</CardTitle>
                    </div>
                    <CardDescription>Pre-existing conditions</CardDescription>
                  </CardHeader>
                  <CardContent className="grid md:grid-cols-2 gap-8">
                    <FormField
                      control={form.control}
                      name="hypertension"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                          <div className="space-y-0.5">
                            <FormLabel className="text-base">Hypertension</FormLabel>
                            <FormDescription>
                              Diagnosed high blood pressure
                            </FormDescription>
                          </div>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="diabetesMellitus"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                          <div className="space-y-0.5">
                            <FormLabel className="text-base">Diabetes Mellitus</FormLabel>
                            <FormDescription>
                              Diagnosed diabetes
                            </FormDescription>
                          </div>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </CardContent>
                </Card>
              </motion.div>

            </motion.div>

            <motion.div 
              variants={item}
              initial="hidden"
              animate="show"
              className="flex justify-end pt-4"
            >
              <Button 
                type="submit" 
                size="lg" 
                className="w-full md:w-auto text-lg px-8 py-6 shadow-xl shadow-primary/20 hover:shadow-primary/30 transition-all hover:-translate-y-1"
                disabled={createPrediction.isPending}
              >
                {createPrediction.isPending ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Analyzing Data...
                  </>
                ) : (
                  "Generate Prediction"
                )}
              </Button>
            </motion.div>
          </form>
        </Form>
      </div>

      <ResultDialog 
        open={resultDialogOpen} 
        onOpenChange={setResultDialogOpen} 
        result={lastResult}
      />
    </div>
  );
}
