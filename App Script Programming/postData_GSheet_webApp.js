//version: 123, 142, 144, 149, 154, 154

function doPost(e) {
    var action = e.parameter.action;

    if (action === 'enroll') {
        return enrollStudent(e.parameter.name, e.parameter.rollNumber);
    } else if (action === 'markAttendance') {
        return markAttendance(e.parameter.rollNumber, e.parameter.timeType);
    } else if (action === 'reset') {
        return deleteAllData();
    }
}

function deleteAllData() {
    var sheet = SpreadsheetApp.openById('1nuQf-qE9Zr9IJDfidnysI4iVaYjGjy_HETrkIcB3Vc8').getActiveSheet();

    var range = sheet.getRange(1, 2, 2, sheet.getLastColumn());
    range.clearContent();
    var range = sheet.getRange(3, 1, sheet.getLastRow(), sheet.getLastColumn());
    range.clearContent();

    var result = {
        "status": "Sheet data ",
        "name": "deleted",
    };

    return ContentService.createTextOutput(JSON.stringify(result)).setMimeType(ContentService.MimeType.JSON);
}


function enrollStudent(name, rollNumber) {
    var status = "";
    var sheet = SpreadsheetApp.openById('1nuQf-qE9Zr9IJDfidnysI4iVaYjGjy_HETrkIcB3Vc8').getActiveSheet();
    var lastColumn = sheet.getLastColumn() + 1; // Move to the next empty column

    // Set name, roll number, and headers for check-in and check-out
    sheet.getRange(1, lastColumn).setValue(name + " (Check-in) ");
    sheet.getRange(1, lastColumn + 1).setValue(name + " (Check-out) ");
    sheet.getRange(2, lastColumn, 1, 2).mergeAcross().setValue(rollNumber);
    sheet.autoResizeColumns(lastColumn, 2);
    sheet.getRange(3, lastColumn).setValue("0");
    sheet.getRange(3, lastColumn + 1).setValue("0 hour 0 min");

    status = "successfully";
    var result = {
        "status": status,
        "Name": name,
    };

    return ContentService.createTextOutput(JSON.stringify(result)).setMimeType(ContentService.MimeType.JSON);
}

function checkoutStudent(column, row) {
    //increase number of present
    var sheet = SpreadsheetApp.openById('1nuQf-qE9Zr9IJDfidnysI4iVaYjGjy_HETrkIcB3Vc8').getActiveSheet();
    var totalPresent = sheet.getRange(3, column).getValue();
    sheet.getRange(3, column).setValue(totalPresent + 1);

    //add time in total classroom classroom time
    var inTime = sheet.getRange(row, column).getValue();
    var outTime = sheet.getRange(row, column + 1).getValue();
    var inDate = new Date(Date.parse(inTime));
    var outDate = new Date(Date.parse(outTime));
    var timeDiffMilliseconds = outDate - inDate;

    //Get classroom time till now
    var classRoomTime = sheet.getRange(3, column + 1).getValue();
    var lastHour = 0;
    var lastMinute = 0;

    var hourMatch = classRoomTime.match(/(\d+)\s*hour/i);
    var minuteMatch = classRoomTime.match(/(\d+)\s*min/i);
    if (hourMatch) {
        lastHour = parseInt(hourMatch[1], 10);
    }
    if (minuteMatch) {
        lastMinute = parseInt(minuteMatch[1], 10);
    }
    var lastMilliseconds = (lastHour * 60 * 60 * 1000) + (lastMinute * 60 * 1000);


    // Convert the time difference to hours, minutes, and seconds
    var hours = Math.floor((timeDiffMilliseconds + lastMilliseconds) / (1000 * 60 * 60));
    var minutes = Math.floor(((timeDiffMilliseconds + lastMilliseconds) % (1000 * 60 * 60)) / (1000 * 60));

    // Format the time difference as a string
    var timeDiffString = hours + " hour " + minutes + " min ";
    sheet.getRange(3, column + 1).setValue(timeDiffString);
}

function formatDate(value) {
    var dateObj = new Date(value);
    const options = { weekday: 'long', day: 'numeric', month: 'short', year: 'numeric' };
    var formattedDate = dateObj.toLocaleDateString('en-US', options);
    return formattedDate;
}

function markAttendance(rollNumber, timeType) {
    var sheet = SpreadsheetApp.openById('1nuQf-qE9Zr9IJDfidnysI4iVaYjGjy_HETrkIcB3Vc8').getActiveSheet();
    var data = sheet.getRange(1, 1, 2, sheet.getLastColumn()).getValues(); // Get the first two rows
    var rollNumbers = data[1]; // Second row
    var studentNames = data[0]; // First row

    var formattedDate = formatDate(new Date());

    var lastRow = sheet.getLastRow();
    var dateColumn;
    for (var row = 3; row <= lastRow; row++) {
        if (formatDate(sheet.getRange(row, 1).getValue()) == formattedDate) {
            dateColumn = row;
            break;
        }
    }
    if (!dateColumn) {
        dateColumn = lastRow + 1;
        sheet.getRange(dateColumn, 1).setValue(formattedDate);
    }

    var status;
    var studentName = "Not found";
    for (var i = 0; i < rollNumbers.length; i++) {
        if (rollNumbers[i] == rollNumber) {
            studentName = studentNames[i];
            // Mark attendance
            var formattedTime = Utilities.formatDate(new Date(), Session.getScriptTimeZone(), 'HH:mm:ss');
            var columnIndex = i + 1; // Adjust column index for check-in/check-out
            if (timeType === "checkIn" && sheet.getRange(dateColumn, columnIndex).getValue() == "") {
                sheet.getRange(dateColumn, columnIndex).setValue(formattedTime);
                status = "Check IN";
            } else if (timeType === "checkOut" && sheet.getRange(dateColumn, columnIndex).getValue() != "" && sheet.getRange(dateColumn, columnIndex + 1).getValue() == "") {
                sheet.getRange(dateColumn, columnIndex + 1).setValue(formattedTime);
                studentName = studentNames[i + 1];
                status = "Check OUT";
                checkoutStudent(columnIndex, dateColumn);
            } else if (timeType === "checkIn" && sheet.getRange(dateColumn, columnIndex).getValue() != "") {
                status = "Already CheckIn";
            } else if (timeType === "checkOut" && sheet.getRange(dateColumn, columnIndex).getValue() == "") {
                status = "CheckIn first";
            } else if (timeType === "checkOut" && sheet.getRange(dateColumn, columnIndex).getValue() != "" && sheet.getRange(dateColumn, columnIndex + 1).getValue() != "") {
                status = "Already CheckOut";
            } else {
                status = "Try again";
            }
            break;
        }
    }

    var regex = /\(([^)]+)\)/;
    var match = studentName.match(regex);

    if (match) {
        studentName = studentName.replace(match[0], '').trim();
    } else {
        studentName = "Not found";
    }

    var result = {
        "name": studentName,
        "date format": formattedDate,
        "Status": status
    };

    return ContentService.createTextOutput(JSON.stringify(result)).setMimeType(ContentService.MimeType.JSON);
}
