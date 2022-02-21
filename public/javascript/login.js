const $loginForm = document.querySelector(".login-form");

const loginFormHandler = async (event) => {
  event.preventDefault();

  const email = document.querySelector("#email-login").value.trim();
  const password = document.querySelector("#password-login").value;

  const response = await fetch("/api/users/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
    headers: { "Content-Type": "application/json" },
  });

  if (response.ok) {
    location.replace("/homepage");
  } else {
    alert(response.statusText);
  }
};

$loginForm.addEventListener("submit", loginFormHandler);
