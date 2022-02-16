async function newActivity(event) {
    event.preventDefault();
  
    const title = document.querySelector('input[name="activity_title"]').value;
    const description = document.querySelector('input[name="description"]').value;
    const location = document.querySelector('input[name="zip"]').value;
    const occurrence = document.querySelector('input[name="date"]').value;
    // need to grab the id and I will look it up tomorrow
    const organizer_id = document.querySelector('label[class="organizer-id"]').value;
    //how do I do a boolean
    const is_private = document.querySelector('checkbox[name="is-private"]').value;

    const seats = document.querySelector('input[name="seats"]')
    function interests() { 
      for (const option of document.getElementById('interests')) {
      console.log(option);
}
    }
    const response = await fetch(`/api/activities`, {
      method: 'POST',
      body: JSON.stringify({
        title,
        description,
        location,
        occurrence, 
        organizer_id,
        is_private,
        seats
       
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
  // const interests = await fetch("api/interest",{
  //   method: "GET",
  //   body: JSON.stringify({
  //    interest.name,

  //   }),
  //   headers: {
  //     'Content-Type': 'application/json'
  //   }
  // })
  // if (response.ok){
  //   document.location()
  // }
  
  document.querySelector('.new-Activity').addEventListener('submit', newActivity);