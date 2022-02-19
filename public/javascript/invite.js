const $inviteForm = document.querySelector("#inviteForm");
const $inviteSelect = document.querySelector("#inviteSelect");
let inviteSelectInst;

document.addEventListener("DOMContentLoaded", () => {
  const $inviteModal = document.querySelectorAll("#inviteModal");
  const inviteModalInst = M.Modal.init($inviteModal, {
    preventScrolling: false,
  });

  populateUsers().then(() => {
    inviteSelectInst = M.FormSelect.init($inviteSelect);
  });

  document
    .querySelector("#sendInvitationsButton")
    .addEventListener("click", sendInvitationsButtonHandler);
});

const populateUsers = async () => {
  return await fetch("/api/users")
    .then((response) => response.json())
    .then((apiUserData) => {
      apiUserData.forEach((user) => {
        let $option = document.createElement("option");
        $option.value = user.id;
        $option.textContent = user.username;
        $inviteSelect.appendChild($option);
      });
    });
};

const sendInvitationsButtonHandler = (event) => {
  const values = inviteSelectInst.getSelectedValues();

  if (values[0] === "") {
    console.log("empty");
    return;
  }

  const activity_id = location.toString().split("/")[
    location.toString().split("/").length - 1
  ];

  values.forEach((value) => {
    fetch("/api/invitations", {
      method: "POST",
      body: JSON.stringify({
        user_id: value,
        activity_id: activity_id,
      }),
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.json())
      .then((apiInvitationData) => console.log(apiInvitationData))
      .catch((err) => {
        console.log(err);
      });
  });

  console.log(values);
};
