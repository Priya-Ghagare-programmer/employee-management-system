export default function StatCard({ title, value, icon, text }) {
  return (
    <div className="stat-card">
      <div>
        <p>{title}</p>
        <h2>{value}</h2>
        {text && <small>{text}</small>}
      </div>
      <div className="stat-icon"><i className={`bi ${icon}`}></i></div>
    </div>
  );
}
