let selectInst;

document.addEventListener("DOMContentLoaded", () => {
  $interestSelect = document.querySelector("#interestSelect");
  const elems = document.querySelectorAll(".datepicker");
  const instances = M.Datepicker.init(elems, {
    format: "mm/dd/yyyy",
    minDate: new Date(),
  });

  const timepickers = document.querySelectorAll(".timepicker");
  const timepickerInst = M.Timepicker.init(timepickers, {});

  let relatedInterest;
  const activityId =
    location.pathname.split("/")[location.pathname.split("/").length - 2];

  fetch(`/api/activities/${activityId}`)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      relatedInterest = data.interest;
    })
    .then(() => {
      fetch("/api/interests")
        .then((response) => response.json())
        .then((apiInterestData) => {
          apiInterestData.forEach((interest) => {
            let $option = document.createElement("option");
            $option.value = interest.id;
            $option.textContent = interest.name;

            // Checks if the option is the related interest of the event and selects it is true
            console.log(relatedInterest.id, interest.id);
            if (relatedInterest.id === interest.id) {
              document
                .querySelector("option[selected]")
                .attributes.removeNamedItem("selected");
              $option.setAttribute("selected", "");
            }
            $interestSelect.appendChild($option);
          });
        })
        .then(() => {
          // [ ] TODO make the activities's related interest the selected value
          const interestSelect = document.querySelector("select");
          selectInst = M.FormSelect.init(interestSelect);
        });
    })
    .catch((err) => console.log(err));
});

const updateActivity = async (event) => {
  event.preventDefault();

  const title = document
    .querySelector('input[name="activity-title"]')
    .value.trim();
  const description = document.querySelector("#description").value;
  const interest_id = selectInst.getSelectedValues()[0];
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

  const activityId = window.location.toString().split("/")[
    window.location.toString().split("/").length - 2
  ];

  const response = await fetch(`/api/activities/${activityId}`, {
    method: "PUT",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.ok) {
    window.location.replace(`/activity/${activityId}`);
  } else {
    response.json().then((data) => console.log(data));
    alert(response.statusText);
  }
};

document
  .querySelector("#edit-activity-form")
  .addEventListener("submit", updateActivity);
