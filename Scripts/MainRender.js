const{ipcRenderer} = require("electron");

const mainGallery = document.getElementById('mainGallery');
var list = ReadList('default');

Object.keys(list).forEach(key => {
    CreatePanel(list[key]);
});

function CreatePanel(animeData){
    const tile = document.createElement("div");
    tile.classList.add("tile");
    tile.dataset.id = animeData.id;

    const cover = document.createElement("img");
    cover.src = animeData.coverImage.large;

    const onClick = (event) => {
        PanelOnClick(list[event.target.parentElement.dataset.id]);
    }
    cover.addEventListener('click', onClick);

    const title = document.createElement('h2');
    title.textContent = animeData.title.english;

    tile.appendChild(cover);
    tile.appendChild(title);
    mainGallery.appendChild(tile);
}

function PanelOnClick(animeData){
    ipcRenderer.send("createAnimeDataPage1", animeData);
}