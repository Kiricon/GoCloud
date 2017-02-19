package router

import (
	"GoCloud/app/controllers"
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
	fs := http.FileServer(http.Dir(config.RootDir))
	http.Handle("/files/", http.StripPrefix("/files/", fs))

	var directory controllers.Directory
	http.HandleFunc("/directory/", directory.Index)
	http.ListenAndServe(port, nil)
}
