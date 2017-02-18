package controllers

import (
	"GoCloud/app/helpers"
	"encoding/json"
	"net/http"
)

var config = helpers.Config()

type JsonRequest struct {
	Directory string
}

type Directory int

func (d *Directory) Index(w http.ResponseWriter, r *http.Request) {
	var jsonRequest JsonRequest
	if r.Body == nil {
		http.Error(w, "Please send a request body", 400)
		return
	}
	err := json.NewDecoder(r.Body).Decode(&jsonRequest)
	if err != nil {
		http.Error(w, err.Error(), 400)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.Write(helpers.ListFilesJson(config.RootDir + jsonRequest.Directory))
}
