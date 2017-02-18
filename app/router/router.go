package router

import (
	"GoCloud/app/dirreader"
	"GoCloud/app/helpers"
	"fmt"
	"net/http"
	"strconv"
)

var config = helpers.Config()

// StartServer starts the server
func StartServer() {

	port := ":" + strconv.Itoa(config.Port)
	fmt.Println("GoCloud is running on port :", config.Port)
	http.Handle("/", http.FileServer(http.Dir("public")))
	http.ListenAndServe(port, nil)

}

func mainHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "text/html; charset=utf-8")
	fmt.Fprintf(w, dirreader.ListFiles(config.RootDir))
}
