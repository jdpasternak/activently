
async function signupFormHandler(event) {
    event.preventDefault();
  
    const username = document.querySelector('#username-signup').value.trim();
    const email = document.querySelector('#email-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();
    const userDietaryPrefs = document.querySelector("#UserDietaryPrefs");
    const interests = document.querySelector()
  
    if (username && email && password && userDietaryPrefs && interests) {
      const response = await fetch('/api/users', {
        method: 'post',
        body: JSON.stringify({
          username,
          email,
          pass,
          userDietaryPrefs,
          interests
        }),
        headers: { 'Content-Type': 'application/json' }
      });
  
      if (response.ok) {
        document.location.replace('/browsing/');
      } else {
        alert(response.statusText);
      }
    }
  }
  document.querySelector('.signup-form').addEventListener('submit', signupFormHandler);