package entity

import (
    "time"
    "gorm.io/gorm"
)

type Concert struct {
    gorm.Model
    Name                    string    `json:"name"`                     
    ShowDate                time.Time `json:"show_date"`                
    Artist                  string    `json:"artist"`                   
    Description             string    `json:"description"`             
	PosterFile              string    `json:"poster_file"`   
	BenefitFile             string    `json:"benefit_file"` 
	InfoFile                string    `json:"info_file"`             
    TicketSalesStartDate    time.Time `json:"ticket_sales_start_date"`  
    Venue                   string    `json:"venue"`                    
    Status                  string    `json:"status"`        

    OrganizerID             *uint     
    Organizer               Organizer   `gorm:"foreignKey:OrganizerID"`
    SeatCharts              []SeatChart `gorm:"foreignKey:ConcertID"`
    PerformanceSchedules     []PerformanceSchedule `gorm:"foreignKey:ConcertID"`
}
