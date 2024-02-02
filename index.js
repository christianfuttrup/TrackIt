import { app, BrowserWindow } from "electron";
import * as path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

function createWindow() {
	const win = new BrowserWindow({
		autoHideMenuBar: true,
		width: 800,
		height: 600,
		webPreferences: {
			contextIsolation: true,
			nodeIntegration: false,
		},
	});

	win.loadFile(path.join(__dirname, "dist/index.html"));

	win.on("closed", () => {
		win = null;
	});
}

app.whenReady().then(createWindow);

app.on("window-all-closed", () => {
	if (process.platform !== "darwin") {
		app.quit();
	}
});

app.on("activate", () => {
	if (BrowserWindow.getAllWindows().length === 0) {
		createWindow();
	}
});
