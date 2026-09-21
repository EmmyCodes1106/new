const session = requireSession();
if (session) renderUserChip(session);

const scanButton = document.getElementById('scanButton');
const lookupButton = document.getElementById('lookupButton');
const lookupType = document.getElementById('lookupType');
const lookupValue = document.getElementById('lookupValue');
const resultCard = document.getElementById('resultCard');

lookupType.addEventListener('change', () => {
  lookupValue.placeholder = lookupType.value === 'plate' ? 'Enter license plate' : 'Enter resident name';
});

function showResult(valid, deniedReason) {
  resultCard.className = valid ? 'result-card valid' : 'result-card denied';
  resultCard.innerHTML = `
    <div class="result-head">
      <div class="result-badge">${valid ? 'VALID' : 'DENIED'}</div>
      <span class="result-time">Just now</span>
    </div>
    <div class="result-grid">
      <div><span>Vehicle Plate</span><strong>ABC 123 XY</strong></div>
      <div><span>E-Tag ID</span><strong>ET-10284</strong></div>
      <div><span>Resident</span><strong>John Doe</strong></div>
      <div><span>Vehicle</span><strong>Toyota Corolla</strong></div>
      <div><span>Access Status</span><strong>${valid ? 'Approved for Entry' : deniedReason}</strong></div>
      <div><span>Officer</span><strong>${session ? session.name : 'Gate Officer'}</strong></div>
    </div>
    <div class="result-message">${valid ? 'E-Tag is active. Access may be granted.' : 'Access must not be granted. Verify the vehicle or contact an administrator.'}</div>
  `;
}

scanButton.addEventListener('click', () => {
  scanButton.disabled = true;
  scanButton.innerHTML = 'Scanning... <span class="arrow">...</span>';

  setTimeout(() => {
    showResult(true, 'Access denied');
    scanButton.disabled = false;
    scanButton.innerHTML = 'Scan Again <span class="arrow">↻</span>';
  }, 900);
});

lookupButton.addEventListener('click', () => {
  const value = lookupValue.value.trim();
  if (!value) {
    lookupValue.focus();
    lookupValue.classList.add('error-input');
    return;
  }
  lookupValue.classList.remove('error-input');
  showResult(true, 'Access denied');
});
