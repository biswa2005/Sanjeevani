export default function startCommand(ctx, next) {
  if (ctx.message?.text === "/start") {
    ctx.reply(
      `👋 Hi there! Welcome to Sanjeevani🌿,
    I’m here to help you with medicines, reminders, and health support.
    Just type a command or use the menu to get started!`,
      { parse_mode: "Markdown" },
    );
  }
  next();
};
