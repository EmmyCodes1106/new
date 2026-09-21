const session = requireSession();
if (session) renderUserChip(session);

/**
 * This is a frontend-only demo: the vehicle isn't persisted to a backend
 * yet, so submitting just confirms the action and returns to the profile.
 */
document.getElementById('vehicleForm').addEventListener('submit', (event) => {
  event.preventDefault();
  alert('Vehicle registered. It will now appear under your registered vehicles.');
  window.location.href = 'profile.html';
});
