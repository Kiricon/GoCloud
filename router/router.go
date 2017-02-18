package router

import (
	"fmt"
	"net/http"
)

// StartServer starts the server
func StartServer() {
	port := ":3000"
	fmt.Println("GoCloud is running on port ", port)
	http.HandleFunc("/", mainHandler)
	http.ListenAndServe(port, nil)

}

func mainHandler(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "Hello World")
}
