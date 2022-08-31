import {
  GetStorageParams,
  QueryStorageResult,
  RemoveStorageParams,
  SetStorageParams,
  StorageObj,
} from "../type";
/**
 * 存储Storage
 */
export const setStorage = (params: SetStorageParams) => {
  let { name, content, type } = params;

  const obj: StorageObj = {
    content: content,
    type: type,
    datetime: new Date(),
  };

  if (type === 'sessionStorage') {
    window.sessionStorage.setItem(name, JSON.stringify(obj));
  } else {
    window.localStorage.setItem(name, JSON.stringify(obj));
  }
};
/**
 * 获取Storage
 */

export const getStorage = <T>(
  params: GetStorageParams
): T | undefined => {
  const { name, type } = params;
  const store =
    type === "sessionStorage"
      ? window.sessionStorage.getItem(name)
      : window.localStorage.getItem(name);

  if (store) {
    const result = JSON.parse(store) as StorageObj
    return result.content as T
  }
};
/**
 * 删除Storage
 */
export const removeStorage = (params: RemoveStorageParams) => {
  const { name, type } = params;
  if (type === 'sessionStorage') {
    window.sessionStorage.removeItem(name);
  } else {
    window.localStorage.removeItem(name);
  }
};

/**
 * 清空全部Storage
 */
export const clearStorage = (params: Omit<RemoveStorageParams, "name">) => {
  const { type } = params;
  if (type === 'sessionStorage') {
    window.sessionStorage.clear();
  } else {
    window.localStorage.clear();
  }
};
