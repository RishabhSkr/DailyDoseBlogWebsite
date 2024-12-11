Explanation:
token Value:

token is a variable that likely holds a string (e.g., a JWT token) or null/undefined if the token is not present.
Double Negation (!!):

The double negation (!!) is used to convert any value to a boolean.
The first ! negates the value, converting it to its boolean opposite.
The second ! negates it again, converting it back to its original boolean value.
How It Works:
Truthy Values:

If token is a non-empty string (or any other truthy value), !!token will be true.
Example: token = "someTokenString" -> !!token -> true
Falsy Values:

If token is null, undefined, 0, "" (empty string), or false, !!token will be false.


Summary:
Example: token = null -> !!token -> false
Double Negation (!!): Converts any value to a boolean.
Usage: Commonly used to check the presence of a value (e.g., a token) and set a boolean state accordingly.
Context: In authentication, it helps determine if a user is logged in based on the presence of a token.

// 2. On logout behaviour is not changing
    //issue
        The issue is that we need to update the isAuthenticated state when the user logs in. We need to check for authentication status whenever the route changes. Here's the solution:

Steps:

Add a location hook from react-router-dom to detect route changes
Add useEffect to check auth status on route changes
This will ensure the nav buttons update correctly after login/logout


// 3. On login, the user is  redirected to the dashboard
Changed the conditional render to use ternary operator (isAuthenticated ? ... : ...)
Adde Sign In and Get Started buttons for logged out state
Updated handleLogout to set isAuthenticated to false
Kept the existing New button and Avatar for logged in state