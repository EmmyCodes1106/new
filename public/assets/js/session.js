/**
 * Shared session helpers for the Estate E-Tag System.
 *
 * This is a frontend-only prototype: there is no authentication backend yet,
 * so a "session" is just a small JSON object kept in localStorage. Swap
 * these functions out for real API calls once a backend exists — every page
 * only talks to the session through this module, so that's the one place
 * that will need to change.
 */

const SESSION_KEY = 'etagSession';

const ROLE_LABELS = {
  resident: 'Resident',
  security: 'Security Personnel',
  admin: 'Estate Administrator',
};

function initialsFromName(name) {
  return (
    name
      .split(' ')
      .filter(Boolean)
      .map((part) => part[0].toUpperCase())
      .slice(0, 2)
      .join('') || 'R'
  );
}

function getSession() {
  try {
    return JSON.parse(localStorage.getItem(SESSION_KEY));
  } catch {
    return null;
  }
}

function setSession({ name, role, email }) {
  const session = { name, role, email, initials: initialsFromName(name) };
  localStorage.setItem(SESSION_KEY, JSON.stringify(session));
  return session;
}

function clearSession() {
  localStorage.removeItem(SESSION_KEY);
}

function roleLabel(role) {
  return ROLE_LABELS[role] || 'Resident';
}

/**
 * Call at the top of every protected page. Redirects to the login page
 * if nobody is signed in; otherwise returns the session.
 */
function requireSession() {
  const session = getSession();
  if (!session) {
    window.location.href = 'login.html';
    return null;
  }
  return session;
}

/**
 * Fills in the shared "who's signed in" chip that appears in the topbar of
 * every protected page. Expects elements with data-user-name,
 * data-user-role, and data-user-avatar attributes.
 */
function renderUserChip(session) {
  document.querySelectorAll('[data-user-name]').forEach((el) => { el.textContent = session.name; });
  document.querySelectorAll('[data-user-role]').forEach((el) => { el.textContent = roleLabel(session.role); });
  document.querySelectorAll('[data-user-avatar]').forEach((el) => { el.textContent = session.initials; });
}

function wireLogout(buttonId = 'logoutBtn') {
  const btn = document.getElementById(buttonId);
  if (btn) {
    btn.addEventListener('click', () => clearSession());
  }
}
