const session = requireSession();
if (session) renderUserChip(session);

const vehicleSelect = document.getElementById('vehicle');
const plateInput = document.getElementById('plate');
const colorInput = document.getElementById('color');
const makeInput = document.getElementById('make');
const modelInput = document.getElementById('model');

const ownershipInput = document.getElementById('ownership');
const identificationInput = document.getElementById('identification');
const ownershipName = document.getElementById('ownershipName');
const identificationName = document.getElementById('identificationName');

const notice = document.getElementById('notice');
const form = document.getElementById('etagForm');
const submitBtn = document.getElementById('submitBtn');

const successCard = document.getElementById('successCard');
const summaryVehicle = document.getElementById('summaryVehicle');
const summaryPlate = document.getElementById('summaryPlate');
const newApplicationBtn = document.getElementById('newApplication');

function showNotice(message, type) {
  notice.textContent = message;
  notice.hidden = false;
  notice.className = `notice ${type}`;
}

function clearNotice() {
  notice.textContent = '';
  notice.hidden = true;
  notice.className = 'notice';
}

// Fill in the read-only vehicle fields from the chosen option's data attributes
vehicleSelect.addEventListener('change', () => {
  const option = vehicleSelect.selectedOptions[0];
  plateInput.value = option.dataset.plate || '';
  colorInput.value = option.dataset.color || '';
  makeInput.value = option.dataset.make || '';
  modelInput.value = option.dataset.model || '';
});

ownershipInput.addEventListener('change', () => {
  ownershipName.textContent = ownershipInput.files[0] ? ownershipInput.files[0].name : '';
});

identificationInput.addEventListener('change', () => {
  identificationName.textContent = identificationInput.files[0] ? identificationInput.files[0].name : '';
});

form.addEventListener('submit', (event) => {
  event.preventDefault();
  clearNotice();

  if (!vehicleSelect.value) {
    showNotice('Please select a registered vehicle before submitting.', 'error');
    return;
  }
  if (!ownershipInput.files[0] || !identificationInput.files[0]) {
    showNotice('Please upload both the ownership document and identification.', 'error');
    return;
  }
  if (!document.getElementById('confirmation').checked) {
    showNotice('Please confirm the details above are accurate.', 'error');
    return;
  }

  // This is a frontend-only demo: there is no backend/API yet, so the
  // submission is simulated and recorded as Pending Review in the UI only.
  submitBtn.disabled = true;
  submitBtn.textContent = 'Submitting...';

  setTimeout(() => {
    const option = vehicleSelect.selectedOptions[0];
    summaryVehicle.textContent = option.textContent.trim();
    summaryPlate.textContent = option.dataset.plate || '';

    form.hidden = true;
    successCard.hidden = false;
  }, 700);
});

newApplicationBtn.addEventListener('click', () => {
  form.reset();
  plateInput.value = '';
  colorInput.value = '';
  makeInput.value = '';
  modelInput.value = '';
  ownershipName.textContent = '';
  identificationName.textContent = '';
  clearNotice();

  submitBtn.disabled = false;
  submitBtn.innerHTML = 'Submit E-Tag Application <span class="arrow">→</span>';

  successCard.hidden = true;
  form.hidden = false;
});
