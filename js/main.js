const accessKey = "djMGf1mxgQPiJnzoVhPW4W8taH3T3MtvuCyl33Aa3P0";
const form = document.querySelector("form");
const searchBar = document.querySelector("#search-bar");
const searchResults = document.querySelector(".search-results");
const showMoreButton = document.querySelector("#show-more-button");

let inputData = "";
let page = 1;

async function searchImages() {
  inputData = searchBar.value;
  const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accessKey}`;
  const response = await fetch(url);
  const data = await response.json();
  if (page === 1) {
    searchResults.innerHTML = "";
  }
  const results = data.results;
  results.map((result) => {
    const imageWrapper = document.createElement("div");
    imageWrapper.classList.add("search-result");
    const image = document.createElement("img");
    image.src = result.urls.small;
    image.alt = result.alt_description;
    const imageLink = document.createElement("a");
    imageLink.href = result.links.html;
    imageLink.target = "_blank";
    imageLink.textContent = result.alt_description;
    imageWrapper.appendChild(image);
    imageWrapper.appendChild(imageLink);
    searchResults.appendChild(imageWrapper);
  });
  page++;
  if (page > 1) {
    showMoreButton.style.display = "block";
  }
}
form.addEventListener("submit", (event) => {
  event.preventDefault();
  page = 1;
  searchImages();
});
showMoreButton.addEventListener("click", () => {
  searchImages();
});
