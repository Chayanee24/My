package entity

import (
    "time"
    "gorm.io/gorm"
)

type PerformanceSchedule struct {
    gorm.Model
    PerformanceDate time.Time   `json:"performance_date"`
    Duration        int         `json:"duration"`
    Venue           string      `json:"venue"`
    ConcertID      *uint        
    Concert        Concert      `gorm:"foreignKey:ConcertID"`
}

