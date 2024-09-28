package users
import (
	"errors"
	"net/http"
	"github.com/gin-gonic/gin"
	"golang.org/x/crypto/bcrypt"
	"gorm.io/gorm"
	"example.com/sa-67-example/config"
	"example.com/sa-67-example/entity"
	"example.com/sa-67-example/services"
)
type (
	Authen struct {
		User     string `json:"user"`
		Password string `json:"password"`
	}

	signUp struct {
		User         string `json:"user"`
		Password     string `json:"password"`
		Email        string `json:"email"`
		Name         string `json:"name"`
		PhoneNumber  string `json:"phone_number"`
		Address      string `json:"address"`
		Organization string `json:"organization"`
	}
)

func SignUp(c *gin.Context) {
	var payload signUp

	// Bind JSON payload to the struct
	if err := c.ShouldBindJSON(&payload); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	db := config.DB()
	var userCheck entity.Organizer

	// Check if the user with the provided email already exists
	result := db.Where("email = ?", payload.Email).First(&userCheck)

	if result.Error != nil && !errors.Is(result.Error, gorm.ErrRecordNotFound) {
		// If there's a database error other than "record not found"
		c.JSON(http.StatusInternalServerError, gin.H{"error": result.Error.Error()})
		return
	}

	if userCheck.ID != 0 {
		// If the user with the provided email already exists
		c.JSON(http.StatusConflict, gin.H{"error": "Email is already registered"})
		return
	}

	// Hash the user's password
	// hashedPassword, _ := config.HashPassword(payload.Password)

	// Create a new user
	user := entity.Organizer{
		User:         payload.User,
		Password:     payload.Password,
		Email:        payload.Email,
		Name:         payload.Name,
		PhoneNumber:  payload.PhoneNumber,
		Address:      payload.Address,
		Organization: payload.Organization,
	}

	// Save the user to the database
	if err := db.Create(&user).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusCreated, gin.H{"message": "Sign-up successful"})
}

func SignIn(c *gin.Context) {
	var payload Authen
	var organizer entity.Organizer

	if err := c.ShouldBindJSON(&payload); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	// ค้นหา user ด้วย Username ที่ผู้ใช้กรอกเข้ามา
	if err := config.DB().Raw("SELECT * FROM organizers WHERE user = ?", payload.User).Scan(&organizer).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	// ตรวจสอบรหัสผ่าน
	err := bcrypt.CompareHashAndPassword([]byte(organizer.Password), []byte(payload.Password))
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "password is incorrect"})
		return
	}

	jwtWrapper := services.JwtWrapper{
		SecretKey:       "SvNQpBN8y3qlVrsGAYYWoJJk56LtzFHx",
		Issuer:          "AuthService",
		ExpirationHours: 24,
	}

	signedToken, err := jwtWrapper.GenerateToken(organizer.Email)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "error signing token"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"token_type": "Bearer", "token": signedToken, "id": organizer.ID})
}