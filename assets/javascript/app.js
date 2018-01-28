// Initialize Firebase
var config = {
    apiKey: "AIzaSyCMQZYuMUPh-qgTFYxrL-BXHUq1Yd6CqqE",
    authDomain: "nevers-first.firebaseapp.com",
    databaseURL: "https://nevers-first.firebaseio.com",
    projectId: "nevers-first",
    storageBucket: "nevers-first.appspot.com",
    messagingSenderId: "361904717962"
};
firebase.initializeApp(config);

//create the variable to reference the 'database'
var database = firebase.database();

// create the input to the db on click function
$("#addTrain").on("click", function() {

    var trainName = $("#trainName-input").val().trim();
    var destination = $("#destination-input").val().trim();
    var firstTrain = moment($("#firstTrain-input").val().trim(), "hh:mm").format("X");
    var frequency = $("#frequency-input").val().trim();

    //calculate next train time
    
    var firstTrainConverted = moment(firstTrain, "hh:mm").subtract(1, "years");
    
    var currentTime = moment();
    
    var difference = currentTime.diff(moment(firstTrainConverted), "minutes");
    
    var remainder = difference % frequency;
    
    var minUntilNext = frequency - remainder;
    
    var nextTrain = moment().add(minUntilNext, "minutes").format("hh:mm a");

    var newTrain = {
        name: trainName,
        destination: destination,
        firstTrain: firstTrain,
        frequency: frequency,
        min: minUntilNext,
        next: nextTrain
    }


    database.ref().push(newTrain);
    
    //clear form fields

    $("#trainName-input").val("");
    $("#destination-input").val("");
    $("#firstTrain-input").val("");
    $("#frequency-input").val("");

    return false;
});


//store entered data on page


database.ref().on("child_added", function(childSnap, snapshot) {

    var name = childSnap.val().name;
    var destination = childSnap.val().destination;
    var firstTrain = childSnap.val().firstTrain;
    var frequency = childSnap.val().frequency;
    var min = childSnap.val().min;
    var next = childSnap.val().next;

    $("#trainTable > tbody").append("<tr><td>" + name + "</td><td>" + destination + "</td><td>" + frequency + "</td><td>" + next + "</td><td>" + min + "</td></tr>");
    $("#timeCurrent").append("<a>"+currentTIme+"</a>");
});



