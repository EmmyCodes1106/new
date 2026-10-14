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

    // Store the request in the same browser-local collection used by the admin review page.
    // This remains prototype-only; uploaded documents are not sent to a server.
    const application = {
      id: `ET-${new Date().getFullYear()}-${Date.now().toString().slice(-6)}`,
      name: session.name || 'Resident',
      email: session.email || '',
      vehicle: option.textContent.trim(),
      plate: option.dataset.plate || '',
      color: option.dataset.color || '',
      make: option.dataset.make || '',
      model: option.dataset.model || '',
      submitted: new Date().toISOString().slice(0, 10),
      status: 'Pending',
      note: ''
    };
    try {
      const existing = JSON.parse(localStorage.getItem('etagApplications') || 'null');
      const applications = Array.isArray(existing) ? existing : [
        {id:'ET-2026-001',name:'Amara Okafor',email:'amara.okafor@example.com',vehicle:'Toyota Corolla',plate:'ABC 123 XY',color:'Black',make:'Toyota',model:'Corolla',submitted:'2026-10-12',status:'Pending',note:''},
        {id:'ET-2026-002',name:'Daniel Williams',email:'daniel.w@example.com',vehicle:'Honda Civic',plate:'KJA 456 AB',color:'White',make:'Honda',model:'Civic',submitted:'2026-10-11',status:'Approved',note:'Documents checked.'},
        {id:'ET-2026-003',name:'Zainab Bello',email:'z.bello@example.com',vehicle:'Hyundai Tucson',plate:'LND 802 QZ',color:'Silver',make:'Hyundai',model:'Tucson',submitted:'2026-10-09',status:'Pending',note:''},
        {id:'ET-2026-004',name:'Michael Adeyemi',email:'m.adeyemi@example.com',vehicle:'Kia Sportage',plate:'GWA 441 TR',color:'Blue',make:'Kia',model:'Sportage',submitted:'2026-10-06',status:'Rejected',note:'Please provide a clearer ownership document.'},
        {id:'ET-2026-005',name:'Grace Thompson',email:'grace.t@example.com',vehicle:'Toyota Yaris',plate:'FST 100 MN',color:'Red',make:'Toyota',model:'Yaris',submitted:'2026-10-02',status:'Approved',note:''}
      ];
      applications.unshift(application);
      localStorage.setItem('etagApplications', JSON.stringify(applications));
    } catch (error) {
      console.error('Could not save the demo application.', error);
    }

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
