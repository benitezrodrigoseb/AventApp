

 var firebaseConfig = {
  apiKey: "AIzaSyC2SU08jq1Zp_n_eEUZf1d7X9uP6sRNppg",
  authDomain: "aventapp-792f2.firebaseapp.com",
  databaseURL: "https://aventapp-792f2.firebaseio.com",
  projectId: "aventapp-792f2",
  storageBucket: "aventapp-792f2.appspot.com",
  messagingSenderId: "724294418594",
  appId: "1:724294418594:web:43caa817a4be7da7ee57fb",
  measurementId: "G-REHDNGTQGR"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  
  
  var db = firebase.firestore();



// Inicio de funcion ingresar con autenticacion mail y password 

function ingresar() {
  var email = document.getElementById("usuario").value;
  var password = document.getElementById("contra").value;

  firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // ...
    console.log(errorCode);
    console.log(errorMessage);
  });
}

// Inicio de funcion crear usuario con autenticacion mail y password

function crearUsuario() {
var email = document.getElementById("usuario2").value;
var password = document.getElementById("contra2").value;

firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
  // ...
  console.log(errorCode);
  console.log(errorMessage);
});
} 

function observador() {
firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    name = user.displayName;
    email = user.email;
    photoUrl = user.photoURL;
    emailVerified = user.emailVerified;
    uid = user.uid;
    console.log("EXISTE");

    location.href = "public/main.html";
   
  } else {
    // No user is signed in.
  }
});
}

if(document.title == "AventApp"){
observador();
}

function cerrarSesion(){

  firebase.auth().signOut().then(function() {
    // Sign-out successful.
  }).catch(function(error) {
    // An error happened.
  }); 
  location.href = "../index.html";
}

// variables globales Crear Viaje




 function crearViaje(){

  var cupos = document.getElementById("cupos").value;
  var introOrigen =document.getElementById("introduceOrigen").value;
  var introDestino =document.getElementById("introduceDestino").value;
  var introFecha =document.getElementById("introduceFecha").value;
  var introHora =document.getElementById("introduceHora").value;


  console.log(introOrigen); 
  console.log(introDestino); 
  console.log(introHora); 
  console.log(introFecha); 
  

  db.collection("viajes").add(
    {
      conductor: firebase.auth().currentUser.uid,
      origen: introOrigen,
      destino: introDestino,
      fecha: introFecha,
      hora: introHora,
      cupos: cupos

    })
    .then(function(docRef){
      console.log("Escribir id del viaje ", docRef.id);

    })
    .catch(function(error){

      console.log("Error ", error);
    })

}





if(document.title == "Menu"){
  db.collection("viajes").get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
        var fieldsetViaje = document.createElement("fieldset");
        document.getElementById("menuPasajero").appendChild(fieldsetViaje);
        var legendViaje = document.createElement("legend");
        var textLegend = document.createTextNode("Viaje");
        legendViaje.appendChild(textLegend);
        fieldsetViaje.appendChild(legendViaje);

        var origenViaje = document.createElement("p");
        var textOrigen = document.createTextNode("Origen:" + doc.data().origen);
        origenViaje.appendChild(textOrigen);
        fieldsetViaje.appendChild(origenViaje);
       
        var destinoViaje = document.createElement("p");
        var textDestino = document.createTextNode("Destino:" + doc.data().destino);
        destinoViaje.appendChild(textDestino);
        fieldsetViaje.appendChild(destinoViaje);
       
        var fechaViaje = document.createElement("p");
        var textFecha = document.createTextNode( doc.data().fecha);
        fechaViaje.appendChild(textFecha);
        fieldsetViaje.appendChild(fechaViaje);
        
        var cuposViaje = document.createElement("p");
        var textCupos = document.createTextNode("Cupos:" + doc.data().cupos);
        cuposViaje.appendChild(textCupos);
        fieldsetViaje.appendChild(cuposViaje);

        var btnVer = document.createElement("button");
        var textBtn = document.createTextNode("Ver" );
        btnVer.appendChild(textBtn);
        fieldsetViaje.appendChild(btnVer);
       
       
       
        /* doc.data().cupos;
        doc.data().cupos;
        doc.data().cupos;*/
    });
  });
}
