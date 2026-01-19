import { pgTable, text, serial, integer, numeric, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// === TABLE DEFINITIONS ===
export const predictions = pgTable("predictions", {
  id: serial("id").primaryKey(),
  // Patient Vitals
  age: integer("age").notNull(),
  bloodPressure: integer("blood_pressure").notNull(), // bp (mm/Hg)
  specificGravity: numeric("specific_gravity").notNull(), // sg (1.005, 1.010, etc)
  albumin: integer("albumin").notNull(), // al (0-5)
  sugar: integer("sugar").notNull(), // su (0-5)
  
  // Blood Tests
  bloodUrea: numeric("blood_urea").notNull(), // bu
  serumCreatinine: numeric("serum_creatinine").notNull(), // sc
  hemoglobin: numeric("hemoglobin").notNull(), // hemo
  
  // Clinical History
  hypertension: boolean("hypertension").notNull(), // htn
  diabetesMellitus: boolean("diabetes_mellitus").notNull(), // dm
  
  // Result
  prediction: text("prediction").notNull(), // "Chronic Kidney Disease" or "Healthy"
  confidence: numeric("confidence"), // simple score
  
  createdAt: timestamp("created_at").defaultNow(),
});

// === SCHEMAS ===
export const insertPredictionSchema = createInsertSchema(predictions).omit({ 
  id: true, 
  createdAt: true,
  prediction: true,
  confidence: true 
});

// === TYPES ===
export type Prediction = typeof predictions.$inferSelect;
export type InsertPrediction = z.infer<typeof insertPredictionSchema>;
export type CreatePredictionRequest = InsertPrediction;
