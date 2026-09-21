const session = requireSession();

if (session) {
  document.getElementById('sidebarName').textContent = `${session.name.split(' ')[0]}.`;
  document.getElementById('sidebarRole').textContent =
    session.role === 'resident' ? 'Manage your profile, vehicles and E-Tags.' :
    session.role === 'security' ? 'Verify vehicles quickly at the gate.' :
    'Oversee the entire estate E-Tag system.';

  renderUserChip(session);

  const sections = {
    resident: document.getElementById('residentSection'),
    security: document.getElementById('securitySection'),
    admin: document.getElementById('adminSection'),
  };

  Object.values(sections).forEach((section) => { section.hidden = true; });

  const activeSection = sections[session.role] || sections.resident;
  activeSection.hidden = false;
}

wireLogout();
