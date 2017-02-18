let currentDir = '';

function getDirectory(dir) {
    
    let xmlhttp = new XMLHttpRequest();
    xmlhttp.open('POST', '/directory/', true);
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4) {
            if(xmlhttp.status == 200) {
                let obj = JSON.parse(xmlhttp.responseText);
                let directory = document.getElementById('directory');
                directory.innerHTML = '';

                for(let i = 0; i < obj.length; i++){
                    let item = document.createElement('div');
                    item.innerHTML = obj[i];
                    item.addEventListener('click', () => {
                        getDirectory(obj[i]);
                    });
                    directory.appendChild(item);
                }

            }
        }
    };
    let json = JSON.stringify({"Directory": currentDir + dir});
    xmlhttp.send(json);
    currentDir += dir+'/';
}

getDirectory(currentDir);