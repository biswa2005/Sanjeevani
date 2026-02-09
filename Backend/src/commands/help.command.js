export default async function helpCommand(ctx, next) {
  if (ctx.message?.text !== "/help") return next();

  const helpText = `
🩺 <b>Sanjeevani – Your Healthcare Assistant</b>

Sanjeevani helps you:
• Predict diseases based on symptoms
• Set medicine & vaccine reminders
• Find nearby healthcare centres

📌 <b>Available Commands:</b>

▶ <b>/start</b>
Start the bot and get a welcome message.

💬 <b>/ask &lt;symptoms&gt;</b>
Get disease description and precautions based on symptoms.

<i>Example:</i>
<code>/ask fever cough headache</code>

⏰ <b>/remind &lt;medicine&gt; &lt;time&gt; &lt;frequency&gt; &lt;day(optional)&gt;</b>
Add a medicine reminder.

• Time format: <code>9:00</code> or <code>23:00</code>  
• Frequency: <code>daily</code>, <code>weekly</code>, <code>monthly</code>  
• Day is required only for weekly reminders  

<i>Examples:</i>
<code>/remind calpol 9:00 daily</code>
<code>/remind insulin 8:00 weekly monday</code>

💉 <b>/remind vaccine &lt;vaccine_name&gt; &lt;date&gt; &lt;time&gt;</b>
Add a one-time vaccine reminder.
(The reminder is auto-deleted after notification)

• Date format: <code>YYYY-MM-DD</code>  
• Time format: <code>HH:MM</code>  

<i>Example:</i>
<code>/remind vaccine covid-booster 2026-03-15 10:30</code>

📋 <b>/list</b>
View all your active medicine & vaccine reminders.

❌ <b>/delete &lt;medicine_name&gt;</b>
Remove a medicine reminder from your list.

🏥 <b>/healthcare</b>
Find nearby popular healthcare centres.
📍 Share your location to get results.

⚠️ <b>Disclaimer:</b>
Sanjeevani is not a substitute for a doctor.
Always consult a qualified medical professional for serious conditions.
`;

  await ctx.reply(helpText, {
    parse_mode: "HTML",
    disable_web_page_preview: true,
  });
}
