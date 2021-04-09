import React, { FC } from 'react';
import ReactDOM from 'react-dom';

interface Prop {}

const Index: FC<Prop> = (props) => {
	return <div style={{ color: 'green' }}>Index2.tsx</div>;
};

ReactDOM.render(<Index />, document.getElementById('root'));
