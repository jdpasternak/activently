const $editBasicInfoButton = document.querySelector("#edit-basic-info-button");
const $saveEditBasicInfoButton = document.querySelector(
  "#save-edit-basic-info-button"
);
const $usernameInput = document.querySelector("#edit-username");
const $zipCodeInput = document.querySelector("#edit-zip");

// const editBasicInfoButtonHandler = (event) => {
//   event.preventDefault();
// };

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

document.addEventListener("DOMContentLoaded", () => {
  const elems = document.querySelectorAll(".modal");
  const options = {
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
  };
  const instances = M.Modal.init(elems, options);

  $saveEditBasicInfoButton.addEventListener("click", saveEditBasicInfoHandler);
});
