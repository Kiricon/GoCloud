package helpers

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
)

// ListFiles - Return a list of files and dirs
func ListFiles(dir string) string {
	files, _ := ioutil.ReadDir(dir)
	listing := ""
	for _, f := range files {
		listing += "<br/>" + f.Name()
	}

	return listing
}

func ListFilesJson(dir string) []byte {
	files, _ := ioutil.ReadDir(dir)
	var list []string
	for _, f := range files {
		list = append(list, f.Name())
	}

	jsonList, err := json.Marshal(list)

	if err != nil {
		fmt.Println("Cannot create json")
	}

	return jsonList
}
