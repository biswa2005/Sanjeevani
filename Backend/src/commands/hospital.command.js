import getNearbyHealthcareCenters from "../services/maps.js";

async function healthcareCommand(ctx, next) {
  // Step 1: User types /hospital
  if (ctx.message?.text === "/healthcare") {
    return ctx.reply("📍 Please share your location", {
      reply_markup: {
        keyboard: [[{ text: "📍 Share Location", request_location: true }]],
        resize_keyboard: true,
        one_time_keyboard: true,
      },
    });
  }

  // User shares location
  if (ctx.message?.location) {
    const { latitude, longitude } = ctx.message.location;

    await ctx.reply("🏥 Finding healthcare centres near you...");

    try {
      const centres = await getNearbyHealthcareCenters(latitude, longitude);

      if (!centres.length) {
        return ctx.reply("❌ No healthcare centres found nearby.");
      }

      let reply = "🏥 *Nearby Healthcare Centres*\n\n";

      centres.slice(0, 10).forEach((c, i) => {
        reply += `*${i + 1}. ${c.name}*\n` + `🗺 ${c.mapLink}\n\n`;
      });

      await ctx.reply(reply, { parse_mode: "HTML" });
    } catch (err) {
      console.error(err.response?.data || err);
      await ctx.reply("❌ Unable to fetch healthcare centres.");
    }
  }
  next();
}

export default healthcareCommand;
