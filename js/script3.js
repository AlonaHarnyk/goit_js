"use strict";

// apiService
const baseUrl = "https://pixabay.com/api/";
const key = "14623087-4c7845c6612c3612d79802be1";
const perPage = 20;
let page = 1;

function fetchImages(query) {
  const requestParams = `?key=${key}&per_page=${perPage}&image_type=photo&orientation=horizontal&q=${query}&page=${page}`;
  return fetch(baseUrl + requestParams)
    .then((response) => response.json())
    .then((parsedResponse) => {
      (function incrementPage() {
        page += 1;
      })();
      return parsedResponse.hits;
    });
}

// helper
function loadMore() {
  const observer = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          observer.unobserve(entry.target);
          getImages();
        }
      });
    }, {
      threshold: 0.5,
    }
  );
  observer.observe(document.querySelector("li:last-child"));
}

// main
const {
  input,
  gallery
} = {
  input: document.querySelector("#search-form"),
  gallery: document.querySelector("ul"),
};

input.addEventListener("input", _.debounce(getImages, 1000));

function getImages() {
  const searchQuery = input.query.value;
  if (searchQuery === '') {
    gallery.innerHTML = ''
    return
  }
  fetchImages(searchQuery).then((images) => {
    const markup = images.map((image) => {
      return `<li> <a href=${image.largeImageURL}>
             <img src= ${image.webformatURL}
             data-source= ${image.largeImageURL}
             alt="image"/>
             </a></li>`;
    }).join('');
    gallery.insertAdjacentHTML("beforeend", markup);
    const imgLinks = document.querySelectorAll("a");
    imgLinks.forEach((imgLink) => {
      imgLink.onclick = (e) => {
        e.preventDefault();
        basicLightbox.create(
          `<img width="1400" height="900" src=${e.target.dataset.source}>`
        ).show();
      };
    });
    loadMore()
  });
}