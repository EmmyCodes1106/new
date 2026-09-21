/**
 * This is a frontend-only demo: there is no accounts backend yet, so
 * submitting just validates the fields, remembers the resident's name
 * locally, and sends them to the login page.
 */
document.addEventListener('DOMContentLoaded', () => {
  const passwordInput = document.getElementById('password');
  const meterBars = document.querySelectorAll('.password-meter span');

  function passwordStrength(value) {
    let score = 0;
    if (value.length >= 8) score++;
    if (/[A-Z]/.test(value) && /[a-z]/.test(value)) score++;
    if (/\d/.test(value)) score++;
    if (/[^A-Za-z0-9]/.test(value)) score++;
    return score;
  }

  passwordInput.addEventListener('input', () => {
    const score = passwordStrength(passwordInput.value);
    meterBars.forEach((bar, index) => {
      bar.classList.toggle('filled', index < score);
    });
  });

  document.getElementById('registerForm').addEventListener('submit', (event) => {
    event.preventDefault();

    const notice = document.getElementById('registerNotice');
    const confirmPasswordInput = document.getElementById('confirm-password');

    if (passwordInput.value !== confirmPasswordInput.value) {
      notice.hidden = false;
      notice.textContent = 'Passwords do not match. Please re-enter them.';
      confirmPasswordInput.focus();
      return;
    }

    const fullName = document.getElementById('full-name').value.trim();
    localStorage.setItem('etagFullName', fullName);

    window.location.href = 'login.html?registered=1';
  });
});
