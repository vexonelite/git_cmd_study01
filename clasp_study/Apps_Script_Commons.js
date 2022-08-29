//INCLUDE JAVASCRIPT AND CSS FILES
function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename).getContent();
}

// [start] added by elite_lin - 2022/07/27
const SHEET_TAB_DEFINITIONS = {
  uTimeSheet:         "UTime",
  allSheet:           "ALL",  
  soAllSheet:         "SO_ALL",
  yxAllSheet:         "YX_ALL",
};
// [end] added by elite_lin - 2022/07/27

// [start] revision by elite_lin - 2022/06/23, 24, 28, 29
const keyValueDefinitions = {
  data:                 "data",
  json:                 "json",
  jsonOne:              "json1",
  jsonTwo:              "json2",
  jsonThree:            "json3",
  jsonFour:             "json4",
  jsonFive:             "json5",
  result:               "result",
  error:                "error",
  isReady:              "isReady",
  sheetsAreReady:       "Y",
  sheetsNotReady:       "N",
  search_enum:          "search_enum",
  item:                 "item",

  keyword:              "keyword",

  year_and_month:       "year_and_month",
  so_num_yx_num_info:   "so_num_yx_num_info",

  so_num_yx_num:        "so_num_yx_num",
  sa_data:              "sa_data",
  sa_num:               "sa_num",
  date:                 "date",
  updated_at:           "updated_at",
  sync_at:              "sync_at",
  //yearMonth:            'yearMonth',
  //soYxNumberInfo:       'soYxNumberInfo',

  soYxNumber:           "soYxNumber",
  startDate:            "startDate",
  endDate:              "endDate",

  titleArray:           "titleArray",
  bodyRowsArray:        "bodyRowsArray",
  emptyResult:          "emptyResult",
  jsonObj:              "jsonObj",
  singleRow:            "singleRow",
};
// [end] revision by elite_lin - 2022/06/23, 24, 28, 29

// rename by elite_lin - 2022/06/23
const statusCodeTable = {
  success:                  "00000",
  unknown:                  "99999",
  sheet_unavailable:        "99998",
  rowDataSet_unavailable:   "99997",
  rowDataSet_empty:         "99996",
  rowDataSet_title_only:    "99995",
};

const brandDict = {
  business_promotion:   'BUSINESS PROMOTION',
  lighting_warranty:    'LIGHTING WARRANTY',
  nre_charge_l:         'NRE CHARGE - L',
  rental_income_l:      'RENTAL INCOME - L',
  restocking_fees_l:    'RESTOCKING FEES - L',
  royalty_lighting:     'ROYALTY - LIGHTING',
  sales_cielux:         'SALES - CIELUX',
  sales_fiber_lamp:     'SALES - FIBER LAMP',
  sales_fiilex:         'SALES - FIILEX',
  sales_kessil_a:       'SALES - KESSIL-A',
  sales_kessil_h:       'SALES - KESSIL-H',
  sales_kessil_p:       'SALES - KESSIL-P',
  sales_scopeled:       'SALES - SCOPELED',
  sales_discounts_l:    'SALES DISCOUNTS - L',
  sales_returns_l:      'SALES RETURNS - L',
  sales_tax:            'SALES TAX',
  service_charges_l:    'SERVICE CHARGES - L',
  shipping_charges_l:   'SHIPPING CHARGES - L',
};

const formParamKeyDict = {
  yx_number_checkbox:         'yx_number_checkbox',
  opened_option_checkbox:     'opened_option_checkbox',
  lighting_sheet_id:          'lighting_sheet_id',
  lighting_json_file_id:      'lighting_json_file_id',
  lighting_json_filename:     'lighting_json_filename',
  so_number_checkbox:         'so_number_checkbox',
  so_number:                  'so_number',
  model_number_checkbox:      'model_number_checkbox',
  model_number:               'model_number',
  doc_type_checkbox:          'doc_type_checkbox',
  doc_type_select:            'doc_type_select',
  status_checkbox:            'status_checkbox',
  status_select:              'status_select',
  shipping_box_checkbox:      'shipping_box_checkbox',
  shipping_box_select:        'shipping_box_select',
  file_Location_checkbox:     'file_Location_checkbox',
  file_Location_select:       'file_Location_select',
  brand_checkbox:             'brand_checkbox',
  brand_select:               'brand_select',
  shipping_status_checkbox:   'shipping_status_checkbox',
  shipping_status_select:     'shipping_status_select',
  ck_status_checkbox:         'ck_status_checkbox',
  ck_status_select:           'ck_status_select',
  date_option:                'date_option',
  start_date:                 'start_date',
  end_date:                   'end_date',
  // [start] history
  invoice_number_checkbox:    'invoice_number_checkbox',
  invoice_number:             'invoice_number',
  customer_name_checkbox:     'customer_name_checkbox',
  customer_name:              'customer_name',
  // [end] history
};

const formParamDict = {
  yes:        'yes',
  no:         'no',
  approved:   'yes',
  approving:  'no',
  all:        'all',
  drop_ship:  'drop_ship',
};

const docTypeDict = {
  drop_ship:      'Drop Ship',
  direct_sales:   'Direct Sales',
};

// [start] added by elite_lin - 2022/06/23
const searchEnum = {
  default:                  0,
  so_yx_num:                1,
  duration:                 2,
  so_yx_num_with_duration:  3,
};
// [end] revision by elite_lin - 2022/06/23

///

// [start] revision by elite_lin - 2022/06/23
function getEmptyResult(isReady) {
  // const resultArray = [];
  // return JSON.stringify(resultArray);
  const response = {};
  response[keyValueDefinitions.data] = [];
  if (isReady) {
    response[keyValueDefinitions.isReady] = keyValueDefinitions.sheetsAreReady;
  } else {
    response[keyValueDefinitions.isReady] = keyValueDefinitions.sheetsNotReady;
  }
  return JSON.stringify(response);
}
// [end] revision by elite_lin - 2022/06/23

// [start] added by elite_lin - 2022/06/28
const convertObjectArrayIntoJsonString = function(objectArray) {
  //Logger.log('convertObjectArrayIntoJsonString');
  const startDate = new Date();

  const response = {};
  response[keyValueDefinitions.data] = objectArray;
  response[keyValueDefinitions.isReady] = keyValueDefinitions.sheetsAreReady;
  const jsonArrayToString = convertObjectIntoJsonString(response, 'convertObjectArrayIntoJsonString');

  const endDate = new Date();
  const diffMs = (endDate - startDate); // milliseconds between now & Christmas
  Logger.log('convertObjectArrayIntoJsonString - time: [' + diffMs + '] ms');
  
  return jsonArrayToString;
};
// [end] added by elite_lin - 2022/06/28

///

// [start] revision by elite_lin - 2022/06/23
function getRowDataSetBySheetName(spreadsheet, sheetName) {
  const response = {};
  const sheet = spreadsheet.getSheetByName(sheetName);
  if (!sheet) {
    Logger.log("getRowDataSetBySheetName - sheet is unavailable!!");
    response[keyValueDefinitions.data] = undefined;
    response[keyValueDefinitions.error] = statusCodeTable.sheet_unavailable;
    return response;
  }
  //Logger.log('getRowDataSetBySheetName - sheets is: ' + (typeof sheet)); // Object

  const rowDataSet = sheet
    .getRange(1, 1, sheet.getLastRow(), sheet.getLastColumn())
    .getValues();
  //const rowDataSet = sheet.getRange(1, 1, 11, sheet.getLastColumn()).getValues();
  if (!rowDataSet) {
    Logger.log("getRowDataSetBySheetName - rowDataSet is unavailable!! for [" + sheetName + "]");
    response[keyValueDefinitions.data] = undefined;
    response[keyValueDefinitions.error] = statusCodeTable.rowDataSet_unavailable;
    return response;
  }
  //Logger.log('getRowDataSetBySheetName - rowDataSet is: ' + (typeof rowDataSet)); // Object
  Logger.log("getRowDataSetBySheetName - rowDataSet length: [" + rowDataSet.length + "] for [" + sheetName + "]"); // Object
  if (rowDataSet.length == 0) {
    Logger.log("getRowDataSetBySheetName - rowDataSet is empty!! for [" + sheetName + "]");
    response[keyValueDefinitions.data] = undefined;
    response[keyValueDefinitions.error] = statusCodeTable.rowDataSet_empty;
    return response;
  }
  if (rowDataSet.length == 1) {
    Logger.log("getRowDataSetBySheetName - rowDataSet contains only titles!! for [" + sheetName + "]");
    response[keyValueDefinitions.data] = undefined;
    response[keyValueDefinitions.error] = statusCodeTable.rowDataSet_title_only;
    return response;
  }
  //Logger.log('getRowDataSetBySheetName - rowDataSet[0] is: ' + (typeof rowDataSet[0])); // Object

  response[keyValueDefinitions.data] = rowDataSet;
  response[keyValueDefinitions.error] = statusCodeTable.success;
  return response;
}
// [end] revision by elite_lin - 2022/06/23

function sheetRowDataSetToArrayObject(rowDataSet) {
  const titleArray = [];
  const bodyRowsArray = [];

  if (rowDataSet) {
    const rawTitleRow = rowDataSet[0].map(String);
    const rawBodyRows = rowDataSet.slice(1);

    rawTitleRow.forEach(function (title) {
      //Logger.log('sheetRowDataSetToArrayObject - [' + title + ']' );
      titleArray.push(title);
    });

    // rowItem indicates a row of data
    // row_index indicates the index in the body (array)
    rawBodyRows.forEach(function (rowItem, row_index) {
      //Logger.log('sheetRowDataSetToArrayObject - (' + rowItem + ', ' + row_index + ')');
      bodyRowsArray.push(rowItem);
    });
    //Logger.log('sheetRowDataSetToArrayObject - bodyRowsArray: ' + (typeof bodyRowsArray));
    //Logger.log('sheetRowDataSetToArrayObject - bodyRowsArray.size: [' + bodyRowsArray.length + ']' );
  }

  const response = {};
  response[keyValueDefinitions.titleArray] = titleArray;
  response[keyValueDefinitions.bodyRowsArray] = bodyRowsArray;
  return response;
}

///

// [start] added by elite_lin - 2022/06/24, revision in 2022/06/27
function verifyLoadedRowDataSetResponses(rowDataSetResponseList) {
  //Logger.log('verifyLoadedRowDataSetResponses - rowDataSetResponseList size: [' + rowDataSetResponseList.length + ']');
  const titleArray = [];
  const bodyRowsArray = [];
  const response = {};
  for (let i = 0; i < rowDataSetResponseList.length; i++) {
    const rowDataSetResponse = rowDataSetResponseList[i];
    const yearMonth = rowDataSetResponse[keyValueDefinitions.year_and_month];
    
    if (  (rowDataSetResponse[keyValueDefinitions.error] == statusCodeTable.rowDataSet_title_only) || 
          (rowDataSetResponse[keyValueDefinitions.error] == statusCodeTable.rowDataSet_empty) ) {
      Logger.log('verifyLoadedRowDataSetResponses: statusCodeTable == title_only or empty for [' + yearMonth + ']!!');
      response[keyValueDefinitions.emptyResult] = getEmptyResult(false);
      return response;
    }

    if (rowDataSetResponse[keyValueDefinitions.error] != statusCodeTable.success) {
      Logger.log('verifyLoadedRowDataSetResponses: statusCodeTable != success for [' + yearMonth + ']!!');
      response[keyValueDefinitions.emptyResult] = getEmptyResult(true);
      return response;
    }

    //cannot use push to extend the existing array!!
    const jsArrayObject = sheetRowDataSetToArrayObject(rowDataSetResponse[keyValueDefinitions.data]);
    if (titleArray.length == 0) {
      titleArray.push(...jsArrayObject.titleArray);
      //Logger.log('verifyLoadedRowDataSetResponses - update titleArray: [' + titleArray.length + '] for [' + yearMonth + ']!!');
    }
    bodyRowsArray.push(...jsArrayObject.bodyRowsArray);
    //Logger.log('verifyLoadedRowDataSetResponses - bodyRowsArray: [' + bodyRowsArray.length + '] for [' + yearMonth + ']!!');
  }
  
  const rowDataSetResponseListForEach = function(rowDataSetResponse, rowIndex) {
    // Logger.log(rowDataSetResponse[keyValueDefinitions.year_and_month]);
    // Logger.log(rowDataSetResponse[keyValueDefinitions.error]);
    // Logger.log(rowDataSetResponse[keyValueDefinitions.data].length);
    const yearMonth = rowDataSetResponse[keyValueDefinitions.year_and_month];
    if (  (rowDataSetResponse[keyValueDefinitions.error] == statusCodeTable.rowDataSet_title_only) || 
          (rowDataSetResponse[keyValueDefinitions.error] == statusCodeTable.rowDataSet_empty) ) {
      Logger.log('verifyLoadedRowDataSetResponses: statusCodeTable == title_only or empty for [' + yearMonth + ']!!');
      return arrayObject = {
        emptyResult: getEmptyResult(false),
      };
    }
    if (rowDataSetResponse[keyValueDefinitions.error] != statusCodeTable.success) {
      Logger.log('verifyLoadedRowDataSetResponses: statusCodeTable != success for [' + yearMonth + ']!!');
      return arrayObject = {
        emptyResult: getEmptyResult(true),
      };
    }
    //cannot use push to extend the existing array!!
    const jsArrayObject = sheetRowDataSetToArrayObject(rowDataSetResponse[keyValueDefinitions.data]);
    if (titleArray.length == 0) {
      titleArray.push(...jsArrayObject.titleArray);
      //Logger.log('verifyLoadedRowDataSetResponses - update titleArray: [' + titleArray.length + '] for [' + yearMonth + ']!!');
    }
    bodyRowsArray.push(...jsArrayObject.bodyRowsArray);
    //Logger.log('verifyLoadedRowDataSetResponses - bodyRowsArray: [' + bodyRowsArray.length + '] for [' + yearMonth + ']!!');
  };
  //rowDataSetResponseList.forEach(rowDataSetResponseListForEach);
  //Logger.log('verifyLoadedRowDataSetResponses - success!!');
  
  // const titleArrayForEach = function(title, rowIndex) {
  //   Logger.log('verifyLoadedRowDataSetResponses - title: [' + title + ']');
  // }
  // titleArray.forEach(titleArrayForEach);

  response[keyValueDefinitions.titleArray] = titleArray;
  response[keyValueDefinitions.bodyRowsArray] = bodyRowsArray;
  return response;
}
// [end] added by elite_lin - 2022/06/24, revision in 2022/06/27

// [start] added by elite_lin - 2022/06/24
const lookupKeyValueArrayForEach = function(lookupItem, rowIndex) {
  Logger.log(lookupItem[keyValueDefinitions.year_and_month]);
  Logger.log(lookupItem[keyValueDefinitions.so_num_yx_num_info]);
};
// [end] added by elite_lin - 2022/06/24
///

const parseDateField = (rawRowData, title, titleIndex) => {
  const isEmptyRawRowData = isEmptyContent(rawRowData);
  if (isEmptyRawRowData) {
    return rawRowData;
  }

  if (isValidDateObject(rawRowData)) {
    const dateString = Utilities.formatDate(rawRowData, "Etc/GMT", "yyyy/MM/dd");
    return dateString;
  }

  const dateObj = new Date(rawRowData);
  if (isValidDateObject(dateObj)) {
    //const dateString = dateObj.toLocaleDateString('en-CA');
    const dateString = Utilities.formatDate(dateObj, "Etc/GMT", "yyyy/MM/dd");
    return dateString;
  }

  Logger.log("parseDateField - [" + title + "]: [" + rawRowData + "] at index: [" + titleIndex + "]");
  return rawRowData;
};

///

// involve bind() to provide ``this`` before involve the function!!
const singleRowToJsonObj = function (title, titleIndex) {
  //Logger.log('[' + title + ']: [' + this.singleRow[titleIndex] + '], ' + titleIndex );
  // here rawRowData is an Object rather than a string!!
  //const rawRowData = this.singleRow[titleIndex];
  const rawRowData = this[keyValueDefinitions.singleRow][titleIndex];
  //if (title.endsWith("date") && rawRowData && rawRowData.length > 0) {
  if (title.endsWith(keyValueDefinitions.date)) {
    const dateString = parseDateField(rawRowData, title, titleIndex);
    this.jsonObj[title] = dateString;
  } else if (title != keyValueDefinitions.updated_at) {
    this.jsonObj[title] = rawRowData;
  }
};

const singleRowToJsonMapper = function(singleRow, rowIndex) {
  //Logger.log('singleRowToJsonMapper: - (' + singleRow + ', ' + rowIndex + ')' );
  const jsonObj = {};
  const singleRowToJsonObjThis = {};
  singleRowToJsonObjThis[keyValueDefinitions.jsonObj] = jsonObj;
  singleRowToJsonObjThis[keyValueDefinitions.singleRow] = singleRow;
  const singleRowToJsonObjX = singleRowToJsonObj.bind(singleRowToJsonObjThis);
  this.titleArray.forEach(singleRowToJsonObjX);
  //printJsonObject(jsonObj);
  return jsonObj;
};

///

// rename by elite_lin - 2022/06/24
function bodyRowsArrayToKeyValueArray(titleArray, bodyRowsArray) {
  const singleRowToJsonMapperThis = {};
  singleRowToJsonMapperThis[keyValueDefinitions.titleArray] = titleArray;
  const singleRowToJsonMapperX = singleRowToJsonMapper.bind(singleRowToJsonMapperThis);
  return bodyRowsArray.map(singleRowToJsonMapperX);
}

// rename by elite_lin - 2022/06/24
function rowDataSetToKeyValueArray(rowDataSet) {
  const arrayObject = sheetRowDataSetToArrayObject(rowDataSet);
  const jsonArray = bodyRowsArrayToKeyValueArray(arrayObject[keyValueDefinitions.titleArray], arrayObject[keyValueDefinitions.bodyRowsArray]);
  return jsonArray;
}

///

// [start] added by elite_lin - 2022/06/16
// Remark*
function bodyRowsArrayToJsonObjectArray(titleArray, bodyRowsArray) {
  //Logger.log('[bodyRowsArrayToJsonObjectArray - start] ---------------------------------------------------------------');
  const resultArray = [];

  const singleRowToJsonForEach = (singleRow, rowIndex) => {
    //Logger.log('singleRowToJsonForEach: - (' + singleRow + ', ' + rowIndex + ')' );
    // const singleRowToJsonMapperThis = {
    //   titleArray: titleArray
    // };
    const singleRowToJsonMapperThis = {};
    singleRowToJsonMapperThis[keyValueDefinitions.titleArray] = titleArray;
    const singleRowToJsonMapperX = singleRowToJsonMapper.bind(singleRowToJsonMapperThis);
    const jsonObj = singleRowToJsonMapperX(singleRow);
    //Logger.log(jsonObj);
    const so_num = jsonObj[keyValueDefinitions.so_num_yx_num];
    //Logger.log(so_num);
    
    // ******** function `getSoJsonStringFromRowObject()` must be implemented elsewhere !!
    const soJsonString = getSoJsonStringFromRowObject(jsonObj);
    const soJson = convertStringIntoJsonObject(soJsonString, so_num);
    if (soJson) {
      //Logger.log(soJson);
      //Logger.log(soJsonString);
      resultArray.push(soJson);
    }
  };

  bodyRowsArray.forEach(singleRowToJsonForEach);
  //Logger.log('[bodyRowsArrayToJsonObjectArray - end]   ---------------------------------------------------------------');
  return resultArray;
}
// [end] added by elite_lin - 2022/06/16

///

function getDurationCondition(formObject, conditionObj) {
  if (!(formParamKeyDict.start_date in formObject)) {
    Logger.log('getDurationCondition - start_date: [' + formParamKeyDict.start_date + '] not in formObject!!');
    return;
  }
  if (!(formParamKeyDict.end_date in formObject)) {
    Logger.log('getDurationCondition - end_date: [' + formParamKeyDict.end_date + '] not in formObject!!');
    return;
  }
  
  const inputStartDateStr = formObject[formParamKeyDict.start_date];
  //Logger.log('getDurationCondition - inputStartDateStr: [' + inputStartDateStr + ']');
  if (!inputStartDateStr) {
    Logger.log('getDurationCondition - getDurationCondition is unavailable for [' + formParamKeyDict.start_date + ']');
    return;
  }
  const inputEndDateStr = formObject[formParamKeyDict.end_date];
  //Logger.log('getDurationCondition - inputEndDateStr: [' + inputEndDateStr + ']');
  if (!inputEndDateStr) {
    Logger.log('getDurationCondition - getDurationCondition is unavailable for [' + formParamKeyDict.end_date + ']');
    return;
  }
    
  // [start] revision by elite_lin - 2022/06/28, 2022/07/08
  let startDate = new Date(inputStartDateStr);
  let endDate = new Date(inputEndDateStr);
  // Logger.log('getDurationCondition - startDate 1: [' + startDate + '], inputStartDateStr: [' + inputStartDateStr + ']');
  // Logger.log('getDurationCondition - endDate 1: [' + endDate + '], inputEndDateStr: [' + inputEndDateStr + ']');
  const startDateString = givenDateToDateString(startDate, false);
  const endDateString = givenDateToDateString(endDate, false);
  startDate = new Date(startDateString);
  endDate = new Date(endDateString);
  // Logger.log('getDurationCondition - startDate 2: [' + startDate + '], startDateString: [' + startDateString + ']');
  // Logger.log('getDurationCondition - endDate 2: [' + endDate + '], endDateString: [' + endDateString + ']');
  // [end] revision by elite_lin - 2022/06/28, 2022/07/08
    
  if (!(formParamKeyDict.date_option in formObject)) {
    Logger.log('getDurationCondition - optionEnableKey: [' + formParamKeyDict.date_option + '] not in formObject!!');
    return;
  }
  const optionEnabled = formObject[formParamKeyDict.date_option];
  //Logger.log('getDurationCondition - optionEnabled: [' + optionEnabled + ']');
  if (!optionEnabled) {
    Logger.log('getDurationCondition - ignore [' + formParamKeyDict.date_option + ']');
    return;
  }
    
  // [start] revision by elite_lin - 2022/06/28
  if (startDate <= endDate) {
    conditionObj[formParamKeyDict.start_date] = startDateString;
    conditionObj[formParamKeyDict.end_date] = endDateString;
    conditionObj[keyValueDefinitions.startDate] = startDate;
    conditionObj[keyValueDefinitions.endDate] = endDate;
  }
  else {
    conditionObj[formParamKeyDict.start_date] = endDateString;
    conditionObj[formParamKeyDict.end_date] = startDateString;
    conditionObj[keyValueDefinitions.startDate] = endDate;
    conditionObj[keyValueDefinitions.endDate] = startDate;
  }
  conditionObj[formParamKeyDict.date_option] = true;
  // [end] revision by elite_lin - 2022/06/28
}

function getConditionItem(formObject, optionEnableKey, optionKey, conditionObj) {
  if (!(optionEnableKey in formObject)) {
    Logger.log('getConditionItem - optionEnableKey: [' + optionEnableKey + '] not in formObject!!');
    return;
  }

  const optionEnabled = formObject[optionEnableKey];
  //Logger.log('getConditionItem - optionEnabled: [' + optionEnabled + ']');
  if (!optionEnabled) {
    Logger.log('getConditionItem - ignore [' + optionEnableKey + ']');
    return;
  }
  const optionValue = formObject[optionKey];
  //Logger.log('getConditionItem - optionValue: [' + optionValue + ']');
  if (!optionValue) {
    Logger.log('getConditionItem - optionValue is unavailable for [' + optionKey + ']');
    return;
  }
  //Logger.log('getConditionItem - typeof: ' + (typeof optionValue));
  conditionObj[optionKey] = optionValue;
}

// [start] added by elite_lin - 2022/06/24
function decideSearchEnum(conditionObj) {
  let startDateIsValid = false;
  if (keyValueDefinitions.startDate in conditionObj) {
    startDateIsValid = isValidDateObject(conditionObj[keyValueDefinitions.startDate]);
  }
  //Logger.log('decideSearchEnum - startDate is Valid? ' + startDateIsValid);
  
  let endDateIsValid = false;
  if (keyValueDefinitions.endDate in conditionObj) {
    endDateIsValid = isValidDateObject(conditionObj[keyValueDefinitions.endDate]);
  }
  //Logger.log('decideSearchEnum - endtDate is Valid? ' + endDateIsValid);
  
  const durationIsValid = startDateIsValid & endDateIsValid;
  const soNnumber = conditionObj[formParamKeyDict.so_number];
  const soNnumberIsValid = (!isEmptyContent(soNnumber));
  //Logger.log('decideSearchEnum - soNnumber is Valid? ' + soNnumberIsValid);
  
  if (soNnumberIsValid & durationIsValid) {
    conditionObj[keyValueDefinitions.search_enum] = searchEnum.so_yx_num_with_duration
  }
  else if (soNnumberIsValid & (!durationIsValid)) {
    conditionObj[keyValueDefinitions.search_enum] = searchEnum.so_yx_num;
  }
  else if ((!soNnumberIsValid) & durationIsValid) {
    conditionObj[keyValueDefinitions.search_enum] = searchEnum.duration;
  }
  else {
    conditionObj[keyValueDefinitions.search_enum] = searchEnum.default;
  }
}
// [end] added by elite_lin - 2022/06/24

///

function singleItemConditionFilter(theKeyword, thePhrase) {
  if (theKeyword === undefined) {
    Logger.log('singleItemConditionFilter - theKeyword is undefined!!');
    return true;
  }
  if (thePhrase === undefined) {
    Logger.log('singleItemConditionFilter - thePhrase is undefined!!');
    return false;
  }
  const keywordStr = encodeURI(theKeyword.trim()).toUpperCase();
  const phraseStr = encodeURI(thePhrase.toString().trim()).toUpperCase();
  const regExp = new RegExp(keywordStr);
  const searchResult = phraseStr.search(regExp);
  //Logger.log('singleItemConditionFilter - keywordStr: [' + keywordStr + '], phraseStr: [' + phraseStr + '], searchResult: [' + searchResult + ']');
  return (searchResult != -1);
}

function singleItemDurationFilter(docDateStr, startDate, endDate) {
  if (!startDate) {
    //Logger.log('singleItemDurationFilter - startDate is unavailable!!');
    return true;
  }
  if (!endDate) {
    //Logger.log('singleItemDurationFilter - endDate is unavailable!!');
    return true;
  }
  try {
    const docDate = new Date(docDateStr);
    const result = docDate >= startDate && docDate <= endDate;
    //Logger.log('rowDataConditionFilter - docDateStr: [' + docDateStr + '] docDate: [' + docDate + '], startDate: [' + startDate + '], endDate: [' + endDate + '], result: [' + result + ']');
    return result;
  }
  catch(error) {
    Logger.log('error on singleItemDurationFilter: [' + error + ']');
    return false;
  }
}

// [start] added by elite_lin - 2022/07/13
function singleItemStatusFilter(theKeyword, thePhrase) {
  //Logger.log('singleItemStatusFilter - theKeyword: [' + theKeyword + '], thePhrase: [' + thePhrase + ']');
  if (theKeyword === undefined) {
    //Logger.log('singleItemStatusFilter - theKeyword is unavailable!!');
    return true;
  }
  if (theKeyword == formParamDict.all) {
    //Logger.log('singleItemStatusFilter: [all]');
    return true;
  }
  if (theKeyword == formParamDict.no) {
    const result = isEmptyContent(thePhrase);
    //Logger.log('singleItemStatusFilter: [no], result: [' + result + ']');
    return result;
  }
  if (theKeyword == formParamDict.yes) {
    const result = singleItemConditionFilter('y', thePhrase);
    //Logger.log('singleItemStatusFilter: [yes], result: [' + result + ']');
    return result;
  }
}
// [end] added by elite_lin - 2022/07/13

function singleItemFileLocationFilter(theKeyword, thePhrase) {
  //Logger.log('singleItemFileLocationFilter - theKeyword: [' + theKeyword + '], thePhrase: [' + thePhrase + ']');
  if (theKeyword === undefined) {
    //Logger.log('singleItemFileLocationFilter - theKeyword is unavailable!!');
    return true;
  }
  const isEmptyResult = isEmptyContent(thePhrase);
  if (theKeyword == formParamDict.no) {
    //Logger.log('singleItemFileLocationFilter: [no], result: [' + isEmptyResult + ']');
    return isEmptyResult;
  }
  if (theKeyword == formParamDict.yes) {
    //Logger.log('singleItemFileLocationFilter: [yes], result: [' + (!isEmptyResult) + ']');
    return !isEmptyResult;
  }
}

///

// [start] added by elite_lin - 2022/06/24
// Deprecated - 2022/07/27
const soYxLookupItemNumberFilter = function(lookupItem, rowIndex) {
  //Logger.log(lookupItem[keyValueDefinitions.year_and_month]);
  //Logger.log(lookupItem[keyValueDefinitions.so_num_yx_num_info]);
  //Logger.log('soYxLookupItemNumberFilter');
  //Logger.log(this);
  if (singleItemConditionFilter(this.soYxNumber, lookupItem[keyValueDefinitions.so_num_yx_num_info])) {
    this.foundItems.push(lookupItem);
    //Logger.log('soYxLookupItemNumberFilter - push[' + lookupItem[keyValueDefinitions.year_and_month] + ']' );
    //Logger.log('soYxLookupItemNumberFilter: [' + this.foundItems.length + ']');
  }
};
// [end] added by elite_lin - 2022/06/24

// [start] added by elite_lin - 2022/06/24, revision in 2022/06/27
// Deprecated - 2022/07/27
const soLookupItemDurationFilter = function(lookupItem, rowIndex) {
  //Logger.log(lookupItem[keyValueDefinitions.year_and_month]);
  //Logger.log(lookupItem[keyValueDefinitions.soYxNumberInfo]);
  //Logger.log('soLookupItemDurationFilter');
  //Logger.log(this);
  if (isWithinTheDuration1(this.startDate, this.endDate, lookupItem[keyValueDefinitions.year_and_month])) {
    this.foundItems.push(lookupItem);
    //Logger.log('soLookupItemDurationFilter - push[' + lookupItem[keyValueDefinitions.year_and_month] + ']' );
    //Logger.log('soLookupItemDurationFilter: [' + this.foundItems.length + ']');
  }
};
// [end] added by elite_lin - 2022/06/24, revision in 2022/06/27
  
// [start] added by elite_lin - 2022/06/24, revision in 2022/06/27
// Deprecated - 2022/07/27
const soLookupItemNumberAndDurationFilter = function(lookupItem, rowIndex) {
  //Logger.log('soLookupItemNumberAndDurationFilter');
  //Logger.log(this);

  // ******** function `isWithinTheDuration1()` must be implemented elsewhere !!
  const isWithinTheDurationResponse = isWithinTheDuration1(this.startDate, this.endDate, lookupItem[keyValueDefinitions.year_and_month]);
  const hasContained = singleItemConditionFilter(this.soYxNumber, lookupItem[keyValueDefinitions.so_num_yx_num_info]);
  if (hasContained && isWithinTheDurationResponse) {
      this.foundItems.push(lookupItem);
    //Logger.log('soLookupItemNumberAndDurationFilter - push[' + lookupItem[keyValueDefinitions.year_and_month] + ']' );
    //Logger.log('soLookupItemNumberAndDurationFilter: [' + this.foundItems.length + ']');
  }
};
// [end] added by elite_lin - 2022/06/24, revision in 2022/06/27

///

// [start] added by elite_lin - 2022/07/19
// Deprecated - 2022/07/27
function buildAllTabLookupItems() {
  const lookupItem = {};
  lookupItem[keyValueDefinitions.year_and_month] = SHEET_TAB_DEFINITIONS.allSheet;
  lookupItem[keyValueDefinitions.so_num_yx_num_info] = "";
  const allTabLookupItems = [];
  allTabLookupItems.push(lookupItem);
  return allTabLookupItems;
}
// [end] added by elite_lin - 2022/07/19


// [start] added by elite_lin - 2022/07/19
// Deprecated - 2022/07/27
function loadDataFromGivenSpreadsheet(foundLookupItems, spreadsheet) {
  const soJsonDataSetResponseList = [];
  const foundLookupItemsForEach = function(lookupItem, rowIndex) {
    //Logger.log('loadDataFromGivenSpreadsheet -----');
    //Logger.log(lookupItem[keyValueDefinitions.year_and_month]);
    //Logger.log(lookupItem[keyValueDefinitions.so_num_yx_num_info]);
    const yearMonth = lookupItem[keyValueDefinitions.year_and_month];
    const soJsonDataSetResponse = getRowDataSetBySheetName(spreadsheet, yearMonth);
    soJsonDataSetResponse[keyValueDefinitions.year_and_month] = yearMonth;
    // Logger.log(soJsonDataSetResponse[keyValueDefinitions.year_and_month]);
    // Logger.log(soJsonDataSetResponse[keyValueDefinitions.error]);
    // if (soJsonDataSetResponse[keyValueDefinitions.data]) { Logger.log(soJsonDataSetResponse[keyValueDefinitions.data].length); }
    soJsonDataSetResponseList.push(soJsonDataSetResponse);
    //Logger.log('loadDataFromGivenSpreadsheet - push soJsonDataSetResponse for [' + yearMonth + '] - size: [' + soJsonDataSetResponseList.length + ']');
  };
  foundLookupItems.forEach(foundLookupItemsForEach);
  return soJsonDataSetResponseList;
}
// [end] added by elite_lin - 2022/07/19

///

function getLastUpdateTime() {
  // ******** function `getSheetId()` must be implemented elsewhere !!
	return getLastUpdateTimeInternal(getSheetId(), SHEET_TAB_DEFINITIONS.uTimeSheet);
}

// [start] added by elite_lin - 2022/08/18
function getDateTimeString(givenArray, index) {
  if (!givenArray) { return ''; }
  if ((index < 0) || (index >= givenArray.length) ) { return ''; }
  
  let dateTimeString = '';
  if (isValidDateObject(givenArray[index])) {
    dateTimeString = Utilities.formatDate(givenArray[0], 'Etc/GMT', 'yyyy/MM/dd HH:mm:ss');
  }
  else {
    const dateObj = new Date(givenArray[index]);
    if (isValidDateObject(dateObj)) {
      dateTimeString = Utilities.formatDate(dateObj, 'Etc/GMT', 'yyyy/MM/dd HH:mm:ss');
    }
  }
  return dateTimeString;
}
// [end] added by elite_lin - 2022/08/18

// [start] revision by elite_lin - 2022/06/23
function getLastUpdateTimeInternal(sheedId, updateTimeTabName) {
  const result = {};

  const spreadsheet = SpreadsheetApp.openById(sheedId);
  if(!spreadsheet) {
    Logger.log('getLastUpdateTime - spreadsheet is unavailable!!');
    return JSON.stringify(result);
  }
  const updateTimeRowDataSetResponse = getRowDataSetBySheetName(spreadsheet, updateTimeTabName);
  if(updateTimeRowDataSetResponse[keyValueDefinitions.error] != statusCodeTable.success) {
    Logger.log('getLastUpdateTime - updateTimeRowDataSet is unavailable!!');
    return JSON.stringify(result); 
  }
  try {
    //const rawTitleRow = updateTimeRowDataSet[0].map(String);
    const rawBodyRows = updateTimeRowDataSetResponse[keyValueDefinitions.data].slice(1);
    const bodyRowsArray = [];
    rawBodyRows.forEach(function(rowItem, row_index) {
      bodyRowsArray.push(rowItem);
    });
    
    const updatedAt = getDateTimeString(bodyRowsArray, 0);
    if (!isEmptyContent(updatedAt)) {
      result[keyValueDefinitions.updated_at] = updatedAt;
    }
    
    const syncAt = getDateTimeString(bodyRowsArray, 1);
    if (!isEmptyContent(syncAt)) {
      result[keyValueDefinitions.sync_at] = syncAt;
    }

    return JSON.stringify(result);
  }
  catch(error) {
    Logger.log('error on getLastUpdateTime!!');
    Logger.log(error);
    return '';
  }
}
// [end] revision by elite_lin - 2022/06/23

// [start] added by elite_lin - 2022/06/23, revision in 2022/07/27
function loadSoJsonData(conditionObj) {
  // ******** function `getSheetId()` must be implemented elsewhere !!
  const spreadsheet = SpreadsheetApp.openById(getSheetId());
  if(!spreadsheet) {
    Logger.log('loadSoJsonData - spreadsheet is unavailable!!');
    return getEmptyResult(true);
  }

  // ******** function `getSheetTabName()` must be implemented elsewhere !!
  const sheetTabName = getSheetTabName(conditionObj);
  const soJsonDataSetResponse = getRowDataSetBySheetName(spreadsheet, sheetTabName);
  if (  (soJsonDataSetResponse[keyValueDefinitions.error] == statusCodeTable.rowDataSet_title_only) || 
        (soJsonDataSetResponse[keyValueDefinitions.error] == statusCodeTable.rowDataSet_empty) ) {
    return getEmptyResult(false);
  }
  
  if (soJsonDataSetResponse[keyValueDefinitions.error] != statusCodeTable.success) {
    return getEmptyResult(true);
  }

  const soJsonArrayObject = sheetRowDataSetToArrayObject(soJsonDataSetResponse[keyValueDefinitions.data]);
  return buildOutputResult(soJsonArrayObject, conditionObj);  
}
// [end] added by elite_lin - 2022/06/23, revision in 2022/07/27
