
// TODO: Replace the following with your app's Firebase project configuration
// See: https://support.google.com/firebase/answer/7015592
const firebaseConfig = {
  apiKey: "AIzaSyC0AICglNWqqooRMolOKPLkm60JGVs69IY",
  authDomain: "datos-de-formulario-d4b1f.firebaseapp.com",
  projectId: "datos-de-formulario-d4b1f",
  storageBucket: "datos-de-formulario-d4b1f.appspot.com",
  messagingSenderId: "318536590703",
  appId: "1:318536590703:web:656c75d38378828f7a349a",
  measurementId: "G-LGK3947QGW"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
const db = firebase.firestore();

document.getElementById("formulario").addEventListener("submit", (event) => {
  event.preventDefault();

  //validar campo nombre
  let entradaNombre = document.getElementById("name");
  let errorNombre = document.getElementById("nameError");

  if (entradaNombre.value.trim() === "") {
    errorNombre.textContent = "Por favor introducir el nombre";
    errorNombre.classList.add("error-message");
  } else {
    errorNombre.textContent = "";
    errorNombre.classList.remove("error-message");
  }

  // validar correo electronico
  let entradaEmail = document.getElementById("email");
  let errorEmail = document.getElementById("emailError");
  let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailPattern.test(entradaEmail.value)) {
    errorEmail.textContent = "Por favor introducir un email valido";
    errorEmail.classList.add("error-message");
  } else {
    errorEmail.textContent = "";
    errorEmail.classList.remove("error-message");
  }

  // validar contraseña
  let contrasenaEntrada = document.getElementById("password");
  let errorContrasena = document.getElementById("passwordError");
  let contrasenaPattern =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])([A-Za-z\d$@$!%*?&]|[^ ]){8,15}$/;

  if (!contrasenaPattern.test(contrasenaEntrada.value)) {
    errorContrasena.textContent =
      "La contraseña debe tener mas de 8 caracteres, numeros , mayusculas, minusculas y caracteres especiales";
    errorContrasena.classList.add("error-message");
  } else {
    errorContrasena.textContent = "";
    errorContrasena.classList.remove("error-message");
  }
  //si todos los campos son validos enviar formulario
  if (
    !errorNombre.textContent &&
    !errorEmail.textContent &&
    !errorContrasena.textContent
  ) {
    //backend que reciba la informacion
    db.collection("users")
      .add({
        nombre: entradaNombre.value,
        email: entradaEmail.value,
        password: contrasenaEntrada.value,
      })
      .then((docRef) => {
        alert("El formulario se ha enviado con exito",docRef.id);
        document.getElementById("formulario").reset();
        
      })
      .catch((error) => {
        alert(error);
      });   
    
  }
});
