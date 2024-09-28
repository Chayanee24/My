package users

import (
	"net/http"
	"github.com/gin-gonic/gin"
	"example.com/sa-67-example/entity"
	"example.com/sa-67-example/config"
)

// POST /users
func CreateUser(c *gin.Context) {
	var user entity.Organizer

	// bind เข้าตัวแปร user
	if err := c.ShouldBindJSON(&user); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	db := config.DB()


	// เข้ารหัสลับรหัสผ่านที่ผู้ใช้กรอกก่อนบันทึกลงฐานข้อมูล
	hashedPassword, _ := config.HashPassword(user.Password)

	// สร้าง User
	u := entity.Organizer{
		User: user.User, // ตั้งค่าฟิลด์ FirstName
		Password:  hashedPassword,  // ตั้งค่าฟิลด์ LastName
		Email:     user.Email,     // ตั้งค่าฟิลด์ Email
		Name:  user.Name,
		PhoneNumber:  user.PhoneNumber,
		Address:   user.Address, // ตั้งค่าฟิลด์ Profile
		Organization:  user.Organization,
	}

	// บันทึก
	if err := db.Create(&u).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusCreated, gin.H{"message": "Created success", "data": u})
}

// GET /users/:id
func GetUser(c *gin.Context) {
	ID := c.Param("id")
	var user entity.Organizer

	db := config.DB()
	results := db.Preload("Email").First(&user, ID)
	if results.Error != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": results.Error.Error()})
		return
	}
	if user.ID == 0 {
		c.JSON(http.StatusNoContent, gin.H{})
		return
	}
	c.JSON(http.StatusOK, user)
}

// GET /users
func ListUsers(c *gin.Context) {

	var users []entity.Organizer

	db := config.DB()
	results := db.Preload("Email").Find(&users)
	if results.Error != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": results.Error.Error()})
		return
	}
	c.JSON(http.StatusOK, users)
}

// DELETE /users/:id
func DeleteUser(c *gin.Context) {

	id := c.Param("id")
	db := config.DB()
	if tx := db.Exec("DELETE FROM organizers WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "id not found"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"message": "Deleted successful"})

}

// PATCH /users
func UpdateUser(c *gin.Context) {
	var user entity.Organizer

	UserID := c.Param("id")

	db := config.DB()
	result := db.First(&user, UserID)
	if result.Error != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "id not found"})
		return
	}

	if err := c.ShouldBindJSON(&user); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Bad request, unable to map payload"})
		return
	}

	result = db.Save(&user)
	if result.Error != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Bad request"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Updated successful"})
}