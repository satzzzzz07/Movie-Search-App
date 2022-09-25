"use strict";

// Variables
const btn = document.getElementById("submit");
const inpValue = document.getElementById("search");
let initialArr = [];
let finalArray = [];
let error = "Better luck nex time :P";
let watchList = [];
let finalWatchlist = [];

async function initalAPICall() {
  // API Call
  const res = await fetch(
    `https://www.omdbapi.com/?apikey=3a9e34e3&s=${inpValue.value}`
  );
  const data = await res.json();

  // ADD ELEMENTS IN A ARRAY
  for (let i = 0; i < 10; i++) {
    initialArr.push(data.Search[i]);
  }
  return initialArr;
}

async function finalAPICall() {
  // add value to finalArray for rendering HTML
  finalArray = await initalAPICall();

  for (let j = 0; j < finalArray.length; j++) {
    fetch(`https://www.omdbapi.com/?apikey=3a9e34e3&i=${finalArray[j].imdbID}`)
      .then((response) => response.json())
      .then((data1) => {
        document.getElementById("main-cards").innerHTML += `
        <div class="card">
            <div class="img-card">
              <img
                src="${data1.Poster}"
                alt="movie-poster"
                id="img-card-el"
              />
            </div>
            <div class="text-card">
              <h5>
                ${data1.Title}
                <span>         <img src="images/star.png" alt="movie-rating" />  ${data1.imdbRating}</span>
              </h5>
              <div class="main-3">
                <p>${data1.Runtime}</p>
                <p>${data1.Genre}</p>
                <div id="watchlist">
                  <img
                    src="images/Icon.png"
                    alt="addd to watchlist"
                    id="add-to-watchlist"
                    onclick = "addToWatchlist(${j})"
                  />
                  <p>Watchlist</p>
                </div>
              </div>
              <p class="plot">
              ${data1.Plot}
              </p>
            </div>
          </div>
          <hr />
        `;
      });
  }
}

const addToWatchlist = (par) => {
  watchList.push(finalArray[par]);
  localStorage.setItem("watchList", JSON.stringify(watchList));
};

btn.addEventListener("click", () => {
  // Data cleanUp Array 1
  initialArr = [];

  // Clear HTML RNEDER LIST
  document.getElementById("main-cards").innerHTML = "";

  // data clean up 2
  finalArray = [];

  // Remove the initial page design
  document.getElementById("initial-load-elements").classList.add("hidden");

  // initial API Values
  finalAPICall();
});

// RENDER Watchlist Page Elements
function finalRender() {
  if (localStorage.getItem("watchList") === null) {
    finalWatchlist = [];
    // Add initial design on watchlist page
    document.getElementById("initial-wat-load").classList.remove("hidden");
  } else {
    // Remove initial design on watchlist page
    document.getElementById("initial-wat-load").classList.add("hidden");
    // Call renderWatchlist function
    renderWatchlist();
  }
}

function renderWatchlist() {
  // Add elements to a new ARRAY for rendering
  finalWatchlist.push(JSON.parse(localStorage.getItem("watchList")));
  console.log(finalWatchlist);
  // Reset HTMl Content for loading updated  watchlist
  document.getElementById("main-cards-watchlist").innerHTML = ``;
  // Render
  for (
    let k = 0;
    k < JSON.parse(localStorage.getItem("watchList")).length;
    k++
  ) {
    // console.log(finalWatchlist[0][k]);
    fetch(
      `https://www.omdbapi.com/?apikey=3a9e34e3&i=${finalWatchlist[0][k].imdbID}`
    )
      .then((resp) => resp.json())
      .then((data2) => {
        document.getElementById("main-cards-watchlist").innerHTML += `
      <div class="card">
          <div class="img-card">
            <img
              src="${data2.Poster}"
              alt="movie-poster"
              id="img-card-el"
            />
          </div>
          <div class="text-card">
            <h5>
              ${data2.Title}
              <span>         <img src="images/star.png" alt="movie-rating" />  ${data2.imdbRating}</span>
            </h5>
            <div class="main-3">
              <p>${data2.Runtime}</p>
              <p>${data2.Genre}</p>
              <div id="watchlist">
                <img
                  src="images/minus.png"
                  alt="addd to watchlist"
                  id="add-to-watchlist remove-from-watchlist"
                  onclick = "removeFromWatchlist(${k})"
                />
                <p>Remove</p>
              </div>
            </div>
            <p class="plot">
            ${data2.Plot}
            </p>
          </div>
        </div>
        <hr />
      `;
      });
  }
}

function removeFromWatchlist(parr) {
  const value = JSON.parse(localStorage.getItem("watchList"));
  value.splice(parr, 1);
  localStorage.setItem("watchList", JSON.stringify(value));
  renderWatchlist();
  document.getElementById("popup-f5").style.display = "block";
  setTimeout(() => {
    document.getElementById("popup-f5").style.display = "none";
  }, 1500);
}

finalRender();
