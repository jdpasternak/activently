async function newActivity(event) {
    event.preventDefault();
  
    const title = document.querySelector('input[id="activity_title"]').value;
    const description = document.querySelector('input[id="description"]').value;
    const location = document.querySelector('input[id="zip"]').value;
    const occurrence = document.querySelector('input[id="date"]').value;
    // need to grab the id and I will look it up tomorrow
    const organizer_id = document.querySelector('input[id=""]').value;
    //how do I do a boolean
    const is_private = document.querySelector('checkbox[id=""]').value;

    const seats = document.querySelector('input[id="seats"]')

    const response = await fetch(`/api/activities`, {
      method: 'POST',
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
      document.location.replace('/browsing');
    } else {
      alert(response.statusText);
    }
  }
  
  document.querySelector('.new-Activity').addEventListener('submit', newActivity);