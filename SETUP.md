# ResQ - Real-Time Ambulance Dispatch System

## Project Overview

ResQ is a comprehensive, real-time ambulance dispatching solution built with React, TypeScript, and Next.js. It provides dispatchers and fleet managers with tools to manage ambulances, respond to incidents, and track performance metrics.

## Key Features

✅ **Interactive Map** - Real-time ambulance positions with Leaflet, incident markers with color-coded severity
✅ **Dashboard** - KPI metrics, performance charts, and activity feeds  
✅ **Dispatch Control** - Quick incident creation and ambulance assignment from the map
✅ **Fleet Management** - Ambulance status tracking, crew management, and equipment inventory
✅ **Incident History** - Complete incident tracking with status updates and details
✅ **State Management** - Redux Toolkit for predictable state flow
✅ **Data Fetching** - TanStack Query for efficient caching and synchronization

## Tech Stack

- **Frontend**: Next.js 16, React 19, TypeScript
- **State Management**: Redux Toolkit
- **Data Fetching**: TanStack React Query
- **Mapping**: React Leaflet with OpenStreetMap
- **Charts**: Recharts
- **UI Components**: shadcn/ui
- **Styling**: Tailwind CSS v4
- **Backend Simulation**: JSON Server
- **Form Validation**: React Hook Form + Zod

## Project Structure

```
/app
  ├── page.tsx              # Dashboard
  ├── map/page.tsx          # Dispatch Map
  ├── fleet/page.tsx        # Fleet Management  
  ├── incidents/page.tsx    # Incident History
  └── layout.tsx            # Root layout with providers

/components
  ├── layout/               # Main layout, sidebar, header
  ├── dashboard/            # KPI grid, activity feed, charts
  ├── map/                  # Map components, markers, dispatch panel
  ├── fleet/                # Fleet table, add dialog
  ├── incidents/            # Incident list, details
  ├── common/               # Shared components (StatusBadge)
  └── providers/            # Redux and Query providers

/lib
  ├── redux/
  │   ├── store.ts         # Store configuration
  │   ├── hooks.ts         # useAppDispatch, useAppSelector
  │   └── slices/          # ambulances, incidents, dispatch slices
  └── api.ts               # API client with ambulance/incident endpoints

/db.json                    # Mock database for JSON Server
```

## Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Start JSON Server (Backend Mock)
In a separate terminal:
```bash
npm run server
```
This starts the mock backend on `http://localhost:3001`

### 3. Start Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser

## Usage Guide

### Dashboard (`/`)
- View real-time KPIs: available ambulances, active incidents, response time, completed incidents
- Monitor workload distribution and response time trends
- Track recent dispatch actions in activity feed

### Dispatch Map (`/map`)
- **View**: See all ambulances (green=available, yellow=busy, gray=maintenance) and incidents (color-coded by severity)
- **Filter**: Use top-right controls to filter ambulances by status
- **Manage**: Quick create incidents or assign ambulances using the dispatch panel
- **Interact**: Click markers for detailed information

### Fleet Management (`/fleet`)
- **Status**: View all ambulances with current status, crew, and equipment
- **Update**: Change ambulance status directly from the table
- **Add**: Create new ambulances using the Add Ambulance dialog
- **Remove**: Delete ambulances from the fleet

### Incident History (`/incidents`)
- **Track**: View all incidents with complete history
- **Update**: Change incident status (Pending → In Progress → Completed)
- **Details**: Click incidents to view full details in side panel
- **Statistics**: Monitor pending, in-progress, and completed incident counts

## Redux Architecture

The app uses Redux Toolkit for state management with three main slices:

**ambulancesSlice**
- State: `ambulances[]`, `loading`, `filter`
- Actions: update location/status, add/remove, set filter

**incidentsSlice**
- State: `incidents[]`, `selectedIncident`, `loading`
- Actions: create/update, assign ambulance, change status

**dispatchSlice**
- State: `actions[]` (dispatch log), `viewMode`
- Actions: log actions, clear history, change view

## Data Flow

1. Components fetch data with TanStack Query
2. Data is dispatched to Redux store via useEffect
3. Redux selectors provide state to components
4. User actions trigger mutations (create/update/delete)
5. Mutations update remote data and Redux store
6. Components re-render with new data

## Environment Variables

```
NEXT_PUBLIC_API_URL=http://localhost:3001  # JSON Server URL
```

## API Endpoints

### Ambulances
- `GET /ambulances` - Get all ambulances
- `GET /ambulances/:id` - Get specific ambulance
- `POST /ambulances` - Create ambulance
- `PATCH /ambulances/:id` - Update ambulance
- `DELETE /ambulances/:id` - Delete ambulance

### Incidents
- `GET /incidents` - Get all incidents
- `GET /incidents/:id` - Get specific incident
- `POST /incidents` - Create incident
- `PATCH /incidents/:id` - Update incident

## Building for Production

```bash
npm run build
npm run start
```

## Next Steps

To extend ResQ:

1. **Connect Real Backend**: Replace mock API with actual backend services
2. **Add Geolocation**: Implement real GPS tracking for ambulances
3. **Push Notifications**: Add alerts for critical incidents
4. **WebSockets**: Real-time updates using Socket.io or similar
5. **User Authentication**: Add login system and role-based access
6. **Reports**: Add advanced reporting and analytics
7. **Mobile App**: Expand to mobile platforms with React Native
