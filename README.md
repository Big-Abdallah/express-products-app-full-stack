# Express Products App

A simple full-stack CRUD application for managing products. Built with an Express + file-based JSON backend and a React (Vite) frontend.

## Project Structure

```
express/
├── backend/
│   ├── index.js
│   ├── package.json
│   └── package-lock.json
├── data/
│   └── products.json
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── App.jsx
│   │   ├── App.css
│   │   ├── api.js
│   │   ├── index.css
│   │   └── main.jsx
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
└── README.md
```

## Tech Stack

| Layer | Tech |
|---|---|
| Backend | Node.js, Express |
| Data storage | JSON file (`data/products.json`) |
| Frontend | React (Vite) |
| Linting | Oxlint |
| Styling | Plain CSS, custom design tokens |

## Features

- Full CRUD for products: Create, Read, Update, Delete
- Card-based product grid on the frontend
- Live search/filter by product name
- CORS enabled for local frontend-backend communication

## Getting Started

### 1. Backend

```bash
cd backend
npm install
node index.js
```

The server runs at `http://localhost:3000`.

### 2. Frontend

In a separate terminal:

```bash
cd frontend
npm install
npm run dev
```

The app runs at `http://localhost:5173` (default Vite port).

> Make sure the backend is running **before** using the frontend, otherwise product data won't load.

## API Endpoints

Base URL: `http://localhost:3000`

| Method | Endpoint | Description |
|---|---|---|
| GET | `/products` | Get all products |
| GET | `/products/:id` | Get a single product by ID |
| POST | `/products` | Create a new product |
| PUT | `/products/:id` | Update an existing product |
| DELETE | `/products/:id` | Delete a product |

### Product Object

```json
{
  "id": 1,
  "name": "Wireless Mouse",
  "price": 15.99,
  "stock": 120,
  "description": "Ergonomic wireless mouse with adjustable DPI settings."
}
```

### Response Format

All responses follow this shape:

```json
{
  "message": "Success",
  "data": {}
}
```

Errors follow:

```json
{
  "message": "Error",
  "err": {}
}
```

## Data Storage

Products are stored in `data/products.json` and read/written directly by the backend on every request. No database is used — this is intentional for simplicity and learning purposes.

## Notes

- CORS is enabled on the backend (`cors` package) to allow requests from the Vite dev server.
- The frontend fetches from `http://localhost:3000` — update `BASE_URL` in `frontend/src/api.js` if the backend port or host changes.