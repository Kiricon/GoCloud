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
     * @param {FileItem[]} fileItems - List of files and directories
     */
    buildItems(fileItems) {
        let self = this;
        this.directoryElement.innerHTML = '';
        let itemClass = document.querySelector('#toggleView i').innerHTML;
        itemClass = itemClass.split('_')[1];
        for(let i = 0; i < fileItems.length; i++) {
            let item = document.createElement('div');
            let fileItem = fileItems[i];
            let fileString = '';

            fileString += '<div class="name">'+fileItem.Name+'</div>';
            fileString += this.buildIcon(fileItem);

            if(!fileItem.IsDir) {
                let sizeString = this.formatSizeUnits(fileItem.Size);
                fileString += '<div class="size">'+sizeString+'</div>';
            }

            item.className = 'fileItem '+itemClass;
            item.innerHTML = fileString;
            if(fileItem.IsDir) {
                item.addEventListener('click', () => {
                    self.goDownDirectory(fileItem.Name);
                });
            }
            this.directoryElement.appendChild(item);
        }
    }


    /**
     * Method that builds the item's
     * icon html based on item
     * @param {FileItem} fileItem
     * @return {String} - Html string for icon
     */
    buildIcon(fileItem) {
        let iconString = '';
        let icon = fileItem.IsDir ? 'folder' : 'insert_drive_file';
        let arr = fileItem.Name.split('.');
        let ext = arr[arr.length-1].toLowerCase();

        if(ext == 'png' || ext == 'jpg' || ext == 'jpeg' || ext == 'svg') {
            let path = this.currentDir+fileItem.Name;
            iconString += '<img class="icon" src="/files/'+path+'" />';
        }else {
            iconString += '<div class="icon">';
            iconString += '<i class="material-icons">'+icon+'</i>';
            iconString += '</div>';
        }

        return iconString;
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


    /**
     * Method to convert bytes to stringify
     * @param {Number} bytes
     * @return {String} - Bytes converted to kb,mb,gbs
     */
    formatSizeUnits(bytes) {
        if ( bytes>=1000000000 ) {
            bytes=(bytes/1000000000).toFixed(2)+' GB';
        } else if (bytes>=1000000) {
            bytes=(bytes/1000000).toFixed(2)+' MB';
        } else if (bytes>=1000) {
            bytes=(bytes/1000).toFixed(2)+' KB';
        } else if (bytes>1) {
            bytes=bytes+' bytes';
        } else if (bytes==1) {
            bytes=bytes+' byte';
        }else {
            bytes='0 byte';
        }
        return bytes;
    }
}

module.exports = Explorer;
