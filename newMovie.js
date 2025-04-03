
const getMovies = async () => {
    try{
        let MD = localStorage.getItem('mData');
        if (!MD) {
            const moviesDataFetch = await fetch('https://imdb-top-100-movies.p.rapidapi.com/', {
                headers: {
                    'Accept': 'application/json',
                    'x-rapidapi-key': '8ff3611b4amsh085ebacc3a26629p10dcddjsn4960c7480b87',
                    'x-rapidapi-host': 'imdb-top-100-movies.p.rapidapi.com'
                }
            })
            const moviesData = await moviesDataFetch.json();
            localStorage.setItem('mData', JSON.stringify(moviesData));
        }
        
        console.log(JSON.parse(localStorage.getItem('mData')));
        const list = JSON.parse(localStorage.getItem('mData'));
        list.map((item)=>{
            const name = item.title;
            const poster = item.image;
            const rating = item.rating;
            const Overview = item.description;
            const year = item.year;
            const genre = item.genre.join(', ');
            const movie = `<li>
                <div class='bg'>
                    <img src='${poster}'>
                    <h2>${rating}</h2>
                    <h2>${name}</h2>
                    <img src="info.png" id='info' onclick="showInfo(event)">
                </div>
                <div class="showdescrp">
                    <div class="cancel"><button onclick="cancel(event)">x</button></div>
                    <div class="top">
                        <div class="poster"><img src='${poster}'></div>
                        <div class="titleCont">
                            <h1>${name}</h1>
                            <h2>${year}</h2>
                            <h2>${genre}</h2>
                            <h2>${rating}/10</h2>
                        </div>
                    </div>
                    <p></p>
                    <div class="description">${Overview}</div>
                </div>
            </li>`
            document.getElementById('movieContainer').innerHTML += movie;
        })   
    }
    catch(error){
        console.log(error);
    }
}
getMovies();


function showInfo(event) {
    document.getElementById('mainBody').style.opacity = 0.8;
    const movieItem = event.target.closest('li');  // it finds the closest <li> to the clicked button
    const description = movieItem.querySelector('.showdescrp');
    description.style.display = 'block';
}

function cancel(event) {
    document.getElementById('mainBody').style.opacity = 1;
    const movieItem = event.target.closest('li');  // it finds the closest <li> to the clicked button
    const description = movieItem.querySelector('.showdescrp'); 
    description.style.display = 'none';
}