export default function PageHeader({ title, subtitle, action }) {
  return (
    <div className="page-header">
      <div>
        <h3>{title}</h3>
        {subtitle && <p>{subtitle}</p>}
      </div>
      {action}
    </div>
  );
}
