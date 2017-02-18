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
	    }

	    /**
	     * Get all listing from a directory
	     * @param {String} dir - subdirectory to search
	     */
	    getDirectory(dir) {
	        let self = this;
	        let xmlhttp = new XMLHttpRequest();
	        xmlhttp.open('POST', '/directory/', true);
	        xmlhttp.onreadystatechange = function() {
	            if (xmlhttp.readyState == 4) {
	                if(xmlhttp.status == 200) {
	                    let obj = JSON.parse(xmlhttp.responseText);
	                    let directory = document.getElementById('directory');
	                    directory.innerHTML = '';

	                    for(let i = 0; i < obj.length; i++) {
	                        let item = document.createElement('div');
	                        item.innerHTML = obj[i];
	                        item.addEventListener('click', () => {
	                            self.getDirectory(obj[i]);
	                        });
	                        directory.appendChild(item);
	                    }
	                }
	            }
	        };
	        let json = JSON.stringify({'Directory': this.currentDir + dir});
	        xmlhttp.send(json);
	        this.currentDir += dir+'/';
	    }
	}

	module.exports = Explorer;


/***/ }
/******/ ]);