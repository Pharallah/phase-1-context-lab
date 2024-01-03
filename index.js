/* Your Code Here */

/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */



const createEmployeeRecord = function(arr) {
    return {
        firstName: arr[0],
        familyName: arr[1],
        title: arr[2],
        payPerHour: arr[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}

const createEmployeeRecords = function(arrOfArrs) {
    return arrOfArrs.map(createEmployeeRecord)
}

const createTimeInEvent = function(dateStamp) {
    const [date, hour] = dateStamp.split(' ')
    const time = parseInt(hour)

    const newTimeInEvent = {
        type: "TimeIn",
        hour: time,
        date: date,
    }

    this.timeInEvents.push(newTimeInEvent)
    return this;
}

const createTimeOutEvent = function(dateStamp) {
    const [date, hour] = dateStamp.split(' ')
    const time = parseInt(hour)

    const newTimeOutEvent = {
        type: "TimeOut",
        hour: time,
        date: date,
    }
    
    this.timeOutEvents.push(newTimeOutEvent)
    return this;
}

const hoursWorkedOnDate = function(date) {
    const timeInDate = this.timeInEvents.find(arr => arr.date === date)
    const timeOutDate = this.timeOutEvents.find(arr => arr.date === date)

    if (timeOutDate && timeInDate) {
       
        const totalHoursOnDate =  (timeOutDate.hour - timeInDate.hour) / 100
       
        return parseInt(totalHoursOnDate)
    }
    
}

const wagesEarnedOnDate = function(date) {
    const payRate = this.payPerHour;
    
    return hoursWorkedOnDate.call(this, date) * payRate
}

const allWagesFor = function () {
    const eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    const payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}

const findEmployeeByFirstName = function(srcArray, firstName) {
    const emp = srcArray.find(e => e.firstName === firstName)
    
    return emp
}

const calculatePayroll = function(arr) {
    const payRoll = arr.reduce((total, emp) => total + allWagesFor.call(emp), 0)

    return parseInt(payRoll)
}