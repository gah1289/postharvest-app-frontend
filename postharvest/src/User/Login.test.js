import React from 'react';
import { render, screen } from '@testing-library/react';
import Profile from './Profile';
import { MemoryRouter } from 'react-router-dom';
import ItemContext from '../ItemContext';

describe('Renders Profile', function() {
	let isLoggedIn = true;

	let isLoading = false;

	let user = {
		username  : 'testUser',
		firstName : 'Test',
		lastName  : 'User',
		email     : 'test@user.com',
		password  : 'password',
		isAdmin   : false
	};

	user.current = user;
	it('matches snapshot', function() {
		const { asFragment } = render(
			<MemoryRouter>
				<ItemContext.Provider value={{ isLoading, isLoggedIn, user }}>
					<Profile />
				</ItemContext.Provider>
			</MemoryRouter>
		);
		expect(asFragment()).toMatchSnapshot();
	});

	it('shows Profile Change Form', function() {
		render(
			<MemoryRouter>
				<ItemContext.Provider value={{ isLoading, isLoggedIn, user }}>
					<Profile />
				</ItemContext.Provider>
			</MemoryRouter>
		);

		const firstNameInput = screen.queryByText(/First Name/i);
		expect(firstNameInput).toBeInTheDocument();
		expect(firstNameInput.tagName).toBe('LABEL');
		const submitBtn = screen.queryByText(/Submit/i);
		expect(submitBtn).toBeInTheDocument();
	});
});
