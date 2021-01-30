var firebaseConfig = {
    apiKey: "AIzaSyBhtmWiBAoub7R4S3tkTTGgX7JQ0sYGQTg",
    authDomain: "qwitter-c8167.firebaseapp.com",
    databaseURL: "https://qwitter-c8167-default-rtdb.firebaseio.com",
    projectId: "qwitter-c8167",
    storageBucket: "qwitter-c8167.appspot.com",
    messagingSenderId: "775260351915",
    appId: "1:775260351915:web:012367d26dcc97ba10b6ee",
    measurementId: "G-ZBM5TNZYZ1"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  user_name = localStorage.getItem("name");
  room_name = localStorage.getItem("room");
  console.log("Hi");
  function send()
  {
    msg = document.getElementById("message").value;
    firebase.database().ref(room_name).push(
        {
            name:user_name,
            message:msg,
            like:0
    });
    document.getElementById("message").value = "";
  }

  function getData()
  {
    firebase.database().ref("/"+room_name).on('value', function(snapshot) 
    { 
      document.getElementById("output").innerHTML = ""; 
    snapshot.forEach(function(childSnapshot) 
    { 
      childKey  = childSnapshot.key; 
      childData = childSnapshot.val();
       if(childKey != "purpose")
        {
          firebase_message_id = childKey;
          message_data = childData;
 //Start code
          console.log("Firebase Message Id",firebase_message_id);
            console.log("Firebase Child Data",message_data);
            name = message_data["name"];
            message = message_data['message'];
          like = message_data['like'];
          name_with_tag = "<h4> "+ name +"<img class='user_tick' src='tick.png'></h4>";
          message_with_tag = "<h4 class='message_h4'>" + message + "</h4>";
 like_button ="<button class='btn btn-warning' id="+firebase_message_id+" value="+like+" onclick='updateLike(this.id)'>";
          span_with_tag = "<span class='glyphicon glyphicon-thumbs-up'>Like: "+ like +"</span></button><hr>";
 
         row = name_with_tag + message_with_tag +like_button + span_with_tag;       
         document.getElementById("output").innerHTML += row;
 //End code
       } 
     }); 
      });
      }
 getData();
 