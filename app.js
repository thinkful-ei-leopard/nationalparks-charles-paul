

// put your own value below!
const apiKey = 'gxV7x3UZvBAkTBWxquorigyNAHE7qA5cB2VbIk7a'; 
const searchURL = 'https://developer.nps.gov/api/v1/parks';

function formatQueryParams(params) {
  const queryItems = Object.keys(params)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`);
  return queryItems.join('&');
}

function displayResults(responseJson) {
  // if there are previous results, remove them
  console.log(responseJson);
  $('#results-list').empty();
  // iterate through the items array
  for (let i = 0; i < responseJson.items.length; i++){
    // for each video object in the items 
    //array, add a list item to the results 
    //list with the video title, description,
    //and thumbnail
    $('#results-list').append(
      `<li><h3>${responseJson.items[i].snippet.title}</h3>
      <p>${responseJson.items[i].snippet.description}</p>
      <img src='${responseJson.items[i].snippet.thumbnails.default.url}'>
      </li>`
    );}
  //display the results section  
  $('#results').removeClass('hidden');
}

function getStateParks(query, limit=10, stateAbv) {
  const params = {
    api_key: apiKey,
    q: query,
    stateCode: stateAbv,  
    limit,
  };
  const queryString = formatQueryParams(params);
  const url = searchURL + '?' + queryString;

  console.log(url);

  fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(responseJson => displayResults(responseJson))
    .catch(err => {
      $('#js-error-message').text(`Something went wrong: ${err.message}`);
    });
}

function watchForm() {
  $('form').submit(event => {
    event.preventDefault();
    const searchTerm = $('#js-search-term').val();
    const limit = $('#js-max-results').val();
    const stateAbv = $('#states').val();
    getStateParks(searchTerm, limit, stateAbv);
  });
}

$(watchForm);