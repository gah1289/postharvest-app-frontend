import axios, { Axios } from 'axios';

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

	// Allows a user update their information. Can be a partial update. Automatically updates user information by logging them out and logging them back in with updated information.

	static async updateUser(currUsername, currPw, data) {
		const verifyUserData = { username: currUsername, password: currPw };
		await this.request(`auth/token`, { ...verifyUserData }, 'post');
		const patchRes = await this.request(`users/${currUsername}`, { ...data }, 'patch');
		await this.logout();
		const newUserLoginData = {
			username : patchRes.user.username || currUsername,
			password : data.password || currPw
		};
		const userRes = await this.login(newUserLoginData);

		return userRes.user;
	}

	// *****************COMMODITY****************

	// Get a list of commodities from commodities table.
	static async getCommodities() {
		const commodities = await this.request(`commodities/`);
		return commodities;
	}

	// Get a single commodity and its details.
	static async getCommodity(id) {
		const commodity = await this.request(`commodities/${id}`);

		return commodity;
	}

	// ***********TEMPERATURE RECOMMENDATIONS

	// Add a temperature recommendation to temperature_recommendations
	static async addTempRec(id, data) {
		const res = await this.request(`temperature`, { commodityId: id, data }, 'post');
		return res;
	}

	// Update a temperature recommendation in temperature_recommendations given an id
	static async updateTempRec(id, data) {
		const res = await this.request(`temperature/${id}`, { ...data }, 'patch');
		return res;
	}

	static async deleteTempRec(id) {
		const res = await this.request(`temperature/${id}`, {}, 'delete');

		return res;
	}

	// ***********SHELF LIFE

	// Add a shelf life data to shelf_life
	static async addShelfLifeData(id, data) {
		const res = await this.request(`shelf-life`, { commodityId: id, data }, 'post');
		return res;
	}

	// Update shelf life data in shelf_lifes given an id
	static async updateShelfLifeData(id, data) {
		const res = await this.request(`shelf-life/${id}`, { ...data }, 'patch');
		return res;
	}

	static async deleteShelfLifeData(id) {
		const res = await this.request(`shelf-life/${id}`, {}, 'delete');

		return res;
	}

	// ***********RESPIRATION RATE
	// Add a respiration data to respiration_rates
	static async addRespirationData(id, data) {
		const res = await this.request(`respiration`, { commodityId: id, data }, 'post');
		return res;
	}

	// Update shelf life data in respiration_rates given an id
	static async updateRespirationData(id, data) {
		const res = await this.request(`respiration/${id}`, { ...data }, 'patch');
		return res;
	}

	// Delete respiration data

	static async deleteRespirationData(id) {
		const res = await this.request(`respiration/${id}`, {}, 'delete');

		return res;
	}

	// ***********ETHYLENE DATA

	// Add  ethylene data to ethylene_sensitivity
	static async addEthyleneData(id, data) {
		console.log(id, data);
		const ethyleneRes = await this.request(`ethylene`, { commodityId: id, data }, 'post');
		console.log(ethyleneRes);
		return ethyleneRes;
	}

	// Update a ethylene data in ethylene_sensitivity given an id
	static async updateEthyleneData(id, data) {
		const ethyleneRes = await this.request(`ethylene/${id}`, { ...data }, 'patch');
		return ethyleneRes;
	}

	// Delete ethylene data
	static async deleteEthyleneData(id) {
		const res = await this.request(`ethylene/${id}`, {}, 'delete');

		return res;
	}

	// ***********WINDHAM SHELF LIFE STUDIES

	// get study by id
	static async getStudy(id) {
		const res = await this.request(`studies/${id}`);
		return res;
	}
	// get study by id
	static async getStudies() {
		let studies = [];
		const res = await this.request(`studies/`);
		for (let study of res.studies) {
			console.log(study.id);
			let s = await this.getStudy(study.id);
			studies.push(s);
		}
		return studies;
	}

	// Add  ethylene data to ethylene_sensitivity
	static async addStudy(id, data) {
		const res = await this.request(`studies`, { commodityId: id, data }, 'post');
		console.log(res);
		return res;
	}

	// Update a ethylene data in ethylene_sensitivity given an id
	static async updateStudy(id, data) {
		const res = await this.request(`studies/${id}`, { ...data }, 'patch');
		return res;
	}

	// Delete shelf life study from windham_studies
	static async deleteStudy(id) {
		const res = await this.request(`studies/${id}`, {}, 'delete');

		return res;
	}

	// ***********REFERENCES

	// Add  references to refs
	static async addReference(id, data) {
		const res = await this.request(`ref`, { commodityId: id, data }, 'post');
		return res;
	}

	// Delete reference from refs
	static async deleteReference(id, source) {
		const res = await this.request(`ref/${id}`, { source }, 'delete');

		return res;
	}
}

export default PostharvestApi;
