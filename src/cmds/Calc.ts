
const invalidMsg = (msg) => msg.channel.send("Error: invalid format. For more information, type `!help calc`");

const parse = (msg, x, y, op) => {
  switch (op) {
    case '+': {
      return (x + y).toFixed(2);
    }
    case '-': {
      return (x - y).toFixed(2);
    }
    case '*': {
      return (x * y).toFixed(2);
    }
    case '/': {
      if (y === 0) {
        msg.channel.send("Error: invalid calculation");
        return;
      } else {
        return (x / y).toFixed(2);
      }
    }
    default: {
      invalidMsg(msg);
      return;
    }
  }
};

const isValid = (num, string) => {
  const onlyNum = /^(-?)(\d+)(\.\d+)?$/.test(string);
  return onlyNum && num !== NaN ? true : false;
};

const reply = (msg, args) => {
  if (args.length !== 3) {
    invalidMsg(msg);
  } else {
    const x = parseFloat(args[0]);
    const y = parseFloat(args[2]);
    if (isValid(x, args[0]) && isValid(y, args[2])) {
      const answer = parse(msg, x, y, args[1]);
      msg.channel.send(answer);
    } else {
      invalidMsg(msg);
    }
  }
};

export default { reply };