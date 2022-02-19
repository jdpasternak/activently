// document.addEventListener("DOMContentLoaded", () => {
//   const $modals = document.querySelectorAll(".modal");
//   const modalInsts = M.Modal.init($modals);
// });

const confirmAttendButtonHandler = async (event) => {
  event.preventDefault();

  const activityId =
    window.location.pathname.split("/")[
      window.location.pathname.split("/").length - 1
    ];

  const userId = window.sessionStorage.user_id;

  const response = await fetch("/api/attend", {
    method: "POST",
    body: JSON.stringify({
      activity_id: activityId,
    }),
  });

  if (response.ok) {
    location.reload(`/activity/${activityId}`);
  } else {
    alert(response.statusText);
  }
};

document
  .querySelector("#attendButton")
  .addEventListener("click", confirmAttendButtonHandler);
