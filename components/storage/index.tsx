import createWebStorage from "redux-persist/lib/storage/createWebStorage";


const createNoopStorage = () => {
  return {
    getItem(_key: any) {
      console.log(_key)
      return Promise.resolve(null);
    },
    setItem(_key: any, value: any) {
      console.log(_key)
      return Promise.resolve(value);
    },
    removeItem(_key: any) {
      console.log(_key)
      return Promise.resolve();
    },
  };
};

const storage =
  typeof window !== "undefined"
    ? createWebStorage("local")
    : createNoopStorage();

export default storage;