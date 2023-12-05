// Event listener for the 'load' event on the window
window.addEventListener('load', () => {
    // Get references to the form and subscriptions list elements
    const form = document.querySelector("#new-subscription-form");
    const list_el = document.querySelector("#subscriptions");

    // Event listener for the form submission
    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Get subscription data from form inputs
        const subscriptionData = getSubscriptionData();

        try {
            // Save subscription data to the server
            await saveSubscription(subscriptionData);
            console.log('Subscription saved successfully!');
        } catch (error) {
            console.error('Failed to save subscription:', error);
        }

        // Create and append a new subscription element to the list
        const subscription_el = createSubscriptionElement(subscriptionData);
        list_el.appendChild(subscription_el);

        // Clear form inputs and add event listeners to the new subscription element
        clearFormInputs();
        addSubscriptionEventListeners(subscription_el);
    });

    // Function to get subscription data from form inputs
    function getSubscriptionData() {
        const username = document.querySelector("#new-subscription-username").value;
        const email = document.querySelector("#new-subscription-email").value;
        const password = document.querySelector("#new-subscription-password").value;
        const price = document.querySelector("#new-subscription-price").value;
        const dueDate = document.querySelector("#new-subscription-due-date").value;

        return { username, email, password, price, dueDate };
    }

    // Function to save subscription data to the server
    async function saveSubscription(subscriptionData) {
        const response = await fetch('/subscriptions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(subscriptionData),
        });

        if (!response.ok) {
            throw new Error('Failed to save subscription');
        }
    }

    // Function to create a new subscription element with input fields and actions
    function createSubscriptionElement(data) {
        const subscription_el = document.createElement('div');
        subscription_el.classList.add('subscription');

        // Create input fields for subscription data
        const subscription_content_el = document.createElement('div');
        subscription_content_el.classList.add('content');
        const inputs = createInputElements(data);
        inputs.forEach(input => subscription_content_el.appendChild(input));

        // Create actions (Edit and Delete buttons)
        const actions = createSubscriptionActions();
        subscription_el.appendChild(subscription_content_el);
        subscription_el.appendChild(actions);

        return subscription_el;
    }

    // Function to create input elements for subscription data
    function createInputElements(data) {
        const inputElements = [];

        for (const key in data) {
            const input_el = document.createElement('input');
            input_el.classList.add('text');
            input_el.type = key === 'password' ? 'password' : key === 'dueDate' ? 'date' : 'text';
            input_el.value = data[key];
            input_el.setAttribute('readonly', 'readonly');

            inputElements.push(input_el);
        }

        return inputElements;
    }

    // Function to create subscription action buttons (Edit and Delete)
    function createSubscriptionActions() {
        const actions_el = document.createElement('div');
        actions_el.classList.add('actions');

        const edit_button_el = createActionButton('Edit');
        const delete_button_el = createActionButton('Delete');

        actions_el.appendChild(edit_button_el);
        actions_el.appendChild(delete_button_el);

        return actions_el;
    }

    // Function to create an action button with specified text
    function createActionButton(text) {
        const button_el = document.createElement('button');
        button_el.classList.add(text.toLowerCase());
        button_el.innerText = text;

        return button_el;
    }

    // Function to clear form inputs
    function clearFormInputs() {
        const formInputs = document.querySelectorAll("#new-subscription-form input");
        formInputs.forEach(input => (input.value = ''));
    }

    // Function to add event listeners to the subscription element (Edit and Delete buttons)
    function addSubscriptionEventListeners(subscription_el) {
        const edit_button_el = subscription_el.querySelector('.edit');
        const delete_button_el = subscription_el.querySelector('.delete');

        edit_button_el.addEventListener('click', () => toggleEditMode(subscription_el));
        delete_button_el.addEventListener('click', () => list_el.removeChild(subscription_el));
    }

    // Function to toggle between edit and view mode for a subscription
    function toggleEditMode(subscription_el) {
        const inputs = subscription_el.querySelectorAll('.text[readonly]');
        const edit_button_el = subscription_el.querySelector('.edit');

        if (edit_button_el.innerText.toLowerCase() === 'edit') {
            edit_button_el.innerText = 'Save';
            inputs.forEach(input => input.removeAttribute('readonly'));
            inputs[0].focus();
        } else {
            edit_button_el.innerText = 'Edit';
            inputs.forEach(input => input.setAttribute('readonly', 'readonly'));
        }
    }
});