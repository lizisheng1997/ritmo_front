/**
 * interface、enum、declare集合
 *
 */
declare module '*.png';
declare module '*.jpg';
declare module '*.scss';
type T = /*unresolved*/ any;

declare interface requestRes {
  data: T;
  code?: number;
  [key: string]: T;
}
// 通用store
declare interface useUserType<T = any> {
  userInfos: T,
}