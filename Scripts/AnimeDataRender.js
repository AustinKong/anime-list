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

var toBeSavedAnimeData;

function SetupPage() {

    if (animeDataFull.title.english != null) document.title = animeDataFull.title.english;
    else document.title = animeDataFull.title.romaji;

    console.log(animeDataFull);

    if (animeDataFull.bannerImage != null) document.getElementById("banner").src = animeDataFull.bannerImage;
    else document.getElementById("banner")

    document.getElementById("coverImage").src = animeDataFull.coverImage.large;

    if (animeDataFull.title.english != null) document.getElementById("title").textContent = animeDataFull.title.english;
    else document.getElementById("title").textContent = animeDataFull.title.romaji;

    document.getElementById("description").innerHTML = animeDataFull.description;

    var watchProgress = 0;
    if (ListContains("default", animeDataFull)) {
        watchProgress = ReadList("default")[animeDataFull.id].progress;
    }
    if (watchProgress == 0) document.getElementById("watchStatus").textContent = "Not watched/read yet!";
    else {
        if (animeDataFull.chapters != null) {
            document.getElementById("watchStatus").textContent = watchProgress.toString() + " of " + animeDataFull.chapters.toString() + " chapters";
        } else if (animeDataFull.episodes != null) {
            document.getElementById("watchStatus").textContent = watchProgress.toString() + " of " + animeDataFull.episodes.toString() + " episodes";
        } else if (animeDataFull.volumes != null) {
            document.getElementById("watchStatus").textContent = watchProgress.toString() + " of " + animeDataFull.volumes.toString() + " volumes";
        }
    }
    
    for (var i = 0; i < animeDataFull.genres.length; i++) {
        const label = document.createElement('p');
        label.classList.add("genresLabel");
        label.textContent = animeDataFull.genres[i];
        document.getElementById("genres").appendChild(label);
    }

    var rating = -1;
    if (ListContains("default", animeDataFull)) {
        rating = ReadList("default")[animeDataFull.id].rating;
    }
    if (rating > 0) document.getElementById("star" + rating.toString()).checked = true;


    UpdateListsDropdown();

    var episodes = 0;
    var mediaType = "";
    if (animeDataFull.episodes != null) {
        episodes = animeDataFull.episodes;
        mediaType = "Episode ";
    } else if (animeDataFull.chapters != null) {
        episodes = animeDataFull.chapters;
        mediaType = "Chapter ";
    } else if (animeDataFull.volumes != null) {
        episodes = animeDataFull.volumes;
        mediaType = "Volume ";
    }

    for (var i = 0; i < episodes; i++) {
        const item = document.createElement('a');
        item.textContent = mediaType + (i + 1).toString();
        item.dataset.elementEpisode = i + 1;
        const onClick = (event) => {
            UpdateWatchProgress(event.target.dataset.elementEpisode);
        }
        item.addEventListener('click', onClick);
        document.getElementById("watchStatusDropdown").appendChild(item);
    }
    if (episodes == 0) {
        const item = document.createElement('a');
        item.textContent = "This anime/manga appears to be broken? Blame Anilist servers~";
        document.getElementById("watchStatusDropdown").appendChild(item);
    }

    document.getElementById("loading").remove();

    //to be saved data
    toBeSavedAnimeData = {
        id: animeDataFull.id,

        title: {
            english: animeDataFull.title.english,
            native: animeDataFull.title.native,
            romaji: animeDataFull.title.romaji
        },

        coverImage: animeDataFull.coverImage,
        progress: 0,
        rating: 0
    }
}



function UpdateListsDropdown() {
    document.getElementById("addToListDropdown").replaceChildren();
    var lists = ReadLists();
    for (var i = 0; i < lists.length; i++) {
        const item = document.createElement('a');
        if (ListContains(lists[i], animeDataFull)) {
            item.textContent = "Remove from " + lists[i];
            item.dataset.listName = lists[i];
            const onClick = (event) => {
                RemoveFromListSelectionClick(event.target.dataset.listName);
            }
            item.addEventListener('click', onClick);
        } else {
            item.textContent = "Add to " + lists[i];
            item.dataset.listName = lists[i];
            const onClick = (event) => {
                AddToListSelectionClick(event.target.dataset.listName);
            }
            item.addEventListener('click', onClick);
        }
        document.getElementById("addToListDropdown").appendChild(item);
    }
}

function ToggleAddToListDropdown() {
    document.getElementById("addToListDropdown").classList.toggle("show");
}

function ToggleWatchStatusDropdown() {
    document.getElementById("watchStatusDropdown").classList.toggle("show");
}

function UpdateWatchProgress(episode) {
    toBeSavedAnimeData.progress = episode;

    var lists = ReadLists();
    if (ListContains("default", animeDataFull) == false) {
        AddAnimeToList("default", toBeSavedAnimeData);
        UpdateListsDropdown();
    } //make sure its in default b4 saving
    for (let i = 0; i < lists.length; i++) {
        if (ListContains(lists[i], animeDataFull)) {
            AddAnimeToList(lists[i].toString(), toBeSavedAnimeData);
        }
    }
    if (animeDataFull.chapters != null) {
        document.getElementById("watchStatus").textContent = episode + " of " + animeDataFull.chapters.toString() + " chapters";
    } else if (animeDataFull.episodes != null) {
        document.getElementById("watchStatus").textContent = episode + " of " + animeDataFull.episodes.toString() + " episodes";
    } else if (animeDataFull.volumes != null) {
        document.getElementById("watchStatus").textContent = episode + " of " + animeDataFull.volumes.toString() + " volumes";
    }

}

function RemoveFromListSelectionClick(listName) {
    if (listName == "default") { //removing from default removes from all
        var lists = ReadLists();
        for (var i = 0; i < lists.length; i++) {
            RemoveAnimeFromList(lists[i], animeDataFull);
        }
    } else {
        RemoveAnimeFromList(listName, animeDataFull);
    }
    UpdateListsDropdown();
}

function AddToListSelectionClick(listName) {
    var defaultListsProgress = 0;
    if (ListContains("default", animeDataFull)) defaultListsProgress = ReadList("default")[animeDataFull.id].progress;
    var defaultListsRating = 0;
    if (ListContains("default", animeDataFull)) defaultListsRating = ReadList("default")[animeDataFull.id].rating;

    toBeSavedAnimeData.progress = defaultListsProgress;
    toBeSavedAnimeData.rating = defaultListsRating;

    AddAnimeToList(listName, toBeSavedAnimeData);
    if (listName != "default") {
        AddAnimeToList("default", toBeSavedAnimeData); //always saves to default
    }
    UpdateListsDropdown();
}

function UpdateRatingClick(value) {
    toBeSavedAnimeData.rating = value;

    var lists = ReadLists();
    if (ListContains("default", animeDataFull) == false) {
        AddAnimeToList("default", toBeSavedAnimeData);
        UpdateListsDropdown();
    } //make sure its in default b4 saving
    for (let i = 0; i < lists.length; i++) {
        if (ListContains(lists[i], animeDataFull)) {
            AddAnimeToList(lists[i].toString(), toBeSavedAnimeData);
        }
    }
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