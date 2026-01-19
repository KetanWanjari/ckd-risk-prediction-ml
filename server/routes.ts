import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  
  // Prediction Logic (Mock ML Model)
  // Based on common medical indicators for CKD
  function predictCKD(data: any): { result: string, confidence: number } {
    let riskScore = 0;
    
    // 1. Serum Creatinine (> 1.2 is concerning)
    if (data.serumCreatinine > 1.2) riskScore += 3;
    
    // 2. Albumin (Presence is bad)
    if (data.albumin > 0) riskScore += 2;
    if (data.albumin > 2) riskScore += 1;
    
    // 3. Hemoglobin (< 13 is anemic/risk)
    if (data.hemoglobin < 13) riskScore += 2;
    
    // 4. Diabetes
    if (data.diabetesMellitus) riskScore += 2;
    
    // 5. Hypertension
    if (data.hypertension) riskScore += 1;
    
    // 6. Specific Gravity (< 1.015 is lower end)
    if (Number(data.specificGravity) < 1.015) riskScore += 1;

    // Threshold
    if (riskScore >= 4) {
      return { result: "Chronic Kidney Disease", confidence: Math.min(0.6 + (riskScore * 0.05), 0.99) };
    } else {
      return { result: "Healthy", confidence: Math.min(0.7 + ((4 - riskScore) * 0.05), 0.99) };
    }
  }

  app.post(api.predictions.create.path, async (req, res) => {
    try {
      // Coerce numeric types that might come as strings from form
      const bodySchema = api.predictions.create.input.extend({
        specificGravity: z.coerce.number(),
        bloodUrea: z.coerce.number(),
        serumCreatinine: z.coerce.number(),
        hemoglobin: z.coerce.number(),
      });

      const input = bodySchema.parse(req.body);
      
      const { result, confidence } = predictCKD(input);
      
      const prediction = await storage.createPrediction({
        ...input,
        prediction: result,
        confidence: confidence.toFixed(2)
      });
      
      res.status(201).json(prediction);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          message: err.errors[0].message,
          field: err.errors[0].path.join('.'),
        });
      }
      throw err;
    }
  });

  app.get(api.predictions.list.path, async (req, res) => {
    const predictions = await storage.getPredictions();
    res.json(predictions);
  });

  return httpServer;
}
