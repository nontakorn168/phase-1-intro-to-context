function createEmployeeRecord(arr) {
    return {
        firstName: arr[0],
        familyName: arr[1],
        title: arr[2],
        payPerHour: arr[3],
        timeInEvents: [],
        timeOutEvents: []
    };
}
function createEmployeeRecords(arrays) {
    return arrays.map(createEmployeeRecord);
}
function createTimeInEvent(employee, timestamp) {
    const [date, hour] = timestamp.split(" ");
    employee.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour),
        date: date
    });
    return employee;
}
function createTimeOutEvent(employee, timestamp) {
    const [date, hour] = timestamp.split(" ");
    employee.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour),
        date: date
    });
    return employee;
}
function hoursWorkedOnDate(employee, date) {
    const timeIn = employee.timeInEvents.find(event => event.date === date);
    const timeOut = employee.timeOutEvents.find(event => event.date === date);
    return (timeOut.hour - timeIn.hour) / 100;
}
function wagesEarnedOnDate(employee, date) {
    const hoursWorked = hoursWorkedOnDate(employee, date);
    return hoursWorked * employee.payPerHour;
}
function allWagesFor(employee) {
    return employee.timeInEvents.reduce((total, event) => {
        return total + wagesEarnedOnDate(employee, event.date);
    }, 0);
}
function calculatePayroll(employees) {
    return employees.reduce((totalPayroll, employee) => {
        return totalPayroll + allWagesFor(employee);
    }, 0);
}
function hoursWorkedOnDate(employee, date) {
    const timeIn = employee.timeInEvents.find(event => event.date === date);
    const timeOut = employee.timeOutEvents.find(event => event.date === date);
    
    if (!timeIn || !timeOut) {
        throw new Error(`Missing TimeIn or TimeOut event for date: ${date}`);
    }
    
    return (timeOut.hour - timeIn.hour) / 100;
}
function hoursWorkedOnDate(employee, date) {
    const timeIn = employee.timeInEvents.find(event => event.date === date);
    const timeOut = employee.timeOutEvents.find(event => event.date === date);
    
    if (!timeIn || !timeOut) {
        throw new Error(`Missing TimeIn or TimeOut event for date: ${date}`);
    }

    const timeInDate = new Date(`${timeIn.date} ${String(timeIn.hour).padStart(4, '0').slice(0, 2)}:${String(timeIn.hour).padStart(4, '0').slice(2, 4)}`);
    const timeOutDate = new Date(`${timeOut.date} ${String(timeOut.hour).padStart(4, '0').slice(0, 2)}:${String(timeOut.hour).padStart(4, '0').slice(2, 4)}`);
    
    const diffMilliseconds = timeOutDate - timeInDate;
    return diffMilliseconds / (1000 * 60 * 60); // Convert milliseconds to hours
}
function isValidTimestamp(timestamp) {
    const regex = /^\d{4}-\d{2}-\d{2} \d{4}$/;
    return regex.test(timestamp);
}

function createTimeInEvent(employee, timestamp) {
    if (!isValidTimestamp(timestamp)) {
        throw new Error(`Invalid timestamp: ${timestamp}`);
    }
    const [date, hour] = timestamp.split(" ");
    employee.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour),
        date: date
    });
    return employee;
}

function createTimeOutEvent(employee, timestamp) {
    if (!isValidTimestamp(timestamp)) {
        throw new Error(`Invalid timestamp: ${timestamp}`);
    }
    const [date, hour] = timestamp.split(" ");
    employee.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour),
        date: date
    });
    return employee;
}
