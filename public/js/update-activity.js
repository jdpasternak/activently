async function updateActivities(event) {
    event.preventDefault();
  
    const title = document.querySelector('input[name="activity-title"]').value.trim();
    //so i dont really understand this code but it seems to work in the 
    const id = window.location.toString().split('/')[
      window.location.toString().split('/').length - 1
    ];
    const response = await fetch(`/api/activities/${id}`, {
      method: 'PUT',
      body: JSON.stringify({
        title,
        description,
        location,
        occurrence, 
        organizer_id,
        is_private,
        seats,
        interest_id,
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
  //I dont know what this button will be called but maybe the class will be edit activity form
  document.querySelector('.edit-activity-form').addEventListener('submit', updateActivities);