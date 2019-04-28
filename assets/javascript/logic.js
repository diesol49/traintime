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

  firebase.database().ref().on("value", function(snapshot){
      console.log(snapshot.val());
  });

// tracking the inputs
var trainName = "";
var destination = "";
var firstTrain = 0;
var frequency = 0;
// will grab values inside the fields
$("#add-train").on("click", function(event) {
    event.preventDefault();
    
    trainName = $("#name-input").val().trim();
    destination = $("#destination-input").val().trim();
    firstTrain = $("#time-input").val().trim();
    frequency = $("#frequency-input").val().trim();
// send data to firebase
    firebase.database().ref().push({
        Train: trainName,
        Destination: destination,
        FirstTrain: firstTrain,
        Frequency: frequency,
        dateAdded:firebase.database.ServerValue.TIMESTAMP

    })

})
// place all our data from firebase into my div
firebase.database().ref().on("child_added", function(snapshot){
    $("#train-times").append("<p>" + snapshot.val().trainName+"</p>");
    $("#train-times").append("<p>" + snapshot.val().destination+"</p>");
    $("#train-times").append("<p>" + snapshot.val().firstTrain+"</p>");
    $("#train-times").append("<p>" + snapshot.val().frequency+"</p>");
})
// grab information from firebase and display it onto the site
// & snapshot will be used to do just that
// orderByChild will order the properties by the new child_added value 
firebase.database().ref().orderByChild("dateAdded").on("child_added", function(snapshot){
    $("#name-display").html(snapshot.val().trainName);
    $("#destination-display").html(snapshot.val().destination);
    $("#time-display").html(snapshot.val().firstTrain);
    $("#minutes-display").html(snapshot.val().frequency);
});

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
