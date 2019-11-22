$(function(){
 var imgi = "";
 function onComplete(data) {
  var notes = "";        
//var time = Date.now();
  var diffImage = new Image();
  diffImage.src = data.getImageDataUrl();
  $("#diff"+imgi).html(diffImage);
  if(data.misMatchPercentage == 0){
   notes += "Las imagenes son iguales. ";
  }else{
   notes+="La diferencia porcentual es del "+data.misMatchPercentage+"%. ";
   if (!data.isSameDimensions) {
    notes+="Las dimensiones son diferentes. ";
   }
  }
  $("#note"+imgi).text(notes);
 }
 (function() {
  $("#example-images").click(function() {
   var divname;
   var i;
   //cambiar el lim de i de acuerdo al num de pruebas
   for (i = 1; i < 6; i++) {
    imgi = i;
    resembleControl = resemble("snapshots/a"+i+".png")
                        .compareTo("snapshots/b"+i+".png")
                        .onComplete(onComplete);
   };    
   return false;
  });
 })();
});
