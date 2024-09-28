package main
import (
    "net/http"
   "github.com/gin-gonic/gin"
   "example.com/sa-67-example/config"
   "example.com/sa-67-example/controller/users"
   "example.com/sa-67-example/controller/concerts"
   "example.com/sa-67-example/middlewares"
)

const PORT = "8000"

func main() {

	// open connection database
	config.ConnectionDB()

    config.SetupDatabase()

    r := gin.Default()

    r.Use(CORSMiddleware())

    r.POST("/signup", users.SignUp)
    r.POST("/signin", users.SignIn)


	router := r.Group("/")
	{

        router.Use(middlewares.Authorizes())

		// User Routes
		router.GET("/users", users.ListUsers)
		router.GET("/users/:id", users.GetUser)
		router.POST("/users", users.CreateUser)
		router.PATCH("/users", users.UpdateUser)
		router.DELETE("/users/:id", users.DeleteUser)

        router.POST("/concert/create", concerts.CreateConcert)
        router.POST("/concert/perform", concerts.CreatePerformanceSchedule)
        router.POST("/concert/seat", concerts.CreateSeatChart)
                
        // Concert routes
        router.GET("/concert/:id", concerts.GetConcert)
        router.GET("/concerts", concerts.ListConcerts)
        router.PUT("/concert/:id", concerts.UpdateConcert)
        router.DELETE("/concert/:id", concerts.DeleteConcert)
        
        router.GET("/performances/:id", concerts.GetPerformanceSchedule)
        router.GET("/performances", concerts.ListPerformanceSchedules)
        router.DELETE("/performances/:id", concerts.DeletePerformanceSchedule)
        router.PUT("/performances/:id", concerts.UpdatePerformanceSchedule)
    
        router.GET("/seats/:id", concerts.GetSeatChart)
        router.GET("/seats", concerts.ListSeatChart)
        router.DELETE("/seats/:id", concerts.DeleteSeatChart)
        router.PUT("/seats/:id", concerts.UpdateSeatChart)

        
	}

	r.GET("/", func(c *gin.Context) {
		c.String(http.StatusOK, "API RUNNING... PORT: %s", PORT)
	})

	// Run the server

	r.Run("localhost:" + PORT)

}

func CORSMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
		c.Writer.Header().Set("Access-Control-Allow-Credentials", "true")
		c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, accept, origin, Cache-Control, X-Requested-With")
		c.Writer.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS, GET, PUT, DELETE, PATCH")

		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(204)
			return
		}

		c.Next()
	}
}