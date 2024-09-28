import { ConcertInterface } from './Concerts'; // นำเข้า Concert interface

  export interface UsersInterface {
    ID?: number;
    User?: string;
    Password?: string;
    Email?: string;
    Name?: string;
    PhoneNumber?: string;
    Address?: string;
    Organization?: string;
  
    Concerts?: ConcertInterface[]; // แสดงว่า Organizer สามารถมีหลาย Concert
  }
  