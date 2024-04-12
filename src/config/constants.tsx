declare global {
  interface Window {
    _env_: { [key: string]: unknown };
  }
}

export const API = window._env_?.API ?? import.meta.env.VITE_BASE_URL;
