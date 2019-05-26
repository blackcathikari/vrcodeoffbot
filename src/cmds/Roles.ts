
const allowedRoles = ['Blinky', 'Pinky', 'Inky', 'Clyde', 'Pac Ghost'];

const invalidMsg = (msg) => msg.channel.send("Error: invalid format. For more information, type `!help roles`");
const unimplementedMsg = (msg) => msg.channel.send('Sorry, this command is not implemented yet.');

const findRole = (availableRoles, role) => {
  return availableRoles.find((r) => {
    return r.name === role;
  });
};

const reply = (msg, args) => {
  const availableRoles = msg.guild.roles;
  if (args[1] === 'giveme') {
    if (allowedRoles.indexOf(args[2]) !== -1) {
      const role = findRole(availableRoles, args[2]);
      if (role !== undefined) {
        msg.member.addRole(role);
        msg.channel.send(`*${msg.author.username} received the ${args[2]} role*`)
        return;
      }
    } else {
      msg.channel.send('Error: inaccessible role. Check the list of accessible roles with \`!roles\`');
      return;
    }
  } else if (args[1] === 'giveto') {
    unimplementedMsg(msg);
    return;
  }
  invalidMsg(msg);
};

export default { reply };