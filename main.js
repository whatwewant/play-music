/**
* @Author: eason
* @Date:   2017-04-18T13:29:39+08:00
* @Email:  uniquecolesmith@gmail.com
* @Last modified by:   eason
* @Last modified time: 2017-04-18T13:54:27+08:00
* @License: MIT
* @Copyright: Eason(uniquecolesmith@gmail.com)
*/

const path = require('path');
const electron = require('electron');
// module to control application life.
const app = electron.app;
// module to create native browser window
const BrowserWindow = electron.BrowserWindow;

const url = require('url');

// Keep a global reference of the window object, if you don't, the window
// will be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

function createWindow() {
  // Create the browser window
  mainWindow = new BrowserWindow({ width: 375, height: 667 });

  // Remove menu bar completely
  mainWindow.setMenu(null);

  // and load the index.html of the app
  /*
  mainWindow.loadURL(url.format({
    hostname: 'moeover.com',
    port: 80,
    protocol: 'http',
    pathname: '/play-music',
  }));
  */
  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true,
  }));

  // Open the DevTools
  // mainWindow.webContents.openDevTools();

  // Emitted when the window is closed
  mainWindow.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if you app supports multi window, this is the time
    // when you should delete the corresponding element
    mainWindow = null;
  });
}

// This method will be called when Electron has finished
// initialization and is ready yo create browser windows.
// Same APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On OSX it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OSX it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow();
  }
});
