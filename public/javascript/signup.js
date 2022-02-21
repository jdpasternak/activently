const $signupForm = document.querySelector(".signup-form");

const signupFormhandler = async (event) => {
  event.preventDefault();

  const username = $signupForm.querySelector("#username-signup").value.trim();
  const email = $signupForm.querySelector("#email-signup").value.trim();
  const password = $signupForm.querySelector("#password-signup").value;
  const zip = $signupForm.querySelector("#zipcode-signup").value.trim();

  const response = await fetch("/api/users", {
    method: "POST",
    body: JSON.stringify({ username, email, password, zip }),
    headers: { "Content-Type": "application/json" },
  });

  if (response.ok) {
    location.replace("/homepage");
  } else {
    alert(response.statusText);
  }
};

$signupForm.addEventListener("submit", signupFormhandler);
