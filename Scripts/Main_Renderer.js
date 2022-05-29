const mainGallery = document.getElementById('mainGallery');
var list = ReadList('default');

Object.keys(list).forEach(key => {
    CreatePanel(list[key]);
});

console.log("Ran");

function CreatePanel(animeData){
    const tile = document.createElement("div");
    tile.classList.add("tile");

    const cover = document.createElement("img");
    cover.src = animeData.coverImage.large;

    const title = document.createElement('h2');
    title.textContent = animeData.title.english;

    tile.appendChild(cover);
    tile.appendChild(title);
    mainGallery.appendChild(tile);
}