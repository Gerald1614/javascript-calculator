var operation = "";
var opRes="";

function afficherResultat(){
  if (operation !=""){
  operation=eval(operation).toFixed(4).toString();
  if (operation.length >17) {
    valExcess();
    operation=0;
    setTimeout(function() {   
      operation="";
      opRes="";
      afficherEcran(operation, opRes);
   }, 4000);
  }
  afficherEcran(operation, opRes);
 
}
};

function valExcess(){
  $('#ecran').tooltip({title: "limit exceeded"});
  $('#ecran').tooltip('show');
  $('#ecran').on('shown.bs.tooltip', function () {
    setTimeout(function() {   
      $('#ecran').tooltip('dispose');
   }, 4000);
  })
}
function checkEntry(value) {
  if (operation.length<18){
     operation+=value;
     opRes+=value;
  }
  else {
    valExcess();
  }

  if (operation.length<2) {
   if (value =="+" || value =="*" || value=="/" || value=="=") {
        operation="";
        opRes="";
    }
  }
   if(operation.length>1 && isNaN(parseInt(operation.charAt(operation.length-2))) && isNaN(parseInt(value)) ) {
     operation=operation.slice(0,-1);
     opRes=opRes.slice(0,-1);
   }
  afficherEcran(operation, opRes);
};

function annulerDernier() {
operation=operation.slice(0,-1);
opRes=opRes.slice(0,-1);
afficherEcran(operation, opRes);
}

function annulerTout(){
 operation="";
 opRes="";
 afficherEcran(operation, opRes);
}

function afficherEcran(operation, opRes){
  document.getElementById("res").innerHTML=operation;
  document.getElementById("opLine").innerHTML=opRes;

}