import { useEffect, useMemo, useState } from 'react';
import { Routes, Route, Link, NavLink, Navigate, useNavigate } from 'react-router-dom';
import {
  ArrowRight,
  Bell,
  Bus,
  CheckCircle2,
  Clock3,
  LogOut,
  MapPinned,
  ShieldCheck,
  Sparkles,
  Users,
  Gauge,
  LogIn,
  Route as RouteIcon,
  CarFront,
  LayoutDashboard,
  UserRound,
  Settings,
  CircleAlert,
  School,
} from 'lucide-react';

const API_URL = 'http://localhost:5000';

const roles = [
  {
    title: 'Parent',
    description: 'Live bus tracking, ETA and school notifications.',
    icon: Users,
    accent: 'from-blue-500 to-cyan-500',
  },
  {
    title: 'Driver',
    description: 'Start trips and share live route progress safely.',
    icon: CarFront,
    accent: 'from-emerald-500 to-teal-500',
  },
  {
    title: 'Admin',
    description: 'Manage buses, drivers, routes and trip reports.',
    icon: LayoutDashboard,
    accent: 'from-violet-500 to-indigo-500',
  },
  {
    title: 'Staff',
    description: 'Monitor school transport status and schedules.',
    icon: Settings,
    accent: 'from-amber-500 to-orange-500',
  },
];

const appLinks = [
  { to: '/', label: 'Home' },
  { to: '/login', label: 'Login' },
  { to: '/dashboard', label: 'Dashboard' },
];

function readStoredUser() {
  try {
    return JSON.parse(localStorage.getItem('schoolbus-user') || 'null');
  } catch {
    return null;
  }
}

function readStoredToken() {
  return localStorage.getItem('schoolbus-token') || '';
}

function formatRole(role) {
  return role ? role.charAt(0).toUpperCase() + role.slice(1) : 'User';
}

function LandingPage({ user }) {
  return (
    <div className="min-h-screen text-slate-800">
      <header className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-700 text-white shadow-soft">
            <Bus size={22} />
          </div>
          <div>
            <p className="text-lg font-bold tracking-tight">SchoolBus Live</p>
            <p className="text-xs text-slate-500">Safe transport tracking</p>
          </div>
        </div>

        <nav className="hidden items-center gap-8 md:flex">
          {appLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `text-sm font-medium transition ${isActive ? 'text-blue-600' : 'text-slate-600 hover:text-slate-900'}`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <Link
          to={user ? '/dashboard' : '/login'}
          className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-5 py-3 text-sm font-semibold text-white shadow-soft transition hover:-translate-y-0.5"
        >
          <LogIn size={16} />
          {user ? 'Dashboard' : 'Sign in'}
        </Link>
      </header>

      <main className="mx-auto max-w-7xl px-6 pb-16 pt-10">
        <section className="grid items-center gap-10 lg:grid-cols-[1.2fr_0.8fr]">
          <div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-sm font-medium text-blue-700">
              <Sparkles size={14} />
              Real-time tracking for safer school commutes
            </div>

            <h1 className="max-w-xl text-5xl font-black tracking-tight text-slate-900">
              Smart school transport for every parent, driver, and admin.
            </h1>

            <p className="mt-5 max-w-xl text-lg text-slate-600">
              Monitor live bus movement, get ETA updates, and manage trips from a single modern dashboard built for school safety and transparency.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                to={user ? '/dashboard' : '/login'}
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-3.5 font-semibold text-white shadow-soft transition hover:-translate-y-0.5"
              >
                {user ? 'Open dashboard' : 'Login'}
                <ArrowRight size={18} />
              </Link>
              <Link
                to="/login"
                className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-6 py-3.5 font-semibold text-slate-700 shadow-sm transition hover:border-slate-300 hover:bg-slate-50"
              >
                View access
              </Link>
            </div>

            <div className="mt-10 flex flex-wrap gap-6 text-sm text-slate-600">
              <div className="flex items-center gap-2">
                <ShieldCheck className="text-emerald-500" size={18} />
                Secure authentication
              </div>
              <div className="flex items-center gap-2">
                <MapPinned className="text-blue-500" size={18} />
                Live GPS map tracking
              </div>
              <div className="flex items-center gap-2">
                <Bell className="text-amber-500" size={18} />
                Instant notifications
              </div>
            </div>
          </div>

          <div className="rounded-[32px] bg-slate-900 p-5 text-white shadow-soft">
            <div className="rounded-[28px] border border-slate-700 bg-slate-950 p-4">
              <div className="mb-5 flex items-center justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Live route</p>
                  <p className="mt-1 text-2xl font-bold">Bus 204</p>
                </div>
                <div className="rounded-full bg-emerald-500/15 px-3 py-1 text-xs font-semibold text-emerald-300">Online</div>
              </div>

              <div className="h-56 rounded-[22px] bg-gradient-to-br from-sky-500/15 via-slate-900 to-indigo-500/10 p-4">
                <div className="relative h-full w-full overflow-hidden rounded-[18px] border border-slate-700 bg-[radial-gradient(circle_at_center,_rgba(59,130,246,0.2),transparent_35%),linear-gradient(135deg,#111827,#0f172a)]">
                  <div className="absolute left-10 top-10 h-2.5 w-2.5 rounded-full bg-red-400 shadow-[0_0_18px_rgba(248,113,113,0.8)]" />
                  <div className="absolute right-12 top-20 h-2.5 w-2.5 rounded-full bg-amber-400 shadow-[0_0_18px_rgba(251,191,36,0.8)]" />
                  <div className="absolute bottom-8 left-16 h-14 w-14 rounded-full border border-dashed border-slate-500" />
                  <div className="absolute bottom-12 right-20 h-20 w-20 rounded-full border border-dashed border-slate-500" />
                  <div className="absolute left-[48%] top-[52%] h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-400 shadow-[0_0_18px_rgba(96,165,250,0.8)]" />
                  <div className="absolute left-[40%] top-[42%] h-2 w-2 rounded-full bg-white" />
                </div>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-3 text-sm text-slate-300">
                <div className="rounded-2xl bg-slate-800 p-3">
                  <p className="text-xs uppercase text-slate-400">ETA</p>
                  <p className="mt-1 text-lg font-semibold text-white">8 min</p>
                </div>
                <div className="rounded-2xl bg-slate-800 p-3">
                  <p className="text-xs uppercase text-slate-400">Speed</p>
                  <p className="mt-1 text-lg font-semibold text-white">42 km/h</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-20">
          <div className="mb-8 flex items-end justify-between gap-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">Platform</p>
              <h2 className="mt-2 text-3xl font-black tracking-tight text-slate-900">Built for every role</h2>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {roles.map(({ title, description, icon: Icon, accent }) => (
              <div key={title} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-soft">
                <div className={`mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${accent} text-white`}>
                  <Icon size={20} />
                </div>
                <h3 className="text-xl font-bold text-slate-900">{title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-600">{description}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

function LoginPage({ user, onLogin }) {
  const navigate = useNavigate();
  const [isRegister, setIsRegister] = useState(false);
  const [form, setForm] = useState({
    name: '',
    email: 'parent@schoolbus.com',
    password: 'password123',
    role: 'parent',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) navigate('/dashboard');
  }, [user, navigate]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError('');

    try {
      const endpoint = isRegister ? '/api/auth/register' : '/api/auth/login';
      const response = await fetch(`${API_URL}${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Authentication failed');
      }

      localStorage.setItem('schoolbus-token', data.token);
      localStorage.setItem('schoolbus-user', JSON.stringify(data.user));
      onLogin(data);
      navigate('/dashboard');
    } catch (err) {
      setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center px-6 py-12">
      <div className="grid w-full max-w-6xl overflow-hidden rounded-[32px] bg-white shadow-soft lg:grid-cols-2">
        <div className="bg-gradient-to-br from-blue-600 via-indigo-600 to-sky-500 p-10 text-white">
          <div className="mb-10 flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/15">
              <Bus size={22} />
            </div>
            <div>
              <p className="text-lg font-bold">SchoolBus Live</p>
              <p className="text-xs text-blue-100">Transport control center</p>
            </div>
          </div>

          <h2 className="text-3xl font-black leading-snug">Track every trip with confidence.</h2>
          <p className="mt-4 max-w-md text-blue-100">
            Real-time route visibility, driver safety updates, and timely alerts for students, parents, and school staff.
          </p>

          <div className="mt-10 space-y-4">
            <div className="flex items-center gap-3 rounded-2xl bg-white/10 p-3">
              <ShieldCheck size={18} />
              Secure role-based login
            </div>
            <div className="flex items-center gap-3 rounded-2xl bg-white/10 p-3">
              <MapPinned size={18} />
              Route and geofence tracking
            </div>
            <div className="flex items-center gap-3 rounded-2xl bg-white/10 p-3">
              <Bell size={18} />
              Instant arrival notifications
            </div>
          </div>
        </div>

        <div className="p-8 md:p-10">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">{isRegister ? 'Create account' : 'Welcome back'}</p>
              <h3 className="mt-2 text-3xl font-black text-slate-900">{isRegister ? 'Join the platform' : 'Login to your account'}</h3>
            </div>
            <button
              type="button"
              onClick={() => setIsRegister(!isRegister)}
              className="rounded-full border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-700 transition hover:border-slate-300"
            >
              {isRegister ? 'Login' : 'Register'}
            </button>
          </div>

          <form className="space-y-5" onSubmit={handleSubmit}>
            {isRegister && (
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">Full name</label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Enter your full name"
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-blue-500 focus:bg-white"
                  required={isRegister}
                />
              </div>
            )}

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">Email</label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-blue-500 focus:bg-white"
                required
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">Password</label>
              <input
                type="password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-blue-500 focus:bg-white"
                required
              />
            </div>

            {isRegister && (
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">Role</label>
                <select
                  value={form.role}
                  onChange={(e) => setForm({ ...form, role: e.target.value })}
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-blue-500 focus:bg-white"
                >
                  <option value="parent">Parent</option>
                  <option value="driver">Driver</option>
                  <option value="admin">Admin</option>
                  <option value="staff">Staff</option>
                </select>
              </div>
            )}

            {error && (
              <div className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="inline-flex w-full items-center justify-center rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 px-5 py-3.5 font-semibold text-white shadow-soft transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? 'Please wait...' : isRegister ? 'Create account' : 'Login'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

function DashboardPage({ user, token, onLogout }) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [data, setData] = useState({ buses: [], students: [], trips: [], notifications: [] });

  const fetchDashboard = async () => {
    try {
      setLoading(true);
      const responses = await Promise.all([
        fetch(`${API_URL}/api/buses`, { headers: { Authorization: `Bearer ${token}` } }),
        fetch(`${API_URL}/api/students`, { headers: { Authorization: `Bearer ${token}` } }),
        fetch(`${API_URL}/api/trips/active`, { headers: { Authorization: `Bearer ${token}` } }),
        fetch(`${API_URL}/api/notifications`, { headers: { Authorization: `Bearer ${token}` } }),
      ]);

      const [busesRes, studentsRes, tripsRes, notificationsRes] = responses;

      if (responses.some((res) => !res.ok)) {
        throw new Error('Failed to load dashboard data');
      }

      const busesData = await busesRes.json();
      const studentsData = await studentsRes.json();
      const tripsData = await tripsRes.json();
      const notificationsData = await notificationsRes.json();

      setData({
        buses: busesData.buses || [],
        students: studentsData.students || [],
        trips: tripsData.trips || [],
        notifications: notificationsData.notifications || [],
      });
    } catch (err) {
      setError(err.message || 'Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!user || !token) {
      navigate('/login');
      return;
    }

    fetchDashboard();
  }, [user, token, navigate]);

  const roleSummary = useMemo(() => {
    const defaultStats = [
      { label: 'Active buses', value: data.buses.length || 0, trend: 'Fleet status', icon: Bus },
      { label: 'Assigned students', value: data.students.length || 0, trend: 'Active riders', icon: School },
      { label: 'Trips today', value: data.trips.length || 0, trend: 'On time', icon: Gauge },
      { label: 'Notifications', value: data.notifications.length || 0, trend: 'Live alerts', icon: Bell },
    ];

    return defaultStats;
  }, [data]);

  const tripCards = data.trips.length > 0 ? data.trips : [{ tripId: 'TRIP-000', bus: 'No active trip', status: 'Idle', eta: '--', passengers: 0 }];
  const studentCards = data.students.length > 0 ? data.students : [{ id: 'N/A', name: 'No rider data', route: 'No route', pickup: 'Pending' }];

  const handleTripAction = async (action) => {
    try {
      const response = await fetch(`${API_URL}/api/trips/${action}`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      const result = await response.json();
      if (!response.ok) throw new Error(result.message || 'Trip action failed');
      fetchDashboard();
      alert(result.message);
    } catch (err) {
      setError(err.message || 'Unable to update trip');
    }
  };

  if (!user) return <Navigate to="/login" replace />;

  return (
    <div className="min-h-screen bg-slate-100 px-4 py-6 text-slate-800 md:px-8">
      <div className="mx-auto max-w-7xl">
        <header className="mb-8 flex flex-col gap-4 rounded-[28px] border border-slate-200 bg-white p-5 shadow-soft md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">Operations</p>
            <h1 className="mt-2 text-3xl font-black tracking-tight">Transport dashboard</h1>
          </div>

          <div className="flex items-center gap-3">
            <div className="rounded-full bg-emerald-50 px-3 py-2 text-sm font-medium text-emerald-700">● Live</div>
            <div className="flex items-center gap-2 rounded-full bg-slate-100 px-3 py-2 text-sm font-medium text-slate-700">
              <UserRound size={16} />
              {formatRole(user.role)}
            </div>
            <button
              onClick={() => {
                localStorage.removeItem('schoolbus-token');
                localStorage.removeItem('schoolbus-user');
                onLogout();
                navigate('/login');
              }}
              className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 transition hover:border-slate-300"
            >
              <LogOut size={16} />
              Logout
            </button>
          </div>
        </header>

        <nav className="mb-8 flex flex-wrap gap-3">
          {['Overview', 'Routes', 'Trips', 'Reports', 'Alerts'].map((label) => (
            <button key={label} className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-slate-300">
              {label}
            </button>
          ))}
        </nav>

        {error && (
          <div className="mb-4 rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
            <div className="flex items-center gap-2">
              <CircleAlert size={16} />
              {error}
            </div>
          </div>
        )}

        {loading ? (
          <div className="rounded-[28px] border border-slate-200 bg-white p-10 text-center text-slate-600 shadow-soft">
            Loading dashboard data...
          </div>
        ) : (
          <>
            <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
              {roleSummary.map(({ label, value, trend, icon: Icon }) => (
                <div key={label} className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-soft">
                  <div className="flex items-center justify-between">
                    <div className="rounded-2xl bg-blue-50 p-2 text-blue-600">
                      <Icon size={20} />
                    </div>
                    <span className="text-xs font-semibold text-emerald-600">{trend}</span>
                  </div>
                  <p className="mt-6 text-sm text-slate-500">{label}</p>
                  <p className="mt-2 text-3xl font-black text-slate-900">{value}</p>
                </div>
              ))}
            </section>

            <section className="mt-8 grid gap-6 xl:grid-cols-[1.3fr_0.7fr]">
              <div className="rounded-[26px] border border-slate-200 bg-white p-5 shadow-soft">
                <div className="mb-5 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">Live map</p>
                    <h2 className="mt-2 text-xl font-black">Route overview</h2>
                  </div>
                  <div className="rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-700">{data.notifications.length} alerts</div>
                </div>

                <div className="h-[360px] rounded-[22px] border border-slate-200 bg-gradient-to-br from-sky-500/10 via-slate-100 to-indigo-500/10 p-4">
                  <div className="relative h-full w-full overflow-hidden rounded-[18px] border border-slate-200 bg-[radial-gradient(circle_at_center,_rgba(59,130,246,0.12),transparent_35%),linear-gradient(135deg,#dbeafe,#eef2ff_50%,#f8fafc)]">
                    <div className="absolute left-12 top-16 h-3 w-3 rounded-full bg-red-500 shadow-[0_0_16px_rgba(239,68,68,0.9)]" />
                    <div className="absolute left-[38%] top-[48%] h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500 shadow-[0_0_20px_rgba(59,130,246,0.9)]" />
                    <div className="absolute right-16 bottom-10 h-3 w-3 rounded-full bg-emerald-500 shadow-[0_0_18px_rgba(16,185,129,0.8)]" />
                    <div className="absolute left-1/2 top-1/2 h-24 w-24 -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-slate-300" />
                    <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent_0%,transparent_49%,rgba(148,163,184,0.4)_50%,transparent_51%,transparent_100%)]" />
                    <div className="absolute inset-0 bg-[linear-gradient(transparent_0%,transparent_49%,rgba(148,163,184,0.4)_50%,transparent_51%,transparent_100%)]" />
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="rounded-[26px] border border-slate-200 bg-white p-5 shadow-soft">
                  <div className="mb-4 flex items-center justify-between">
                    <h3 className="text-xl font-black">Active trips</h3>
                    <RouteIcon size={18} className="text-blue-600" />
                  </div>

                  <div className="space-y-4">
                    {tripCards.map((trip) => (
                      <div key={trip.tripId} className="flex items-center justify-between rounded-2xl bg-slate-50 p-3">
                        <div>
                          <p className="font-semibold text-slate-800">{trip.bus}</p>
                          <p className="text-xs text-slate-500">{trip.status}</p>
                        </div>
                        <div className="text-right">
                          <span className="rounded-full bg-blue-100 px-2.5 py-1 text-xs font-semibold text-blue-700">{trip.eta}</span>
                          <p className="mt-1 text-xs text-slate-500">{trip.passengers} riders</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {(user.role === 'driver' || user.role === 'admin') && (
                    <div className="mt-4 flex gap-3">
                      <button
                        onClick={() => handleTripAction('start')}
                        className="flex-1 rounded-2xl bg-emerald-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-700"
                      >
                        Start trip
                      </button>
                      <button
                        onClick={() => handleTripAction('stop')}
                        className="flex-1 rounded-2xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-700"
                      >
                        Stop trip
                      </button>
                    </div>
                  )}
                </div>

                <div className="rounded-[26px] border border-slate-200 bg-white p-5 shadow-soft">
                  <div className="mb-4 flex items-center justify-between">
                    <h3 className="text-xl font-black">Alerts</h3>
                    <Bell size={18} className="text-amber-500" />
                  </div>

                  <div className="space-y-3">
                    {data.notifications.map((item) => (
                      <div key={item.id || item.title} className="rounded-2xl border border-slate-200 bg-slate-50 p-3 text-sm text-slate-700">
                        <p className="font-semibold">{item.title}</p>
                        <p className="mt-1">{item.message}</p>
                        <p className="mt-2 text-xs text-slate-500">{item.time}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            <section className="mt-8 grid gap-6 md:grid-cols-2">
              <div className="rounded-[26px] border border-slate-200 bg-white p-5 shadow-soft">
                <div className="mb-4 flex items-center justify-between">
                  <h3 className="text-xl font-black">Fleet status</h3>
                  <Bus size={18} className="text-blue-600" />
                </div>

                <div className="space-y-3">
                  {data.buses.map((bus) => (
                    <div key={bus.id} className="flex items-center justify-between rounded-2xl bg-slate-50 p-3">
                      <div>
                        <p className="font-semibold text-slate-800">{bus.id}</p>
                        <p className="text-xs text-slate-500">{bus.driver}</p>
                      </div>
                      <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${bus.status === 'Active' ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-200 text-slate-700'}`}>
                        {bus.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-[26px] border border-slate-200 bg-white p-5 shadow-soft">
                <div className="mb-4 flex items-center justify-between">
                  <h3 className="text-xl font-black">Students</h3>
                  <Users size={18} className="text-blue-600" />
                </div>

                <div className="space-y-3">
                  {studentCards.map((student) => (
                    <div key={student.id} className="rounded-2xl bg-slate-50 p-3">
                      <div className="flex items-center justify-between">
                        <p className="font-semibold text-slate-800">{student.name}</p>
                        <span className="text-xs font-semibold text-slate-500">{student.bus || 'Assigned'}</span>
                      </div>
                      <p className="mt-1 text-xs text-slate-500">Route: {student.route}</p>
                      <p className="text-xs text-slate-500">Pickup: {student.pickup}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </>
        )}
      </div>
    </div>
  );
}

function ProtectedRoute({ user, children }) {
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default function App() {
  const [user, setUser] = useState(readStoredUser);
  const [token, setToken] = useState(readStoredToken);

  useEffect(() => {
    if (user) {
      localStorage.setItem('schoolbus-user', JSON.stringify(user));
    } else {
      localStorage.removeItem('schoolbus-user');
    }
  }, [user]);

  useEffect(() => {
    if (token) {
      localStorage.setItem('schoolbus-token', token);
    } else {
      localStorage.removeItem('schoolbus-token');
    }
  }, [token]);

  return (
    <Routes>
      <Route path="/" element={<LandingPage user={user} />} />
      <Route path="/login" element={<LoginPage user={user} onLogin={(data) => { setUser(data.user); setToken(data.token); }} />} />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute user={user}>
            <DashboardPage user={user} token={token} onLogout={() => { setUser(null); setToken(''); }} />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
