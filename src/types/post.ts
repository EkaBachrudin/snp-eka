export interface SinglePost {
    id: number;
    user_id: number;
    title: string;
    body: string;
  }

 export interface FormError {
    field: string;
    message: string;
}