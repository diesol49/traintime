// linking my Firebase
var config = {
    apiKey: "AIzaSyDFH3pjiBcwb9Jn58WQe4n3iXUv-XOTYoo",
    authDomain: "traintime-7a32f.firebaseapp.com",
    databaseURL: "https://traintime-7a32f.firebaseio.com",
    projectId: "traintime-7a32f",
    storageBucket: "traintime-7a32f.appspot.com",
    messagingSenderId: "13463354379"
  };

  firebase.initializeApp(config);

//   firebase.database().ref().on("value", function(snapshot){
//       console.log(snapshot.val());
//   });
var database = firebase.database();
// tracking the inputs
// var trainName = "";
// var destination = "";
// var firstTrain = 0;
// var frequency = 0;
// will grab values inside the fields
$("#add-train").on("click", function(event) {
    event.preventDefault();
    
    var trainName = $("#name-input").val().trim();
    var destination = $("#destination-input").val().trim();
    var firstTrain = $("#time-input").val().trim();
    var frequency = $("#frequency-input").val().trim();
    console.log(trainName);
    console.log(destination);
    console.log(firstTrain);
    console.log(frequency);
// send data to firebase
    var newTrain = {
        dTrain: trainName,
        dDestination: destination,
        dFirstTrain: firstTrain,
        dFrequency: frequency,
        // dateAdded:firebase.database.ServerValue.TIMESTAMP
    };
    database.ref().push(newTrain);
})
// place all our data from firebase into my div
firebase.database().ref().on("child_added", function(snapshot){
    $("#train-times").append("<p>" + snapshot.val().dTrain+"</p>");
    $("#train-times").append("<p>" + snapshot.val().dDestination+"</p>");
    $("#train-times").append("<p>" + snapshot.val().dFirstTrain+"</p>");
    $("#train-times").append("<p>" + snapshot.val().dFrequency+"</p>");
})
// grab information from firebase and display it onto the site
// & snapshot will be used to do just that
// orderByChild will order the properties by the new child_added value 
// firebase.database().ref().orderByChild("dateAdded").on("child_added", function(snapshot){
//     $("#name-display").html(snapshot.val().trainName);
//     $("#destination-display").html(snapshot.val().destination);
//     $("#time-display").html(snapshot.val().firstTrain);
//     $("#minutes-display").html(snapshot.val().frequency);
// });

// setting the times for the trains
var tFrequency = 0;

var currentTime = moment();
console.log("current time: " + moment(currentTime).format("hh:mm"));

var diffTime = moment().diff(moment(currentTime), "minutes");
console.log(diffTime);

var tRemainder = diffTime % tFrequency;
console.log(tRemainder);

var tMinutesTillTrain = tFrequency - tRemainder;
console.log("minutes till train: " + tMinutesTillTrain);

var nextTrain = moment().add(tMinutesTillTrain, "minutes");
console.log("arrival time: " + moment(nextTrain).format("hh:mm"));
