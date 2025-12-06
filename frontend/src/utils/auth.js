const SESSION_TIMEOUT_MINUTES = 30;

const TOKEN_KEY = "adminToken";
const EXPIRY_KEY = "adminTokenExpiry";

export const saveAdminSession = (token) => {
  const expiresAt =
    Date.now() + SESSION_TIMEOUT_MINUTES * 60 * 1000; // now + 30 min
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(EXPIRY_KEY, String(expiresAt));
};

export const clearAdminSession = () => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(EXPIRY_KEY);
};

export const getAdminToken = () => {
  return localStorage.getItem(TOKEN_KEY) || null;
};

export const isAdminAuthenticated = () => {
  const token = localStorage.getItem(TOKEN_KEY);
  const expiry = localStorage.getItem(EXPIRY_KEY);

  if (!token || !expiry) return false;

  const expiryTime = Number(expiry);
  if (Number.isNaN(expiryTime)) {
    clearAdminSession();
    return false;
  }

  if (Date.now() > expiryTime) {
    // session expired
    clearAdminSession();
    return false;
  }

  return true;
};

export const getAdminSessionRemainingTime = () => {
  const expiry = localStorage.getItem(EXPIRY_KEY);
  if (!expiry) return 0;
  const expiryTime = Number(expiry);
  if (Number.isNaN(expiryTime)) return 0;

  return Math.max(0, expiryTime - Date.now());
};
