import express from 'express';
import { protect, authorize } from '../middleware/authMiddleware.js';

const router = express.Router();

const buses = [
  { id: 'BUS-101', driver: 'Rahul Sharma', route: 'North Loop', status: 'Active' },
  { id: 'BUS-204', driver: 'Neha Verma', route: 'Central Campus', status: 'Idle' },
  { id: 'BUS-317', driver: 'Amit Singh', route: 'River Side', status: 'Active' }
];

const students = [
  { id: 'ST-01', name: 'Aarav Mehta', route: 'North Loop', pickup: 'Green Park', bus: 'BUS-101' },
  { id: 'ST-02', name: 'Ishita Sharma', route: 'Central Campus', pickup: 'Lakeview', bus: 'BUS-204' },
  { id: 'ST-03', name: 'Kabir Rao', route: 'River Side', pickup: 'Oak Avenue', bus: 'BUS-317' }
];

const activeTrips = [
  { tripId: 'TRIP-4401', bus: 'BUS-101', status: 'In Transit', eta: '8 min', passengers: 18 },
  { tripId: 'TRIP-4402', bus: 'BUS-317', status: 'On Route', eta: '14 min', passengers: 12 }
];

const notifications = [
  { id: 'N-1', title: 'Pickup reminder', message: 'Bus is 3 minutes away from Green Park.', time: 'Just now' },
  { id: 'N-2', title: 'Route update', message: 'Traffic congestion cleared on the central route.', time: '12 mins ago' },
  { id: 'N-3', title: 'Trip started', message: 'Bus 204 has started its morning route.', time: '28 mins ago' }
];

router.get('/buses', protect, authorize('admin', 'staff', 'driver', 'parent'), (req, res) => {
  res.json({ buses });
});

router.get('/students', protect, authorize('admin', 'staff', 'driver', 'parent'), (req, res) => {
  res.json({ students });
});

router.get('/trips/active', protect, authorize('admin', 'staff', 'driver', 'parent'), (req, res) => {
  res.json({ trips: activeTrips });
});

router.post('/trips/start', protect, authorize('driver', 'admin'), (req, res) => {
  res.json({ message: 'Trip started successfully', tripId: 'TRIP-4401', status: 'In Transit' });
});

router.post('/trips/stop', protect, authorize('driver', 'admin'), (req, res) => {
  res.json({ message: 'Trip stopped successfully', tripId: 'TRIP-4401', status: 'Completed' });
});

router.get('/notifications', protect, authorize('admin', 'staff', 'driver', 'parent'), (req, res) => {
  res.json({ notifications });
});

export default router;
