const { create } = require("domain");
const electron = require("electron");
const app = electron.app;   // App instance from electron module

const path = require("path");
const url = require("url");

let win;
// let parentWin;

console.log("From main.js");

function createWindow() {
    // Class của window cho phép present nội dung từ trang web như trên browser
    // parentWin = new electron.BrowserWindow();
    win = new electron.BrowserWindow(
        {
            title: "Browser Window",
            width: 400, height: 400, maxWidth: 600, maxHeight: 600,
            backgroundColor: "#228b22",
            frame: false,    // Window borderless, k có toolbar, các nút nhấn
            // Window con luôn nằm đè lên win cha, modal: khi mở win con, win cha k tương tác đc
            // parent: parentWin, modal: true,
            show: false // Window sau khi đc tạo ra cũng chưa đc show
        }
    );
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

    // win.loadURL("https://github.com/");

    // Trigger event chỉ 1 lần, nếu có lần sau k trigger nữa
    // Event sau khi website đã đc load xog
    win.once("ready-to-show", () => {
        win.show();
    });

    // Open dev tool giống trên Chrome
    // win.webContents.openDevTools();

    // on(): gắn event cho window
    /// closed: event khi đóng window
    win.on("closed", () => {
        win = null;
    });
}

// Gắn event khi module electron đã init xong và ready
app.on("ready", createWindow);

// event: window-all-closed: khi tắt cả window bị close hết, sẽ quit()
/// Nhưng trừ MacOS, vì OS này k thoát app (tên platform là darwin)
/// process: 1 class global của Node có thể dùng bất kì đâu
app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit();
    }
});

// 1 loại event riêng của Mac, mở app có sẵn khi tất cả window đã đóng rồi
app.on("activate", () => {
    if (win === null) {
        createWindow();
    }
});