console.log("Hello");

const electron = require("electron");
const app = electron.app;   // App instance from electron module

const path = require("path");
const url = require("url");

let win;

function createWindow() {
    // Class của window cho phép present nội dung từ trang web như trên browser
    win = new electron.BrowserWindow();
    win.loadURL(url.format({
        pathname: path.join()
    }));
}