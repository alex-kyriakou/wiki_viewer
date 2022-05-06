const url =
  "https://en.wikipedia.org/w/api.php?action=query&list=search&srlimit=20&format=json&origin=*&srsearch=";

// list=search - perform a full text search
// srsearch="inputValue" - search for page titles or content matching  this value.
// srlimit=20 How many total pages to return.
// format=json json response
// "origin=*" fix cors errors

// const page_url = "href=http://en.wikipedia.org/?curid=${pageid}";

const form = document.querySelector(".form");
const formInput = document.querySelector(".form-input");
const results = document.querySelector(".results");
const searchBtn = document.getElementById("search-btn");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const inputValue = formInput.value;

  if (!inputValue) {
    results.innerHTML =
      '<div class="results error"> Please enter a valid search term.</div>';
    results.style.opacity = "1";
    return;
  } else {
    results.style.opacity = "1";
  }

  fetchPages(inputValue);
});

const fetchPages = async (searchValue) => {
  results.innerHTML = '<div class="loading"></div>';
  try {
    const response = await fetch(`${url}${searchValue}`);
    const data = await response.json();
    const searchResults = data.query.search;

    if (searchResults.length < 1) {
      results.innerHTML =
        '<div class="results error"> Sorry I couldnt find results.. Try again.</div>';
      return;
    }

    renderResults(searchResults);
  } catch (error) {
    results.innerHTML =
      '<div class="results error">There was an error...</div>';
  }
};

const renderResults = (list) => {
  const cardsList = list
    .map((item) => {
      const { pageid, title, snippet } = item;

      return `      
      <div class="articles"> 
      <a href="http://en.wikipedia.org/?curid=${pageid} target='_blank'">      
      <span></span>
      <h4>${title}</h4>
          <p>
            ${snippet}
          </p>
          </a>
        </div>     
      
    `;
    })
    .join("");

  results.innerHTML = `${cardsList} `;
};
