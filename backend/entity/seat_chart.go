package entity

import (
    "gorm.io/gorm"
)

type SeatChart struct {
    gorm.Model
    Zone            string      `json:"zone"`
    QuantitySeat    int         `json:"quantity_seat"`
    Price           float64     `json:"price"`
    Availability    string      `json:"availability"`
    ConcertID      *uint
    Concert        Concert `gorm:"foreignKey:ConcertID"`
}
