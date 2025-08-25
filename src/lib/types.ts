import z from "zod";

export const urlSchema = z.object({
  url: z.url("Please enter a valid url"),
});

export type UrlFormData = z.infer<typeof urlSchema>;

export type ApiResponse<T> = {
  success: boolean;
  data?: T;
  error?: string;
};

export type Url = {
  id: number;
  originalUrl: string;
  shortCode: string;
  createdAt: string;
  updatedAt: string;
  clicks: number;
};
