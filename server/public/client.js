console.log('script sourced');

function getArtists() {
    // Axios GET request
    axios.get('/artist').then((response) => {
        // Code that will run on successful response
        // from the server.
        console.log(response);
        // quotesFromServer will be an Array of quotes
        let quotesFromServer = response.data;
        let contentDiv = document.querySelector('#artistTableBody');
        contentDiv.innerHTML = '';
        for(let artist of quotesFromServer) {
            contentDiv.innerHTML += `
                <tr>
                    <td>${artist.name}</td>
                    <td>${artist.born}</td>
                    <td>${artist.died}</td>
                </tr>
            `;
        }
    }).catch((error) => {
        console.log(error);
        alert('Something went wrong.');
    }); // ALWAYS add .catch
}
// TODO Add ajax request for /songs and display on DOM
getArtists();

function getSongs() {
    axios.get('/songs').then((response) => {
        console.log('response');
        let songsFromServer = response.data;
        let contentDiv = document.querySelector('#songTableBody');
        for (let songs of songsFromServer) {
            contentDiv.innerHTML += `
            <tr>
                <td>${songs.title}</td>
                <td>${songs.artist}</td>
            </tr>
            `;
        }
    }).catch((error) => {
        console.log(error);
        alert('Something went wrong.');
    });  
}

getSongs();

function submitArtist(event) {
    event.preventDefault();
    console.log('response from submitArtist');
    let artistName = document.querySelector('#artistName').value;
    let yearBorn = document.querySelector('#yearBorn').value;
    let yearDied = document.querySelector('#yearDied').value;
    let artistForServer = {
        name: artistName,
        born: yearBorn,
        died: yearDied,
    };
    axios.post('/artist', artistForServer).then((response) => {
        console.log(response);
        getArtists();
    }).catch((error) => {
        console.log(error);
        alert('Something went wrong.');
    });
};