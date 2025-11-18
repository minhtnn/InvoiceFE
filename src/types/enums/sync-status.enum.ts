import { z } from "zod";
export const SyncStatusSchema = z.enum(["New", "InProgress", "Completed", "Failed"]);

export type TSyncStatus = z.infer<typeof SyncStatusSchema>;