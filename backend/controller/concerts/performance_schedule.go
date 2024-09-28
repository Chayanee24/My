package concerts

import (
	"net/http"
	"github.com/gin-gonic/gin"
	"example.com/sa-67-example/config"
	"example.com/sa-67-example/entity"
)

// POST /performance-schedules
func CreatePerformanceSchedule(c *gin.Context) {
	var performanceSchedule entity.PerformanceSchedule
	// bind เข้าตัวแปร performanceSchedule
	if err := c.ShouldBindJSON(&performanceSchedule); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	db := config.DB()
	// สร้าง PerformanceSchedule
	ps := entity.PerformanceSchedule{
		PerformanceDate: performanceSchedule.PerformanceDate,
		Duration:        performanceSchedule.Duration,
		Venue:           performanceSchedule.Venue,
		ConcertID:       performanceSchedule.ConcertID,
	}
	// บันทึกข้อมูล PerformanceSchedule
	if err := db.Create(&ps).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusCreated, gin.H{"message": "PerformanceSchedule created successfully", "data": ps})
}

// GET /performance-schedules/:id
func GetPerformanceSchedule(c *gin.Context) {
	ID := c.Param("id")
	var performanceSchedule entity.PerformanceSchedule
	db := config.DB()
	result := db.Preload("Concert").First(&performanceSchedule, ID)
	if result.Error != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": result.Error.Error()})
		return
	}
	c.JSON(http.StatusOK, performanceSchedule)
}

// GET /performance-schedules
func ListPerformanceSchedules(c *gin.Context) {
	var performanceSchedules []entity.PerformanceSchedule
	db := config.DB()
	result := db.Preload("Concert").Find(&performanceSchedules)
	if result.Error != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": result.Error.Error()})
		return
	}
	c.JSON(http.StatusOK, performanceSchedules)
}

// DELETE /performance-schedules/:id
func DeletePerformanceSchedule(c *gin.Context) {
	id := c.Param("id")
	db := config.DB()
	// ลบข้อมูล PerformanceSchedule ตาม ID
	if tx := db.Delete(&entity.PerformanceSchedule{}, id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "PerformanceSchedule not found"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"message": "PerformanceSchedule deleted successfully"})
}

// PATCH /performance-schedules/:id
func UpdatePerformanceSchedule(c *gin.Context) {
	var performanceSchedule entity.PerformanceSchedule
	PerformanceScheduleID := c.Param("id")
	db := config.DB()
	result := db.First(&performanceSchedule, PerformanceScheduleID)
	if result.Error != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "PerformanceSchedule not found"})
		return
	}
	// bind ข้อมูลใหม่ที่ต้องการอัปเดตเข้ากับ performanceSchedule
	if err := c.ShouldBindJSON(&performanceSchedule); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Unable to map payload"})
		return
	}
	// บันทึกการอัปเดต
	if err := db.Save(&performanceSchedule).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"message": "PerformanceSchedule updated successfully"})
}
