import axios from 'axios';

// const BASE_URL = process.env.REACT_APP_BASE_URL || 'http://localhost:3001';

const BASE_URL = 'https://postharvest-app.herokuapp.com';

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
	static async getCommodities(data) {
		const commodities = await this.request(`commodities`, { ...data });
		return commodities;
	}

	// Get a single commodity and its details.
	static async getCommodity(id) {
		const commodity = await this.request(`commodities/${id}`);

		return commodity;
	}
	// Add a new commodity
	static async addCommodity(data) {
		if (data.climacteric === 'true') {
			data.climacteric = true;
		}
		if (data.climacteric === 'false') {
			data.climacteric = false;
		}

		await this.request(`commodities/`, { ...data }, 'post');
	}
	// Edit a commodity given an id
	static async editCommodity(id, data) {
		if (data.climacteric === 'true') {
			data.climacteric = true;
		}
		if (data.climacteric === 'false') {
			data.climacteric = false;
		}

		const res = await this.request(`commodities/${id}`, { ...data }, 'patch');
		return res;
	}
	// Delete a commodity given an id
	static async deleteCommodity(id) {
		await this.request(`commodities/${id}`, {}, 'delete');
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

	//Delete temperarture recommendation given temperature id
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

	// Delete shelf life data given an id
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
		const ethyleneRes = await this.request(`ethylene`, { commodityId: id, data }, 'post');
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
	// get all studies
	static async getStudies() {
		let studies = [];
		// returns array of studies but no commodity info
		const res = await this.request(`studies/`);
		// returns each study with commodity info
		for (let study of res.studies) {
			let s = await this.getStudy(study.id);
			studies.push(s);
		}
		return studies;
	}

	// add a new study. Not being used yet
	static async addStudy(data) {
		data.source = data.source.replace(/C:\\fakepath\\/i, 'https://windham-studies.s3.amazonaws.com/');
		const res = await this.request(`studies/`, { ...data }, 'post');

		return res;
	}

	// Update study title, date, or objective in windham_studies given an id
	static async updateStudy(id, data) {
		const res = await this.request(`studies/${id}`, { ...data }, 'patch');
		return res;
	}

	// Delete shelf life study from windham_studies
	static async deleteStudy(id) {
		// if there are no studies associated, no error is thrown
		try {
			await this.clearCommoditiesFromStudy(id);
		} catch (e) {}

		const res = await this.request(`studies/${id}`, {}, 'delete');

		return res;
	}

	// Add to windham_studies_commodities
	static async addCommoditiesToStudy(commodityIds, studyId) {
		commodityIds.forEach(async (id) => await this.request(`studies/${id}`, { studyId }, 'post'));
	}
	// Delete all commodity-study data from windham_studies_commodities

	static async clearCommoditiesFromStudy(studyId) {
		await this.request(`studies/study/${studyId}`, {}, 'delete');
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
