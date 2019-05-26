
const invalidMsg = (msg) => msg.channel.send('Error: invalid command');
const unimplementedMsg = (msg) => msg.channel.send('Sorry, this command is not implemented yet.');

const helpMsg = `**!help**: Shows information about available commands.

**Usage:** \`help <command>\`. Available commands are:
- \`calc\`
- \`from\`
- \`sysinfo\``;

const calcMsg = `**!calc**: Performs a math calculation on two numbers.

**Usage:** \`!calc <numberA> <operator> <numberB>\`
- \`<numberA>\`: a valid integer or decimal number
- \`<operator>\`: a maths operator (\`+\`, \`-\`, \`*\`, \`/\`)
- \`<numberB>\`: a valid integer or decimal number`;

const fromMsg = `**!from**: Performs unit conversion between two units.

**Usage:** \`from <number> <fromUnit> to <toUnit>\`
- \`<number>\`: a valid integer or decimal number
- \`<fromUnit>\`: the unit to convert from
- \`<toUnit>\`: the unit to convert to

**Available units**:
- *Distance:*
--- Metric: mm, cm, m, km
--- US: in, ft, yd
- *Volume:*
--- Metric: mL (aka cc), L
--- US: oz (fluid), qt, gal
- *Temperature:* c, f, k`;

const sysinfoMsg = `**!sysinfo**: Shows information about the system on which the bot is running.`;

const sendEmbed = (msg, content) => msg.channel.send({embed: { color: 3447003, description: content } });

const reply = (msg, args) => {
  if (args.length === 1) {
    // general help
    sendEmbed(msg, helpMsg);
  } else if (args.length === 2) {
    switch (args[1]) {
      case 'calc': {
        sendEmbed(msg, calcMsg);
        break;
      }
      case 'help': {
        sendEmbed(msg, helpMsg);
        break;
      }
      case 'whatshot': {
        unimplementedMsg(msg);
        break;
      }
      case 'roles': {
        unimplementedMsg(msg);
        break;
      }
      case 'sysinfo': {
        sendEmbed(msg, sysinfoMsg);
        break;
      }
      case 'from': {
        sendEmbed(msg, fromMsg);
        break;
      }
      default: {
        invalidMsg(msg);
      }
    }
  } else {
    invalidMsg(msg);
  }
};

export default { reply };