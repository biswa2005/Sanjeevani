import { processMedicalChat } from "../controllers/chatpipeline.js"; // Adjust the path if necessary

export default async function askCommand(ctx, next) {
  // Check if the message starts with /ask
  if (!ctx.message?.text?.startsWith("/ask")) return next();

  // Extract the actual user query
  const userText = ctx.message.text.replace("/ask", "").trim();

  if (!userText) {
    return ctx.reply("❌ Invalid format. कृपया अपनी समस्या इस तरह लिखें: /ask मुझे पेट दर्द है \n (Please use the format: /ask [your symptoms])");
  }

  // Send a loading message so the user knows it's processing
  await ctx.reply("🧠 आपकी समस्या का विश्लेषण किया जा रहा है... (Analyzing your symptoms...)");

  try {
    // Run the text through your LangChain medical pipeline
    const pipelineResult = await processMedicalChat(userText);
    
    // Reply with the final translated Hindi response
    // (This response already includes precautions and the medical disclaimer from Gemini)
  await ctx.reply(pipelineResult.finalResponse);

    /* Optional: If you want to log or send debug info to yourself (the admin):
    console.log("Extracted Symptoms:", pipelineResult.extractedSymptoms);
    console.log("Matched index:", pipelineResult.matchedSymptoms);
    console.log("ML Prediction:", pipelineResult.mlPrediction);
    */

  } catch (err) {
    console.error("Error in askCommand:", err);
    await ctx.reply("❌ कुछ गलत हो गया। कृपया थोड़ी देर बाद फिर से प्रयास करें। (Something went wrong. Please try again.)");
  }
}