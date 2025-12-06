// import { useEffect, useState } from "react";
// import { getProjects } from "../../api/projectApi";
// import { API_BASE_URL } from "../../api/axiosInstance";

// const ProjectsSection = () => {
//   const [projects, setProjects] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     getProjects()
//       .then((res) => setProjects(res.data))
//       .finally(() => setLoading(false));
//   }, []);

//   return (
//     <section className="section" id="projects">
//       <div className="container">
//         <h2 className="section-title">Our Projects</h2>
//         {loading ? (
//           <p>Loading projects...</p>
//         ) : (
//           <div className="grid-3 projects-grid">
//             {projects.map((p) => (
//               <div className="card" key={p._id}>
//                 <div className="card-image">
//                   <img src={API_BASE_URL + p.imageUrl} alt={p.name} />
//                 </div>
//                 <h3>{p.name}</h3>
//                 <p className="card-description">{p.description}</p>
//                 <button type="button" className="btn-secondary">
//                   Read More
//                 </button>
//               </div>
//             ))}
//             {projects.length === 0 && <p>No projects yet.</p>}
//           </div>
//         )}
//       </div>
//     </section>
//   );
// };

// export default ProjectsSection;

import { useEffect, useState } from "react";
import { getProjects } from "../../api/projectApi";
import { API_BASE_URL } from "../../api/axiosInstance";

const ProjectsSection = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProjects()
      .then((res) => setProjects(res.data))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="section" id="projects">
      <div className="container">
        <h2 className="section-title">Our Projects</h2>
        {loading ? (
          <p>Loading projects...</p>
        ) : projects.length === 0 ? (
          <p style={{ textAlign: "center" }}>No projects added yet.</p>
        ) : (
          <div className="projects-grid">
            {projects.map((p) => (
              <div className="card project-card" key={p._id}>
                <div className="card-image">
                  <img src={API_BASE_URL + p.imageUrl} alt={p.name} />
                </div>
                <h3>{p.name}</h3>
                <p className="card-description">{p.description}</p>
                <button className="btn-secondary" type="button">
                  Read More
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default ProjectsSection;