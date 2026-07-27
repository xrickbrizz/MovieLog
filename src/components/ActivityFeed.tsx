const activities = ['Escribiste una reseña para Aftersun', 'Añadiste Drive My Car a tu Watchlist', 'Completaste el maratón Lord of the Rings'];

export const ActivityFeed = () => (
  <div>
    <h2>Actividad</h2>
    {activities.map((activity) => (
      <div className="activity" key={activity}>
        <small>HACE POCO</small>
        <p>{activity}</p>
      </div>
    ))}
  </div>
);
