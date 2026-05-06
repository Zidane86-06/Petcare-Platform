export default function StatCard({ icon, label, value, note }) {
  return (
    <article className="stat-card">
      <div className={`line-icon ${icon}`} />
      <div>
        <strong>{value}</strong>
        <span>{label}</span>
        {note && <small>{note}</small>}
      </div>
    </article>
  );
}
