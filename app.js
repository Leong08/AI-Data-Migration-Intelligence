const views = [...document.querySelectorAll('.view')];
const navItems = [...document.querySelectorAll('.nav-item')];
const breadcrumb = document.getElementById('breadcrumb');
const toast = document.getElementById('toast');

function showView(viewId) {
  views.forEach((view) => view.classList.toggle('active', view.id === viewId));
  navItems.forEach((item) => item.classList.toggle('active', item.dataset.view === viewId));
  const activeItem = navItems.find((item) => item.dataset.view === viewId);
  breadcrumb.textContent = activeItem ? activeItem.textContent.trim() : viewId;
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function showToast(message = 'Action completed') {
  toast.querySelector('strong').textContent = message;
  toast.classList.add('show');
  window.clearTimeout(showToast.timeout);
  showToast.timeout = window.setTimeout(() => toast.classList.remove('show'), 2600);
}

navItems.forEach((item) => item.addEventListener('click', () => showView(item.dataset.view)));
document.querySelectorAll('[data-view-target]').forEach((button) => {
  button.addEventListener('click', () => showView(button.dataset.viewTarget));
});

document.querySelectorAll('.approve-btn').forEach((button) => {
  button.addEventListener('click', () => {
    button.closest('.approval-card').remove();
    showToast('Approval recorded');
  });
});

document.querySelectorAll('.tab').forEach((tab) => {
  tab.addEventListener('click', () => {
    tab.parentElement.querySelectorAll('.tab').forEach((item) => item.classList.remove('active'));
    tab.classList.add('active');
  });
});

document.querySelectorAll('.toggle').forEach((toggle) => {
  toggle.addEventListener('click', () => toggle.classList.toggle('on'));
});

document.querySelectorAll('.setting-link').forEach((link) => {
  link.addEventListener('click', () => {
    link.parentElement.querySelectorAll('.setting-link').forEach((item) => item.classList.remove('active'));
    link.classList.add('active');
  });
});

document.querySelectorAll('#newMigrationBtn, #newMigrationBtn2').forEach((button) => {
  button.addEventListener('click', () => showToast('Migration wizard is ready to connect'));
});

document.querySelectorAll('.secondary-button, .filter-button, .icon-button, .more, .arrow').forEach((button) => {
  if (!button.classList.contains('approve-btn') && !button.id.startsWith('newMigration')) {
    button.addEventListener('click', () => showToast('Action completed'));
  }
});

document.addEventListener('keydown', (event) => {
  if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
    event.preventDefault();
    showToast('Search is ready');
  }
});
