import { ipcRenderer } from 'electron';

var btnOpenDemo: HTMLButtonElement | null = document.querySelector('#btnOpenDemo');

btnOpenDemo!.addEventListener('click', (e) => {
	ipcRenderer.send('open-demo-window');
});
