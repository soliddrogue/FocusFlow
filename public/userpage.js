// Set up the application when the window has finished loading
window.onload = function () {
    // Define the route handling function
    const route = async (event) => {
        event = event || window.event;
        event.preventDefault();

        // Push the new state to the browser history
        window.history.pushState({}, "", event.target.href);

        // Handle the location change
        await handleLocation();
    };

    // Define the routes for the application
    const routes = {
        "/home": "home", // Add a route for the landing page
        "/calendar": "calendar.ejs",
        "/notes": "notes.ejs",
        "/creditcard": "creditcard.ejs",
        "/subscriptions": "subscriptions.ejs",
    };

    // Handle the location change by fetching and updating the content
    const handleLocation = async () => {
        // Get the current path from the window location
        const path = window.location.pathname;

        // Determine the corresponding route or use a default route
        const routePath = routes[path] || routes[404];

        // Fetch the HTML content for the route
        const html = await fetch(routePath + '.ejs').then((data) => data.text());

        // Update the content of the main-page element with the fetched HTML
        document.getElementById("main-page").innerHTML = html;
    };

    // Set up an event listener for the browser's back/forward navigation
    window.onpopstate = handleLocation;

    // Expose the route function to the global window object
    window.route = route;

    // Initialize the application by handling the initial location
    handleLocation();
};

