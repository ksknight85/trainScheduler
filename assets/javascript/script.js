// Initialize Firebase
var config = {
    apiKey: "AIzaSyAxkeTeXNmCUNjUAtGdAymVi436_xd2Pjo",
    authDomain: "awesomeproject-2a9e2.firebaseapp.com",
    databaseURL: "https://awesomeproject-2a9e2.firebaseio.com",
    projectId: "awesomeproject-2a9e2",
    storageBucket: "awesomeproject-2a9e2.appspot.com",
    memmagingSenderId: "424162711817"
};
firebase.initializeApp(config);
var database = firebase.database();

var trainName = "";
var destination = "";
var startTime = "";
var frequency = 0;


// onclick submit function

$(".submit").on("click", function (event) {
    event.preventDefault();

    name = $("#trainName").val().trim();
    destination = $("#destination").val().trim();
    $("#startTime").attr("type", "time");
    startTime = $("#startTime").val().trim();
    frequency = parseInt($("#frequency").val().trim());

    // Send data to firebase
    database.ref().push({
        name: name,
        destination: destination,
        startTime: startTime,
        frequency: frequency,
        dateAdded: firebase.database.ServerValue.TIMESTAMP,

    })
    $("#startTime").attr("time", "type");
    $(".form-control").val("");


    // clear search values
});


// MATH AND POPULATING DATA TO THE TABLE
database.ref().on("child_added", function (snapshot) {

    var fTrainName = snapshot.val().name;
    var fDestination = snapshot.val().destination;
    var fStartTime = snapshot.val().startTime;
    var fFrequency = snapshot.val().frequency;



    var firstTimeConverted = moment(fStartTime, "HH:mm").subtract(1, "day");
    var currentTime = moment();
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    var tRemainder = diffTime % fFrequency;
    var minutesAway = fFrequency - tRemainder;
    var nextTrain = moment().add(minutesAway, "minutes");
    var catchTrain = moment(nextTrain).format("HH:mm")


    newTableRow = $("<tr>");
    newTableRow.append("<th>" + fTrainName + "</th>")
    newTableRow.append("<td>" + fDestination + "</td>")
    newTableRow.append("<td>Every " + fFrequency + " min</td>");
    newTableRow.append("<td>" + catchTrain + "</td>");
    newTableRow.append("<td>" + minutesAway + " (min)</td>");

    $(".trains").append(newTableRow);


});

