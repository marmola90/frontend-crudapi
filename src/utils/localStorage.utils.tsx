export const persistLocalStorage = <T,>(key: string, value: T) => {
  console.log({key, value})
  localStorage.setItem(key, JSON.stringify({ ...value }));
};

export const clearLocalStorage = (key: string) => {
  localStorage.removeItem(key);
};

export const persistSessionStorage = (key: string, value: string) => {
  sessionStorage.setItem(key, value)
}