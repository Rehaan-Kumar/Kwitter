var firebaseConfig = {
  apiKey: "AIzaSyDqYY6-oTrxRvqIHe-swsX3tY9-bzuhkl8",
  authDomain: "kwitter-9f976.firebaseapp.com",
  databaseURL: "https://kwitter-9f976-default-rtdb.firebaseio.com",
  projectId: "kwitter-9f976",
  storageBucket: "kwitter-9f976.appspot.com",
  messagingSenderId: "498734758257",
  appId: "1:498734758257:web:d81daa0d32c91a797cded0"
};
firebase.initializeApp(firebaseConfig);

var username = localStorage.getItem("username");
document.getElementById("welcome").innerHTML = "Welcome " + username;

function add_room() {
  room_name = document.getElementById("room_name").value;
  firebase.database().ref("/").child(room_name).update({
    purpose: "Adding Room names"
  })
  localStorage.setItem("room_name" , room_name)
  window.location = "kwitter_page.html"
}

function getData() {
  firebase.database().ref("/").on('value', function (snapshot) {
    document.getElementById("output").innerHTML = "";
    snapshot.forEach(function (childSnapshot) {
      childKey = childSnapshot.key;
      Room_names = childKey;
      console.log(Room_names);
      row = "<div id = "+ Room_names +" class = 'room_name' onclick = 'redirect_to_room_name(this.id)'>#"+Room_names+"</div> <hr>"
      document.getElementById("output").innerHTML += row;
    });
  });
}
getData();

function redirect_to_room_name(name) {
  console.log(name);
  localStorage.setItem("room_name" , name);
  window.location = "kwitter_page.html";
}

function logout() {
  localStorage.removeItem("username");
  localStorage.removeItem("room_name");
  window.location = "index.html";
}