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
        xmlhttp.onreadystatechange = () => {
            if (xmlhttp.readyState == 4) {
                if(xmlhttp.status == 200) {
                    let obj = JSON.parse(xmlhttp.responseText);
                    self.buildItems(obj);
                }
            }
        };
        let json = JSON.stringify({'Directory': this.currentDir + dir});
        xmlhttp.send(json);
        this.currentDir += dir+'/';
    }


    /**
     * Method to build HTML elements from
     * returned list of files and directories
     * @param {String[]} obj - List of files and directories
     */
    buildItems(obj) {
        let self = this;
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

module.exports = Explorer;
