/**
 * Class for our view toggle button
 */
class ViewToggle {


    /**
     * Method that assigns our elements
     */
    constructor() {
        this.button = document.getElementById('toggleView');
    }


    /**
     * Add event listeners to our button
     */
    listen() {
        let self = this;
        this.button.addEventListener('click', () => {
            self.toggle();
        });
    }


    /**
     * Toggle our explorer view
     */
    toggle() {
        let icon = this.button.children[0];
        if(icon.innerHTML == 'view_headline') {
            icon.innerHTML = 'view_module';
            this.changeClass('module');
        }else {
            icon.innerHTML = 'view_headline';
            this.changeClass('headline');
        }
    }


    /**
     * Changes a files class type
     * @param {String} filetype - class for file
     */
    changeClass(filetype) {
        let fileItems = document.querySelectorAll('.fileItem');
        for(let i = 0; i < fileItems.length; i++) {
            let fileItem = fileItems[i];

            let arr = fileItem.className.split(' ');
            arr[1] = filetype;

            fileItem.className = arr.join(' ');
        }
    }
}

module.exports = ViewToggle;
