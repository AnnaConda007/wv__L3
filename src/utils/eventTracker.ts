function sendEvent(eventType: string, payload: object) {
  const event = {
    type: eventType,
    payload: payload,
    timestamp: Date.now()
  };
  console.log(event);
  fetch('/api/sendEvent', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(event)
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .catch((error) => {
      console.error('Error sending event:', error);
    });
}

export default sendEvent;
