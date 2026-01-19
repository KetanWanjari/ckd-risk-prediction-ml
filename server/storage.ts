import { db } from "./db";
import { predictions, type Prediction, type CreatePredictionRequest } from "@shared/schema";
import { desc } from "drizzle-orm";

export interface IStorage {
  createPrediction(prediction: CreatePredictionRequest & { prediction: string, confidence: string }): Promise<Prediction>;
  getPredictions(): Promise<Prediction[]>;
}

export class DatabaseStorage implements IStorage {
  async createPrediction(data: CreatePredictionRequest & { prediction: string, confidence: string }): Promise<Prediction> {
    const [prediction] = await db
      .insert(predictions)
      .values({
        ...data,
        specificGravity: data.specificGravity.toString(),
        bloodUrea: data.bloodUrea.toString(),
        serumCreatinine: data.serumCreatinine.toString(),
        hemoglobin: data.hemoglobin.toString(),
        confidence: data.confidence,
      })
      .returning();
    return prediction;
  }

  async getPredictions(): Promise<Prediction[]> {
    return await db.select().from(predictions).orderBy(desc(predictions.createdAt));
  }
}

export const storage = new DatabaseStorage();
