/**
 * This is a frontend-only demo: there is no authentication backend yet, so
 * any email/password combination signs the person in as whichever role
 * they pick. Swap the submit handler below for a real API call once a
 * backend exists.
 */
document.addEventListener('DOMContentLoaded', () => {
  const params = new URLSearchParams(window.location.search);
  const notice = document.getElementById('loginNotice');

  if (params.get('registered') === '1') {
    notice.hidden = false;
    notice.textContent = 'Account created. Sign in with your new email and password to continue.';
  }

  document.getElementById('loginForm').addEventListener('submit', (event) => {
    event.preventDefault();

    const email = document.getElementById('login-email').value.trim();
    const role = document.getElementById('login-role').value;
    const name = localStorage.getItem('etagFullName') || email.split('@')[0] || 'Resident';

    setSession({ name, role, email });
    window.location.href = 'dashboard.html';
  });
});
