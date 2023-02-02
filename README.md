# postharvest-app-frontend


## API
**token**: Stores token for auth
**request**: Accepts endpoint, data, and method as arguments. Generates a url, headers using this.token, and params using method and data. Makes an axios request using {url, method, data, params, headers}
### User/
- **getUser**: Returns user information given a username. username => {username, password, firstName, lastName, email, jobTitle}
- **register**: Allows a user to sign up for an account. {username, password, firstName, lastName, email, jobTitle} => {JWT token}. uses getUser() to return user info. Logs in user automatically after successfully registering. Stores token and username to localStorage
- **login**: Allows a user to log in by generating a token and passing that token as a header. {username, password} => {JWT token}. uses getUser() to return user info. Stores token and username to localStorage
- **logout**: Allows a user to log out. Clears localStorage and resets this.token to undefined