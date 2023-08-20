declare global {
  interface Window {
    _env_: { [key: string]: unknown };
  }
}

export const API =
  import.meta.env.VITE_BASE_URL ??
  window._env_?.API ??
  "http://localhost:3000/api";
