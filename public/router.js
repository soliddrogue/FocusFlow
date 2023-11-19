const route = async (event) => {
    event = event || window.event;
    event.preventDefault();
    window.history.pushState({}, "", event.target.href);
    await handleLocation();
};

const routes = {
    404: "404",
    "/calendar": "calendar",
    "/notes": "notes",
    "/subscriptions": "subscriptions",
};

const handleLocation = async () => {
    const path = window.location.pathname;
    const routePath = routes[path] || routes[404];
    const html = await fetch(routePath).then((data) => data.text());
    document.getElementById("main-page").innerHTML = html;
};

window.onpopstate = handleLocation;
window.route = route;

handleLocation();