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
    console.log("Saved", anime.id, "into", listName);
    targetList[(anime.id).toString()] = anime;
    WriteList(listName, targetList);
}

function RemoveAnimeFromList(listName, anime) {
    var targetList = ReadList(listName);
    console.log("Removed", anime.id, "from", listName);
    delete targetList[anime.id];
    WriteList(listName, targetList);
}

function ListContains(listName, anime) {
    var targetList = ReadList(listName);
    return targetList.hasOwnProperty(anime.id);

}

function WriteList(listName, listData) {
    fs.writeFileSync(("./LocalData/" + listName + ".json"), JSON.stringify(listData), function (err) {
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

function WriteLists(lists) {
    var saveOutput = "";
    for (var i = 0; i < lists.length; i++) {
        saveOutput += lists[i].toString();
        if (i < lists.length - 1) {
            saveOutput += ",";
        }
    }
    console.log(saveOutput);
    fs.writeFileSync(("./LocalData/Lists.txt"), saveOutput, function (err) {
        if (err) console.log(err);
    });
}

function RenameListJSON(listName, newListName) {
    fs.renameSync(("./LocalData/" + listName + ".json"), ("./LocalData/" + newListName + ".json"), 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return;
        }
    });
}

function CreateListJSON(listName){
    fs.writeFileSync(("./LocalData/" + listName + ".json"), "{}", function (err) {
        if (err) console.log(err);
    });
}


//use with care
function DeleteListJSON(listName) {
    fs.unlinkSync(("./LocalData/" + listName + ".json"), 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return;
        }
    });
}