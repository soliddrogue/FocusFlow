// Event handler for window.onload
window.onload = function () {
  // Attach an event listener to the submit button
  document.querySelector('.submit-btn').onclick = handleSubmit;
};

// Handle form submission
async function handleSubmit(event) {
  // Prevent the default form submission behavior
  event.preventDefault();

  // Collect form data from input fields
  const formData = getFormData();

  // Update the card visualization based on the entered data
  updateCardInfo(formData);

  // Add the credit card details to the bottom of the page
  addCreditCardToPage(formData);

  // Send the form data to the server using a POST request
  try {
    const response = await sendFormData(formData);

    // Check if the request was successful and log the result
    handleResponse(response);
  } catch (error) {
    // Log any errors that occur during the request
    handleRequestError(error);
  }
}

// Retrieve form data from input fields
function getFormData() {
  return {
    cardNumber: document.querySelector('.card-number-input').value,
    cardHolder: document.querySelector('.card-holder-input').value,
    expirationMonth: document.querySelector('.month-input').value,
    expirationYear: document.querySelector('.year-input').value,
    cvv: document.querySelector('.cvv-input').value,
  };
}

// Update the card information displayed on the page
function updateCardInfo(formData) {
  // Update card number
  document.querySelector('.card-number-box').textContent = formData.cardNumber;

  // Update card holder
  document.querySelector('.card-holder-name').textContent = formData.cardHolder;

  // Update expiration date
  document.querySelector('.exp-month').textContent = formData.expirationMonth;
  document.querySelector('.exp-year').textContent = formData.expirationYear.slice(-2);

  // Update CVV
  document.querySelector('.cvv-box').textContent = formData.cvv;
}

// Add the credit card details to the bottom of the page
function addCreditCardToPage(formData) {
  // Get the container element for credit cards
  const creditCardContainer = document.querySelector('#credit-cards');

  // Create a new div element for the credit card
  const creditCardElement = document.createElement('div');
  creditCardElement.classList.add('credit-card');

  // Create div elements for each credit card detail and set their text content
  const cardNumberElement = createCardDetailElement(formData.cardNumber);
  const cardHolderElement = createCardDetailElement(formData.cardHolder);
  const expirationElement = createCardDetailElement(`${formData.expirationMonth}/${formData.expirationYear.slice(-2)}`);
  const cvvElement = createCardDetailElement(formData.cvv);

  // Append the detail elements to the credit card element
  creditCardElement.appendChild(cardNumberElement);
  creditCardElement.appendChild(cardHolderElement);
  creditCardElement.appendChild(expirationElement);
  creditCardElement.appendChild(cvvElement);

  // Append the credit card element to the container
  creditCardContainer.appendChild(creditCardElement);
}

// Create a div element for a credit card detail and set its text content
function createCardDetailElement(value) {
  const cardDetailElement = document.createElement('div');
  cardDetailElement.textContent = value;
  cardDetailElement.classList.add('credit-card-detail');
  return cardDetailElement;
}

// Send form data to the server using a POST request
async function sendFormData(formData) {
  return fetch('/submitCC', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData),
  });
}

// Handle the response from the server
function handleResponse(response) {
  if (response.ok) {
    console.log('Credit card data submitted successfully');
  } else {
    console.error('Failed to submit credit card data');
  }
}

// Handle errors that occur during the request
function handleRequestError(error) {
  console.error('Error:', error);
}