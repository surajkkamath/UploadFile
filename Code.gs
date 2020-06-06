// Code.gs
function uploadFiles(url) {
  var response = UrlFetchApp.fetch(url)
  var fileName = getFilenameFromURL(url)
  var folder = DriveApp.getFolderById('1dj0veJkb5nXrajkfIy1x415BcNh6efr2')
  var blob = response.getBlob();
  var file = folder.createFile(blob)
  file.setName(fileName)
  return file.getUrl()
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

function doGet(e) {
  var html = HtmlService.createHtmlOutputFromFile('index.html')
  return html.setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL)
}
// index.html

<!DOCTYPE html>
<html>
  <head>
    <base target="_top">
    <title>Upload Files</title>
  </head>
  <body>
    <h1>Upload files to Google drive from URL</h1>
    <form>
      <label>Enter the URL</label>
      <input type="text" name="myFile" id="url" style="height:5%; width:70%">
      <br>
      <br>
      <input type="button" id="submitBtn" value="Upload Files">
      <label id="resp"><label>
    </form>
    <script>
      document.getElementById('submitBtn').addEventListener('click',
      function(e){
        var url= document.getElementById("url").value;
        google.script.run.withSuccessHandler(onSuccess).uploadFiles(url)
      
      })
      
      function onSuccess(url){
        document.getElementById('resp').innerHTML = "File uploaded to path" + url;
      }
    </script>
  </body>
</html>
