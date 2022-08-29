const isEmptyContent = function (givenItem) {
  if (typeof givenItem === "string") {
    if (!givenItem) {
      //Logger.log('isEmptyContent - givenItem is empty[S]!!');
      return true;
    }
  } else if (givenItem === undefined) {
    //Logger.log('isEmptyContent - givenItem is undefined!!');
    return true;
  } else {
    if (givenItem.toString().length <= 0) {
      //Logger.log('isEmptyContent - givenItem is givenItem!!');
      return true;
    }
  }
  return false;
};

// [start] added by elite_lin - 2022/07/07
const convertStringIntoJsonObject = (givenString, tag) => {
  try {
    const theJsonObject = JSON.parse(givenString);
    // Logger.log('convertStringIntoJsonObject - given: [' + givenString + ']');
    // Logger.log(theJsonObject);
    return theJsonObject;
  } catch (error) {
    Logger.log("convertStringIntoJsonObject - error: [" + error + "] for [" + tag + "]");
    return undefined;
  }
};
// [end] added by elite_lin - 2022/07/07

// [start] added by elite_lin - 2022/07/07
const convertObjectIntoJsonString = (givenObject, tag) => {
  if (isEmptyContent(givenObject)) {
    return "";
  }
  try {
    const jsonString = JSON.stringify(givenObject);
    // Logger.log('convertObjectIntoJsonString - result: [' + jsonString + ']');
    // Logger.log(givenObject);
    return jsonString;
  } catch (error) {
    Logger.log("convertObjectIntoJsonString - error: [" + error + "] for [" + tag + "]");
  }
};
// [end] added by elite_lin - 2022/07/07

const isValidDateObject = (givenObject) => {
  const isDateObjStr = Object.prototype.toString.call(givenObject);
  //console.log("isDateObjStr: [" + isDateObjStr + "]");
  if (!(isDateObjStr === "[object Date]")) {
    console.log("givenObject is not a Date Object by [Object.prototype.toString.call] - [" + isDateObjStr + "]");
    return false;
  }
  //console.log("givenObject is a Date Object by [Object.prototype.toString.call]");

  if (!(givenObject instanceof Date)) {
    console.log("givenObject is not a Date Object by [instanceof]");
    return false;
  }
  //console.log("givenObject is a Date Object by [instanceof]");

  if (isNaN(givenObject)) {
    console.log("givenObject is an invalid Date Object by [isNaN]");
    return false;
  }
  //console.log("givenObject is a valid Date Object by [isNaN]");
  return true;
};

const getGivenDateString = (givenDate) => givenDate.toISOString().slice(0, 10);

// [start] added by elite_lin - 2022/07/08
const getGivenDateMonth = (givenDate, isForUtc) => {
  if (isForUtc) {
    return givenDate.getUTCMonth() < 9 ? "0" + (givenDate.getUTCMonth() + 1) : "" + (givenDate.getUTCMonth() + 1);
  } else {
    return givenDate.getMonth() < 9 ? "0" + (givenDate.getMonth() + 1) : "" + (givenDate.getMonth() + 1);
  }
};
// [end] added by elite_lin - 2022/07/08

// [start] added by elite_lin - 2022/07/08
const getGivenDateDay = (givenDate, isForUtc) => {
  if (isForUtc) {
    return givenDate.getUTCDate() < 10 ? "0" + givenDate.getUTCDate() : "" + givenDate.getUTCDate();
  } else {
    return givenDate.getDate() < 10 ? "0" + givenDate.getDate() : "" + givenDate.getDate();
  }
};
// [end] added by elite_lin - 2022/07/08

// [start] added by elite_lin - 2022/06/27, revision in 2022/07/08
const givenDateToDateString = (givenDate, isForUtc, givenSpliter) => {
  const spliter = isEmptyContent(givenSpliter) ? "-" : givenSpliter;
  const theMonth = getGivenDateMonth(givenDate, isForUtc);
  const theDate = getGivenDateDay(givenDate, isForUtc);
  let dateString = "";
  if (isForUtc) {
    dateString = givenDate.getUTCFullYear() + spliter + theMonth + spliter + theDate;
  } else {
    dateString = givenDate.getFullYear() + spliter + theMonth + spliter + theDate;
  }
  //console.log('givenDateToDateString: [' + dateString + '], isForUtc: [' + isForUtc + ']');
  return dateString;
};
// [end] added by elite_lin - 2022/06/27, revision in 2022/07/08

// [start] added by elite_lin - 2022/06/24
const getNumberMonthsAgoDate = (givenDate, numberOfMonths) => {
  const cloneDate = new Date(givenDate);
  // console.log('getNumberMonthsAgoDate [before]: [' + cloneDate + ']');
  // console.log('getNumberMonthsAgoDate [before]: [' + getGivenDateString(cloneDate) + ']');
  const timeDifferenceInMonths = cloneDate.getMonth() + numberOfMonths;
  // console.log('getNumberMonthsAgoDate [timeDifferenceInMonths]: [' + timeDifferenceInMonths + ']');
  cloneDate.setMonth(timeDifferenceInMonths); 
  //console.log('getNumberMonthsAgoDate [after]: [' + cloneDate + ']');
  //console.log('getNumberMonthsAgoDate [after]: [' + getGivenDateString(cloneDate) + ']');
  return cloneDate;
};
// [end] added by elite_lin - 2022/06/24

///

// [start] added by elite_lin - 2022/06/27
const areStartDateAndEndDateWithinTheSameMonth = function(startDate, endDate) {
  const startMonth = getGivenDateMonth(startDate, false);
  const startYearMonth = startDate.getUTCFullYear() + '_' + startMonth;
  const endMonth = getGivenDateMonth(endDate, false);
  const endYearMonth = endDate.getUTCFullYear() + '_' + endMonth;
  const isWithinTheSameMonth = (startYearMonth == endYearMonth);
  //Logger.log('startYearMonth: [' + startYearMonth + '], endYearMonth: [' + endYearMonth + '], isWithinTheSameMonth: [' + isWithinTheSameMonth + ']');
  return response = {
    isWithinTheSameMonth: isWithinTheSameMonth,
    startYearMonth: startYearMonth,
  };
};
// [end] added by elite_lin - 2022/06/27
