// Simple localStorage helpers for SahayakSetu demo
// All data lives in the browser — no backend needed.

const PROFILE_KEY = "sahayak_userProfile";
const APPLICATIONS_KEY = "sahayak_applications";

export function getProfile() {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(PROFILE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function saveProfile(profile) {
  if (typeof window === "undefined") return;
  localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
}

export function clearProfile() {
  if (typeof window === "undefined") return;
  localStorage.removeItem(PROFILE_KEY);
}

export function getApplications() {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(APPLICATIONS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveApplication(application) {
  if (typeof window === "undefined") return;
  const apps = getApplications();
  const existingIdx = apps.findIndex((a) => a.schemeId === application.schemeId);
  if (existingIdx >= 0) {
    apps[existingIdx] = { ...apps[existingIdx], ...application, updatedAt: new Date().toISOString() };
  } else {
    apps.push({ ...application, createdAt: new Date().toISOString(), status: "draft" });
  }
  localStorage.setItem(APPLICATIONS_KEY, JSON.stringify(apps));
}

export function submitApplication(schemeId) {
  if (typeof window === "undefined") return;
  const apps = getApplications();
  const idx = apps.findIndex((a) => a.schemeId === schemeId);
  if (idx >= 0) {
    apps[idx].status = "submitted";
    apps[idx].submittedAt = new Date().toISOString();
    localStorage.setItem(APPLICATIONS_KEY, JSON.stringify(apps));
  }
}
