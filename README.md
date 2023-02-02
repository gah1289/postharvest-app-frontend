# postharvest-app-frontend

## User Flow
### NavBar
- Appears at the top of every page:
  - User Logged Out: 
    - Button with Windham logo on the left that is a link to Home. 
    - Button with user logo on the right that is a drop down menu with links to the following Routes:
      -  Login 
  - User Logged In:
    - Button with Windham logo on the left that is a link to Home. 
    - Button with user initials on the right that is a drop down menu with links to the following Routes:
      - Profile 
      - Logout

### Routes
#### Home
- Shows a basic search bar for commodities.
#### Login
- Login form => onSubmit call Postharvest.Api.login(), logs the user in
#### Signup
- Register form onSubmit call Postharvest.Api.register(), resisters the user and logs them in
#### Profile
- Allows user to see and edit their profile information. 
- Profile foorm onSubmit call Postharvest.Api.updateUser()


## API
**token**: Stores token for auth
**request**: Accepts endpoint, data, and method as arguments. Generates a url, headers using this.token, and params using method and data. Makes an axios request using {url, method, data, params, headers}
### User/
- **getUser**: Returns user information given a username. username => {username, password, firstName, lastName, email, jobTitle}
- **register**: Allows a user to sign up for an account. {username, password, firstName, lastName, email, jobTitle} => {JWT token}. uses getUser() to return user info. Logs in user automatically after successfully registering. Stores token and username to localStorage
- **login**: Allows a user to log in by generating a token and passing that token as a header. {username, password} => {JWT token}. uses getUser() to return user info. Stores token and username to localStorage
- **logout**: Allows a user to log out. Clears localStorage and resets this.token to undefined
- **updateUser**: Allows a user update their information. Can be a partial update. Automatically updates user information by logging them out and logging them back in with updated information.