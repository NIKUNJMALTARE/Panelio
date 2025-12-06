import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminSidebar from "../components/admin/AdminSidebar.jsx";
import { getProjects, createProject } from "../api/projectApi";
import { getClients, createClient } from "../api/clientApi";
import { getContacts } from "../api/contactApi";
import { getSubscribers } from "../api/subscriberApi";
import { API_BASE_URL } from "../api/axiosInstance";
import { cropImageTo450x350 } from "../utils/imageProcessing";
import {
  clearAdminSession,
  isAdminAuthenticated
} from "../utils/auth";

const AdminDashboardPage = () => {
  const [activeTab, setActiveTab] = useState("projects");
  const [projects, setProjects] = useState([]);
  const [clients, setClients] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [subscribers, setSubscribers] = useState([]);

  const [projectForm, setProjectForm] = useState({
    name: "",
    description: ""
  });
  const [projectImage, setProjectImage] = useState(null);

  const [clientForm, setClientForm] = useState({
    name: "",
    description: "",
    designation: ""
  });
  const [clientImage, setClientImage] = useState(null);

  const navigate = useNavigate();

  const logout = () => {
    clearAdminSession();
    navigate("/admin/login");
  };

  const loadData = async () => {
    try {
      // if session expired while on page:
      if (!isAdminAuthenticated()) {
        logout();
        return;
      }
      const [pRes, cRes, ctRes, sRes] = await Promise.all([
        getProjects(),
        getClients(),
        getContacts(),
        getSubscribers()
      ]);
      setProjects(pRes.data);
      setClients(cRes.data);
      setContacts(ctRes.data);
      setSubscribers(sRes.data);
    } catch (err) {
      // if backend returns 401, also log out
      logout();
    }
  };

  useEffect(() => {
    // initial session check
    if (!isAdminAuthenticated()) {
      logout();
      return;
    }

    loadData();

    // set up interval to auto-logout when session expires
    const interval = setInterval(() => {
      if (!isAdminAuthenticated()) {
        alert("Your session has expired. Please log in again.");
        logout();
      }
    }, 60 * 1000); // check every 60 seconds

    return () => clearInterval(interval);
  }, []); // run once on mount

  const handleProjectChange = (e) => {
    setProjectForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClientChange = (e) => {
    setClientForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleProjectImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) {
      setProjectImage(null);
      return;
    }
    try {
      const cropped = await cropImageTo450x350(file);
      setProjectImage(cropped);
    } catch (err) {
      console.error(err);
      alert("Failed to process project image");
      setProjectImage(null);
    }
  };

  const handleClientImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) {
      setClientImage(null);
      return;
    }
    try {
      const cropped = await cropImageTo450x350(file);
      setClientImage(cropped);
    } catch (err) {
      console.error(err);
      alert("Failed to process client image");
      setClientImage(null);
    }
  };

  const handleAddProject = async (e) => {
    e.preventDefault();

    if (!projectImage) {
      alert("Please select an image for the project.");
      return;
    }

    const formData = new FormData();
    formData.append("name", projectForm.name);
    formData.append("description", projectForm.description);
    formData.append("image", projectImage);

    try {
      await createProject(formData);
      setProjectForm({ name: "", description: "" });
      setProjectImage(null);
      loadData();
    } catch (err) {
      alert("Unable to create project");
    }
  };

  const handleAddClient = async (e) => {
    e.preventDefault();

    if (!clientImage) {
      alert("Please select an image for the client.");
      return;
    }

    const formData = new FormData();
    formData.append("name", clientForm.name);
    formData.append("description", clientForm.description);
    formData.append("designation", clientForm.designation);
    formData.append("image", clientImage);

    try {
      await createClient(formData);
      setClientForm({ name: "", description: "", designation: "" });
      setClientImage(null);
      loadData();
    } catch (err) {
      alert("Unable to create client");
    }
  };

  const renderProjectsTab = () => (
    <div className="admin-tab">
      <h2>Projects</h2>
      <form className="admin-form" onSubmit={handleAddProject}>
        <input
          name="name"
          placeholder="Project Name"
          value={projectForm.name}
          onChange={handleProjectChange}
          required
        />
        <textarea
          name="description"
          placeholder="Project Description"
          value={projectForm.description}
          onChange={handleProjectChange}
          required
        />
        <input
          type="file"
          accept="image/*"
          onChange={handleProjectImageChange}
          required
        />
        <button type="submit" className="btn-primary">
          Add Project
        </button>
      </form>

      <table className="admin-table">
        <thead>
          <tr>
            <th>Preview</th>
            <th>Name</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {projects.map((p) => (
            <tr key={p._id}>
              <td>
                {p.imageUrl && (
                  <img
                    src={API_BASE_URL + p.imageUrl}
                    alt={p.name}
                    style={{
                      width: "60px",
                      height: "40px",
                      objectFit: "cover",
                      borderRadius: "4px"
                    }}
                  />
                )}
              </td>
              <td>{p.name}</td>
              <td className="truncate-cell">{p.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  const renderClientsTab = () => (
    <div className="admin-tab">
      <h2>Clients</h2>
      <form className="admin-form" onSubmit={handleAddClient}>
        <input
          name="name"
          placeholder="Client Name"
          value={clientForm.name}
          onChange={handleClientChange}
          required
        />
        <input
          name="designation"
          placeholder="Designation"
          value={clientForm.designation}
          onChange={handleClientChange}
          required
        />
        <textarea
          name="description"
          placeholder="Client Description"
          value={clientForm.description}
          onChange={handleClientChange}
          required
        />
        <input
          type="file"
          accept="image/*"
          onChange={handleClientImageChange}
          required
        />
        <button type="submit" className="btn-primary">
          Add Client
        </button>
      </form>

      <table className="admin-table">
        <thead>
          <tr>
            <th>Avatar</th>
            <th>Name</th>
            <th>Designation</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {clients.map((c) => (
            <tr key={c._id}>
              <td>
                {c.imageUrl && (
                  <img
                    src={API_BASE_URL + c.imageUrl}
                    alt={c.name}
                    style={{
                      width: "40px",
                      height: "40px",
                      borderRadius: "50%",
                      objectFit: "cover"
                    }}
                  />
                )}
              </td>
              <td>{c.name}</td>
              <td>{c.designation}</td>
              <td className="truncate-cell">{c.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  const renderContactsTab = () => (
    <div className="admin-tab">
      <h2>Contact Submissions</h2>
      <table className="admin-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Mobile</th>
            <th>City</th>
          </tr>
        </thead>
        <tbody>
          {contacts.map((c) => (
            <tr key={c._id}>
              <td>{c.fullName}</td>
              <td>{c.email}</td>
              <td>{c.mobile}</td>
              <td>{c.city}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  const renderSubscribersTab = () => (
    <div className="admin-tab">
      <h2>Newsletter Subscribers</h2>
      <table className="admin-table">
        <thead>
          <tr>
            <th>Email</th>
            <th>Subscribed At</th>
          </tr>
        </thead>
        <tbody>
          {subscribers.map((s) => (
            <tr key={s._id}>
              <td>{s.email}</td>
              <td>{new Date(s.createdAt).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  return (
    <div className="admin-layout">
      <AdminSidebar
        activeTab={activeTab}
        onChangeTab={setActiveTab}
        onLogout={logout}  // ✅ logout button in sidebar
      />
      <main className="admin-main">
        {activeTab === "projects" && renderProjectsTab()}
        {activeTab === "clients" && renderClientsTab()}
        {activeTab === "contacts" && renderContactsTab()}
        {activeTab === "subscribers" && renderSubscribersTab()}
      </main>
    </div>
  );
};

export default AdminDashboardPage;
