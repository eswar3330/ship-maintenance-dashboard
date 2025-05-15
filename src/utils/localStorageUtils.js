
export function getFromStorage(key) {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : [];
}

export function saveToStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}


export function getShipsFromStorage() {
  return getFromStorage('ships');
}

export function saveShipsToStorage(data) {
  saveToStorage('ships', data);
}


export function getComponentsFromStorage() {
  return getFromStorage('components');
}

export function saveComponentsToStorage(data) {
  saveToStorage('components', data);
}


export function getJobsFromStorage() {
  return getFromStorage('jobs');
}

export function saveJobsToStorage(data) {
  saveToStorage('jobs', data);
}

export function getUsersFromStorage() {
  return getFromStorage('users');
}

export function saveUsersToStorage(data) {
  saveToStorage('users', data);
}
