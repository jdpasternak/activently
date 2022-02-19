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
      user_id: userId,
      activity_id: activityId,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.ok) {
    window.location.replace(`/activity/${activityId}`);
  } else {
    alert(response.statusText);
  }
};
const attendButton = document.querySelector("#attendButton");

if (attendButton) {
  const seatsAvailable = attendButton.getAttribute("data-seats");
  console.log(typeof seatsAvailable, seatsAvailable);
  if (seatsAvailable === "true") {
    attendButton.addEventListener("click", confirmAttendButtonHandler);
  } else attendButton.setAttribute("disabled", "");
}
