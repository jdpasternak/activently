const confirmDeclineButtonHandler = async (event) => {
  event.preventDefault();

  const activityId =
    window.location.pathname.split("/")[
      window.location.pathname.split("/").length - 1
    ];

  const response = await fetch(`/api/attend/`, {
    method: "DELETE",
    body: JSON.stringify({
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
const declineButton = document.querySelector("#declineButton");
if (declineButton) {
  declineButton.addEventListener("click", confirmDeclineButtonHandler);
}
