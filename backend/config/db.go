package config

import (
    "fmt"
    "example.com/sa-67-example/entity"
    "gorm.io/driver/sqlite"
    "gorm.io/gorm"
    "log"
)

var db *gorm.DB

func DB() *gorm.DB {
    return db
}

func ConnectionDB() {
    database, err := gorm.Open(sqlite.Open("sa.db?cache=shared"), &gorm.Config{})
    if err != nil {
        log.Fatalf("failed to connect database: %v", err)
    }
    fmt.Println("connected database")
    db = database
}
func SetupDatabase() {
    // AutoMigrate สำหรับสร้าง schema ของตารางในฐานข้อมูล
    db.AutoMigrate(
        &entity.Organizer{},
        &entity.Concert{},
        &entity.PerformanceSchedule{},
        &entity.SeatChart{},
    )


    // สร้าง hashed password
    hashedPassword, _ := HashPassword("123456")

    // Creating initial Organizer record
    User := &entity.Organizer{
        User:         "Create01",
        Password:     hashedPassword,
        Email:        "Creat.01@gmail.com",
        Name:         "Sathaporn Pongsit",
        PhoneNumber:  "012-123-4569",
        Address:      "255 Asok, BKK",
        Organization: "GMM TV",
    }

    // เพิ่มข้อมูล Organizer ลงในฐานข้อมูล หากยังไม่มีข้อมูล
    db.FirstOrCreate(User, &entity.Organizer{
        User: "Create01",
    })
}
