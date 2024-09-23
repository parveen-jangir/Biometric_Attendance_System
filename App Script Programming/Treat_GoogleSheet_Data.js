function doGet(e) {
  var action = e.parameter.action;

  if (action === 'getPresentStudents') {
    return getPresentStudents();
  } else {
    return getAllStudents();
  }
}

function formatCheckTime(timeValue) {
  if (timeValue != false) {
    var time = new Date(timeValue);

    // Extract hours, minutes, and seconds
    var hours = time.getHours();
    var minutes = time.getMinutes();
    var seconds = time.getSeconds();

    // Pad the minutes and seconds with leading zeros if necessary
    minutes = minutes < 10 ? '0' + minutes : minutes;
    seconds = seconds < 10 ? '0' + seconds : seconds;

    // Format the time as HH:MM:SS
    return formattedCheckInTime = hours + ':' + minutes + ':' + seconds;
  }
  else{
    return false;
  }
}

// Fetch all enrolled students
function getAllStudents() {
  var sheet = SpreadsheetApp.openById('1nuQf-qE9Zr9IJDfidnysI4iVaYjGjy_HETrkIcB3Vc8').getActiveSheet();
  var data = sheet.getDataRange().getValues();

  // Extract the student data (from rows 1 to 3)
  var studentData = [];
  var numberOfStudents = (data[0].length - 1) / 2;  // Each student has two columns (Check-in, Check-out)

  for (var i = 0; i < numberOfStudents; i++) {
    var name = data[0][i * 2 + 1];  // Student name
    var fingerprintID = data[1][i * 2 + 1];  // Fingerprint ID
    var totalPresent = data[2][i * 2 + 1];  // Total Present
    var totalTime = data[2][i * 2 + 2];  // Total Classroom Time

    studentData.push({
      name: name,
      fingerprintID: fingerprintID,
      totalPresent: totalPresent || 0,
      totalTime: totalTime || "0 hour 0 minute"
    });
  }

  // Create JSON response
  return ContentService.createTextOutput(JSON.stringify(studentData))
    .setMimeType(ContentService.MimeType.JSON);
}

// Fetch students present today with check-in and check-out times and total duration
function getPresentStudents() {
  var sheet = SpreadsheetApp.openById('1nuQf-qE9Zr9IJDfidnysI4iVaYjGjy_HETrkIcB3Vc8').getActiveSheet();
  var data = sheet.getDataRange().getValues();
  var lastRow = sheet.getLastRow();
  var lastColumn = sheet.getLastColumn();

  var today = new Date();
  var formattedToday = Utilities.formatDate(today, Session.getScriptTimeZone(), 'yyyy-MM-dd');

  var presentStudents = [];

  // Find today's row
  var dateRow = -1;
  for (var row = 3; row <= lastRow; row++) {
    var dateValue = sheet.getRange(row, 1).getValue();
    var formattedDateValue = Utilities.formatDate(new Date(dateValue), Session.getScriptTimeZone(), 'yyyy-MM-dd');

    if (formattedToday === formattedDateValue) {
      dateRow = row;
      break;
    }
  }

  if (dateRow === -1) {
    // No attendance data for today
    return ContentService.createTextOutput(JSON.stringify(presentStudents)).setMimeType(ContentService.MimeType.JSON);
  }

  var studentNames = data[0];
  var rollNumbers = data[1];

  for (var col = 2; col <= lastColumn; col += 2) {
    var checkInValue = sheet.getRange(dateRow, col).getValue();
    var checkOutValue = sheet.getRange(dateRow, col + 1).getValue();

    if (checkInValue) {
      var name = studentNames[col - 1].replace(' (Check-in)', '');

      // Calculate total time if both check-in and check-out times are present
      var totalTime = '';
      if (checkInValue && checkOutValue) {
        var checkInTime = new Date(checkInValue);
        var checkOutTime = new Date(checkOutValue);

        var timeDifference = checkOutTime - checkInTime;

        // Convert the time difference to hours and minutes
        var hours = Math.floor(timeDifference / (1000 * 60 * 60));
        var minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));

        totalTime = hours + " hour " + minutes + " minute";
      }

      presentStudents.push({
        "name": name,
        "checkIn": formatCheckTime(checkInValue),
        "checkOut": formatCheckTime(checkOutValue),
        "totalTime": totalTime
      });
    }
  }

  return ContentService.createTextOutput(JSON.stringify(presentStudents)).setMimeType(ContentService.MimeType.JSON);
}

// This function marks attendance and calculates classroom time
function markAttendance(rollNumber, actionType) {
  var sheet = SpreadsheetApp.openById('YOUR_SPREADSHEET_ID').getActiveSheet();
  var data = sheet.getDataRange().getValues();

  var lastColumn = sheet.getLastColumn();
  var rollNumbers = data[1];
  var studentNames = data[0];

  var today = new Date();
  var formattedToday = Utilities.formatDate(today, Session.getScriptTimeZone(), 'yyyy-MM-dd');

  var studentIndex = -1;
  for (var i = 0; i < rollNumbers.length; i++) {
    if (rollNumbers[i] == rollNumber) {
      studentIndex = i + 1;
      break;
    }
  }

  if (studentIndex == -1) {
    return ContentService.createTextOutput(JSON.stringify({ "status": "error", "message": "Student not found" }))
      .setMimeType(ContentService.MimeType.JSON);
  }

  // Find today's row or create it
  var lastRow = sheet.getLastRow();
  var dateRow = -1;

  for (var row = 3; row <= lastRow; row++) {
    var dateValue = sheet.getRange(row, 1).getValue();
    var formattedDateValue = Utilities.formatDate(new Date(dateValue), Session.getScriptTimeZone(), 'yyyy-MM-dd');

    if (formattedDateValue == formattedToday) {
      dateRow = row;
      break;
    }
  }

  if (dateRow == -1) {
    dateRow = lastRow + 1;
    sheet.getRange(dateRow, 1).setValue(formattedToday);
  }

  var checkInColumn = studentIndex;
  var checkOutColumn = studentIndex + 1; // Check-out is in the next column

  if (actionType === 'checkIn') {
    sheet.getRange(dateRow, checkInColumn).setValue(new Date());
  } else if (actionType === 'checkOut') {
    var checkInTime = sheet.getRange(dateRow, checkInColumn).getValue();
    if (!checkInTime) {
      return ContentService.createTextOutput(JSON.stringify({ "status": "error", "message": "Student did not check in" }))
        .setMimeType(ContentService.MimeType.JSON);
    }

    sheet.getRange(dateRow, checkOutColumn).setValue(new Date());

    var checkOutTime = new Date();
    var checkInDate = new Date(checkInTime);

    // Calculate time difference
    var timeDifference = (checkOutTime - checkInDate) / 1000; // Time difference in seconds
    var minutes = Math.floor(timeDifference / 60);
    var hours = Math.floor(minutes / 60);
    minutes = minutes % 60;

    var totalTime = hours + " hour(s) " + minutes + " minute(s)";

    // Update the 'Total Present' and 'Total Classroom Time' columns
    var totalPresentColumn = lastColumn + 1; // Define this column in your sheet
    var totalTimeColumn = lastColumn + 2; // Define this column in your sheet

    var currentPresentCount = sheet.getRange(2, totalPresentColumn).getValue() || 0;
    var currentTotalTime = sheet.getRange(2, totalTimeColumn).getValue() || 0;

    // Increment the 'Total Present' by 1
    sheet.getRange(2, totalPresentColumn).setValue(currentPresentCount + 1);

    // Update the 'Total Classroom Time' by adding the new time difference
    sheet.getRange(2, totalTimeColumn).setValue(currentTotalTime + timeDifference);

    return ContentService.createTextOutput(JSON.stringify({
      "status": "success",
      "name": studentNames[studentIndex - 1],
      "totalTime": totalTime
    })).setMimeType(ContentService.MimeType.JSON);
  }
}


