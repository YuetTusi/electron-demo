import { app, ipcMain, BrowserWindow } from 'electron';
import isDev from 'electron-is-dev';

let mainWindow: BrowserWindow | null = null;
let demoWindow: BrowserWindow | null = null;

function destroyWindow() {
    if (demoWindow && !demoWindow.isDestroyed) {
        demoWindow.destroy();
        demoWindow = null;
    }
    if (mainWindow && !mainWindow.isDestroyed) {
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

        if (isDev) {
            demoWindow.loadURL('http://localhost:8080/demo.html');
        } else {
            demoWindow.loadFile('dist/demo.html');
        }
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
    if (isDev) {
        mainWindow.loadURL('http://localhost:8080/index.html');
    } else {
        mainWindow.loadFile('dist/index.html');
    }
});

app.on('window-all-closed', () => {
    console.log('all-closed');
    destroyWindow();
    app.exit();
});
