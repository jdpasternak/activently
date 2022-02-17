//function to procces the date and the plurals.
module.exports = {
  format_date: (date) => {
    return `${new Date(date).toLocaleDateString()}`;
  },
  format_time: (date) => {
    return `${new Date(date).toLocaleTimeString()}`;
  },
  format_plural: (word, amount) => {
    if (amount !== 1) {
      return `${word}s`;
    }

    return word;
  },
  is_organizer: (user_id, activity_id) => {
    return user_id === activity_id;
  },
};
