import processChat from "../controllers/chatPipeline.js";


export default async function askCommand(ctx, next) {
  if (!ctx.message?.text.startsWith("/ask")) return next();

  const userText = ctx.message.text.replace("/ask", "").trim();

  if (!userText) {
    return ctx.reply("❓ Please describe your symptoms.");
  }

  await ctx.reply("🧠 Analyzing your message...");

  try {
    const { reply } = await processChat(userText);
    await ctx.reply(reply);
  } catch (err) {
    console.error(err);
    await ctx.reply("❌ Something went wrong. Please try again.");
  }
};