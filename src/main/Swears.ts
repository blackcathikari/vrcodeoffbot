
const swears = ['dog', 'water'];

const swearRegex = () => {
  const groups = [];
  swears.forEach((swear) => {
    groups.push(`(${swear})`);
  })
  return new RegExp(`(${groups.join('|')})`, 'gi');
};

const embedContent = (user, nuContent) => {
  return { embed: {
    color: 3447003,
    description: `**${user}:** \`${nuContent}\``
  }};
}

const reply = (msg) => {
  const content = msg.content;
  const regex = swearRegex();

  const nuContent = content.replace(regex, (match) => {
    return match.charAt(0) + new Array(match.length).join('*');
  });

  if (content !== nuContent) {
    const author = msg.author;
    const user = `${author.username}#${author.discriminator}`;
    msg.delete();
    msg.channel.send(embedContent(user, nuContent));
    return;
  }
};

export default { reply };