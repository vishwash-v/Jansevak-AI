import { GoogleGenAI } from "@google/genai";

let client: GoogleGenAI | null = null;

// Initialize the client only when needed to avoid early errors if env is missing
const getClient = () => {
  if (!client && process.env.API_KEY) {
    client = new GoogleGenAI({ apiKey: process.env.API_KEY });
  }
  return client;
};

export const generateResponse = async (prompt: string): Promise<string> => {
  const ai = getClient();
  
  if (!ai) {
    // Fallback for demo purposes if no API key is present
    console.warn("No API Key found. Returning mock response.");
    return new Promise((resolve) => {
      setTimeout(() => {
        // Simple keyword matching for better mock responses in demo
        const lowerPrompt = prompt.toLowerCase();
        if (lowerPrompt.includes("farmers") || lowerPrompt.includes("kisan")) {
             resolve("The PM Kisan Samman Nidhi Yojana provides ₹6,000 annually to eligible farmer families. You can apply using your Aadhaar card and land records.");
        } else if (lowerPrompt.includes("student") || lowerPrompt.includes("scholarship")) {
             resolve("For students, the PM Scholarship Scheme offers up to ₹50,000 per year. Applications are currently open for the academic year 2024-25.");
        } else if (lowerPrompt.includes("health") || lowerPrompt.includes("ayushman")) {
             resolve("Ayushman Bharat offers health coverage up to ₹5 Lakhs per family per year for secondary and tertiary care hospitalization.");
        } else {
             resolve(`I can help you with "${prompt}". Based on your profile (Rajesh, Maharashtra), you might be eligible for the PM Awas Yojana. Would you like to check the documents required?`);
        }
      }, 1500);
    });
  }

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        systemInstruction: "You are Jansevak AI, a helpful Indian government welfare assistant. Keep answers short (under 40 words), encouraging, and relevant to Indian government schemes. Address the user as Rajesh."
      }
    });
    return response.text || "I'm sorry, I couldn't process that request right now.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "I'm currently having trouble connecting to the server. Please try again later.";
  }
};