const {
    ipcRenderer
} = require("electron");

ipcRenderer.on("createSearchPage2", (event, data) => {
    document.getElementById('searchInput').value = data;
    RunSearch();
})


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
    filterType = document.getElementById('mediaType').value;
    filterSFW = document.getElementById('mediaSFW').value;

    var queryType;

    if(filterType == 'any') queryType = querySearch;
    else if(filterType == 'anime') queryType = querySearchANIME;
    else if(filterType == 'manga') queryType = querySearchMANGA;

    console.log(!(filterSFW=='sfw'));

    // Define our query variables and values that will be used in the query request
    var variables = {
        search: input,
        page: 1,
        perPage: 30,
        isAdult: !(filterSFW=='sfw')
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
                query: queryType,
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
    if(list.length > 0){
        document.getElementById('searchResults').remove();
        const searchResults = document.createElement("div");
        searchResults.id = "searchResults";
        document.body.appendChild(searchResults);
    
        list.forEach(element => {
            CreatePanel(element);
        });
    }
    else{
        document.getElementById("searchResults").innerHTML = document.getElementById("noResultsTemplate").content.cloneNode(true).querySelectorAll("div")[0].innerHTML 
    }
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
    if(animeData.title.english != null){
        title.textContent = animeData.title.english;
    }
    else{
        title.textContent = animeData.title.romaji;
    }

    tile.appendChild(cover);
    tile.appendChild(title);
    document.getElementById('searchResults').appendChild(tile);
}

function PanelOnClick(animeId) {
    var data = {
        id: animeId
    }
    ipcRenderer.send("createAnimeDataPage1", data);
}