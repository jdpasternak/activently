// [x] TODO add comments to describe what's happening in this script

const { getRounds } = require("bcrypt");

/** This function updates the username and the password by grabbing it from the edit-profilehandlebars and does minimal validation on the username and password to check they arent empty */
async function updateProfiles(event) {
  event.preventDefault();

  // FIXME title is declared but never used
  const username = document
    .querySelector('input[id="username-edit"]')
    .value.trim();

  const password = document
    .querySelector('input[id="password-edit"]')
    .value.trim();

  // FIXME for this, we can grab the profile (or user) ID from req.session.user_id
  const id = await fetch(`/api/users/${req.session.user_id}`, {
    method: "GET",
  });

  // COMMENT should we allow the user to change their password? Here, only `username` can be changed
  //I think we can
  const response = await fetch(`/api/users/${req.session.user_id}`, {
    method: "PUT",
    body: JSON.stringify(getDataToUpdate()),
    headers: {
      "Content-Type": "application/json",
    },
  });

  // FIXME the user should be routed back to their pofile view (not edit-profile view) instead of the /browsing view
  if (response.ok) {
    document.location.replace("/userprofile");
  } else {
    // [ ] TODO use a modal instead of browser alert
    instances.open("That doesn't look like the right data");
  }
}

function getDataToUpdate() {
  const data = {};
  if (password && password.length > 0) {
    data.password = bcrypt(password);
  }
  if (username && username.length > 0) {
    data.username = username;
  }
  return data;
}
document.addEventListener("DOMContentLoaded", function () {
  var elems = document.querySelectorAll(".modal");
  var instances = M.Modal.init(elems, options);
});
document
  .querySelector(".edit-profile-form")
  .addEventListener("submit", updateProfiles);
