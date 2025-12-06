const AdminSidebar = ({ activeTab, onChangeTab, onLogout }) => {
  const tabs = ["projects", "clients", "contacts", "subscribers"];

  return (
    <aside className="admin-sidebar">
      <h2 className="admin-logo">Admin Panel</h2>
      <ul>
        {tabs.map((tab) => (
          <li
            key={tab}
            className={activeTab === tab ? "active" : ""}
            onClick={() => onChangeTab(tab)}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </li>
        ))}
      </ul>
      <button className="btn-secondary admin-logout" onClick={onLogout}>
        Logout
      </button>
    </aside>
  );
};

export default AdminSidebar;