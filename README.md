# Terzigno – Mappa pubblica

Mappa pubblica, mobile-first, dei punti di raccolta rifiuti e delle fontanelle del Comune di Terzigno (NA).

Non è un gestionale: non ci sono login, dashboard o database. I contenuti si aggiornano modificando i file JSON e facendo un nuovo deploy.

- `/` — punti di raccolta rifiuti
- `/fontanelle` — fontanelle pubbliche

## 1. Installazione

Serve **Node.js 20.9 o successivo** (consigliato Node 22).

```bash
cd terzigno-mappa
nvm use
npm install
```

## 2. Avvio in locale

```bash
npm run dev
```

Apri [http://localhost:3000](http://localhost:3000) per la raccolta rifiuti e [http://localhost:3000/fontanelle](http://localhost:3000/fontanelle) per le fontanelle.

Altri comandi:

```bash
npm run lint
npm run build
npm run start
```

## 3. Dove modificare i punti di raccolta

File: [`data/raccolta.json`](data/raccolta.json), array `punti`.

Ogni punto ha:

- `nome`
- `indirizzo`
- `lat` e `lng` (coordinate)
- `categoria` (deve coincidere con l’`id` di una categoria)

## 4. Dove modificare le categorie

File: [`data/raccolta.json`](data/raccolta.json), array `categorie`.

Ogni categoria ha:

- `id` — chiave usata dai punti (`pile`, `raee`, `olio`, …)
- `etichetta` — testo in legenda e nel popup
- `colore` — esadecimale, ad esempio `#1f57c3`
- `indicazioni` — testo mostrato nel popup e in legenda

**Non modificare i file React o TypeScript** per aggiungere o togliere categorie.

## 5. Come aggiungere una nuova categoria

Aggiungi un oggetto in `categorie`:

```json
{
  "id": "olio",
  "etichetta": "Raccolta olio alimentare",
  "colore": "#f59e0b",
  "indicazioni": "Conferisci l'olio alimentare esausto nell'apposito contenitore."
}
```

Poi associa almeno un punto con `"categoria": "olio"`.

Al prossimo avvio o deploy il sito crea da solo la voce in legenda, usa il colore indicato e mostra le indicazioni.

## 6. Come aggiungere un nuovo punto

Aggiungi un oggetto in `punti`:

```json
{
  "nome": "Punto Olio",
  "indirizzo": "Via Esempio, 10",
  "lat": 40.123,
  "lng": 14.456,
  "categoria": "olio"
}
```

La `categoria` deve esistere in `categorie`. Se l’id non esiste, il punto viene ignorato (compare un avviso in console, la pagina non si rompe).

## 7. Come modificare le coordinate

Cambia `lat` e `lng` del punto. Devono essere numeri validi (latitudine da -90 a 90, longitudine da -180 a 180).

Esempio:

```json
"lat": 40.808,
"lng": 14.495
```

Dopo la modifica, esegui di nuovo `npm run dev` in locale oppure un deploy su Vercel.

## 8. Come modificare le indicazioni

Modifica il campo `indicazioni` della categoria in `data/raccolta.json`. Il testo compare nel popup di ogni punto di quella categoria e nella legenda.

Per le fontanelle, `indicazioni` sta sul singolo punto in `data/fontanelle.json`.

## 9. Come modificare le fontanelle

File: [`data/fontanelle.json`](data/fontanelle.json), array `punti`.

```json
{
  "nome": "Fontanella pubblica",
  "indirizzo": "Via Esempio",
  "lat": 40.808,
  "lng": 14.495,
  "indicazioni": "Acqua potabile"
}
```

Questa pagina è indipendente dalla raccolta rifiuti.

## 10. Deploy su Vercel

Il progetto è pronto per Vercel: non servono API key né variabili d’ambiente.

Da terminale, con l’account Vercel già autenticato:

```bash
npm install
npm run build
npx vercel
npx vercel --prod
```

Se il CLI non è autenticato:

```bash
npx vercel login
npx vercel
npx vercel --prod
```

In alternativa: importa la cartella del progetto dalla dashboard Vercel (framework: Next.js).

Deploy di produzione attuale:

- https://terzigno-mappa.vercel.app — punti di raccolta
- https://terzigno-mappa.vercel.app/fontanelle — fontanelle pubbliche

Dopo ogni modifica ai JSON, serve un nuovo deploy perché i dati vengono inclusi in fase di build.

## Dati DEMO

I file JSON attuali contengono **pochi punti dimostrativi**, non elenchi ufficiali.

- I nomi e gli indirizzi riportano `(DEMO)`
- Il campo `_meta.avviso` nei JSON lo ricorda
- Il *Centro di Raccolta Comunale* usa l’indirizzo *Via Vicinale Piano del Principe, Terzigno*, ma le coordinate **non sono ufficiali**: vanno sostituite

Sostituisci i valori DEMO con i dati del Comune prima di un uso pubblico reale.

## Stack

- Next.js, React, TypeScript
- Leaflet + OpenStreetMap (nessuna Google Maps, nessuna API a pagamento)
- Tailwind CSS
- Deploy su Vercel
