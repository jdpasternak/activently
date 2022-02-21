const $editBasicInfoButton = document.querySelector("#edit-basic-info-button");
const $saveEditBasicInfoButton = document.querySelector(
  "#save-edit-basic-info-button"
);

const $editDietaryPreferencesButton = document.querySelector(
  "#edit-dietary-preferences-button"
);
const $saveEditDietaryPreferencesButton = document.querySelector(
  "#save-edit-dietary-prefs-button"
);

const $saveEditInterestsButton = document.querySelector(
  "#save-edit-interests-button"
);

const $usernameInput = document.querySelector("#edit-username");
const $zipCodeInput = document.querySelector("#edit-zip");

const $editBasicInfoModal = document.querySelector("#edit-basic-info-modal");
const $editDietaryPreferencesModal = document.querySelector(
  "#edit-dietary-preferences-modal"
);
const $editInterestsModal = document.querySelector("#edit-interests-modal");
const $changePasswordModal = document.querySelector("#changePasswordModal");
const $saveChangePasswordButton = document.querySelector("#saveChangePassword");

let $dietaryPrefSelectInstance;
let $interestSelectInstance;
let $changePasswordModalInstance;

/* 
    Handle button on edit basic info modal to save info
*/
const saveEditBasicInfoHandler = async (event) => {
  event.preventDefault();

  const user_id =
    document.querySelector("#user-id").attributes["data-user-id"].value;

  const updatedUsername = $usernameInput.value.trim();
  const updatedZipCode = $zipCodeInput.value.trim();

  const response = await fetch(`/api/users/${user_id}`, {
    method: "PUT",
    body: JSON.stringify({ username: updatedUsername, zip: updatedZipCode }),
    headers: { "Content-Type": "application/json" },
  });

  if (response.ok) {
    location.replace("/profile");
  } else {
    alert(response.statusText);
  }
};

const saveEditDietaryPreferencesHandler = (event) => {
  event.preventDefault();

  const values = $dietaryPrefSelectInstance.getSelectedValues();

  fetch("/api/users/dietaryPrefs", {
    method: "DELETE",
  })
    .then(() => {
      values.forEach((value) => {
        fetch("/api/userDietaryPrefs", {
          method: "POST",
          body: JSON.stringify({
            user_id:
              document.querySelector("#user-id").attributes["data-user-id"]
                .value,
            dietary_pref_id: value,
          }),
          headers: { "Content-Type": "application/json" },
        });
      });
    })
    .then(() => {
      location.replace("/profile");
    });
};

const saveEditInterstsHandler = (event) => {
  event.preventDefault();

  const values = $interestSelectInstance.getSelectedValues();

  fetch("/api/users/interests", {
    method: "DELETE",
  })
    .then(() => {
      values.forEach((value) => {
        fetch("/api/userInterests", {
          method: "POST",
          body: JSON.stringify({
            user_id:
              document.querySelector("#user-id").attributes["data-user-id"]
                .value,
            interest_id: value,
          }),
          headers: { "Content-Type": "application/json" },
        });
      });
    })
    .then(() => location.replace("/profile"));
};

const saveChangePasswordButtonHandler = (event) => {
  const $oldPassword = document.querySelector("#oldPassword");
  const $newPassword = document.querySelector("#newPassword");
  const $confirmNewPassword = document.querySelector("#confirmNewPassword");
  const $oldPasswordHelperText = document.querySelector(
    "#oldPasswordHelperText"
  );
  const $newPasswordHelperText = document.querySelector(
    "#newPasswordHelperText"
  );
  const $confirmNewPasswordHelperText = document.querySelector(
    "#confirmNewPasswordHelperText"
  );
  const oldPassword = $oldPassword.value;
  const newPassword = $newPassword.value;
  const confirmNewPassword = $confirmNewPassword.value;
  const email = document.querySelector("#user-email").textContent.split(" ")[1];

  [$oldPassword, $newPassword, $confirmNewPassword].forEach((i) => {
    i.classList.remove("invalid");
  });

  // Displays a toast if any form field is empty
  if (!oldPassword || !newPassword || !confirmNewPassword) {
    M.toast({
      html: '<span class="gray-text text-darken-2">All fields required</span>',
      classes: "rounded orange",
    });
    return;
  }

  // Checks if user's old password is valid
  fetch("/api/users/login", {
    method: "POST",
    body: JSON.stringify({ email, password: oldPassword }),
    headers: { "Content-Type": "application/json" },
  })
    .then((response) => response.json())
    .then((data) => {
      // Displays a toast if the password was invalid
      if (!data.user) {
        M.toast({
          html: `<span class="gray-text text-darken-4">Old password invalid</span>`,
          classes: "rounded orange lighten-2 gray-text text-darken-4",
        });
        $oldPassword.classList = "invalid";
        throw { message: "Login failed" };
      }
    })
    .then(() => {
      // Checks if the new password meets minimum length requirements
      if (newPassword.length < 6) {
        $newPasswordHelperText.dataset.error = "Password too short";
        $newPassword.classList = "invalid";
        return;
        // Checks if new password and its confirmation match
      } else if (newPassword !== confirmNewPassword) {
        $newPasswordHelperText.dataset.error = "Passwords do not match";
        [$confirmNewPassword, $newPassword].forEach(
          (i) => (i.classList = "invalid")
        );
      } else {
        fetch("/api/users", {
          method: "PUT",
          body: JSON.stringify({ password: newPassword }),
          headers: { "Content-Type": "application/json" },
        })
          .then((response) => response.json())
          .then((data) => {
            if (data[0]) {
              [$oldPassword, $newPassword, $confirmNewPassword].forEach((i) => {
                i.classList.remove("invalid");
                i.value = "";
              });
              M.toast({
                html: "<span>Password updated successfully</span>",
                completeCallback: () => {
                  $changePasswordModalInstance.close();
                },
                classes: "rounded green accent-3",
              });
            }
          })
          .catch((err) => console.log(err));
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

/* 
    DOMContentLoaded
*/
document.addEventListener("DOMContentLoaded", () => {
  const $editBasicInfoModal = document.querySelector("#edit-basic-info-modal");
  const $editDietaryPreferencesModal = document.querySelector(
    "#edit-dietary-preferences-modal"
  );

  M.Modal.init($editBasicInfoModal, {
    onOpenStart: () => {
      const userUsername = document
        .querySelector("#user-username")
        .textContent.split(":")[0];
      const userZipCode = document
        .querySelector("#user-zip")
        .textContent.split(":")[1]
        .trim();

      document.querySelectorAll("label").forEach((elem) => {
        elem.classList = ["active"];
      });

      $usernameInput.value = userUsername;
      $zipCodeInput.value = userZipCode;
    },
  });

  const $dietaryPrefSelect = document.querySelector("#dietary-pref-select");

  M.Modal.init($editDietaryPreferencesModal, {
    onOpenStart: () => {
      let userDietaryPrefs;
      fetch(`/api/users/${document.querySelector("#user-id").dataset.userId}`)
        .then((response) => response.json())
        .then((data) => (userDietaryPrefs = data.dietary_preferences))
        .then(() => {
          fetch("/api/dietaryPrefs")
            .then((apiDietaryPrefData) => apiDietaryPrefData.json())
            .then((data) => {
              $dietaryPrefSelect.innerHTML = `<option disabled selected>Select your interests</option>`;
              data.forEach((dietaryPref) => {
                console.log(dietaryPref);
                let $option = document.createElement("option");
                $option.value = dietaryPref.id;
                $option.textContent = dietaryPref.name;

                if (userDietaryPrefs.find((i) => i.id === dietaryPref.id)) {
                  document
                    .querySelector(
                      "#edit-dietary-preferences-form option[disabled]"
                    )
                    .removeAttribute("selected");
                  $option.setAttribute("selected", "");
                }

                $dietaryPrefSelect.appendChild($option);
              });
              $dietaryPrefSelectInstance =
                M.FormSelect.init($dietaryPrefSelect);
            });
        });
    },
  });

  const $interestsSelect = document.querySelector("#interests-select");

  M.Modal.init($editInterestsModal, {
    onOpenStart: () => {
      let userInterests;
      fetch(`/api/users/${document.querySelector("#user-id").dataset.userId}`)
        .then((response) => response.json())
        .then((data) => (userInterests = data.interests))
        .then(() => {
          fetch("/api/interests")
            .then((apiInterestData) => apiInterestData.json())
            .then((data) => {
              $interestsSelect.innerHTML = `<option disabled selected>Select your interests</option>`;
              data.forEach((interest) => {
                let $option = document.createElement("option");
                $option.value = interest.id;
                $option.textContent = interest.name;
                console.log(
                  userInterests.id,
                  interest.id,
                  userInterests.find((i) => i.id === interest.id)
                );

                if (userInterests.find((i) => i.id === interest.id)) {
                  document
                    .querySelector("#edit-interests-form option[disabled]")
                    .removeAttribute("selected");
                  $option.setAttribute("selected", "");
                }
                $interestsSelect.appendChild($option);
              });
              $interestSelectInstance = M.FormSelect.init($interestsSelect);
            });
        });
    },
  });

  $changePasswordModalInstance = M.Modal.init($changePasswordModal);

  $saveEditBasicInfoButton.addEventListener("click", saveEditBasicInfoHandler);
  $saveEditDietaryPreferencesButton.addEventListener(
    "click",
    saveEditDietaryPreferencesHandler
  );
  $saveEditInterestsButton.addEventListener("click", saveEditInterstsHandler);
  $saveChangePasswordButton.addEventListener(
    "click",
    saveChangePasswordButtonHandler
  );
});
