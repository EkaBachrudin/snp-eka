export interface PostType {
    id: number;
    user_id: number;
    title: string;
    body: string;
}

export interface PaginationData {
    limit: string;       
    page: string;        
    totalItems: string;  
    totalPages: string; 
  }