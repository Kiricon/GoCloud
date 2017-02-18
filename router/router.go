package router

import (
	"GoCloud/helpers"
	"fmt"
	"net/http"
	"strconv"
)

// StartServer starts the server
func StartServer() {
	config := helpers.Config()
	port := ":" + strconv.Itoa(config.Port)
	fmt.Println(port)
	fmt.Println("GoCloud is running on port :", config.Port)
	http.HandleFunc("/", mainHandler)
	http.ListenAndServe(port, nil)

}

func mainHandler(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "Hello World")
}
