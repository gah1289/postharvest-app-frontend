import { render, screen } from '@testing-library/react';
import Home from './Home';

// import ItemContext from '../ItemContext';

describe('Loads Home Page', function() {
	// let isLoggedIn;
	// let user;
	// let isLoading;
	// let HomeComponent;
	// let testUser = {
	// 	username  : 'testUser',
	// 	firstName : 'Test',
	// 	lastName  : 'User',
	// 	email     : 'test@user.com',
	// 	password  : 'password'
	// };
	// it('renders without crashing', function() {
	// 	HomeComponent = (
	// 		<ItemContext.Provider value={((isLoggedIn = false), (user = undefined), (isLoading = false))}>
	// 			{' '}
	// 			<Home />{' '}
	// 		</ItemContext.Provider>
	// 	);
	// 	render(HomeComponent);
	// });
	// it('prompts user to log in', function() {
	// 	HomeComponent = (
	// 		<ItemContext.Provider value={((isLoggedIn = false), (user = undefined), (isLoading = false))}>
	// 			{' '}
	// 			<Home />{' '}
	// 		</ItemContext.Provider>
	// 	);
	// 	const { asFragment } = render(HomeComponent);
	// 	expect(asFragment()).toMatchSnapshot();
	// 	const welcomeBanner = screen.queryByText(/Welcome/i);
	// 	expect(welcomeBanner).toBeInTheDocument();
	// 	const login = screen.queryByText(/Login/i);
	// 	expect(login).toBeInTheDocument();
	// });
	// it('greets user once they have logged in', function() {
	// 	user = testUser;
	// 	user.current = testUser;
	// 	isLoggedIn = true;
	// 	isLoading = false;
	// 	HomeComponent = (
	// 		<ItemContext.Provider value={{ user, isLoggedIn, isLoading }}>
	// 			{' '}
	// 			<Home />{' '}
	// 		</ItemContext.Provider>
	// 	);
	// 	const { asFragment } = render(HomeComponent);
	// 	expect(asFragment()).toMatchSnapshot();
	// 	const greetUserByName = screen.queryByText(/Hello, Test!/i);
	// 	expect(greetUserByName).toBeInTheDocument();
	// });
});
