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
        this.currentDirElement.innerHTML = this.currentDir;
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
        this.currentDirElement.innerHTML = this.currentDir;
        this.getDirectory(this.currentDir);
    }
}

module.exports = Explorer;
