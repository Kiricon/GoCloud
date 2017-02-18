var xmlhttp = new XMLHttpRequest();
xmlhttp.open('POST', '/directory/', true);
xmlhttp.onreadystatechange = function() {
    if (xmlhttp.readyState == 4) {
        if(xmlhttp.status == 200) {
            var obj = JSON.parse(xmlhttp.responseText);
            console.log(obj);
         }
    }
};
var json = JSON.stringify({"Directory": ""});
xmlhttp.send(json);