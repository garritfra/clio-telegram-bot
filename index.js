const http = require('http');
const Telegraf = require('telegraf');
require('dotenv').config();
const bot = new Telegraf(process.env.BOT_TOKEN);
const issueRegex = /#\d+/;
const commitRegex = /((?![^\b])[a-f0-9]{5,40}(?![^\b]))|((^|\s)[a-f0-9]{5,40}(\s|$))/;

bot.start(ctx =>
  ctx.reply(
    'Hi! I will be watching for messages that reference a git commit, issue or pull request.',
  ),
);

bot.hears(issueRegex, ctx => {
  // TODO: Reply with multiple issues
  const issue = ctx.message.text
    .match(issueRegex)
    .map(match => match.replace('#', ''));
  console.log(
    `Found issue reference to #${issue[0]} in message "${ctx.message.text}".`,
  );
  ctx.reply('https://github.com/clio-lang/clio/issues/' + issue[0]);
});

/* bot.hears(commitRegex, ctx => {
  return ctx.reply(
    "https://github.com/clio-lang/clio/commits/" +
      ctx.message.text.match(commitRegex)[0]
  );
});*/

bot.launch();
