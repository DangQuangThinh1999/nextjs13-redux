export interface ICredentials {
  username: string;
  password: string;
}
export interface IRegisterUser {
  username: string; //unique
  fullname: string;
  password: string;
  email: string; //unique
}
export interface IProductImage {
  id: string;
  url: string;
}
export interface IProduct {
  id?: string;
  createdAt?: string;
  active?: boolean;
  name: string;
  price: number;
  description: string;
  ProductImage?: Array<IProductImage>;
}
export interface IProductCreate {
  name: string;
  price: number;
  description: string;
  images: string;
}
export interface IPagination {
  currentPage: number;
  hasItem: boolean;
  limit: number;
  totalItem: number;
}
export interface ISnapshotProduct {
  items: IProduct[];
  pagination?: IPagination;
}
export interface IQueryParams {
  searchTerm: string | null;
  page: number | null;
  sortType: string | null;
  sortBy: string;
  active: boolean;
}
