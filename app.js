const form = document.querySelector('[data-application-form]');
const error = document.querySelector('[data-form-error]');
const ready = document.querySelector('[data-request-ready]');
const requestText = document.querySelector('[data-request-text]');
const copyButton = document.querySelector('[data-copy-request]');
const shareButton = document.querySelector('[data-share-request]');
document.querySelector('.footer small')?.replaceChildren('v0.1.7');

function buildRequest(data) { return `Hola, me interesa recibir información sobre el apoyo para abrir una tienda en TikTok Shop.\n\nNombre: ${data.name}\nVerificación y documentación: ${data.profile}`; }

form?.addEventListener('submit', (event) => {
  event.preventDefault();
  const fields = [...form.querySelectorAll('[required]')];
  const valid = fields.every((field) => field.value.trim());
  fields.forEach((field) => field.setAttribute('aria-invalid', String(!field.value.trim())));
  error.hidden = valid;
  if (!valid) return;
  requestText.value = buildRequest(Object.fromEntries(new FormData(form).entries()));
  ready.hidden = false;
  ready.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  window.location.href = `https://t.me/zipper_55?text=${encodeURIComponent(requestText.value)}`;
});

copyButton?.addEventListener('click', async () => {
  try { await navigator.clipboard.writeText(requestText.value); copyButton.textContent = 'Mensaje copiado'; window.setTimeout(() => { copyButton.textContent = 'Copiar mensaje'; }, 1800); }
  catch { requestText.focus(); requestText.select(); }
});

shareButton?.addEventListener('click', async () => {
  if (navigator.share) { try { await navigator.share({ title: 'Solicitud de catálogo', text: requestText.value }); return; } catch (shareError) { if (shareError.name === 'AbortError') return; } }
  requestText.focus(); requestText.select();
});
