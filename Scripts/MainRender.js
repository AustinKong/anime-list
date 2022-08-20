const {
    ipcRenderer
} = require("electron");

const mainGallery = document.getElementById('mainGallery');
var lists = ReadLists();

document.getElementById("searchInput").addEventListener("keypress", function (event) {
    // If the user presses the "Enter" key on the keyboard
    if (event.key === "Enter") {
        // Cancel the default action, if needed
        event.preventDefault();
        // Trigger the button element with a click
        document.getElementById("searchButton").click();
    }
});

for (i = 0; i < lists.length; i++) {
    var list = ReadList(lists[i]);

    const listElement = document.createElement("div");
    const listTitle = document.createElement("h1");
    
    listElement.classList.add("listContainer");
    listTitle.textContent = lists[i];
    listElement.appendChild(listTitle);
    listElement.dataset.listIndex = i;

    Object.keys(list).forEach(key => {
        CreatePanel(list[key], listElement);
    });

    mainGallery.appendChild(listElement);
}

function ListSettings(targetList){
    console.log(targetList)
}

function CreatePanel(animeData, listElement) {
    const tile = document.createElement("div");
    tile.classList.add("tile");
    tile.dataset.id = animeData.id;

    const cover = document.createElement("img");
    cover.src = animeData.coverImage.large;

    const onClick = (event) => {
        PanelOnClick(ReadList(lists[event.target.parentElement.parentElement.dataset.listIndex])[event.target.parentElement.dataset.id]);
    }
    cover.addEventListener('click', onClick);

    const title = document.createElement('h2');
    if (animeData.title.english != null) {
        title.textContent = animeData.title.english;
    } 
    else if(animeData.title.romaji!=null){
        title.textContent = animeData.title.romaji;
    }
    else if(animeData.title.native!=null){
        title.textContent = animeData.title.native;
    }
    else title.textContent = "No title uwu";

    tile.appendChild(cover);
    tile.appendChild(title);

    listElement.appendChild(tile);
}

function PanelOnClick(animeData) {
    console.log(animeData);
    ipcRenderer.send("createAnimeDataPage1", animeData);
}

function SearchOnClick() {
    input = document.getElementById('searchInput').value;
    ipcRenderer.send("createSearchPage1",input);
}

function ManageListOnClick(){
    ipcRenderer.send("createManageListPage");
}

function CreditsOnClick(){
    ipcRenderer.send("createCreditsPage");
}