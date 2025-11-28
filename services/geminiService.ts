import { GoogleGenAI } from "@google/genai";

// Initialize the Gemini client
// We use the safe-guard to ensure the API key is present in the environment
const apiKey = process.env.API_KEY || ''; 
const ai = new GoogleGenAI({ apiKey });

export const sendMessageToGemini = async (
  message: string,
  history: { role: string; parts: { text: string }[] }[] = []
): Promise<string> => {
  try {
    const model = 'gemini-2.5-flash';
    
    // Transform history to the format expected by the SDK if needed, 
    // but here we will just use a simple generateContent for single-turn or 
    // manual history management for simplicity in this demo wrapper.
    // For a real chat, we would use ai.chats.create()
    
    const chat = ai.chats.create({
      model: model,
      config: {
        systemInstruction: `You are a high-tech "Data Intelligence Agent" for a large enterprise platform called Volcengine (modeled after the user's request).
        Your tone is professional, precise, and helpful. 
        You specialize in three areas: 
        1. Smart Query (answering specific data questions).
        2. Smart Reports (generating visual summaries).
        3. Smart Analysis (providing deep insights).
        
        Keep your answers concise and formatted nicely. Use markdown.
        If the user asks for data visualization, mention that you are generating a chart (the UI will handle the actual rendering).
        `,
      },
      history: history.map(h => ({
        role: h.role,
        parts: h.parts
      }))
    });

    const result = await chat.sendMessage({ message });
    return result.text || "I processed your request but could not generate a text response.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "System Error: Unable to connect to the Data Intelligence Core. Please check your API configuration.";
  }
};