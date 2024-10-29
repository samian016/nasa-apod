function formatPostCaption(nasaData) {
  const { title, explanation, date, copyright } = nasaData;

  // Format the post with the specified structure
  const caption = `${title ? `***${title.toUpperCase()}***\n\n${explanation}\n\n` : ""}${date ? `Date: ${date}\n\n` : ""}${copyright ? `Copyright: ${copyright.trim()}` : ""}`;

  return caption;
};

module.exports = formatPostCaption;