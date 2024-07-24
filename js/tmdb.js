// TMDB
const API_KEY = 'api_key=c8c429e199695d9d211a02cde51d4817'
const BASE_URL = 'https://api.themoviedb.org/3/'
const API_URL = BASE_URL + 'discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&' + API_KEY
const IMG_URL = 'https://image.tmdb.org/t/p/w500'
const SEARCH_URL = BASE_URL + 'search/movie?'+ API_KEY

const genres = [
    {
    id: 28,
    name: "Action"
    },
    {
    id: 12,
    name: "Adventure"
    },
    {
    id: 16,
    name: "Animation"
    },
    {
    id: 35,
    name: "Comedy"
    },
    {
    id: 80,
    name: "Crime"
    },
    {
    id: 99,
    name: "Documentary"
    },
    {
    id: 18,
    name: "Drama"
    },
    {
    id: 10751,
    name: "Family"
    },
    {
    id: 14,
    name: "Fantasy"
    },
    {
    id: 36,
    name: "History"
    },
    {
    id: 27,
    name: "Horror"
    },
    {
    id: 10402,
    name: "Music"
    },
    {
    id: 9648,
    name: "Mystery"
    },
    {
    id: 10749,
    name: "Romance"
    },
    {
    id: 878,
    name: "Science Fiction"
    },
    {
    id: 10770,
    name: "TV Movie"
    },
    {
    id: 53,
    name: "Thriller"
    },
    {
    id: 10752,
    name: "War"
    },
    {
    id: 37,
    name: "Western"
    }
]

const genresList = document.querySelector('.genresList')

let selectedGenre = []

setGenre()
function setGenre() {
  genresList.innerHTML = ''
  genres.forEach(genre => {
    const t = document.createElement('div')
    t.classList.add('genre')
    t.id = genre.id
    t.innerText = genre.name
    t.addEventListener('click', () => {
      if(selectedGenre.length == 0) {
        selectedGenre.push(genre.id)
      } else {
          if(selectedGenre.includes(genre.id)) {
            selectedGenre.forEach((id, idx) => {
              if(id == genre.id) {
                selectedGenre.splice(idx, 1)
              }
            })
        } else {
          selectedGenre.push(genre.id)
        }
      }
      console.log(selectedGenre)
      getMoviesByGenre(API_URL + '&with_genres='+encodeURI(selectedGenre.join(',')))     
    })
    genresList.append(t)
  })
}


const resultMovies = document.querySelector('.resultMovies')
const formSearchMovies = document.querySelector('.formSearchMovies')
const searchMoviesInputText = document.querySelector('.searchMoviesInputText')

const swiperWrapper = document.querySelector('.swiper-wrapper')
const swiperWrapper2 = document.querySelector('.swiper-wrapper2')
const swiperWrapper3 = document.querySelector('.swiper-wrapper3')

const modalContainer = document.querySelector('.modal-container')
const modalContainer2 = document.querySelector('.modal-container2')
const modalContainer3 = document.querySelector('.modal-container3')

//


// GET MOVIES
getMovies(API_URL)
getLatestMovies(API_URL)
getMoviesByGenre(API_URL)

function getMovies(url) {
    fetch(url)  
    .then(response => response.json())    
    .then(data => {
        console.log(data.results)
        showMovies(data.results)
    })
}

function getLatestMovies(url) {
    fetch(url)  
    .then(response => response.json())    
    .then(data => {
    console.log(data.results)
    showLatestMovies(data.results)
    })
}

function getMoviesByGenre(url) {
    fetch(url)  
    .then(response => response.json())    
    .then(data => {
    console.log(data.results)
    showMoviesByGenre(data.results)
    })
}


// SHOW MOVIES
function showMovies(data) {
    resultMovies.innerHTML = `Result for all `+ searchMoviesInputText.value + ` movies`
    swiperWrapper.innerHTML = ''  
    
    modalContainer.innerHTML = ''

    data.forEach(movie => {
        // destructuration d'objets
        const {id, title, poster_path, overview, genre_ids, cast} = movie    
        
        let date = new Date(movie.release_date)
        let year = date.getFullYear()

        let rating = Math.round(movie.vote_average*10)/10
        
        // creation du swiper
        const movieElements = document.createElement('div')
        movieElements.classList.add('swiper-slide')
        movieElements.classList.add('item')
        movieElements.classList.add('card')
        movieElements.innerHTML = `
            <!-- Card Modal & Hover -->    
            <div class="card"  data-bs-toggle="modal" data-bs-target="#myModal_${id}" data-bs-whatever="${id}">
                <img src="${poster_path? IMG_URL+poster_path: "https://placehold.co/230x340/141517/FFF?text=No+Poster+Found"}" class="card-img-top" alt="${title}" title="${title}">
                <div class="card-body">
                    <h5 class="card-title">${title}</h5>
                    <p class="card-year">${year}</p>
                    <p class="card-genre">${genre_ids}</p>
                    <img src="img/main/stars.png" class="card-stars">
                    <p class="card-rank">${rating}</p>
                </div>
            </div>
        `   
        swiperWrapper.appendChild(movieElements)  
        
        // creation du modal
        const modalElements = document.createElement('div')
        modalElements.classList.add('modal')
        modalElements.classList.add('modal-lg')
        modalElements.classList.add('fade')
        modalElements.classList.add('text-light')
        modalElements.setAttribute("id", `myModal_${id}`)
        modalElements.setAttribute("data-bs-theme", 'dark')
        modalElements.innerHTML = `
            <div class="modal-dialog ">
                <div class="modal-content">                
                    <!-- Modal Header -->
                    <div class="modal-header">
                        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                    </div>                
                    <!-- Modal body -->
                    <div class="modal-body">
                        <div class="row">
                            <div class="col-md-4">
                                <img src="${poster_path? IMG_URL+poster_path: "https://placehold.co/230x340/141517/FFF?text=No+Poster+Found"}" class="card-img-top" alt="${title}" title="${title}">
                            </div>
                            <div class="col-md-8">
                                <h4 class="modal-title red">${title}</h4>
                                <p>${year}</p>                                
                                <p><img src="img/main/stars.png" class="card-stars"> ${rating}</p>
                                <p>${overview}</p>
                            </div>
                        </div>
                    </div>                
                    <!-- Modal footer -->
                    <div class="modal-footer">
                        <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Close</button>
                    </div>                
                </div>
            </div>
        `
        modalContainer.appendChild(modalElements)
    })
}

// SEARCH
formSearchMovies.addEventListener('click', (e) => {  
  const searchResult = searchMoviesInputText.value
  e.preventDefault()
  if(searchResult) {
    getMovies(SEARCH_URL+'&query='+searchResult)
  } else {
    getMovies(API_URL)
  }
})

/***********************************************************/

// SHOW LATESTMOVIES
function showLatestMovies(data) {
    swiperWrapper2.innerHTML = ''  
    
    modalContainer2.innerHTML = ''

    data.forEach(movie => {
        // destructuration d'objets
        const {id, title, poster_path, overview, genre_ids} = movie    
        
        let date = new Date(movie.release_date)
        let year = date.getFullYear()

        let rating = Math.round(movie.vote_average*10)/10
        
        // creation du swiper
        const movieElements2 = document.createElement('div')
        movieElements2.classList.add('swiper-slide')
        movieElements2.classList.add('item')
        movieElements2.classList.add('card')
        movieElements2.innerHTML = `
            <!-- Card Modal & Hover -->    
            <div class="card"  data-bs-toggle="modal" data-bs-target="#myModal2_${id}" data-bs-whatever="${id}">
                <img src="${poster_path? IMG_URL+poster_path: "https://placehold.co/230x340/141517/FFF?text=No+Poster+Found"}" class="card-img-top" alt="${title}" title="${title}">

                <div class="card-body">
                    <h5 class="card-title">${title}</h5>
                    <p class="card-year">${year}</p>
                    <p class="card-genre">${genre_ids}</p>
                    <img src="img/main/stars.png" class="card-stars">
                    <p class="card-rank">${rating}</p>
                </div>
            </div>
        `   
        swiperWrapper2.appendChild(movieElements2)  
        
        // creation du modal
        const modalElements2 = document.createElement('div')
        modalElements2.classList.add('modal')
        modalElements2.classList.add('modal-lg')
        modalElements2.classList.add('fade')
        modalElements2.classList.add('text-light')
        modalElements2.setAttribute("id", `myModal2_${id}`)
        modalElements2.setAttribute("data-bs-theme", "dark")
        modalElements2.innerHTML = `
            <div class="modal-dialog">
                <div class="modal-content">                
                    <!-- Modal Header -->
                    <div class="modal-header">
                        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                    </div>                
                    <!-- Modal body -->
                    <div class="modal-body">
                        <div class="row">
                            <div class="col-md-4">
                                <img src="${poster_path? IMG_URL+poster_path: "https://placehold.co/230x340/141517/FFF?text=No+Poster+Found"}" class="card-img-top" alt="${title}" title="${title}">
                            </div>
                            <div class="col-md-8">
                                <h4 class="modal-title red">${title}</h4>
                                <p>${year}</p>                                
                                <p><img src="img/main/stars.png" class="card-stars"> ${rating}</p>
                                <p>${overview}</p>
                            </div>
                        </div>
                    </div>                  
                    <!-- Modal footer -->
                    <div class="modal-footer">
                        <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Close</button>
                    </div>                
                </div>
            </div>
        `
        modalContainer2.appendChild(modalElements2)
    })
}
/***********************************************************/

// SHOW BYGENRE

function showMoviesByGenre(data) {
    swiperWrapper3.innerHTML = ''  
    
    modalContainer3.innerHTML = ''

    data.forEach(movie => {
        // destructuration d'objets
        const {id, title, poster_path, overview, genre_ids} = movie    
        
        let date = new Date(movie.release_date)
        let year = date.getFullYear()

        let rating = Math.round(movie.vote_average*10)/10
        
        // creation du swiper
        const movieElements3 = document.createElement('div')
        movieElements3.classList.add('swiper-slide')
        movieElements3.classList.add('item')
        movieElements3.classList.add('card')
        movieElements3.innerHTML = `
            <!-- Card Modal & Hover -->    
            <div class="card"  data-bs-toggle="modal" data-bs-target="#myModal3_${id}" data-bs-whatever="${id}">
                <img src="${poster_path? IMG_URL+poster_path: "https://placehold.co/230x340/141517/FFF?text=No+Poster+Found"}" class="card-img-top" alt="${title}" title="${title}">
                <div class="card-body">
                    <h5 class="card-title">${title}</h5>
                    <p class="card-year">${year}</p>
                    <p class="card-genre">${genre_ids}</p>
                    <img src="img/main/stars.png" class="card-stars">
                    <p class="card-rank">${rating}</p>
                </div>
            </div>
        `   
        swiperWrapper3.appendChild(movieElements3)  
        
        // creation du modal
        const modalElements3 = document.createElement('div')
        modalElements3.classList.add('modal')
        modalElements3.classList.add('modal-lg')
        modalElements3.classList.add('fade')
        modalElements3.classList.add('text-light')
        modalElements3.setAttribute("id", `myModal3_${id}`)
        modalElements3.setAttribute("data-bs-theme", "dark")
        modalElements3.innerHTML = `
            <div class="modal-dialog">
                <div class="modal-content">                
                    <!-- Modal Header -->
                    <div class="modal-header">
                        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                    </div>                
                    <!-- Modal body -->
                    <div class="modal-body">
                        <div class="row">
                            <div class="col-md-4">
                                <img src="${poster_path? IMG_URL+poster_path: "https://placehold.co/230x340/141517/FFF?text=No+Poster+Found"}" class="card-img-top" alt="${title}" title="${title}">
                            </div>
                            <div class="col-md-8">
                                <h4 class="modal-title red">${title}</h4>
                                <p>${year}</p>                                
                                <p><img src="img/main/stars.png" class="card-stars"> ${rating}</p>
                                <p>${overview}</p>
                            </div>
                        </div>
                    </div>                 
                    <!-- Modal footer -->
                    <div class="modal-footer">
                        <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Close</button>
                    </div>                
                </div>
            </div>
        `
        modalContainer3.appendChild(modalElements3)
    })
}