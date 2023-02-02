import axios from 'axios';

const BASE_URL = process.env.REACT_APP_BASE_URL || 'http://localhost:3001';

class PostharvestApi {
	// Store token for auth
	static token;

	static async request(endpoint, data = {}, method = 'get') {
		console.debug('API Call:', endpoint, data, method);
		const url = `${BASE_URL}/${endpoint}`;
		// token is generated as user logs in via PostharvestApi.login and auth/token and passed through headers here
		const headers = { Authorization: `Bearer ${PostharvestApi.token}` };
		// if get request has parameters, pass them here
		const params = method === 'get' ? data : {};

		try {
			return (await axios({ url, method, data, params, headers })).data;
		} catch (e) {
			console.error('API Error', e.response);
			let message = e.response.data.error.message;
			throw Array.isArray(message)
				? message
				: [
						message
					];
		}
	}

	// **************USER********************

	// Returns user information given a username
	// username => user Info
	static async getUser(username) {
		let userRes = await this.request(`users/${username}`);
		return userRes.user;
	}

	//Allows a user to sign up for an account
	// {username, password, firstName, lastName, email, jobTitle} => user Info and JWT token. Logs in user automatically after successfully registering
	// To do: flash message: Welcome, firstName!
	static async register(data) {
		let tokenRes = await this.request(`auth/register`, { ...data }, 'post');
		this.token = tokenRes.token;
		localStorage.setItem('username', data.username);
		localStorage.setItem('token', this.token);
		let userRes = await this.request(`users/${data.username}`);
		return userRes;
	}

	// Allows a user to log in by generating a token and passing that token as a header. Returns user Info
	// To do: flash message: Welcome back, firstName!
	static async login(data) {
		// get token and save it to localStorage

		let tokenRes = await this.request(`auth/token`, { ...data }, 'post');
		this.token = tokenRes.token;
		localStorage.setItem('token', this.token);
		let loginRes = await this.request('auth/login', { token: this.token });
		localStorage.setItem('username', loginRes.authorizedData.username);
		let userRes = await this.request(`users/${loginRes.authorizedData.username}`);
		return userRes;
	}

	// Allows a user to log out

	static async logout() {
		this.token = undefined;
		localStorage.clear();
	}
}

export default PostharvestApi;
