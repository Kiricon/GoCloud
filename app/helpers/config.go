package helpers

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"os"
)

// JSONObject - Our json config file as an object
type JSONObject struct {
	Port    int
	RootDir string
}

// Config returns info from our json file
func Config() JSONObject {
	file, e := ioutil.ReadFile("./config.json")
	if e != nil {
		fmt.Printf("File error: %v\n", e)
		os.Exit(1)
	}

	var jsonConfig JSONObject
	json.Unmarshal(file, &jsonConfig)

	return jsonConfig
}
