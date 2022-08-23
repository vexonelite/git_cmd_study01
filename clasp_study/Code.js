function doGet() {
  // [Can one set title in google script](https://stackoverflow.com/questions/38542820/can-one-set-title-in-google-script)
  const htmlOutput = HtmlService.createTemplateFromFile('index').evaluate();
  htmlOutput.setTitle('Clasp Study');
  return htmlOutput;
}

//INCLUDE JAVASCRIPT AND CSS FILES
function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename).getContent();
}
