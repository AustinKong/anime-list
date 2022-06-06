var fs = require("fs");

var lists = [];


var anime = {
    id: 000000,

    title: {
        english: "",
        native: ""
    },

    coverImage: ""
}


function CreateEmptyList(listName) {
    fs.writeFile(("./LocalData/" + listName + ".json"), JSON.stringify({}), function (err) {
        if (err) console.log(err);
    });
}

function AddAnimeToList(listName, anime) {
    var targetList = ReadList(listName);
    console.log("Saved",anime.id,"into",listName);
    targetList[(anime.id).toString()] = anime;
    WriteList(listName, targetList);

    /*
    //KEEPING THIS LOGIC HERE INCASE REQUIRE TO BE USED AGAIN

    var repeated = false;

    Object.keys(targetList).forEach(key => {
        if(targetList[key].id == anime.id) repeated = true;
    });

    if(!repeated) {
        
    }
    else console.log("Repeated Anime!");
    */
}

function WriteList(listName, listData) {
    fs.writeFile(("./LocalData/" + listName + ".json"), JSON.stringify(listData), function (err) {
        if (err) console.log(err);
    });
}

function ReadList(listName) {
    return JSON.parse(fs.readFileSync(("./LocalData/" + listName + ".json"), 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return;
        }
        return data;
    }));
}

function ReadLists() {
    var lists;
    lists = fs.readFileSync('./LocalData/Lists.txt', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return;
        }
        return data;
    });
    return lists.split(',');
}