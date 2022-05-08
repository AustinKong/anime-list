const { app, BrowserWindow } = require('electron')
const createWindow = () => {
    const win = new BrowserWindow({
      width: 1340,
      height: 820
    })
  
    win.loadFile('index.html')
}
app.whenReady().then(() => {
    createWindow()
})

console.log('Started');