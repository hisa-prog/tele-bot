// const { Telegraf } = require("telegraf");
// const TOKEN = "5153026043:AAEOA6Jgze21I8PGuZWKJoNMGY1Wzl6S5OI";
// const bot = new Telegraf(TOKEN);

// const web_link = "https://celebrated-torte-184681.netlify.app/";

// bot.start((ctx) =>
//   ctx.reply("Welcome :)))))", {
//     reply_markup: {
//       keyboard: [[{ text: "web app", web_app: { url: web_link } }]],
//     },
//   })
// );

// bot.launch();
const TelegramAPI = require("node-telegram-bot-api");
const token = "5472003650:AAGqWl2XOfOcVkPUAHR1sTf9E6flCc9u2CQ";
const web_link = "http://localhost:3000/";


const bot = new TelegramAPI(token, { polling: true });
const walletOptions = {
    reply_markup : JSON.stringify({
        inline_keyboard: [
            [
                {text: 'Ввести private key', callback_data: 'setPrivateKey'},
                {text: 'Как получить private key', callback_data: 'getPrivateKey'}
            ]
        ]
    })
}
let privateKey = ''

bot.setMyCommands([
  { command: "/start", description: "Приветствие" },
  { command: "/info", description: "Информация о боте" },
  { command: "/connect_wallet", description: "Подключить кошелек" },
  { command: "/shop", description: "Магазин" },
]);

bot.on("message", async (item) => {
  const text = item.text;
  const firstName = item.chat.first_name;
  const lastName = item.chat.last_name;
  const idChat = item.chat.id;

  if (text === "/start") {
    return bot.sendMessage(
      idChat,
      `Привет, ${firstName} ${lastName}! Я бот от hisa, приятно познакомиться!`
    );
  }else if (text === "/info") {
    return bot.sendMessage(
      idChat,
      `У нас пока нет описания, но в ближайшем будущем (возможно) оно появится`
    );
  }else if (text === '/connect_wallet') {
    await bot.sendMessage(
        idChat,
        `Чтобы подключить кошелек, мне потребуется от тебя следующее:`,
        walletOptions
    )
  }else if (text === '/shop') {
    await bot.sendMessage(
        idChat,
        `Открыть магазин`,
        {
          reply_markup: {
            keyboard: [[{ text: "web app", web_app: { url: web_link } }]],
          },
        }
    )
  } else return bot.sendMessage(idChat, "Я вас не понимаю :)");
});

bot.on('callback_query', async item => {
    const options = {
        chat_id: item.message.chat.id,
        message_id: item.message.message_id,
        message: item.data
    }
    if(options.message === 'setPrivateKey') {
        bot.sendMessage(options.chat_id,
            `Введите снизу следующим сообщением ваш private key`)
        bot.on("message", async (item) => {
            optMessage = {
                chat_id: item.chat.id,
                text: item.text
            }
            if (optMessage.text) {
                privateKey = optMessage.text
                const web3 = new Web3Service(NODE_URL)
                const account = new AccountEntity(web3, privateKey)
                console.log(account)
            }
            // console.log(privateKey)
        })
    } else if (data === 'getPrivateKey') {
        await bot.sendPhoto(options.chat_id, '')
    } else bot.sendMessage(options.chat_id, "Я вас не понимаю :)")
})