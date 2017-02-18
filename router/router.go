package router

import (
	"fmt"
	"net/http"
)

func StartServer() {
	port := ":3000"

	http.HandleFunc("/", mainHandler)
	http.ListenAndServe(port, nil)
	fmt.Println("GoCloud is running on port ", port)
}

func mainHandler(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "Hello World")
}
