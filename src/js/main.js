var operation = "";

function afficherResultat(){
  operation=eval(operation).toString();
  if (operation.length >16) {
    operation=operation.slice(0,-4);
  }
  afficherEcran(operation);
};


function checkEntry(value) {
  if (operation.length<18){
     operation+=value;
  }
  else {
    $('#ecran').tooltip({title: "limit exceeded"});
    $('#ecran').tooltip('show');
    $('#ecran').on('shown.bs.tooltip', function () {
      setTimeout(function() {   
        $('#ecran').tooltip('dispose');
     }, 4000);
    })
  }

  if (operation.length<2) {
   if (value =="+" || value =="*" || value=="/" || value=="=") {
        operation="";
    }
  }
   if(operation.length>1 && isNaN(parseInt(operation.charAt(operation.length-2))) && isNaN(parseInt(value)) ) {
     operation=operation.slice(0,-1);
   }
  afficherEcran(operation);
};

function annulerDernier() {
operation=operation.slice(0,-1)
afficherEcran(operation);
}

function annulerTout(){
 operation="";
 afficherEcran(operation);
}

function afficherEcran(operation){
  document.getElementById("ecran").innerHTML=operation;
}