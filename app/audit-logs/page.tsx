import { prisma } from '@/lib/prisma'

export default async function AuditLogsPage() {
  const logs = await prisma.auditLog.findMany({
    orderBy: { createdAt: 'desc' },
    take: 50,
  })

  return (
    <main className="py-5 container">
      <h1 className="h2 fw-bold mb-4">Security Audit Logs</h1>
      <table className="table table-hover">
        <thead className="table-dark">
          <tr>
            <th>Time</th>
            <th>Email</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {logs.length === 0 && (
            <tr><td colSpan={3} className="text-center text-muted">No logs yet</td></tr>
          )}
         {logs.map((log: any) => (
            <tr key={log.id}>
              <td>{new Date(log.createdAt).toLocaleString()}</td>
              <td>{log.email}</td>
              <td><span className={`badge ${log.success ? 'bg-success' : 'bg-danger'}`}>{log.success ? 'Success' : 'Failed'}</span></td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  )
}