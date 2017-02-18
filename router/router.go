package router

import (
	"GoCloud/dirreader"
	"GoCloud/helpers"
	"fmt"
	"net/http"
	"strconv"
)

var config = helpers.Config()

// StartServer starts the server
func StartServer() {

	port := ":" + strconv.Itoa(config.Port)
	fmt.Println("GoCloud is running on port :", config.Port)
	http.HandleFunc("/", mainHandler)
	http.ListenAndServe(port, nil)

}

func mainHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "text/html; charset=utf-8")
	fmt.Fprintf(w, dirreader.ListFiles(config.RootDir))
}
