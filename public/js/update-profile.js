async function updateProfiles(event) {
    event.preventDefault();
  //I don't actually don't know where dietary preferences is
    const title = document.querySelector('input[name="username"]').value.trim();
    const id = window.location.toString().split('/')[
      window.location.toString().split('/').length - 1
    ];
    const response = await fetch(`/api/users/${id}`, {
      method: 'PUT',
      body: JSON.stringify({
        username,
        zip


      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
  
    if (response.ok) {
      document.location.replace('/browsing/');
    } else {
      alert(response.statusText);
    }
  }
  //I dont know what this button will be called but maybe the class will be edit post form
  document.querySelector('.edit-post-form').addEventListener('submit', updateProfiles);