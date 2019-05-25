
const invalidMsg = (msg) => msg.channel.send('Error: invalid command');
const unimplementedMsg = (msg) => msg.channel.send('Sorry, this command is not implemented yet.');

const calcMsg = `**!calc**: Performs a math calculation on two numbers.

\`!calc <numberA> <operator> <numberB>\`
- \`<numberA>\`: a valid integer or decimal number
- \`<operator>\`: a maths operator (\`+\`, \`-\`, \`*\`, \`/\`)
- \`<numberB>\`: a valid integer or decimal number`;

const reply = (msg, args) => {
  if (args.length === 1) {
    // general help
  } else if (args.length === 2) {
    switch (args[1]) {
      case 'calc': {
        msg.channel.send({embed: { color: 3447003, description: calcMsg } });
        break;
      }
      case 'help': {
        unimplementedMsg(msg);
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
        unimplementedMsg(msg);
        break;
      }
      case 'from': {
        unimplementedMsg(msg);
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