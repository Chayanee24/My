package concerts

import (
	"net/http"
	"github.com/gin-gonic/gin"
	"example.com/sa-67-example/config"
	"example.com/sa-67-example/entity"
)

// POST /seat-charts
func CreateSeatChart(c *gin.Context) {
	var seatChart entity.SeatChart

	// bind เข้าตัวแปร seatChart
	if err := c.ShouldBindJSON(&seatChart); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	db := config.DB()

	// สร้าง SeatChart
	sc := entity.SeatChart{
		Zone:         seatChart.Zone,
		QuantitySeat: seatChart.QuantitySeat,
		Price:        seatChart.Price,
		Availability: seatChart.Availability,
		ConcertID:    seatChart.ConcertID,
	}

	// บันทึกข้อมูล SeatChart
	if err := db.Create(&sc).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusCreated, gin.H{"message": "SeatChart created successfully", "data": sc})
}

// GET /seat-charts/:id
func GetSeatChart(c *gin.Context) {
	ID := c.Param("id")
	var seatChart entity.SeatChart

	db := config.DB()
	result := db.Preload("Concert").First(&seatChart, ID)
	if result.Error != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": result.Error.Error()})
		return
	}
	c.JSON(http.StatusOK, seatChart)
}

// GET /seat-charts
func ListSeatChart(c *gin.Context) {
	var seatCharts []entity.SeatChart

	db := config.DB()
	result := db.Preload("Concert").Find(&seatCharts)
	if result.Error != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": result.Error.Error()})
		return
	}
	c.JSON(http.StatusOK, seatCharts)
}

// DELETE /seat-charts/:id
func DeleteSeatChart(c *gin.Context) {
	id := c.Param("id")
	db := config.DB()

	// ลบข้อมูล SeatChart ตาม ID
	if tx := db.Delete(&entity.SeatChart{}, id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "SeatChart not found"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"message": "SeatChart deleted successfully"})
}

// PATCH /seat-charts/:id
func UpdateSeatChart(c *gin.Context) {
	var seatChart entity.SeatChart
	SeatChartID := c.Param("id")
	db := config.DB()
	result := db.First(&seatChart, SeatChartID)
	if result.Error != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "SeatChart not found"})
		return
	}

	// bind ข้อมูลใหม่ที่ต้องการอัปเดตเข้ากับ seatChart
	if err := c.ShouldBindJSON(&seatChart); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Unable to map payload"})
		return
	}

	// บันทึกการอัปเดต
	if err := db.Save(&seatChart).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"message": "SeatChart updated successfully"})
}
