import { ipcRenderer } from 'electron';
import path from 'path';
import ReactDOM from 'react-dom';
import React, { FC } from 'react';

interface Prop {}

const Index: FC<Prop> = (props) => {
	return (
		<div>
			<h1>Index.tsx</h1>
			<hr />
			<div>{path.resolve(__dirname)}</div>
			<hr />
			<div>
				<button
					type="button"
					onClick={() => {
						ipcRenderer.send('open-demo-window');
					}}>
					OpenDemo
				</button>
			</div>
		</div>
	);
};

ReactDOM.render(<Index />, document.getElementById('root'));
