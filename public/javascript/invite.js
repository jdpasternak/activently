const $inviteForm = document.querySelector("#inviteForm");
const $inviteSelect = document.querySelector("#inviteSelect");
let inviteSelectInst;

document.addEventListener("DOMContentLoaded", () => {
  const $inviteModal = document.querySelectorAll("#inviteModal");
  console.log($inviteModal);
  const inviteModalInst = M.Modal.init($inviteModal, {
    preventScrolling: false,
  });

  populateUsers().then(() => {
    inviteSelectInst = M.FormSelect.init($inviteSelect);
  });
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
