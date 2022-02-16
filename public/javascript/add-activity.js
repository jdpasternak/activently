async function activityFormHandler(event) {
    event.preventDefault();
  
    const title = document.querySelector('input[name="activity-title"]').value.trim();
    const description = document.querySelector('input[name="activity-description"]').value.trim();
    const location = document.querySelector('input[name="activity-location"]').value;
    const occurrence = document.querySelector('input[name="activity-occurrence"]').value;
    const privacy = document.querySelector('input[name="activity-privacy"]').value;
    const seats = document.querySelector('input[name="activity-seats"]').value;
    const rules = document.querySelector('input[name="activity-rules"]').value.trim();
    const price = document.querySelector('input[name="activity-price"]').value;
    const diet = document.querySelector('input[name="activity-diet"]').value;
    const interest = document.querySelector('input[name="activity-interest"]').value;
  
// conditional to ensure all fields are completed?
    const response = await fetch(`/api/activities`, {
      method: 'POST',
      body: JSON.stringify({
        title,
        description,
        location,
        occurrence,
        seats,
        rules,
        price
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
  
    if (response.ok) {
      document.location.replace('/activities');
    } else {
      alert(response.statusText);
    }
  }
  
  document.querySelector('.new-activity-form').addEventListener('submit', activityFormHandler);