var w = window.innerWidth;
const movieListDiv = document.getElementById("results");
const omdbQuery = "http://www.omdbapi.com/?apikey=59354c85&r=json&type=movie&s=";

document.addEventListener('DOMContentLoaded', function() {
	renderMovies(movieData)
});

/**
 * @typedef Movie
 * @property {string} Title
 * @property {string} Year
 * @property {string} imdbID
 * @property {string} Type
 * @property {string} Poster
 */
/**
 * @type {Movie[]}
 */

/**
 * @param {Movie[]} listOfMovies
 */
function renderMovies(listOfMovies){
    for(movie of listOfMovies){
        let movieCardTitle, movieCardImgSrc, movieCardRelease;
        const movieCard = document.createElement("div")
        movieCard.className = "movie col";
        movieCardTitle = movie.Title;
        movieCardImgSrc = movie.Poster;
        movieCardRelease = movie.Year;
        const movieInnerHTML = `<img class="img-fluid d-flex justify-item-center" src="${movieCardImgSrc}"/><div class="row"><div class="col movieTitle">${movieCardTitle}</div><div class="col releaseDate">${movieCardRelease}</div></div><div class="row pb-3"><div class="col"><button type="button">Add!</button></div></div>`
        // console.log(movieCardTitle, movieCardRelease, movieCardImgSrc)
        movieCard.innerHTML = movieInnerHTML;
        movieListDiv.appendChild(movieCard)
    }
}

//do something here to grab a new list of movies titles matching search terms, then run renderMovies 
const form = document.getElementById("search-form");
const searchBar = document.getElementsByClassName("search-bar")[0];
form.addEventListener("submit", function(event){
    event.preventDefault();
    //Grabbing search bar text
    const searchString = searchBar.value;
    //Making search URL compatible
    const uriSearchString = encodeURIComponent(searchString);
    //Sending Fetch for with modified URL
    fetch(`${omdbQuery}` + uriSearchString)
    .then(response => response.json())
    .then(function(data){
        console.log(data.Search)
        let searchedMovieList = [];
        movieListDiv.innerHTML = "";
        for(movie of data.Search){
            searchedMovieList.push(movie); 
        }
        renderMovies(searchedMovieList)
    })
})


