import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Home from '../User/Home';
import Login from '../User/Login';
import Signup from '../User/Signup';
import Logout from '../User/Logout';
import Profile from '../User/Profile';
import NotFound from '../NotFound/PageNotFound';

function PostharvestRoutes() {
	return (
		<Routes>
			<Route path="/" element={<Home />} />
			<Route path="/login" element={<Login />} />
			<Route path="/signup" element={<Signup />} />
			<Route path="/logout" element={<Logout />} />
			<Route path="/profile" element={<Profile />} />
			<Route path="*" element={<NotFound />} />
		</Routes>
	);
}

export default PostharvestRoutes;
