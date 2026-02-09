export default async function helpCommand(ctx, next) {
  if (ctx.message.text !== "/help") return next();

  const helpText = `
🩺 <b>Sanjeevani – Your Healthcare Assistant</b>

Sanjeevani helps you check diseases based on symptoms,
set medicine reminders, and find nearby healthcare centres.

📌 <b>Available Commands:</b>

▶ <b>/start</b>
Start the bot and get a welcome message.

💬 <b>/ask &lt;symptoms&gt;</b>
Get disease description and precautions.
<i>Example:</i>
<code>/ask fever cough headache</code>

⏰ <b>/remind &lt;medicine_name&gt; &lt;time&gt; &lt;frequency&gt; &lt;day&gt;</b>
Add a medicine reminder.
• Time format: 9:00 or 23:00
• Frequency: daily / weekly / monthly
• Day required for weekly reminders

<i>Examples:</i>
<code>/remind calpol 9:00 daily</code>
<code>/remind insulin 8:00 weekly monday</code>

📋 <b>/list</b>
View all your added medicine reminders.

❌ <b>/delete &lt;medicine_name&gt;</b>
Remove a medicine from your reminder list.

🏥 <b>/healthcare</b>
Find nearby popular healthcare centres.
• Share your location to get results.

⚠️ <b>Disclaimer:</b>
Sanjeevani is not a substitute for a doctor.
Always consult a medical professional for serious conditions.
`;

  await ctx.reply(helpText, {
    parse_mode: "HTML",
    disable_web_page_preview: true,
  });
}
