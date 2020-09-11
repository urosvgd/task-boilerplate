import React from 'react';
import { Provider } from './Provider';
import Container from './components/Container/Container';
import 'reset-css';
import GlobalStyles from './GlobalStyles';

const App = () => (
	<Provider>
		<GlobalStyles />
		<Container />
	</Provider>
);

export default App;
