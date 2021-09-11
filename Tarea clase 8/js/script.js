const API_KEY = 'api_key=b784839cd3bba63f1b0cd722ec0b10e2';
const BASE_URL = 'https://api.themoviedb.org/3';
const API_URL = BASE_URL + '/tv/popular?'
+API_KEY;

const IMG_URL = '';
const searchURL = BASE_URL+ '/search/movie?'+API_KEY;
const main =document.getElementById('main');
const form =document.getElementById('form');
const search = document.getElementById('search')
getMovies(API_URL)

function getMovies(url) {
    fetch (url).then(res  => res.json()).then(data => {
        console.log(data);
        console.log(data.results);
        showMovies(data.results);
    })
}


function showMovies(data) {
      main.innerHTML = '';

    data.forEach(movie => {
        const {title, poster_path, vote_average,overview} = movie;

     const peliculaEl = document.createElement('div');
     peliculaEl.classList.add('movie');
     peliculaEl.innerHTML = ` 
     <img src="${IMG_URL+poster_path}" alt="${title}">
     <div class="movie-info">
         <h3>${title}</h3>
         <span class="${getColor(vote_average)}">${vote_average}</span>
     </div>
     <div class="overview">
      ${overview}
     </div>
 
     `
      main.appendChild(peliculaEl);  
    })
}

function getColor (vote) {
    if (vote >= 8 ) {
        return 'green'
    }else if (vote >= 5) {
        return 'orange'
    }else{
        return 'red'
    }
}

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const searchTerm =  search.value;

    if(searchTerm) {
        getMovies(searchURL+'&query='+searchTerm)
    }
})