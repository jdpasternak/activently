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
  const occurrence = `${document.querySelector("#dateOfEvent").value} ${
    document.querySelector(".timepicker").value
  }`;
  const seats = document.querySelector("#seats").value;
  const is_private = document.querySelector('input[name="is-private"]').checked;
  const req_dietary_pref = document.querySelector(
    "#dietaryPrefRequired"
  ).checked;
  const rules = document.querySelector("#rules").value;
  const price = document.querySelector("#pricePerSeat").value;

  const body = {
    title,
    description,
    interest_id,
    location,
    occurrence,
    seats,
    is_private,
    req_dietary_pref,
    rules,
    price,
  };

  console.log(body);

  const response = await fetch(`/api/activities`, {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.ok) {
    window.location.replace("/homepage");
  } else {
    response.json().then((data) => console.log(data));
    alert(response.statusText);
  }
};

document
  .querySelector(".new-activity-form")
  .addEventListener("submit", createActivity);
