import { ConcertInterface } from './Concerts';

export interface SeatChartInterface {
  ID?: number;
  Zone?: string;
  QuantitySeat?: number;
  Price?: Float32Array;
  Availability?: string;

  ConcertID?: number; 
  Concert?: ConcertInterface;  
}
