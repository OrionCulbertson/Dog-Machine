//Links for the app
const DOG_LINK = 'https://dog.ceo/api/breeds/image/random';
const WIKI_SEARCH = `https://en.wikipedia.org/w/api.php?action=query&list=search&prop=info&inprop=url&utf8=&format=json&origin=*&srlimit=3&srsearch=`;
const WIKI_ARTICLE_SEARCH = `https://en.wikipedia.org/w/api.php?format=json&action=query&origin=*&prop=extracts&exintro&explaintext&redirects=1&titles=`;

//Elements from webpage
const dogImg = document.getElementById('dogPic');
const fetchButton = document.getElementById('fetcher');
const breedNameHeader = document.getElementById('breedName');
const breedInfoParagraph = document.getElementById('dogInfo');

const fetchDog = () => {
  fetch(DOG_LINK)
    .then((response) => response.json())
    .then((json) => {
      // console.log(json);
      dogImg.src = json.message;

      //Get Dog breed from Dog API Link
      let breed = json.message.split('/')[4].split('-').reverse().join(' ');
      // console.log(breed);
      
      //Search Wikipedia for dog breed
      fetch(`${WIKI_SEARCH}${breed} dog breed`)
        .then((res) => res.json())
        .then((json) => {
          let title = json.query.search[0].title;
          breedNameHeader.innerText = title;
          // console.log(title);

          //Grab first returned article title
          fetch(`${WIKI_ARTICLE_SEARCH}${title}`)
            .then((res) => res.json())
            .then((json) => {
              for (let id in json.query.pages) {
                // console.log(json.query.pages[id].extract);
                let info = json.query.pages[id].extract;
                breedInfoParagraph.innerText = `\t${info}`;
              }
            });
        });
    });
};

fetchButton.addEventListener('click', fetchDog);
