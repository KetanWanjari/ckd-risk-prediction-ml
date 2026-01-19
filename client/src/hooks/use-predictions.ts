import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api, type InsertPrediction } from "@shared/routes";
import { z } from "zod";

export function usePredictions() {
  return useQuery({
    queryKey: [api.predictions.list.path],
    queryFn: async () => {
      const res = await fetch(api.predictions.list.path);
      if (!res.ok) throw new Error("Failed to fetch predictions history");
      return api.predictions.list.responses[200].parse(await res.json());
    },
  });
}

export function useCreatePrediction() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: InsertPrediction) => {
      // API expects numbers, ensure we coerce if coming from raw form inputs
      // However, react-hook-form + zod resolver handles this mostly.
      // We'll trust the input matches the schema.
      const res = await fetch(api.predictions.create.path, {
        method: api.predictions.create.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        if (res.status === 400) {
          const error = api.predictions.create.responses[400].parse(await res.json());
          throw new Error(error.message);
        }
        throw new Error("Failed to create prediction");
      }
      
      return api.predictions.create.responses[201].parse(await res.json());
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [api.predictions.list.path] });
    },
  });
}
