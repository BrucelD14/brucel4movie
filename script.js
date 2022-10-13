const searchButton = document.querySelector('.search-button');
searchButton.addEventListener('click', function(event) {

    event.preventDefault();
    // search button
    const inputKeyword = document.querySelector('.input-keyword');
    fetch('https://api.themoviedb.org/3/search/movie?api_key=6c2abd54075d8a09f315ac2769e60c4e&query=' + inputKeyword.value)
    .then(response => response.json())
    .then(response => {
        const movies = response.results;
        let cards = '';
        movies.forEach(m => cards += showCards(m));
        const movieContainer = document.querySelector('.movie-container');
        movieContainer.innerHTML = cards;


        // detail button
        const modalDetailButton = document.querySelectorAll('.modal-detail-button');
        modalDetailButton.forEach(btn => {
            btn.addEventListener('click', function(event) {
                event.preventDefault();
                const tmdbid = this.dataset.tmdbid;
                fetch('https://api.themoviedb.org/3/movie/'+tmdbid+'?api_key=6c2abd54075d8a09f315ac2769e60c4e')
                .then(response => response.json())
                .then(m => {
                    const movieDetail = showMovieDetails(m);
                    const modalBody = document.querySelector('.modal-body');
                    modalBody.innerHTML = movieDetail;
                })

            });
        });


    });

});

// list film
fetch('https://api.themoviedb.org/3/discover/movie?&api_key=6c2abd54075d8a09f315ac2769e60c4e')
.then(response => response.json())
.then(response => {
    const movies = response.results;
    let cards = '';
    movies.forEach(m => cards += showCards(m));
    const movieContainer = document.querySelector('.movie-container');
    movieContainer.innerHTML = cards});


// function
function showCards(m) {
    return `<div class="col-md-4 my-3">
                <div class="card">
                    <img src="https://image.tmdb.org/t/p/w500/${m.poster_path}" class="card-img-top">
                    <div class="card-body">
                        <h5 class="card-title">${m.title}</h5>
                        <h6 class="card-subtitle mb-2 text-muted">${m.release_date}</h6>
                        <h6 class="card-subtitle mb-2 text-muted">Rating : ${m.vote_average}</h6>
                        <a href="#" class="btn btn-primary modal-detail-button" data-toggle="modal" data-target="#movieDetailModal" data-tmdbid="${m.id}">Show Details</a>
                    </div>
                </div>
            </div>`
}

function showMovieDetails(m) {
    return `<div class="container-fluid">
                <div class="row">
                    <div class="col-md-3">
                        <img src="https://image.tmdb.org/t/p/w500/${m.poster_path}" class="img-fluid">
                    </div>

                    <div class="col-md">
                        <ul class="list-group">
                            <li class="list-group-item"><h4>${m.title} (${m.release_date})</h4></li>
                            <li class="list-group-item"><strong>Rating : </strong>${m.vote_average}</li>
                            <li class="list-group-item"><strong>Popularity : </strong>${m.popularity}</li>
                            <li class="list-group-item"><strong>Synopsis : </strong> <br> ${m.overview}</li>
                        </ul>
                    </div>
                </div>
            </div>`
}