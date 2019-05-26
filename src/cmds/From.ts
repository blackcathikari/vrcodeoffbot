var convert = require('convert-units');

// Test cases:
// !from 10 cm to m - 0.1 m
// !from 5 m to yd - 5.47 yd
// !from 0 c to f - 32.00 F
// !from 0 C to F - Error, format
// !from 29.1 cm to oz - Error, units
// !from banana L to gal - Error, format
// !from 63 k to - Error, format
// !from 1 l to qt - Error, format (capital L);

// Notes
// - list unit types when unit error?

const invalidMsg = (msg) => msg.channel.send("Error: invalid format. For more information, type `!help from`");

const isValid = (num, string) => {
  const onlyNum = /^(-?)(\d+)(\.\d+)?$/.test(string);
  return onlyNum && num !== NaN ? true : false;
};

const mapUnits = (args) => {
  const allowedInputUnits = ['mm', 'cm', 'm', 'km', 'in', 'ft', 'yd', 'mL', 'L', 'oz', 'qt', 'gal', 'c', 'f', 'k'];
  const libUnits =          ['mm', 'cm', 'm', 'km', 'in', 'ft', 'yd', 'ml', 'l', 'oz', 'qt', 'gal', 'C', 'F', 'K'];
  return {
    from: libUnits[allowedInputUnits.indexOf(args[2])],
    to: libUnits[allowedInputUnits.indexOf(args[4])]
  }
};

const reply = (msg, args) => {
  if (args.length !== 5) {
    invalidMsg(msg);
  } else {
    const num = parseFloat(args[1]);
    if (isValid(num, args[1]) && args[3] === 'to') {
      try {
        const {from, to} = mapUnits(args);
        if (typeof from === 'string' && typeof to === 'string') {
          const nu = convert(num).from(from).to(to).toFixed(2);
          msg.channel.send(`${nu} ${args[4]}`);
          return;
        }
        invalidMsg(msg);
      } catch (e) {
        msg.channel.send(`${e}. For more information, type \`!help from\``);
      }
    } else {
      invalidMsg(msg);
    }
  }
};

export default { reply };