import { app, ipcMain, BrowserWindow } from 'electron';

let mainWindow: BrowserWindow | null = null;
let demoWindow: BrowserWindow | null = null;

function destroyWindow() {
    if (demoWindow) {
        demoWindow.destroy();
        demoWindow = null;
    }
    if (mainWindow) {
        mainWindow.destroy();
        mainWindow = null;
    }
}

ipcMain.on('open-demo-window', () => {
    if (demoWindow === null || demoWindow.isDestroyed) {
        demoWindow = new BrowserWindow({
            title: 'DemoWindow',
            width: 600,
            height: 400,
            show: true,
            webPreferences: {
                nodeIntegration: true,
                contextIsolation: false
            }
        });
        demoWindow.loadFile('dist/renderer/demo.html');
    } else {
        demoWindow.show();
    }
});

app.on('ready', () => {
    mainWindow = new BrowserWindow({

        title: 'MainWindow',
        width: 600,
        height: 400,
        show: true,
        webPreferences: {
            nodeIntegration: true,
            enableRemoteModule: true,
            contextIsolation: false
        }
    });
    mainWindow.loadFile('dist/renderer/index.html');
});

app.on('window-all-closed', () => {
    destroyWindow();
    app.exit(0);
});
