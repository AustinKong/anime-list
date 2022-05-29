const{ipcRenderer} = require("electron");

var animeDataFull;

ipcRenderer.send("createAnimeDataPage2");
ipcRenderer.on("createAnimeDataPage2", (event,data)=>{
    // Define our query variables and values that will be used in the query request
    var variables = {
        id: data.id
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
    document.title = data.title.english;
})

function SetupPage(){
    console.log(animeDataFull);
    //document.body.style.backgroundImage = animeDataFull.bannerImage;
    document.getElementById("banner").src = animeDataFull.bannerImage;
    document.getElementById("coverImage").src = animeDataFull.coverImage.large;
    document.getElementById("title").textContent = animeDataFull.title.english;
}

function test(){
    console.log(animeDataFull);
}