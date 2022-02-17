// [x] TODO add comments to describe what's happening in this script
document.addEventListener("DOMContentLoaded", function () {
  var elems = document.querySelectorAll(".modal");
  //var instances = M.Modal.init(elems, options);

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
    // no we cannot because req.session.user_id only works from the backend
    const urlArr = window.location.pathname.split("/");
    const id = urlArr[urlArr.length - 1];

    // COMMENT should we allow the user to change their password? Here, only `username` can be changed

    const response = await fetch(`/api/users/${id}`, {
      method: "PUT",
      body: JSON.stringify({
        username,
        password,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    // FIXME the user should be routed back to their pofile view (not edit-profile view) instead of the /browsing view
    if (response.ok) {
      document.location.replace(`/profile/${id}`);
    } else {
      // [ ] TODO use a modal instead of browser alert
      //instances.open();
    }
  }

  //   function getDataToUpdate() {
  //     const data = {};
  //     if (password && password.length > 0) {
  //       data.password = password;
  //     }
  //     if (username && username.length > 0) {
  //       data.username = username;
  //     }
  //     return data;
  //   }
  document
    .querySelector(".edit-profile-form")
    .addEventListener("submit", updateProfiles);
});
