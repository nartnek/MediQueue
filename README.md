# MediQueue

MediQueue is a full-stack web application that helps users find nearby emergency departments in British Columbia, compare estimated ER wait times, and get directions to a hospital.

> **Note:** ER wait times are currently mock data and are intended for demonstration purposes only.


## Architecture

```text
User
 │
 ├── Current Location
 │
 └── Address Search
        │
        ▼
   Geocoding API
        │
        ▼
   Latitude / Longitude
        │
        ▼
  /api/hospitals
        │
        ▼
   PostgreSQL
        │
        ▼
 Nearby Hospitals
        │
 ├── Distance
 ├── ER Wait Time
 └── Directions
```

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/nartnek/MediQueue/
cd MediQueue
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file:

```env
DATABASE_URL=your_neon_database_url
```

### 4. Run the development server

```bash
npm run dev
```

Open `http://localhost:3000` in your browser.

## Project Structure

```text
MediQueue/
├── app/
│   ├── api/
│   │   ├── geocode/
│   │   │   └── route.ts
│   │   └── hospitals/
│   │       └── route.ts
│   ├── globals.css
│   └── page.tsx
│
├── components/
│   ├── HospitalCard.tsx
│   ├── HospitalList.tsx
│   └── LocationSearch.tsx
│
├── lib/
│   └── db.ts
│
├── types/
│   └── hospital.ts
│
└── package.json
```

## Disclaimer

MediQueue is a personal software project. Hospital wait times are mock estimates and should not be used for medical decision-making.
