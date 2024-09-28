import { UsersInterface } from './IUser';
import { SeatChartInterface } from './SeatChart';
import { PerformanceScheduleInterface } from './PerformanceSchedule';

export interface ConcertInterface {
  ID?: number;  
  Name?: string;  
  ShowDate?: string;  
  Artist?: string;  
  Description?: string;
  BenefitFile?: string; 
  InfoFile?: string;
  PosterFile?: string;
  TicketSalesStartDate?: string;  
  Venue?: string; 
  Status?: string; 
  
  OrganizerID?: number;
  Organizer?: UsersInterface; 
  SeatChart?: SeatChartInterface[];
  PerformanceSchedule?: PerformanceScheduleInterface[];
}
