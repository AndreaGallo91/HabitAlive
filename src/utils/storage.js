const STORAGE_KEYS = {
  HABITS: 'habitalive_habits',
  LOGS: 'habitalive_logs',
  PROFILE: 'habitalive_profile',
  PET: 'habitalive_pet',
  DUNGEON: 'habitalive_dungeon',
  THEME: 'habitalive_theme',
};

export function loadFromStorage(key) {
  try {
    const data = localStorage.getItem(STORAGE_KEYS[key]);
    return data ? JSON.parse(data) : null;
  } catch (e) {
    console.error(`Error loading ${key} from storage:`, e);
    return null;
  }
}

export function saveToStorage(key, data) {
  try {
    localStorage.setItem(STORAGE_KEYS[key], JSON.stringify(data));
  } catch (e) {
    console.error(`Error saving ${key} to storage:`, e);
  }
}

export function clearStorage() {
  Object.values(STORAGE_KEYS).forEach((key) => {
    localStorage.removeItem(key);
  });
}
