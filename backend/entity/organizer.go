package entity
import (
   "gorm.io/gorm"
)

type Organizer struct {
   gorm.Model
   User             string    `json:"user"`
   Password         string    `json:"password"`
   Email            string    `json:"email"`
   Name             string    `json:"name"`
   PhoneNumber      string    `json:"phone_number"`
   Address          string    `json:"address"`
   Organization     string    `json:"organization"`

   Concerts        []Concert `gorm:"foreignKey:OrganizerID"`

}