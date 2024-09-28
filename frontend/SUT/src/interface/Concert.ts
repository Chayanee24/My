// import { UsersInterface } from './IUser';
// import { SeatChart } from './seatChart';
// import { PerformanceSchedule } from './performanceSchedule';

export interface ConcertInterface {
  ID?: number; 
  Name?: string;
  ShowDate?: Date; 
  Artist?: string;
  Description?: string;
  BenefitFile?: File; 
  InfoFile?: File;
  PosterFile?: File;
  TicketSalesStartDate?: Date;
  Venue?: string;
  Status?: string;

  // organizerID?: number; 
  // organizer?: UsersInterface; 

  // seatCharts?: SeatChart[]; // การใช้ `?` แสดงว่าเป็น optional
  // performanceSchedules?: PerformanceSchedule[]; // การใช้ `?` แสดงว่าเป็น optional
}
