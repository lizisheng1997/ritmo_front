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
declare interface UseCurrentStore<T = any> {
  clientLabelList: T[];
  qwFriendsObj: {
    id: string;
    name: string;
    remark: string;
  };
  productInfo: {
    id: string;
    name: string;
    price: number;
    minimumPrice: number;
    type: string;
    productSource: number,
  };
  paymentReceiptId: string;
  paymentReceiptPrice: number;
  selectClient: {
    id: string;
    name: string;
  };
  belongInfo: {
    belongCollege: string;
    belongCollegeName: string;
    belongProject: number;
    belongProjectName: string;
    belongMajor: number;
    belongMajorName: string;
  };
  sipDriver: {
    id: string;
    selectCallStatus: number;
    parameter: any;
    genre: number;
    time: string;
  };
}