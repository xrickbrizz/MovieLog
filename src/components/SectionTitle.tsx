export const SectionTitle = ({ title, action }: { title: string; action?: string }) => (
  <div className="sectionTitle">
    <h2>{title}</h2>
    {action ? <a href="#timeline">{action}</a> : null}
  </div>
);
