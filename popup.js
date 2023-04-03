// A2Z F17
// Daniel Shiffman
// http://shiffman.net/a2z
// https://github.com/shiffman/A2Z-F17

// This code runs when the pop up opens

// Wordnik API
var wordnik1 = 'http://api.wordnik.com:80/v4/word.json/'
var wordnik2 = '/definitions?limit=1&includeRelated=true&useCanonical=false&includeTags=false';
var api_key  = '&api_key=48dd829661f515d5abc0d03197a00582e888cc7da2484d5c7';

async function setup() {
  noCanvas();
  // This is a way of getting a global variable from the background script
  var word = chrome.extension.getBackgroundPage().word;

  // Replace with your OpenAI API key and endpoint
  const apiKey = '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';
  const endpoint = 'https://api.openai.com/v1/completions';

  // Query the OpenAI API
  const prompt = `Explain the following text in simple terms: "${word}"`;
  console.log('asking for fetch requestion');
  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      "model": "text-davinci-003",
      "prompt": prompt,
      "max_tokens": 50,
      "n": 1,
      "stop": null,
      "temperature": 1,
    })
  });

  const data = await response.json();
  gotData(data);

  // And update the DOM to show the definition
  function gotData(data) {
    console.log('yes got data');
    var p = select('#definition');
    if (data.choices && data.choices[0]) {
      p.html(data.choices[0].text.trim());
    } else {
      p.html('Something went wrong.');
    }
  }

}
