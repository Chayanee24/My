package concerts
import (
	"net/http"
	"github.com/gin-gonic/gin"
	"example.com/sa-67-example/config"
	"example.com/sa-67-example/entity"
)

// POST /concerts
func CreateConcert(c *gin.Context) {
	var concert entity.Concert

	// bind เข้าตัวแปร concert
	if err := c.ShouldBindJSON(&concert); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	db := config.DB()
	// สร้าง Concert
	newConcert := entity.Concert{
		Name:                 concert.Name,
		ShowDate:             concert.ShowDate,
		Artist:               concert.Artist,
		Description:          concert.Description,
		BenefitFile:          concert.BenefitFile,
		InfoFile:             concert.InfoFile,
		PosterFile:           concert.PosterFile,
		TicketSalesStartDate: concert.TicketSalesStartDate,
		Venue:                concert.Venue,
		Status:               concert.Status,
		OrganizerID:          concert.OrganizerID,
	}
	// บันทึก Concert
	if err := db.Create(&newConcert).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusCreated, gin.H{"message": "Concert created successfully", "data": newConcert})
}
// GET /concerts/:id
func GetConcert(c *gin.Context) {
	ID := c.Param("id")
	var concert entity.Concert
	db := config.DB()
	result := db.Preload("Organizer").Preload("SeatCharts").Preload("PerformanceSchedules").First(&concert, ID)
	if result.Error != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": result.Error.Error()})
		return
	}
	c.JSON(http.StatusOK, concert)
}
// GET /concerts
func ListConcerts(c *gin.Context) {
	var concerts []entity.Concert
	db := config.DB()
	result := db.Preload("Organizer").Preload("SeatCharts").Preload("PerformanceSchedules").Find(&concerts)
	if result.Error != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": result.Error.Error()})
		return
	}
	c.JSON(http.StatusOK, concerts)
}
// DELETE /concerts/:id
func DeleteConcert(c *gin.Context) {
	id := c.Param("id")
	db := config.DB()
	// ลบ Concert ตาม ID
	if tx := db.Delete(&entity.Concert{}, id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Concert not found"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"message": "Concert deleted successfully"})
}
// PATCH /concerts/:id
func UpdateConcert(c *gin.Context) {
	var concert entity.Concert
	concertID := c.Param("id")
	db := config.DB()
	result := db.First(&concert, concertID)
	if result.Error != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Concert not found"})
		return
	}
	// bind ข้อมูลใหม่ที่ต้องการอัปเดตเข้ากับ concert
	if err := c.ShouldBindJSON(&concert); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Unable to map payload"})
		return
	}
	// บันทึกการอัปเดต
	if err := db.Save(&concert).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"message": "Concert updated successfully"})
}
