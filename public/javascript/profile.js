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

let $dietaryPrefSelectInstance;
let $interestSelectInstance;

/* 
    Handle button on edit basic info modal to save info
*/
const saveEditBasicInfoHandler = async (event) => {
  event.preventDefault();

  const user_id =
    document.querySelector("#user-id").attributes["data-user-id"].value;

  const updatedUsername = $usernameInput.value.trim();
  const updatedZipCode = $zipCodeInput.value.trim();

  console.log(updatedUsername, updatedZipCode);

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
  console.log(values);

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
  const oldPassword = document.querySelector("#oldPassword").value;
  const newPassword = document.querySelector("#newPassword").value;
  const confirmNewPassword = document.querySelector(
    "#confirmNewPassword"
  ).value;
  const email = document.querySelector("#user-email").value;

  console.log(oldPassword, newPassword, confirmNewPassword);

  if (!oldPassword && !newPassword && !confirmNewPassword) {
    console.log("all required");
  }
  fetch("/api/users/login", {
    method: "POST",
    body: JSON.stringify({ email, oldPassword }),
  })
    .then((response) => response.json())
    .then((data) => console.log(data));
};

document.addEventListener("DOMContentLoaded", () => {
  const $editBasicInfoModal = document.querySelector("#edit-basic-info-modal");
  const $editDietaryPreferencesModal = document.querySelector(
    "#edit-dietary-preferences-modal"
  );
  const $editInterestsModal = document.querySelector("#edit-interests-modal");
  const $changePasswordModal = document.querySelector("#changePasswordModal");
  const $saveChangePasswordButton = document.querySelector(
    "#saveChangePassword"
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
    onOpenStart: async () => {
      const response = await fetch("/api/dietaryPrefs")
        .then((apiDietaryPrefData) => apiDietaryPrefData.json())
        .then((data) => {
          data.forEach((i) => {
            console.log(i);
            let $option = document.createElement("option");
            $option.value = i.id;
            $option.textContent = i.name;
            $dietaryPrefSelect.appendChild($option);
          });
        });
      $dietaryPrefSelectInstance = M.FormSelect.init($dietaryPrefSelect);
    },
  });

  const $interestsSelect = document.querySelector("#interests-select");

  M.Modal.init($editInterestsModal, {
    onOpenStart: async () => {
      const response = await fetch("/api/interests")
        .then((apiInterestData) => apiInterestData.json())
        .then((data) => {
          data.forEach((interest) => {
            let $option = document.createElement("option");
            $option.value = interest.id;
            $option.textContent = interest.name;
            $interestsSelect.appendChild($option);
          });
        });
      $interestSelectInstance = M.FormSelect.init($interestsSelect);
    },
  });

  M.Modal.init($changePasswordModal);

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
