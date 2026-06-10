import React, { useCallback, useEffect, useState } from 'react';

type Submission = {
  id: number;
  name: string;
  email: string;
  company: string | null;
  message: string | null;
  created_at: string;
};

type View = 'loading' | 'login' | 'dashboard';

function formatDate(iso: string): string {
  return new Intl.DateTimeFormat('en-US', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(new Date(iso));
}

export const OperationsDashboard = () => {
  const [view, setView] = useState<View>('loading');
  const [password, setPassword] = useState('');
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const loadSubmissions = useCallback(async () => {
    setError(null);
    const res = await fetch('/api/ops/submissions');
    const data = await res.json().catch(() => ({}));

    if (res.status === 401) {
      setView('login');
      return;
    }

    if (!res.ok) {
      setError(data.error || 'Could not load submissions.');
      setView('dashboard');
      return;
    }

    setSubmissions(data.submissions ?? []);
    setView('dashboard');
  }, []);

  useEffect(() => {
    loadSubmissions();
  }, [loadSubmissions]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setError(null);

    try {
      const res = await fetch('/api/ops/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });
      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        setError(data.error || 'Login failed.');
        return;
      }

      setPassword('');
      await loadSubmissions();
    } catch {
      setError('Network error. Try again.');
    } finally {
      setBusy(false);
    }
  };

  const handleLogout = async () => {
    setBusy(true);
    await fetch('/api/ops/logout', { method: 'POST' });
    setSubmissions([]);
    setView('login');
    setBusy(false);
  };

  if (view === 'loading') {
    return (
      <div className="min-h-screen bg-[#0a0a0a] text-[#ededed] flex items-center justify-center">
        <p className="font-mono text-xs tracking-widest uppercase text-neutral-500">Loading…</p>
      </div>
    );
  }

  if (view === 'login') {
    return (
      <div className="min-h-screen bg-[#0a0a0a] text-[#ededed] flex items-center justify-center p-6">
        <form
          onSubmit={handleLogin}
          className="w-full max-w-md border border-neutral-800 bg-[#0a0a0a]/95 p-8 flex flex-col gap-6"
        >
          <div>
            <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-neutral-500 mb-2">
              Operations
            </p>
            <h1 className="text-3xl font-black uppercase tracking-tight">Contact Inbox</h1>
          </div>

          {error && (
            <p className="font-mono text-sm text-red-400 border border-red-900/60 bg-red-950/30 px-4 py-3">
              {error}
            </p>
          )}

          <label className="flex flex-col gap-2">
            <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-neutral-500">
              Password
            </span>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              required
              className="bg-transparent border-b border-neutral-800 pb-2 text-xl font-light focus:outline-none focus:border-[#ededed]"
            />
          </label>

          <button
            type="submit"
            disabled={busy}
            className="font-mono text-xs font-bold tracking-widest uppercase px-5 py-4 bg-neutral-900 hover:bg-white text-neutral-400 hover:text-[#0a0a0a] border border-neutral-800 transition-colors disabled:opacity-60"
          >
            {busy ? 'Signing in…' : 'Enter'}
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#ededed]">
      <header className="border-b border-neutral-800 px-6 py-5 flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-neutral-500">
            Operations
          </p>
          <h1 className="text-2xl font-black uppercase tracking-tight">Contact Submissions</h1>
        </div>
        <div className="flex gap-3">
          <button
            type="button"
            onClick={loadSubmissions}
            disabled={busy}
            className="font-mono text-[10px] font-bold tracking-widest uppercase px-4 py-2 border border-neutral-800 hover:bg-white hover:text-[#0a0a0a] transition-colors disabled:opacity-60"
          >
            Refresh
          </button>
          <button
            type="button"
            onClick={handleLogout}
            disabled={busy}
            className="font-mono text-[10px] font-bold tracking-widest uppercase px-4 py-2 border border-neutral-800 hover:bg-white hover:text-[#0a0a0a] transition-colors disabled:opacity-60"
          >
            Log out
          </button>
        </div>
      </header>

      <main className="p-6">
        {error && (
          <p className="font-mono text-sm text-red-400 border border-red-900/60 bg-red-950/30 px-4 py-3 mb-6">
            {error}
          </p>
        )}

        {submissions.length === 0 ? (
          <p className="font-mono text-sm text-neutral-500">No submissions yet.</p>
        ) : (
          <div className="overflow-x-auto border border-neutral-800">
            <table className="w-full min-w-[720px] text-left">
              <thead className="border-b border-neutral-800 bg-neutral-950/80">
                <tr className="font-mono text-[10px] tracking-[0.15em] uppercase text-neutral-500">
                  <th className="p-4 font-bold">When</th>
                  <th className="p-4 font-bold">Name</th>
                  <th className="p-4 font-bold">Email</th>
                  <th className="p-4 font-bold">Company</th>
                  <th className="p-4 font-bold">Message</th>
                </tr>
              </thead>
              <tbody>
                {submissions.map((row) => (
                  <tr key={row.id} className="border-b border-neutral-900 align-top">
                    <td className="p-4 font-mono text-xs text-neutral-400 whitespace-nowrap">
                      {formatDate(row.created_at)}
                    </td>
                    <td className="p-4 font-medium">{row.name}</td>
                    <td className="p-4">
                      <a
                        href={`mailto:${encodeURIComponent(row.email)}`}
                        className="font-mono text-sm text-highlight hover:underline break-all"
                      >
                        {row.email}
                      </a>
                    </td>
                    <td className="p-4 text-neutral-300">{row.company || '—'}</td>
                    <td className="p-4 text-neutral-300 whitespace-pre-wrap max-w-md">
                      {row.message || '—'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  );
};
