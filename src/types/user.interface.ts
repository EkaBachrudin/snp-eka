export interface UserInterface {
    email: string;
    gender: 'male' | 'female';  // Assuming gender can only be 'male' or 'female'
    id: number;
    name: string;
    status: 'active' | 'inactive';  // Assuming status can only be 'active' or 'inactive'
  }

  export interface UserDto {
    name: string;
    email: string;
    gender: 'male' | 'female';
    status: 'active' | 'inactive';
  }