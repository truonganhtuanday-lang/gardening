/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import { GoogleGenAI, Type } from "@google/genai";
import { INITIAL_AI_INSTRUCTIONS } from '../constants';
import { EstimateParams, EstimateResult, SiteAnalysisResult } from '../types';

export const sendMessageToGemini = async (
  history: {role: string, text: string}[], 
  newMessage: string, 
  instruction?: string
): Promise<string> => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });
    const chat = ai.chats.create({
      model: 'gemini-3-flash-preview',
      config: {
        systemInstruction: instruction || INITIAL_AI_INSTRUCTIONS,
      },
      history: history.map(h => ({
        role: h.role === 'user' ? 'user' : 'model',
        parts: [{ text: h.text }]
      }))
    });

    const result = await chat.sendMessage({ message: newMessage });
    return result.text || "I apologize, but I couldn't generate a response at this time.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "I apologize, but I seem to be having trouble reaching our archives at the moment.";
  }
};

export const analyzeSiteImage = async (
  base64Image: string, 
  mimeType: string,
  instruction?: string
): Promise<SiteAnalysisResult> => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });
    const prompt = `Perform a "Digital Site Survey" of this landscape. 
    1. Detect features: (e.g. lawn, retaining walls, mature trees, slopes).
    2. Assess Terrain: (e.g. "Steep North Vancouver ravine lot with potential drainage issues").
    3. Investment Range: Provide a realistic CAD range for a complete professional redesign.
    4. Consultant Note: A professional observation about the site's potential.
    
    Format as JSON.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: {
        parts: [
          { inlineData: { data: base64Image, mimeType } },
          { text: prompt }
        ]
      },
      config: {
        systemInstruction: instruction || INITIAL_AI_INSTRUCTIONS,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            range: { type: Type.STRING },
            consultantNote: { type: Type.STRING },
            considerations: { type: Type.ARRAY, items: { type: Type.STRING } },
            detectedFeatures: { type: Type.ARRAY, items: { type: Type.STRING } },
            terrainAssessment: { type: Type.STRING }
          },
          required: ["range", "consultantNote", "considerations", "detectedFeatures", "terrainAssessment"]
        }
      }
    });

    return JSON.parse(response.text || '{}') as SiteAnalysisResult;
  } catch (error) {
    console.error("Vision Analysis Error:", error);
    throw error;
  }
};

export const getEstimate = async (params: EstimateParams, instruction?: string): Promise<EstimateResult> => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });
    const prompt = `Provide a preliminary budget range for a project in North/West Vancouver.
    Inputs: Area: ${params.size}, Service: ${params.service}, Condition: ${params.condition}, Atmosphere: ${params.atmosphere}.
    Format as JSON.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        systemInstruction: instruction || INITIAL_AI_INSTRUCTIONS,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            range: { type: Type.STRING },
            consultantNote: { type: Type.STRING },
            considerations: { type: Type.ARRAY, items: { type: Type.STRING } }
          },
          required: ["range", "consultantNote", "considerations"]
        }
      }
    });

    return JSON.parse(response.text || '{}') as EstimateResult;
  } catch (error) {
    console.error("Estimate Error:", error);
    throw error;
  }
};
