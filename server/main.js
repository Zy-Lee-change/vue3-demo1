// Modules to control application life and create native browser window
const path = require('path');
const {app, BrowserWindow} = require('electron');
const settings = require('./config.js');
const io_server = require('./server.js');
let url = settings.start ? settings.start : ('http://localhost:' + settings.port);

let mainWindow;

function createWindow () {
  //return
  mainWindow = new BrowserWindow({
    width: settings.width ? settings.width : 1280,
    height: settings.height ? settings.height : 720,
    x: settings.x,
    y: settings.y,
    frame: false,
    webPreferences: {
      webSecurity: false
    }
  });
  mainWindow.setFullScreen(settings.fullscreen ? settings.fullscreen : false);
  mainWindow.loadURL(url);
  mainWindow.on('closed', function () {
    mainWindow = null
  });
  mainWindow.webContents.openDevTools();
}

app.on('ready', createWindow);

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
});

app.on('activate', function () {
  if (mainWindow === null) createWindow()
});
