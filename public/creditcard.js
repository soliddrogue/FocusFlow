// Event listener for the 'load' event on the window
window.addEventListener('load', () => {
  // Get references to the form and credit cards container elements
  const form = document.querySelector("form");
  const creditCardContainer = document.querySelector('#credit-cards');

  // Event listener for the form submission
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Get credit card data from form inputs
    const creditCardData = getCreditCardData();

    try {
      // Save credit card data to the server
      await saveCreditCard(creditCardData);
      console.log('Credit card data saved successfully!');
    } catch (error) {
      console.error('Failed to save credit card data:', error);
    }

    // Create a new credit card element and add the card-style class
    const creditCardElement = createCreditCardElement(creditCardData);
    creditCardElement.classList.add('card-style');

    // Add event listener for delete
    addCreditCardEventListeners(creditCardElement, creditCardData);

    // Append the new credit card element to the container
    creditCardContainer.appendChild(creditCardElement);

    // Clear form inputs
    clearFormInputs();
  });
});

// Function to get credit card data from form inputs
function getCreditCardData() {
  return {
    cardNumber: document.querySelector('.card-number-input').value,
    cardHolder: document.querySelector('.card-holder-input').value,
    expirationMonth: document.querySelector('.month-input').value,
    expirationYear: document.querySelector('.year-input').value,
    cvv: document.querySelector('.cvv-input').value,
  };
}

// Function to save credit card data to the server
async function saveCreditCard(creditCardData) {
  const response = await fetch('/submitCC', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(creditCardData),
  });

  if (!response.ok) {
    throw new Error('Failed to save credit card data');
  }
}

// Function to add event listener for delete to a credit card element
function addCreditCardEventListeners(creditCardElement, creditCardData) {
  const deleteButton = createActionButton('Delete');

  // Add event listener to the delete button
  deleteButton.addEventListener('click', () => handleDeleteCreditCard(creditCardElement));

  // Create actions container and append the delete button
  const actionsElement = document.createElement('div');
  actionsElement.classList.add('credit-card-actions');
  actionsElement.appendChild(deleteButton);

  // Append actions container to the credit card element
  creditCardElement.appendChild(actionsElement);
}

// Function to create an action button with specified text
function createActionButton(text) {
  const buttonElement = document.createElement('button');
  buttonElement.classList.add('credit-card-action');
  buttonElement.textContent = text;

  return buttonElement;
}

// Function to handle deleting a credit card
function handleDeleteCreditCard(creditCardElement) {
  // Implement your delete logic here
  creditCardElement.remove(); // This removes the credit card element from the DOM
}

// Function to clear form inputs
function clearFormInputs() {
  const formInputs = document.querySelectorAll("form input");
  formInputs.forEach(input => (input.value = ''));
}

// Function to create a new credit card element with input fields and actions
function createCreditCardElement(data) {
  const creditCardElement = document.createElement('div');
  creditCardElement.classList.add('credit-card');

  // Create div elements for each credit card detail and set their text content
  const cardNumberElement = createCardDetailElement("Card Number: " + data.cardNumber);
  const cardHolderElement = createCardDetailElement("Card Holder: " + data.cardHolder);
  const expirationElement = createCardDetailElement("Expiration Date: " + `${data.expirationMonth}/${data.expirationYear.slice(-2)}`);
  const cvvElement = createCardDetailElement("CVV: " + data.cvv);

  // Append the detail elements to the credit card element
  creditCardElement.appendChild(cardNumberElement);
  creditCardElement.appendChild(cardHolderElement);
  creditCardElement.appendChild(expirationElement);
  creditCardElement.appendChild(cvvElement);

  return creditCardElement;
}

// Function to create a div element for a credit card detail and set its text content
function createCardDetailElement(value) {
  const cardDetailElement = document.createElement('div');
  cardDetailElement.textContent = value;
  cardDetailElement.classList.add('credit-card-detail');
  return cardDetailElement;
}

function updateUI() {
  // Add any UI update logic here if needed
}