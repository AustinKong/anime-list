const { app, BrowserWindow, screen, ipcMain} = require('electron')
const CreateMainPage = () => {
    const win = new BrowserWindow({
      width: 1366,
      height: 768,
      webPreferences: {
        nodeIntegration: true,
        contextIsolation: false,
      }
    })
    win.loadFile('index.html');
}
app.whenReady().then(() => {
  CreateMainPage();
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})

//in honor to the random indian that is saving my career https://www.youtube.com/watch?v=Ytu5yXHhiVc
// 2 step process: 1st transfer data to ipcMain from mainrender.js, 2nd transfer data to ipcRenderer from main.js
ipcMain.on("createAnimeDataPage1",(event,data)=>{
  var win = CreateAnimeDataPage();
  
  win.webContents.on('did-finish-load', function () {
    win.webContents.send("createAnimeDataPage2", data);
  });
})


const CreateAnimeDataPage = () => {
  const win = new BrowserWindow({
    width: 1024,
    height: 768,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    }
  })
  win.loadFile('animeData.html');
  return win;
}
