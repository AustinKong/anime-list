const {
    ipcRenderer
} = require("electron");

const mainGallery = document.getElementById('mainGallery');
var lists = ReadLists();

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
    title.textContent = animeData.title.english;

    tile.appendChild(cover);
    tile.appendChild(title);
    listElement.appendChild(tile);
}

function PanelOnClick(animeData) {
    console.log(animeData);
    ipcRenderer.send("createAnimeDataPage1", animeData);
}

function SearchOnClick(){
    ipcRenderer.send("createSearchPage");
}