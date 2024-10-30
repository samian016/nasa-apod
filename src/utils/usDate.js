function getUSADate() {
  // Set to Eastern Time (US and Canada)
  const options = { timeZone: 'America/New_York', year: 'numeric', month: '2-digit', day: '2-digit' };

  // Get date components
  const [month, day, year] = new Date().toLocaleDateString('en-US', options).split('/');

  // Format date as YYYY-MM-DD
  return `${year}-${month}-${day}`;
}

module.exports = getUSADate;