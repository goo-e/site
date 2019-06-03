# goophur
A web app that provides the user with a GUI to facilitate the process of customizing search engine queries.

## Visit
You can visit the deployed site at the following URL: https://goophur.herokuapp.com/

## Overview
Goophur makes it easy and fun for anyone to use the powerful query customization tools offered by the Google search engine. The more highly specialized the query (e.g., the greater the number of filters, the more specific the search term(s) to which a given filter is applied, etc.), the more utility Goophur offers to the user.

### Site
On the site, the user can do all of the following:
1. download the Chrome extension for building search queries
2. sign up by entering a name, email, and password
3. sign in by entering the email and password used to sign up
4. edit and save changes to the default search parameters that are tied to the user's unique login

### Extension
For detailed information about the extension, you can consult its dedicated README at the following URL: https://github.com/goophur/extension

## Technical Approach

### Architecture
Goophur is a MERN stack (MongoDB, Express, React.js, Node.js) app built using MVC (model-view-controller) architecture.
* The *model* is based on a Mongoose schema called "User" which provides the structure for storing the following data:
  - the user's name (a string)
  - the user's email (a string)
  - the user's password (a string)
  - the user's preferred default query parameters (an array)
  Each user's unique information is saved as a document in a collection of users in a Mongo database.
* The *view* aspect of the architecture is handled by React:
  - The Context API is used to nest all the app's pages inside a "context provider" React component, which contains crucial information such as which user is logged in (if any) and various app functions in order to tailor key aspects of the app's functionality (e.g., displaying whether or not the user is logged in, rendering the user's saved default query parameter settings, saving updates to the database, etc.) to the specific user.
  - React Router is used to organize navigation between the site's "pages," which are in fact React components, each of which is conditionally rendered onto the site's single HTML page.
  - Each page component, in turn, contains its own organized structure of smaller-scale React components with specialized functions. Many of these components, for example, are buttons or forms used to pass user data through the API routes.
* The *controller* functions consist in API routes that handle user login validation (when signing up), authentication (when signing in), and updates to the user's search preferences.

### About Page
* The About page displays the Goophur logo, basic information about the app, a button to download the Chrome extension, and a "sign in" or "sign up" form.
* The About component's state contains the Boolean "isRegistering," whose value determines which form gets rendered. Clicking on the "sign in" or "sign up" button triggers a change in state, which in turn triggers the render function. The conditional rendering inside the render function is expressed in the form of a ternary operator with the condition "!this.state.isRegistering" (i.e., the condition that "isRendering" in the About component's state is false).
* Upon completing and submitting a valid "sign in" or "sign up" form, the user (now logged in) is redirected to the Prefs page.

### Prefs Page
* The Prefs page displays the following:
  - a "Choose Your Parameters" section containing an array of query parameter choices (i.e., one button for each search parameter available in Goophur)
  - a "Your Default Query Parameters" section containing an array of user-specific default query parameter preferences (i.e., the buttons that will appear by default as active query parameters when the same user who is currently logged in uses the Chrome extension)
  - a "Save Changes" button
* The Prefs component's state contains the array "params," whose contents determine which buttons appear in the "Your Default Query Parameters" section of the Prefs page. These same buttons will also be saved to the user's document in the database via a put request once the user clicks the "Save Changes" button. Before saving the changes, the user can change the array's contents in the state in two ways:
  - by clicking on a button in the "Choose Your Parameters" section to add a copy of it to the "Your Default Query Parameters" section
  - by clicking the "X" on a button in the "Your Default Query Parameters" section to remove the button from the section (and thereby remove that copy of the parameter from the "params" array in the state)
