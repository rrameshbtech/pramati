let Wire = require('./wire/wire');
let wire = new Wire();

let levelCrossing = { // Dummy placeholder object
   open: function () { console.log("Level crossing opening"); },
   close: function () { console.log("Level crossing closing"); }
};
let bell = { // Dummy placeholder object
   ring: function () { console.log("Bell ringing"); }
};
let display = { // Dummy placeholder object
   show: function (msg) { console.log("DISPLAY", msg); }
};

// Somewhere on a user-end system that listens for "green" signals.
wire.on('signal', function (colour) {
    if (colour === "green") {
        console.log("Train is about to leave!");
    }
});

// Somewhere else in the control station which actuates other devices.
wire.on('signal', function (colour) {
    if (colour === "red") {
        levelCrossing.open();
    }
    if (colour === "green") {
        bell.ring(20.0);
        levelCrossing.close();
        wire.write('train-departing', {trainNo: 12105, platformNo: 5});
    }
});

// Somewhere on the platform display backend.
wire.on('train-departing', function (info) {
    display.show("Train " + info.trainNo + " is leaving platform " + info.platformNo + " now!");
});

// Somewhere in the backend service of a controller,
// when a train is about to leave.
wire.write('signal', "green");
