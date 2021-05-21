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

function logout() {
      localStorage.removeItem("username");
      localStorage.removeItem("room_name");
      window.location = "index.html";
}

username = localStorage.getItem("username");
room_name = localStorage.getItem("room_name");

function send() {
      msg = document.getElementById("msg").value;
      firebase.database().ref(room_name).push({
            like: 0,
            name: username,
            message: msg
      });
      document.getElementById("msg").value = "";
}

function getData() {
      firebase.database().ref("/" + room_name).on('value', function (snapshot) {
            document.getElementById("output").innerHTML = "";
            snapshot.forEach(function (childSnapshot) {
                  childKey = childSnapshot.key;
                  childData = childSnapshot.val();
                  if (childKey != "purpose") {
                        firebase_message_id = childKey;
                        message_data = childData;
                        //Start code
                        console.log(firebase_message_id);
                        console.log(message_data)

                        name1 = message_data["name"];
                        message = message_data["message"];
                        like = message_data["like"];

                        name_id = "<h4>"+name1+" <img class='user_tick' src = 'tick.png'></h4>";
                        message_id = "<h4 class = 'message_h4'>"+message+"</h4>";
                        like_id = "<button class = 'btn btn-warning' id = "+ firebase_message_id+" value = "+like+" onclick = 'update_likes(this.id)'>";
                        span_like_id = "<span class = 'glyphicon glyphicon-thumbs-up'>Like: "+like+"</span></button><hr>";
                        row = name_id + message_id + like_id + span_like_id;
                        document.getElementById("output").innerHTML += row;

                        //End code
                  }
            });
      });
}
getData();

function update_likes(button_id){
      console.log(button_id);
      likes = document.getElementById(button_id).value;
      updated_likes = Number(likes) + 1;
      firebase.database().ref(room_name).child(button_id).update({
            like: updated_likes
      })
}