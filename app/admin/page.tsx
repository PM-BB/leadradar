export default function AdminPage() {
  const metrics = [
    { label: 'Total Searches', value: '18,420' },
    { label: 'Leads Discovered', value: '2,481' },
    { label: 'Leads Today', value: '420' },
    { label: 'Active Sources', value: '11' },
  ];

  const sources = [
    { name: 'Search Provider', status: 'Active', color: 'bg-emerald-100 text-emerald-700' },
    { name: 'Public Source A', status: 'Active', color: 'bg-emerald-100 text-emerald-700' },
    { name: 'Public Source B', status: 'Limited', color: 'bg-amber-100 text-amber-700' },
    { name: 'Public Source C', status: 'Disabled', color: 'bg-rose-100 text-rose-700' },
  ];

  return (
    <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-slate-900">Admin Dashboard</h1>
      <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {metrics.map((metric) => (
          <div key={metric.label} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-soft">
            <div className="text-sm text-slate-500">{metric.label}</div>
            <div className="mt-2 text-3xl font-bold text-slate-900">{metric.value}</div>
          </div>
        ))}
      </div>

      <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-soft">
        <h2 className="text-xl font-semibold text-slate-900">Source Management</h2>
        <div className="mt-5 overflow-hidden rounded-xl border border-slate-200">
          <table className="min-w-full divide-y divide-slate-200">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">Source</th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 bg-white">
              {sources.map((source) => (
                <tr key={source.name}>
                  <td className="px-4 py-3 text-sm text-slate-700">{source.name}</td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${source.color}`}>{source.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}
