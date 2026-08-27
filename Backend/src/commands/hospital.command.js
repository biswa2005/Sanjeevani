import getNearbyHealthcareCenters from "../services/maps.js";

async function healthcareCommand(ctx, next) {
  // Step 1: User types /healthcare
  if (ctx.message?.text === "/healthcare") {
    return ctx.reply(
      "📍 Please share your location to find nearby healthcare centres:",
      {
        reply_markup: {
          keyboard: [[{ text: "📍 Share Location", request_location: true }]],
          resize_keyboard: true,
          one_time_keyboard: true,
        },
      },
    );
  }

  // Step 2: User shares their location
  if (ctx.message?.location) {
    const { latitude, longitude } = ctx.message.location;

    try {
      // Notify user and remove the location button keyboard
      await ctx.reply("🏥 Searching OpenStreetMap for facilities near you...", {
        reply_markup: { remove_keyboard: true },
      });

      const centres = await getNearbyHealthcareCenters(latitude, longitude);

      if (!centres.length) {
        return ctx.reply("❌ No healthcare centres found within 5km.");
      }

      // Build HTML response
      let reply = "🏥 <b>Nearby Healthcare Centres (OpenStreetMap)</b>\n\n";

      centres.slice(0, 10).forEach((c, i) => {
        reply += `<b>${i + 1}. ${c.name}</b> (${c.category})\n🗺 <a href="${c.mapLink}">Open in Google Maps</a>\n\n`;
      });

      await ctx.reply(reply, {
        parse_mode: "HTML",
        disable_web_page_preview: true,
      });
    } catch (error) {
      if (error.response) {
        // The server responded with a status code outside the 2xx range
        const statusCode = error.response.status;
        const statusText = error.response.statusText || "Unknown Error";

        console.error(`\n❌ [API ERROR] Overpass API Failed!`);
        console.error(`👉 Status Code: ${statusCode} (${statusText})`);

        // Provide helpful hints based on common Overpass errors
        if (statusCode === 429) {
          console.error(
            `💡 Hint: Rate limited. Try changing the OVERPASS_URL to a backup server.`,
          );
        } else if (statusCode === 400) {
          console.error(
            `💡 Hint: Bad Request. Check if the Overpass query syntax is correct.`,
          );
        }

        console.error(
          `📝 Error Details:`,
          error.response.data || "No additional data",
        );
      } else if (error.request) {
        // The request was made but no response was received (e.g., network timeout)
        console.error(
          `\n❌ [NETWORK ERROR] No response received from Overpass API.`,
        );
        console.error(`📝 Details:`, error.message);
      } else {
        // Something else broke in the code
        console.error(`\n❌ [SYSTEM ERROR] Could not trigger the request.`);
        console.error(`📝 Details:`, error.message);
      }

      await ctx.reply(
        "❌ The healthcare map service is temporarily unavailable. Please try again in a moment.",
      );
    }
  }
  next();
}

export default healthcareCommand;
