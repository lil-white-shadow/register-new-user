const endpointURL = "https://frontend-take-home.fetchrewards.com/form";

const handleError = response => {

  if (!response.ok) { 
     throw Error(response.statusText);
  } else {
     return response;
  }
};

export function getOptions() {

  return fetch(endpointURL)
    .then(handleError)
    .then(res => res.json())
    .catch(console.log)
}

export function postForm(formInputs) {

  return fetch(endpointURL, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(formInputs)
  })
    .then(handleError)
    .then(response => response.status)
    .catch(console.log)
}
