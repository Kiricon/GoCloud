/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	const Explorer = __webpack_require__(1);

	let explorer = new Explorer();
	explorer.getDirectory('');


/***/ },
/* 1 */
/***/ function(module, exports) {

	/**
	 * Class for our file explorer
	 */
	class Explorer {

	    /**
	     * Set default current directory
	     */
	    constructor() {
	        this.currentDir = '';
	        this.directoryElement = document.getElementById('directory');
	        this.currentDirElement = document.getElementById('currentDirectory');
	        this.backButton = document.getElementById('backButton');
	        this.listen();
	        this.updateDirPath();
	    }


	    /**
	     * Add event listeners
	     */
	    listen() {
	        let self = this;
	        this.backButton.addEventListener('click', () => {
	            self.backButtonClick();
	        });
	    }

	    /**
	     * Get all listing from a directory
	     * @param {String} dir - subdirectory to search
	     */
	    getDirectory(dir) {
	        let self = this;
	        let xmlhttp = new XMLHttpRequest();

	        xmlhttp.open('POST', '/directory/', true);
	        xmlhttp.onreadystatechange = () => {
	            if (xmlhttp.readyState == 4) {
	                if(xmlhttp.status == 200) {
	                    let obj = JSON.parse(xmlhttp.responseText);
	                    self.buildItems(obj);
	                }
	            }
	        };

	        let json = JSON.stringify({'Directory': dir});
	        xmlhttp.send(json);
	    }


	    /**
	     * Go down a given directory
	     * @param {String} dir - Directory to go down
	     */
	    goDownDirectory(dir) {
	        this.getDirectory(this.currentDir + dir);
	        this.currentDir += dir+'/';
	        this.updateDirPath();
	    }


	    /**
	     * Method to build HTML elements from
	     * returned list of files and directories
	     * @param {String[]} obj - List of files and directories
	     */
	    buildItems(obj) {
	        let self = this;
	        this.directoryElement.innerHTML = '';

	        for(let i = 0; i < obj.length; i++) {
	            let item = document.createElement('div');
	            item.innerHTML = obj[i];
	            item.addEventListener('click', () => {
	                self.goDownDirectory(obj[i]);
	            });
	            this.directoryElement.appendChild(item);
	        }
	    }


	    /**
	     * Go back up one directory
	     */
	    backButtonClick() {
	        let arr = this.currentDir.split('/');
	        arr.splice(arr.length-2, 1);
	        this.currentDir = arr.join('/');
	        this.getDirectory(this.currentDir);
	        this.updateDirPath();
	    }


	    /**
	     * Method for updating the path directory displayed.
	     */
	    updateDirPath() {
	        this.currentDirElement.innerHTML = '~/' + this.currentDir;
	    }
	}

	module.exports = Explorer;


/***/ }
/******/ ]);