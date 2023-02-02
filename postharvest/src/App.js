import './App.css';
import React, { useState, useRef, useEffect } from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';

import PostharvestRoutes from './Routes/Routes';
import ItemContext from './ItemContext';
import PostharvestApi from './api';
import NavBar from './NavBar/NavBar';

function App() {
	const INITIAL_USER = {
		username  : '',
		firstName : '',
		lastName  : '',
		jobTitle  : '',
		email     : '',
		isAdmin   : false
	};
	const [
		isLoggedIn,
		setIsLoggedIn
	] = useState(false);
	PostharvestApi.token = localStorage.token || undefined;
	const user = useRef(INITIAL_USER);

	const username = localStorage.getItem('username') || undefined;

	async function setUser() {
		// if user is successfully logged in, take username from local storage and get user info from api
		if (username) {
			let userRes = await PostharvestApi.getUser(username);
			user.current = userRes;
			// setIsLoading(false);
		}
	}
	setUser();

	useEffect(() => {
		PostharvestApi.token ? setIsLoggedIn(true) : setIsLoggedIn(false);
	}, []);

	return (
		<div className="App">
			<ItemContext.Provider value={{ setIsLoggedIn, user, isLoggedIn }}>
				<NavBar />
				<PostharvestRoutes />
			</ItemContext.Provider>
		</div>
	);
}

export default App;
