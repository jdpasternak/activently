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

const $usernameInput = document.querySelector("#edit-username");
const $zipCodeInput = document.querySelector("#edit-zip");

let $dietaryPrefSelectInstance;

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
    onOpenStart: async () => {
      const response = await fetch("/api/dietaryPrefs")
        .then((apiInterestData) => apiInterestData.json())
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

  $saveEditBasicInfoButton.addEventListener("click", saveEditBasicInfoHandler);
  $saveEditDietaryPreferencesButton.addEventListener(
    "click",
    saveEditDietaryPreferencesHandler
  );
});
