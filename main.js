const { app, BrowserWindow } = require('electron')
const createWindow = () => {
    const win = new BrowserWindow({
      width: 1340,
      height: 820,
      webPreferences: {
        nodeIntegration: true,
      }
    })
  
    win.loadFile('index.html')
}
app.whenReady().then(() => {
    createWindow()
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})