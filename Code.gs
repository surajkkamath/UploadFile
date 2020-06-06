function uploadFiles(url) {
  var response =  UrlFetchApp.fetch(url)
  var fileName  = getFilenameFromURL(url)
  var folder = DriveApp.getFolderById('1IxMiswEfi67ovoBf8ZH1RV7qVPx1Ks6l');
  var blob = response.getBlob();
  var file = folder.createFile(blob)
  file.setName(fileName)
  file.setDescription("Download from the " + url)
  return file.getUrl();
}


function getFilenameFromURL(url) {
  //(host-ish)/(path-ish/)(filename)
  var re = /^https?:\/\/([^\/]+)\/([^?]*\/)?([^\/?]+)/;
  var match = re.exec(url);
  if (match) {
    return unescape(match[3]);
  }
  return null;
}

function doGet(e){
var html  =  HtmlService.createHtmlOutputFromFile('index.html')
return html.setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL)
}

<!DOCTYPE html>
<html>
  <head>
    <base target="_top">
    <title> Please Upload File</title>
  </head>
  <body>
    <form>
    <label> Enter URL</label>
    <input type ="text" name="myFile" id="url" style="height:4%; width:70%">
    <br>
    <input type="button" id="submit" value="Upload Files">
    <label id="urlpath"></label>
    </form>
    <script>
    document.getElementById('submit').addEventListener('click', 
    function(e) {
    var url = document.getElementById('url').value;
    google.script.run.withSuccessHandler(onSuccess).uploadFiles(url)
    
    })
    
    function onSuccess(url){
    document.getElementById('urlpath').innerHTML = "File has been uploaded in the following path" + url;
    }
    </script>
  </body>
</html>


