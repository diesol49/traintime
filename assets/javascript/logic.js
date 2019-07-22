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
var trainData = firebase.database();
// tracking the inputs
// var trainName = "";
// var destination = "";
// var firstTrain = 0;
// var frequency = 0;
// will grab values inside the fields
$("#add-train").on("click", function(event) {
    event.preventDefault();
    
    var trainName = $("#train-name-input").val().trim();
    var destination = $("#destination-input").val().trim();
    var firstTrain = $("#time-input").val().trim();
    var frequency = $("#frequency-input").val().trim();
    console.log(trainName);
    console.log(destination);
    console.log(firstTrain);
    console.log(frequency);
// send data to firebase
    var newTrain = {
        Train: trainName,
        Destination: destination,
        FirstTrain: firstTrain,
        Frequency: frequency,
        // dateAdded:firebase.database.ServerValue.TIMESTAMP
    };
    trainData.ref().push(newTrain);


// alert user that the train was added
alert("Train Added!");
// place all our data from firebase into my div
// firebase.database().ref().on("child_added", function(snapshot){
//     $("#train-times").append("<p>" + snapshot.val().dTrain+"</p>");
//     $("#train-times").append("<p>" + snapshot.val().dDestination+"</p>");
//     $("#train-times").append("<p>" + snapshot.val().dFirstTrain+"</p>");
//     $("#train-times").append("<p>" + snapshot.val().dFrequency+"</p>");
// })

$("#train-name-input").val("");
$("#destination-input").val("");
$("#first-train-input").val("");
$("#frequency-input").val("");
});

trainData.ref().on("child_added", function(childSnapshot, prevChildKey) {
    console.log(childSnapshot.val());
  
    // Store everything into a variable.
    var tName = childSnapshot.val().Train;
    var tDestination = childSnapshot.val().Destination;
    var tFrequency = childSnapshot.val().Frequency;
    var tFirstTrain = childSnapshot.val().FirstTrain;
  
    var timeArr = tFirstTrain.split(":");
    var trainTime = moment()
      .hours(timeArr[0])
      .minutes(timeArr[1]);
    var maxMoment = moment.max(moment(), trainTime);
    var tMinutes;
    var tArrival;
  
    // If the first train is later than the current time, sent arrival to the first train time
    if (maxMoment === trainTime) {
      tArrival = trainTime.format("hh:mm A");
      tMinutes = trainTime.diff(moment(), "minutes");
    } else {
      // Calculate the minutes until arrival using hardcore math
      // To calculate the minutes till arrival, take the current time in unix subtract the FirstTrain time
      // and find the modulus between the difference and the frequency.
      var differenceTimes = moment().diff(trainTime, "minutes");
      var tRemainder = differenceTimes % tFrequency;
      tMinutes = tFrequency - tRemainder;
      // To calculate the arrival time, add the tMinutes to the current time
      tArrival = moment()
        .add(tMinutes, "m")
        .format("hh:mm A");
    }
    console.log("tMinutes:", tMinutes);
    console.log("tArrival:", tArrival);
  
    // Add each train's data into the table
    $("#train-table > tbody").append(
      $("<tr>").append(
        $("<td>").text(tName),
        $("<td>").text(tDestination),
        $("<td>").text(tFrequency),
        $("<td>").text(tArrival),
        $("<td>").text(tMinutes)
      )
    );
  });

// grab information from firebase and display it onto the site
// & snapshot will be used to do just that
// orderByChild will order the properties by the new child_added value 
// firebase.database().ref().orderByChild("dateAdded").on("child_added", function(snapshot){
//     $("#name-display").html(snapshot.val().trainName);
//     $("#destination-display").html(snapshot.val().destination);
//     $("#time-display").html(snapshot.val().firstTrain);
//     $("#minutes-display").html(snapshot.val().frequency);
// });
