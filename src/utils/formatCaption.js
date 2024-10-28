function formatPostCaption(nasaData) {
  const { title, explanation, date, copyright } = nasaData;

  // Format the post with the specified structure
  const caption = `***${title.toUpperCase()}***\n\n${explanation}\n\nDate: ${date}\n\nCopyright: ${copyright.trim()}`;

  return caption;
};

module.exports = formatPostCaption;