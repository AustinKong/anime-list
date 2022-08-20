const {
    ipcRenderer
} = require("electron");

function SetupPage() {
    UpdateLists();
}

function UpdateLists() {

    var temp = document.getElementById("listItem").content;

    document.getElementById("lists").replaceChildren();
    var lists = ReadLists();
    for (var i = 0; i < lists.length; i++) {

        var listItem = temp.cloneNode(true).querySelectorAll("div")[0];
        listItem.dataset.listName = lists[i];
        listItem.querySelectorAll("h2")[0].textContent = lists[i] + " (" + Object.keys(ReadList(lists[i])).length + " Entries)";

        var listItemButtons = listItem.querySelectorAll("a");

        const deleteBtn = (event) => {
            DeleteListClick(event.target.parentElement.dataset.listName);
        }
        listItemButtons[0].addEventListener('click', deleteBtn);

        const renameBtn = (event) => {
            RenameListClick(event.target.parentElement.dataset.listName);
        }
        listItemButtons[1].addEventListener('click', renameBtn);

        document.getElementById("lists").appendChild(listItem);
    }
}

function DeleteListClick(listName) {
    if (listName == "default") {
        WriteList("default",{});
    } else {
        var lists = ReadLists();
        lists.splice(lists.indexOf(listName), 1);
        WriteLists(lists);
        DeleteListJSON(listName);
    }
    UpdateLists();
}

var currentlyRenaming;

function RenameListClick(listName) {
    if (listName == "default") {
        console.log("Cant rename default");
    } else {
        currentlyRenaming = listName;
        document.getElementById("renamePopup").classList.add("show");
        document.getElementById("listNameField").value = listName;
    }
}

function GetInputFromField() {
    var input = document.getElementById("listNameField").value;
    document.getElementById("renamePopup").classList.remove("show");

    var lists = ReadLists();
    if (lists.findIndex(element => {
        return element.toLowerCase() === input.toLowerCase();
    }) != -1) {
        console.log("already exist with name");
    } else {
        lists.splice(lists.indexOf(currentlyRenaming), 1, input);
        WriteLists(lists);
        RenameListJSON(currentlyRenaming, input);

        console.log(input + " " + currentlyRenaming);
        UpdateLists();
    }
}

function CreateListClick() {
    var lists = ReadLists();

    if (lists.findIndex(element => {
            return element.toLowerCase() === "NewList".toLowerCase();
        }) != -1) {
        console.log("Already created");
    } else {
        lists.push("NewList");
        WriteLists(lists);
        CreateListJSON("NewList");
        UpdateLists();
    }
}

function CloseInput(){
    document.getElementById("renamePopup").classList.remove("show");
}