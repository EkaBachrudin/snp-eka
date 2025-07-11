import { PaginationData } from ".";

export type SinglePost = {
    id: number;
    user_id: number;
    title: string;
    body: string;
  }

 export type FormError = {
    field: string;
    message: string;
}

export type FetchAllPostsModel = {
  data: SinglePost[],
  pagination: PaginationData
}