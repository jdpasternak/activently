let modalInstances;

document.addEventListener("DOMContentLoaded", () => {
  const $viewUserModal = document.querySelector("#viewUserModal");

  modalInstances = M.Modal.init($viewUserModal);

  document.querySelectorAll("#manageUsers .viewBtn").forEach((element) => {
    element.addEventListener("click", viewUserButtonHandler);
  });
});

const viewUserButtonHandler = (event) => {
  const user_id = event.target.closest("tr").dataset.userId;

  fetch(`/api/users/${user_id}`)
    .then((apiUserData) => apiUserData.json())
    .then((data) => {
      console.log(data);
      const $viewUsername = document.querySelector("#viewUsername");
      const $viewEmail = document.querySelector("#viewEmail");
      const $viewZip = document.querySelector("#viewZip");
      const $viewDietaryPreferences =
        document.querySelector("#viewDietaryPrefs");
      const $viewInterests = document.querySelector("#viewInterests");
      const $viewCommentsCount = document.querySelector("#viewCommentsCount");
      const $viewAttendingCount = document.querySelector("#viewAttendingCount");
      const $viewOrganizingCount = document.querySelector(
        "#viewOrganizingCount"
      );

      $viewUsername.value = data.username;
      $viewEmail.value = data.email;
      $viewZip.value = data.zip;

      // [ ] TODO Render dietary preferences
      //   $viewDietaryPreferences.value = data.

      // [ ] TODO Render dietary preferences
      //   $viewInterests.value = data.

      $viewCommentsCount.textContent = `${data.comments.length} comments`;

      console.log(data.attending);
      // Differentiates between past and upcoming activities
      const pastAttending = data.attending.filter(
        (i) => new Date(i.occurrence) < new Date()
      );
      console.log(pastAttending);
      const futureAttending = data.attending.filter(
        (i) => new Date(i.occurrence) > new Date()
      );
      console.log(futureAttending);
      $viewAttendingCount.textContent = `${data.attending.length} attending`;
      $viewOrganizingCount.textContent = `${data.organizing.length} organizing`;

      M.updateTextFields();
    });
};
