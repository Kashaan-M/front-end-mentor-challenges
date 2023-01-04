let form = document.querySelector('#form');
let ratingWrapper = document.querySelector('.rating-wrapper');
let inputs = document.querySelectorAll('.rating-input');
let selected;

form.addEventListener('submit', handleSubmit);

function recallInputListener() {
  // Add click event listener for all input[type="radio"]
  inputs.forEach((input) => {
    input.addEventListener('click', function (e) {
      // When user clicks on one radio button then set the `checked` attribute for that button to `true`
      e.target.setAttribute('checked', 'true');
      // selected variable is used in the removeCheckedFromOtherInputs() for filtering out unselected radio inputs and setting their `checked` attribute to `false` .
      // We use recursive call to recallInputListener() to achieve this.
      selected = e.target.id;
      // Recursive call so that we can run the removeCheckedFromOtherInputs() by first testing:
      // If the selected radio button is not undefined AND the selected (reference to the id of the `clicked` radio button) is not equal to the <input>'s attribute `id` .
      // Here <input>(s) will be all the radio inputs that don't have the same id as the id of the `selected` or the radio button which got clicked .
      recallInputListener();
    });

    if (selected && selected !== input.getAttribute('id')) {
      removeCheckedFromOtherInputs(input);
    }
    function removeCheckedFromOtherInputs(input) {
      input.setAttribute('checked', 'false');
      // for Google Chrome
      input.checked = false;
      document.getElementById(selected).checked = true;
    }
  });
}
/* Calling recallInputListener()
 *  // My apologies if the name for this function is bad
 */
recallInputListener();

function handleSubmit(e) {
  e.preventDefault();
  let rating;
  if (selected) {
    rating = document.getElementById(selected).getAttribute('value');
  }
  ratingWrapper.innerHTML = `
  <section class="thankyou-component">
    <img src="./images/illustration-thank-you.svg" alt="thank you illustration" />
    <p class="user-rating">You selected ${rating || 0} out of 5</p>
    <h1>Thank you!</h1>
    <p>We appreciate you taking the time to give a rating. If you ever need more support, don’t hesitate to get in touch!</p>
  </section>
  <footer class="attribution">
    Challenge by
      <a href="https://www.frontendmentor.io?ref=challenge" target="_blank">Frontend Mentor</a>.
      Coded by <a href="https://kashaan.netlify.app">Kashaan Mahmood</a>.
  </footer>
    `;
}
