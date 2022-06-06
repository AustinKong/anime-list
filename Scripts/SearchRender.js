const {
    ipcRenderer
} = require("electron");

document.getElementById("searchInput").addEventListener("keypress", function (event) {
    // If the user presses the "Enter" key on the keyboard
    if (event.key === "Enter") {
        // Cancel the default action, if needed
        event.preventDefault();
        // Trigger the button element with a click
        document.getElementById("searchButton").click();
    }
});

function RunSearch() {
    input = document.getElementById('searchInput').value;

    // Define our query variables and values that will be used in the query request
    var variables = {
        search: input,
        page: 1,
        perPage: 6
    };

    // Define the config we'll need for our Api request
    var url = 'https://graphql.anilist.co',
        options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({
                query: querySearch,
                variables: variables
            })
        };

    fetch(url, options).then(handleResponse)
        .then(output => {
            ShowSearchResults(output.data.Page.media)

        })
        .catch(handleError);
}

function ShowSearchResults(list) {
    document.getElementById('searchResults').remove();
    const searchResults = document.createElement("div");
    searchResults.id = "searchResults";
    document.body.appendChild(searchResults);

    list.forEach(element => {
        CreatePanel(element);
    });
}

function CreatePanel(animeData) {
    const tile = document.createElement("div");
    tile.classList.add("tile");
    tile.dataset.id = animeData.id;

    console.log(animeData);

    const cover = document.createElement("img");
    cover.src = animeData.coverImage.large;

    const onClick = (event) => {
        PanelOnClick(event.target.parentElement.dataset.id);
    }
    cover.addEventListener('click', onClick);

    const title = document.createElement('h2');
    title.textContent = animeData.title.english;

    tile.appendChild(cover);
    tile.appendChild(title);
    document.getElementById('searchResults').appendChild(tile);
}

function PanelOnClick(animeId) {
    //ipcRenderer.send("createAnimeDataPage1", animeData);
    // Define our query variables and values that will be used in the query request
    var data = {
        id: animeId
    }
    ipcRenderer.send("createAnimeDataPage1", data);
}

function test() {
    // Define our query variables and values that will be used in the query request
    var variables = {
        id: 127911
    };

    // Define the config we'll need for our Api request
    var url = 'https://graphql.anilist.co',
        options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({
                query: queryShort,
                variables: variables
            })
        };

    // Make the HTTP Api request
    fetch(url, options).then(handleResponse)
        .then(data => {
            console.log(data);
            return data;
        })
        .catch(handleError);
}