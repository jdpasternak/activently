const $interestSelect = document.querySelector("#interestSelect");

document.addEventListener("DOMContentLoaded", () => {
  const elems = document.querySelectorAll(".datepicker");
  const instances = M.Datepicker.init(elems, {
    format: "mm/dd/yyyy",
    minDate: new Date(),
  });

  const timepickers = document.querySelectorAll(".timepicker");
  const timepickerInst = M.Timepicker.init(timepickers, {});

  fetch("/api/interests")
    .then((response) => response.json())
    .then((apiInterestData) => {
      console.log(apiInterestData);
      apiInterestData.forEach((interest) => {
        let $option = document.createElement("option");
        $option.value = interest.id;
        $option.textContent = interest.name;
        $interestSelect.appendChild($option);
      });
    })
    .then(() => {
      const interestSelect = document.querySelector("select");
      const selectInst = M.FormSelect.init(interestSelect);
    });
});

const createActivity = async (event) => {
  event.preventDefault();

  const title = document
    .querySelector('input[name="activity-title"]')
    .value.trim();
  const description = document.querySelector("#description").value;
  const interest_id = $interestSelect.value;
  const location = document.querySelector("#zipCode").value;
  const occurrence = document.querySelector("#dateOfEvent").value;
  const is_private = document.querySelector('input[name="is-private"]').checked;

  const seats = document.querySelector('input[name="seats"]').value;

  const body = {
    title,
    description,
    interest_id,
    location,
    occurrence,
    is_private,
    seats,
  };

  console.log(body);

  const response = await fetch(`/api/activities`, {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
    },
  });

  // const getId = fetch("/api/activities", {
  //   method: "GET",
  //   where: { location: location },
  // });

  if (response.ok) {
    location.replace("/homepage");
  } else {
    response.json().then((data) => console.log(data));
    alert(response.statusText);
  }
};

function interest() {
  const response = fetch(`/api/interest`, {
    method: "GET",
  })
    .then((response) => response.json())
    .then((data) => {
      const interestData = data.map();
    });
}
// interest();
document
  .querySelector(".new-activity-form")
  .addEventListener("submit", createActivity);
