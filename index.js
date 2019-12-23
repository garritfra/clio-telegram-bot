const Telegraf = require("telegraf");

const bot = new Telegraf(process.env.BOT_TOKEN);
const issueRegex = /#\d+/;
const commitRegex = /\b[0-9a-f]{5,40}\b/;

bot.start(ctx =>
  ctx.reply(
    "Hi! I will be watching for messages that reference a git commit, issue or pull request."
  )
);

bot.hears(issueRegex, ctx => {
  // TODO: Reply with multiple issues
  const issue = ctx.message.text
    .match(issueRegex)
    .map(match => match.replace("#", ""));

  ctx.reply("https://github.com/clio-lang/clio/issues/" + issue[0]);
});

bot.hears(commitRegex, ctx => {
  return ctx.reply(
    "https://github.com/clio-lang/clio/commits/" +
      ctx.message.text.match(commitRegex)[0]
  );
});

bot.launch();
