window.addEventListener('load', () => {
	const form = document.querySelector("#new-subscription-form");
	const usernameInput = document.querySelector("#new-subscription-username");
	const emailInput = document.querySelector("#new-subscription-email");
	const passwordInput = document.querySelector("#new-subscription-password");
	const priceInput = document.querySelector("#new-subscription-price");
	const dueDateInput = document.querySelector("#new-subscription-due-date");
	const list_el = document.querySelector("#subscriptions");

	form.addEventListener('submit', (e) => {
		e.preventDefault();

		const subscriptionUsername = usernameInput.value;
		const subscriptionEmail = emailInput.value;
		const subscriptionPassword = passwordInput.value;
		const subscriptionPrice = priceInput.value;
		const subscriptionDueDate = dueDateInput.value;

		const subscription_el = document.createElement('div');
		subscription_el.classList.add('subscription');

		const subscription_content_el = document.createElement('div');
		subscription_content_el.classList.add('content');

		subscription_el.appendChild(subscription_content_el);

		const username_input_el = document.createElement('input');
		username_input_el.classList.add('text');
		username_input_el.type = 'text';
		username_input_el.value = subscriptionUsername;
		username_input_el.setAttribute('readonly', 'readonly');

		const email_input_el = document.createElement('input');
		email_input_el.classList.add('text');
		email_input_el.type = 'email';
		email_input_el.value = subscriptionEmail;
		email_input_el.setAttribute('readonly', 'readonly');

		const password_input_el = document.createElement('input');
		password_input_el.classList.add('text');
		password_input_el.type = 'password';
		password_input_el.value = subscriptionPassword;
		password_input_el.setAttribute('readonly', 'readonly');

		const price_input_el = document.createElement('input');
		price_input_el.classList.add('text');
		price_input_el.type = 'number';
		price_input_el.value = subscriptionPrice;
		price_input_el.setAttribute('readonly', 'readonly');

		const due_date_input_el = document.createElement('input');
		due_date_input_el.classList.add('text');
		due_date_input_el.type = 'date';
		due_date_input_el.value = subscriptionDueDate;
		due_date_input_el.setAttribute('readonly', 'readonly');

		subscription_content_el.appendChild(username_input_el);
		subscription_content_el.appendChild(email_input_el);
		subscription_content_el.appendChild(password_input_el);
		subscription_content_el.appendChild(price_input_el);
		subscription_content_el.appendChild(due_date_input_el);

		const subscription_actions_el = document.createElement('div');
		subscription_actions_el.classList.add('actions');
		
		const subscription_edit_el = document.createElement('button');
		subscription_edit_el.classList.add('edit');
		subscription_edit_el.innerText = 'Edit';

		const subscription_delete_el = document.createElement('button');
		subscription_delete_el.classList.add('delete');
		subscription_delete_el.innerText = 'Delete';

		subscription_actions_el.appendChild(subscription_edit_el);
		subscription_actions_el.appendChild(subscription_delete_el);

		subscription_el.appendChild(subscription_actions_el);

		list_el.appendChild(subscription_el);

		usernameInput.value = '';
		emailInput.value = '';
		passwordInput.value = '';
		priceInput.value = '';
		dueDateInput.value = '';

		subscription_edit_el.addEventListener('click', (e) => {
			if (subscription_edit_el.innerText.toLowerCase() == "edit") {
				subscription_edit_el.innerText = "Save";
				username_input_el.removeAttribute("readonly");
				email_input_el.removeAttribute("readonly");
				password_input_el.removeAttribute("readonly");
				price_input_el.removeAttribute("readonly");
				due_date_input_el.removeAttribute("readonly");
				username_input_el.focus();
			} else {
				subscription_edit_el.innerText = "Edit";
				username_input_el.setAttribute("readonly", "readonly");
				email_input_el.setAttribute("readonly", "readonly");
				password_input_el.setAttribute("readonly", "readonly");
				price_input_el.setAttribute("readonly", "readonly");
				due_date_input_el.setAttribute("readonly", "readonly");
			}
		});

		subscription_delete_el.addEventListener('click', (e) => {
			list_el.removeChild(subscription_el);
		});
	});
});