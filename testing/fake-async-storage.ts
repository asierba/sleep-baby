const storage = new Map<string, string>();

export default {
  getItem: (key: string) => Promise.resolve(storage.get(key) ?? null),
  setItem: (key: string, value: string) => Promise.resolve(void storage.set(key, value)),
  removeItem: (key: string) => Promise.resolve(void storage.delete(key)),
  clear: () => Promise.resolve(void storage.clear()),
  getAllKeys: () => Promise.resolve([...storage.keys()]),
};
