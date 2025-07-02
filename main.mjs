// main.mjs
// インストールしたパッケージをここで使えるようにインポートする！
import { Client, GatewayIntentBits } from 'discord.js';
import dotenv from 'dotenv';
import express from 'express';

// .envファイルから環境変数を読み込むためにdotenvを設定する！
dotenv.config();

// Discordボットを作成するためのクライアントを設定する！
// ここでは、Guilds（サーバー）とメッセージの内容を取得するための意図を指定
const client = new Client({
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.MessageContent,
		GatewayIntentBits.GuildMembers,
	],
});

// ボットが準備できたときに実行されるイベントリスナーを設定する！
// ここでは、ボットがログインしたときにコンソールにメッセージを表示する
client.once('ready', () => {
	console.log(`よし、準備OK！ ${client.user.tag} としてログインしたよ！`);
});

// メッセージが送信されたときに実行されるイベントリスナーを設定する！
client.on('messageCreate', (message) => {
	if (message.author.bot) return;
	if (message.content === 'ping') {
		message.reply('pong!');
	}
});

// ボットをDiscordにログインさせるために、.envファイルからトークンを取得してログインする！
if (!process.env.DISCORD_TOKEN) {
	console.error('DISCORD_TOKENが設定されていません！');
	process.exit(1);
}
client.login(process.env.DISCORD_TOKEN);

// ここからは、Webサーバーをセットアップするよ！
// Expressを使って簡単なWebサーバーを作成する！
const app = express();
const port = process.env.PORT || 3000;
app.get('/', (req, res) => res.send('Bot is awake!'));
app.listen(port, () =>
	console.log(`Webサーバーもポート ${port} で起きてるよ！`)
);
