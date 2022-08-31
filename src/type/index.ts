import React from 'react'
export type StorageType = 'sessionStorage' | 'localStorage'

export interface SetStorageParams {
  name: string;
  content: any;
  type?: StorageType
}

export interface GetStorageParams {
  name: string;
  type?: StorageType;
}

export interface RemoveStorageParams {
  name: string;
  type?: StorageType
}

export interface StorageObj {
  content: any,
  type?: StorageType;
  datetime: Date
}

export interface QueryStorageResult<T> {
  name: string;
  value: T | null
}

export interface RouteConfig {
  name?: string;
  /** 匹配路径 */
  path?: string;
  /** 重定向路径 */
  redirect?: string;
  /** 是否精准匹配 */
  exact?: boolean;
  /** 组件 */
  component?: any;
  /** 子路由 */
  routes?: RouteConfig[]
}