// @ts-ignore
import { Client } from 'discord.js';
import key from '../../key';

// set up discord client
const client = new Client();
const token = key;

client.on('ready', () => {
  console.log('Ready!');
});

const fallbackMessage = (msg) => msg.channel.send('Unknown command');

client.on('message', (msg) => {
  if (msg.content.startsWith('!')) {
    var role = msg.guild.me.hasPermission(['SEND_MESSAGES']);
    if (role) {
      fallbackMessage(msg);
    } else {
      console.error("Permissons are insufficient!");
    }
  }
});

client.login(token);