const axios = require('axios');

const urlsToCheck = [
  'https://cnn.com',
  'https://google.com',
  'https://yahoo.com',

  
];

async function checkLink(url) {
  try {
    const response = await axios.head(url);
    if (response.status === 200) {
      console.log(`${url} is reachable.`);
    } else {
      console.error(`${url} returned status code ${response.status}.`);
    }
  } catch (error) {
    console.error(`${url} is unreachable. Error: ${error.message}`);
  }
}

async function checkAllLinks() {
  for (const url of urlsToCheck) {
    await checkLink(url);
  }
}

checkAllLinks();
