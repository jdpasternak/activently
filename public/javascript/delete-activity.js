document.addEventListener("DOMContentLoaded", () => {
  const $modals = document.querySelectorAll(".modal");
  const modalInsts = M.Modal.init($modals);
});

const confirmDeleteButtonHandler = async (event) => {
  event.preventDefault();

  const activityId = location.toString().split("/")[
    location.toString().split("/").length - 1
  ];

  const response = await fetch(`/api/activities/${activityId}`, {
    method: "DELETE",
  });

  if (response.ok) {
    location.replace("/homepage");
  } else {
    alert(response.statusText);
  }
};

document
  .querySelector("#confirmDeleteButton")
  .addEventListener("click", confirmDeleteButtonHandler);
