const markdown = require("markdown-js");

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
  is_invited: (user_id, invited) => {
    return invited.find((i) => i.id === user_id);
  },
  is_attending: (user_id, attending) => {
    if (!attending) {
      return false;
    }
    return attending.find((i) => i.id === user_id);
  },
  markdown_to_html: (markdownText) => {
    return markdown.makeHtml(markdownText);
  },
};
