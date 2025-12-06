import { useEffect, useState } from "react";
import { getClients } from "../../api/clientApi";
import { API_BASE_URL } from "../../api/axiosInstance";

const HappyClientsSection = () => {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getClients()
      .then((res) => setClients(res.data))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="section bg-light" id="clients">
      <div className="container">
        <h2 className="section-title">Happy Clients</h2>
        {loading ? (
          <p>Loading clients...</p>
        ) : (
          <div className="grid-4">
            {clients.map((c) => (
              <div className="card client-card" key={c._id}>
                <div className="client-image">
                  <img src={c.imageUrl} alt={c.name} />
                </div>
                <p className="client-description">{c.description}</p>
                <h3>{c.name}</h3>
                <span className="client-designation">{c.designation}</span>
              </div>
            ))}
            {clients.length === 0 && <p>No clients yet.</p>}
          </div>
        )}
      </div>
    </section>
  );
};

export default HappyClientsSection;
