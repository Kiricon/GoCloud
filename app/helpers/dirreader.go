package helpers

import (
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
