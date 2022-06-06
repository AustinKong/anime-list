const {
    ipcRenderer
} = require("electron");

var animeDataFull;

ipcRenderer.send("createAnimeDataPage2");
ipcRenderer.on("createAnimeDataPage2", (event, data) => {
    // Define our query variables and values that will be used in the query request
    var variables = {
        id: parseInt(data.id)
    };
    console.log(parseInt(data.id));
    // Define the config we'll need for our Api request
    var url = 'https://graphql.anilist.co',
        options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({
                query: queryLong,
                variables: variables
            })
        };

    fetch(url, options).then(handleResponse)
        .then(output => {
            animeDataFull = output.data.Media;
            SetupPage();
        })
        .catch(handleError);
})

function SetupPage() {
    document.title = animeDataFull.title.english;

    console.log(animeDataFull);

    document.getElementById("banner").src = animeDataFull.bannerImage;
    document.getElementById("coverImage").src = animeDataFull.coverImage.large;
    document.getElementById("title").textContent = animeDataFull.title.english;
    document.getElementById("description").innerHTML = animeDataFull.description;

    for (var i = 0; i < animeDataFull.genres.length; i++) {
        const label = document.createElement('p');
        label.classList.add("genresLabel");
        label.textContent = animeDataFull.genres[i];
        document.getElementById("genres").appendChild(label);
    }

    var lists = ReadLists();

    for (var i = 0; i < lists.length; i++) {
        const item = document.createElement('a');
        item.textContent = lists[i];
        item.dataset.listName = lists[i];
        const onClick = (event) => {
            AddToListSelectionClick(event.target.dataset.listName);
        }
        item.addEventListener('click', onClick);
        document.getElementById("addToListDropdown").appendChild(item);
        
    }

    document.getElementById("loading").remove();
}

function ToggleAddToListDropdown() {
    document.getElementById("addToListDropdown").classList.toggle("show");
}

function AddToListSelectionClick(listName){
    console.log(listName);
    var toBeSavedAnimeData = {
        id: animeDataFull.id,
    
        title: {
            english: animeDataFull.title.english,
            native: animeDataFull.title.native
        },
    
        coverImage: animeDataFull.coverImage
    }
    console.log(toBeSavedAnimeData);
    AddAnimeToList(listName, toBeSavedAnimeData);
}

// Close the dropdown if the user clicks outside of it
window.onclick = function (event) {
    if (!event.target.matches('.dropbtn')) {
        var dropdowns = document.getElementsByClassName("dropdown-content");
        var i;
        for (i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
            }
        }
    }
}