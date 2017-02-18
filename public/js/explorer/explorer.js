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
