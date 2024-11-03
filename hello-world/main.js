console.log("Hello");

const electron = require("electron");
const app = electron.app;   // App instance from electron module

const path = require("path");
const url = require("url");

let win;

function createWindow() {
    // Class của window cho phép present nội dung từ trang web như trên browser
    win = new electron.BrowserWindow();
    // Load url nội dung cần đc window hiển thị
    win.loadURL(url.format({
        // Protocol sử dụng để access url
        /// Ở đây ta dùng file ở local nên protocol file://
        /// Nếu là url trên mạng thì dùng http://
        protocol: "file",
        // Dùng file local nên cần khai báo path đến file
        pathname: path.join(__dirname, "index.html"),
        // Thêm // vào sau tên protocol (file://)
        slashes: true
    }));
}