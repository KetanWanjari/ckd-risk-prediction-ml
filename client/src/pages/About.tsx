import { PageHeader } from "@/components/PageHeader";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2, Info } from "lucide-react";

export default function About() {
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <PageHeader 
          title="About The System" 
          subtitle="Understanding the technology and parameters behind our CKD prediction model."
          className="from-indigo-600 to-blue-500"
        />

        <div className="space-y-8">
          <section>
            <h2 className="text-2xl font-display font-bold text-slate-900 mb-4">Early Detection Matters</h2>
            <Card className="border-l-4 border-l-primary">
              <CardContent className="pt-6">
                <p className="text-lg text-slate-700 leading-relaxed mb-4">
                  Chronic Kidney Disease (CKD) is often called a "silent killer" because it can develop without noticeable symptoms until advanced stages. Early detection significantly improves treatment outcomes and can prevent progression to kidney failure.
                </p>
                <p className="text-lg text-slate-700 leading-relaxed">
                  This tool leverages machine learning algorithms trained on clinical datasets to identify patterns associated with CKD, providing a preliminary risk assessment based on standard medical parameters.
                </p>
              </CardContent>
            </Card>
          </section>

          <section>
            <h2 className="text-2xl font-display font-bold text-slate-900 mb-4">Key Parameters Explained</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <ParameterCard 
                title="Serum Creatinine" 
                description="A waste product that healthy kidneys filter out. Elevated levels often indicate impaired kidney function."
              />
              <ParameterCard 
                title="Blood Urea" 
                description="Nitrogen in the blood that comes from the waste product urea. High levels can suggest kidney problems."
              />
              <ParameterCard 
                title="Specific Gravity" 
                description="Measures the concentration of particles in urine. This reflects the kidney's ability to concentrate urine."
              />
              <ParameterCard 
                title="Albumin" 
                description="A protein that should remain in the blood. Its presence in urine (albuminuria) is a key sign of kidney damage."
              />
              <ParameterCard 
                title="Hemoglobin" 
                description="Low hemoglobin (anemia) is a common complication of CKD because kidneys produce the hormone that signals RBC production."
              />
              <ParameterCard 
                title="Hypertension & Diabetes" 
                description="High blood pressure and diabetes are the two leading causes of kidney failure worldwide."
              />
            </div>
          </section>

          <section className="bg-blue-50 rounded-2xl p-8 border border-blue-100">
            <div className="flex items-start gap-4">
              <Info className="h-6 w-6 text-primary shrink-0 mt-1" />
              <div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">Technical Note</h3>
                <p className="text-slate-700">
                  This application utilizes a trained classification model (Random Forest/XGBoost) integrated via a Python backend. The frontend communicates with the inference engine via REST API, ensuring secure and stateless predictions.
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

function ParameterCard({ title, description }: { title: string, description: string }) {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="pt-6">
        <div className="flex items-start gap-3">
          <CheckCircle2 className="h-5 w-5 text-secondary shrink-0 mt-0.5" />
          <div>
            <h3 className="font-bold text-slate-900 mb-1">{title}</h3>
            <p className="text-slate-600 text-sm">{description}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
