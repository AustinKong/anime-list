const {
    app,
    BrowserWindow,
    screen,
    ipcMain
} = require('electron')

var mainWindow;
const CreateMainPage = () => {
    mainWindow = new BrowserWindow({
        width: 1366,
        height: 768,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            devTools: !app.isPackaged,
        }
    })
    mainWindow.loadFile('HtmlCSS/index.html');
    mainWindow.removeMenu()
}
app.whenReady().then(() => {
    CreateMainPage();
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
})

//in honor to the random indian that is saving my career https://www.youtube.com/watch?v=Ytu5yXHhiVc
// 2 step process: 1st transfer data to ipcMain from mainrender.js, 2nd transfer data to ipcRenderer from main.js
ipcMain.on("createAnimeDataPage1", (event, data) => {
    var win = CreateAnimeDataPage();

    win.webContents.on('did-finish-load', function () {
        win.webContents.send("createAnimeDataPage2", data);
    });

    //refresh index on close
    win.on('close', () => {
        mainWindow.reload();
    })
    win.removeMenu()
})

ipcMain.on("createSearchPage1", (event, data) => {
    var win = CreateSearchPage();
    
    win.webContents.on('did-finish-load', function () {
        win.webContents.send("createSearchPage2", data);
    });

    //refresh index on close
    win.on('close', () => {
        mainWindow.reload();
    })
    win.removeMenu()
})

ipcMain.on("createManageListPage", (event) => {
    var win = CreateManageListPage();

    //refresh index on close
    win.on('close', () => {
        mainWindow.reload();
    })
    win.removeMenu()
})

ipcMain.on("createCreditsPage", (event) => {
    var win = CreateCreditsPage();
    win.removeMenu()
})

const CreateSearchPage = () => {
    const win = new BrowserWindow({
        width: 1024,
        height: 768,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            devTools: !app.isPackaged,
        },
        resizable: false
    })
    win.loadFile('HtmlCSS/search.html');
    return win;
}

const CreateAnimeDataPage = () => {
    const win = new BrowserWindow({
        width: 1024,
        height: 768,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            devTools: !app.isPackaged,
        },
        resizable: false
    })
    win.loadFile('HtmlCSS/animeData.html');
    return win;
}

const CreateManageListPage = () => {
    const win = new BrowserWindow({
        width: 1024,
        height: 768,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            devTools: !app.isPackaged,
        },
        resizable: false
    })
    win.loadFile('HtmlCSS/manageList.html');
    return win;
}

const CreateCreditsPage= () => {
    const win = new BrowserWindow({
        width: 1024,
        height: 768,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            devTools: !app.isPackaged,
        },
        resizable: false
    })
    win.loadFile('HtmlCSS/credits.html');
    return win;
}