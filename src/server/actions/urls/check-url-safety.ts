"use server";

import { GoogleGenAI } from "@google/genai";
import { ApiResponse } from "@/lib/types";

const genAI = new GoogleGenAI({});

export type UrlSafetyCheck = {
  isSafe: boolean;
  flagged: boolean;
  reason: string | null;
  category: "safe" | "suspicious" | "malicious" | "inappropriate" | "unknown";
  confidence: number;
};

export async function checkUrlSafety(
  url: string
): Promise<ApiResponse<UrlSafetyCheck>> {
  try {
    // validate URL Format
    try {
      new URL(url);
    } catch (error) {
      return {
        success: false,
        error: "Invalid URL format",
      };
    }

    if (!process.env.GEMINI_API_KEY) {
      console.log("Missing Google Gemini API Key");
      return {
        success: true,
        data: {
          isSafe: true,
          flagged: false,
          reason: null,
          category: "unknown",
          confidence: 0,
        },
      };
    }

    const prompt = `
    Analyze this URL for safety concerns: "${url}"
    
    Consider the following aspects:
    1. Is it a known phishing site?
    2. Does it contain malware or suspicious redirects?
    3. Is it associated with scams or fraud?
    4. Does it contain inappropriate content (adult, violence, etc.)?
    5. Is the domain suspicious or newly registered?
    
    Respond in JSON format with the following structure:
    {
      "isSafe": boolean,
      "flagged": boolean,
      "reason": string or null,
      "category": "safe" | "suspicious" | "malicious" | "inappropriate" | "unknown",
      "confidence": number between 0 and 1
    }
    
    Only respond with the JSON object, no additional text.
  `;

    const response = await genAI.models.generateContent({
      model: "gemini-2.0-flash",
      contents: prompt,
    });
    const text = response.text;

    const jsonMatch = text?.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error("Failed to parse JSON response");
    }

    const jsonResponse = JSON.parse(jsonMatch[0]) as UrlSafetyCheck;

    return {
      success: true,
      data: jsonResponse,
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      error: "Failed to check URL safety",
    };
  }
}
