package helpers

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
)

type FileItem struct {
	IsDir bool
	Name  string
	Size  int64
}

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
	list := []FileItem{}
	for _, f := range files {
		fItem := FileItem{f.IsDir(), f.Name(), f.Size()}
		list = append(list, fItem)
	}

	jsonList, err := json.Marshal(list)

	if err != nil {
		fmt.Println("Cannot create json")
	}

	return jsonList
}
