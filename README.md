# Abasto Directo

Version: `0.0.8`

Spanish-first static landing page for recruiting supply-chain collaborators in Mexico. It is designed around a real campaign narrative: household-goods supply, responsible local collaborators, and a clear path to initiate contact.

## Run locally

```powershell
py -m http.server 4173 --bind 127.0.0.1
```

Open `http://127.0.0.1:4173`.

## Lead handoff

The form deliberately prepares a shareable application message. It does not submit data to a third party until a real WhatsApp Business destination or CRM endpoint is supplied.

## Media

`assets/warehouse-hero.png` is a local generated hero asset and is ignored by Git. Replace it with the approved campaign video or image before deployment, keeping the filename or updating the reference in `styles.css`.
