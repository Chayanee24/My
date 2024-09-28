import { ConcertInterface } from './Concerts';

export interface PerformanceScheduleInterface {
  ID?: number;
  PerformanceDate?: string; 
  Duration?: number;
  Venue?: string;

  ConcertID?: number; 
  Concert?: ConcertInterface; 
}
