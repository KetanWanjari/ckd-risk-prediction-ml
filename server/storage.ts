// In-memory storage implementation
// SQL/Drizzle removed to allow MongoDB or DB-less execution

import type { Prediction, CreatePredictionRequest } from "@shared/schema";

export interface IStorage {
  createPrediction(
    prediction: CreatePredictionRequest & {
      prediction: string;
      confidence: string;
    }
  ): Promise<Prediction>;

  getPredictions(): Promise<Prediction[]>;
}

const predictionsStore: Prediction[] = [];

export class MemoryStorage implements IStorage {
  async createPrediction(
    data: CreatePredictionRequest & {
      prediction: string;
      confidence: string;
    }
  ): Promise<Prediction> {
    const record: Prediction = {
      id: predictionsStore.length + 1,
      ...data,
      specificGravity: data.specificGravity.toString(),
      bloodUrea: data.bloodUrea.toString(),
      serumCreatinine: data.serumCreatinine.toString(),
      hemoglobin: data.hemoglobin.toString(),
      confidence: data.confidence,
      createdAt: new Date(),
    };

    predictionsStore.push(record);
    return record;
  }

  async getPredictions(): Promise<Prediction[]> {
    return predictionsStore.slice().reverse();
  }
}

export const storage = new MemoryStorage();
