/*
var fs = require('fs');

var anime = {
    id:"",

    title :{
    english:"",
    native:""
    },

    coverImage:""
}

function CreateList(){

    fs.writeFile("Test.txt", anime, function(err){
        if(err) console.log(err);
    })
}
*/

function SaveToStorage(animeData){
    localStorage.setItem(animeData.data.Media.id, JSON.stringify(animeData.data));
    //console.log(localStorage.getItem(animeData.data.Media.id));
}

function ReadAllFromStorage(){
    const dataProcessed = [];

    for(var data in localStorage){
        dataProcessed.push(JSON.parse(localStorage.getItem(data)).Media);
    }
    return dataProcessed;
    
}