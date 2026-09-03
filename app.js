const menuToggle = document.querySelector('[data-menu-toggle]');
const menu = document.querySelector('[data-menu]');

menuToggle?.addEventListener('click', () => {
  const isOpen = menu.classList.toggle('is-open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
});

menu?.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    menu.classList.remove('is-open');
    menuToggle?.setAttribute('aria-expanded', 'false');
  });
});

const form = document.querySelector('[data-application-form]');
const error = document.querySelector('[data-form-error]');
const ready = document.querySelector('[data-request-ready]');
const requestText = document.querySelector('[data-request-text]');
const copyButton = document.querySelector('[data-copy-request]');
const shareButton = document.querySelector('[data-share-request]');
const telegramUsername = 'b23355';

function buildRequest(data) {
  return `Hola, me interesa colaborar con Abasto Directo.\n\nNombre: ${data.name}\n¿Dispuesto/a a crear una nueva tienda de TikTok en México?: ${data.store_creation}`;
}

form?.addEventListener('submit', (event) => {
  event.preventDefault();
  const fields = [...form.querySelectorAll('[required]')];
  const valid = fields.every((field) => field.value.trim());

  fields.forEach((field) => field.setAttribute('aria-invalid', String(!field.value.trim())));
  error.hidden = valid;
  if (!valid) return;

  const data = Object.fromEntries(new FormData(form).entries());
  const message = buildRequest(data);
  requestText.value = message;
  ready.hidden = false;
  ready.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  window.location.href = `tg://resolve?domain=${telegramUsername}`;
});

copyButton?.addEventListener('click', async () => {
  try {
    await navigator.clipboard.writeText(requestText.value);
    copyButton.textContent = 'Mensaje copiado';
    window.setTimeout(() => { copyButton.textContent = 'Copiar mensaje'; }, 1800);
  } catch {
    requestText.focus();
    requestText.select();
  }
});

shareButton?.addEventListener('click', async () => {
  if (navigator.share) {
    try {
      await navigator.share({ title: 'Solicitud de colaboración', text: requestText.value });
      return;
    } catch (error) {
      if (error.name === 'AbortError') return;
    }
  }
  requestText.focus();
  requestText.select();
});
