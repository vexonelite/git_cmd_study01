const conditionToHeading = {
  so_number:                'so_num_yx_num',
  model_number:             'model_num',
  doc_type_select:          'doc_type',
  brand_select:             'brand',
  shipping_status_select:   'approvel_status', // Plan B
  ck_status_select:         'ck_nun_yn',
  date_option:              'so_num_doc_date',
  // [start] history
  customer_name:            'cust_name',
  invoice_number:           'inv_num',
  // [end] history
};

///

// [start] added by elite_lin - 2022/06/28, revision in 2022/07/27
const buildDefaultDurationDates = function(conditionObj) {
  const endDate1 = new Date();
  const startDate1 = getNumberMonthsAgoDate(endDate1, -3);
  const endDateString = givenDateToDateString(endDate1, false);
  const startDateString = givenDateToDateString(startDate1, false);
  conditionObj[formParamKeyDict.end_date] = endDateString;
  conditionObj[formParamKeyDict.start_date] = startDateString;

  const startDate = new Date(conditionObj[formParamKeyDict.start_date]);
  const endDate = new Date(conditionObj[formParamKeyDict.end_date]);
  //Logger.log('buildDefaultDurationDates - endDate1: [' + endDate1 + '], startDate1: ['  + startDate1 + '], endDate: [' + endDate + '], startDate: [' + startDate + ']');
  conditionObj[keyValueDefinitions.startDate] = startDate;
  conditionObj[keyValueDefinitions.endDate] = endDate;
  // Logger.log('buildDefaultDurationDates - (' + lookupItemFilterThis[keyValueDefinitions.startDate].toUTCString() + ', ' 
  //   + lookupItemFilterThis[keyValueDefinitions.startDate] + ') - (' 
  //   + lookupItemFilterThis[keyValueDefinitions.endDate].toUTCString() + ', ' 
  //   + lookupItemFilterThis[keyValueDefinitions.endDate] + ')');
};
// [end] added by elite_lin - 2022/06/28, revision in 2022/07/27

///

/** Plan B */
// Remark*
function soShippingStatusFilter(conditionObj, conditionItemKey, soDataObj, soDataItemKey) {
  //Logger.log('soShippingStatusFilter!!');
  const theKeyword = conditionObj[conditionItemKey];
  if (theKeyword === undefined) {
    //Logger.log('soShippingStatusFilter - theKeyword is unavailable!!');
    return true;
  }
  
  const saDataArray = soDataObj[keyValueDefinitions.sa_data];
  if (saDataArray === undefined) {
    //Logger.log('soShippingStatusFilter - saDataArray is unavailable!! - theKeyword: [' + theKeyword + ']');
    if (theKeyword == formParamDict.no) { return true; }
    else { return false; }
  }
  if (saDataArray.length <= 0) {
    //Logger.log('soShippingStatusFilter - saDataArray is empty!! - theKeyword: [' + theKeyword + ']');
    if (theKeyword == formParamDict.no) { return true; }
    else { return false; }
  }
  
  let filterResult = true;
    
  for (let i = 0; i < saDataArray.length; i++) {
    const saDataObj = saDataArray[i];
    //Logger.log(saDataObj);
    const saNumber = saDataObj[keyValueDefinitions.sa_num];
    const shippingStatus = saDataObj[soDataItemKey];
  
    // [start] revision by elite_lin - 2022/07/13
    // let testResult = false;
    // if (shippingStatus === undefined) {
    //   //Logger.log('soShippingStatusFilter - i: [' + i + '] - shippingStatus is unavailable!!');
    // }
    // else {
    //   const isEmptyShippingStatus = isEmptyContent(shippingStatus);
      
    //   if ( (theKeyword == formParamDict.no) && isEmptyShippingStatus ) { testResult = true; }
    //   if ( (theKeyword == formParamDict.yes) && (!isEmptyShippingStatus) ) { testResult = true; }
    //   //Logger.log('soShippingStatusFilter - i: [' + i + '], length: [' + saDataArray.length + '], sa_num: [' + saNumber + '], shippingStatus: [' + shippingStatus + '], theKeyword: [' + theKeyword + '], isEmptyShippingStatus: [' + isEmptyShippingStatus + '], testResult: [' + testResult + ']');
    // }
      
    // filterResult = testResult;
    filterResult = singleItemStatusFilter(theKeyword, shippingStatus);
    // [end] revision by elite_lin - 2022/07/13
    if (!filterResult) { break; }
  }
  
  return filterResult;
}

function saDataObjectFilter(soDataObj, keywordItemKeyObjectArray) {
    
  const saDataArray = soDataObj[keyValueDefinitions.sa_data];
  if (saDataArray === undefined) {
    //Logger.log('saDataObjectFilter - saDataArray is unavailable!!');
    return false;
  }
  if (saDataArray.length <= 0) {
    //Logger.log('saDataObjectFilter - saDataArray is empty!!');
    return false;
  }
  
  let filterResult = true;    
  for (let i = 0; i < saDataArray.length; i++) {
    const saDataObj = saDataArray[i];
    //Logger.log(saDataObj);
    for (let j = 0; j < keywordItemKeyObjectArray.length; j++) {
      const keywordItemKeyObject = keywordItemKeyObjectArray[j];
      const theKeyword = keywordItemKeyObject[keyValueDefinitions.keyword];
      const theItemKey = keywordItemKeyObject[keyValueDefinitions.item];
      const saNumber = saDataObj[keyValueDefinitions.sa_num];
      const thePhrase = saDataObj[theItemKey];
      if (theItemKey == conditionToHeading.shipping_status_select) {
        // Logger.log('saDataObjectFilter - shipping_status');
        // Logger.log(keywordItemKeyObject);
        filterResult = filterResult && singleItemStatusFilter(theKeyword, thePhrase);
      }
      else {
        // Logger.log('saDataObjectFilter - invoice #');
        // Logger.log(keywordItemKeyObject);
        filterResult = filterResult && singleItemConditionFilter(theKeyword, thePhrase);
      }
      if (!filterResult) { return false; }
    }
  }
  
  return filterResult;
}
  
/** further revision is needed */
function soModelNumberFilter(conditionObj, conditionItemKey, soDataObj, soDataItemKey) {
  const theKeyword = conditionObj[conditionItemKey];
  if (theKeyword === undefined) {
    //Logger.log('soModelNumberFilter - theKeyword is unavailable!!');
    return true;
  }
  
  const saDataArray = soDataObj['sa_data'];
  if (saDataArray === undefined) {
    Logger.log('soModelNumberFilter - saDataArray is unavailable!!');
    return false;
  }
  
  return true;
}

// Remark*
function soCommonDataFilter (conditionObj, conditionItemKey, soDataObj, soDataItemKey) {
  const theKeyword = conditionObj[conditionItemKey];
  const thePhrase = soDataObj[soDataItemKey];
  //Logger.log('soCommonDataFilter - conditionItemKey: [' + conditionItemKey + '], soDataItemKey: [' + soDataItemKey + '], theKeyword: [' + theKeyword + '], thePhrase: [' + thePhrase + ']');
  // soCommonDataFilter - conditionItemKey: [so_number], soDataItemKey: [so_num_yx_num], theKeyword: [SO22020021], thePhrase: [SO21120101]
  
  let ignore = false;
  if (theKeyword === undefined) {
    // Logger.log('soCommonDataFilter - theKeyword is unavailable!!');
    // Logger.log('soCommonDataFilter - conditionItemKey: [' + conditionItemKey + '], soDataItemKey: [' + soDataItemKey + '], theKeyword: [' + theKeyword + '], thePhrase: [' + thePhrase + ']');
    ignore = true;
  }
  if (thePhrase === undefined) {
    // Logger.log('soCommonDataFilter - thePhrase is unavailable!!');
    // Logger.log('soCommonDataFilter - conditionItemKey: [' + conditionItemKey + '], soDataItemKey: [' + soDataItemKey + '], theKeyword: [' + theKeyword + '], thePhrase: [' + thePhrase + ']');
    ignore = true;
  }
  
  if (ignore) { return ignore; }
  //Logger.log('soCommonDataFilter - not ignore!');
  const isEmptyPhrase = isEmptyContent(thePhrase);
  if (isEmptyPhrase) { false; }

  if (  (soDataItemKey == conditionToHeading.doc_type_select) && 
        (theKeyword == formParamDict.drop_ship) ) {
    //Logger.log('soCommonDataFilter - conditionItemKey: [' + conditionItemKey + '], soDataItemKey: [' + soDataItemKey + '], theKeyword: [' + theKeyword + '], thePhrase: [' + thePhrase + ']');
    //soCommonDataFilter - conditionItemKey: [doc_type_select], soDataItemKey: [doc_type], theKeyword: [undefined], thePhrase: [DiCon RMA]
    //Logger.log('soCommonDataFilter 1 [' + docTypeDict.drop_ship + '], thePhrase: [' + thePhrase + ']');
    const dropShipResult1 = singleItemConditionFilter(docTypeDict.drop_ship, thePhrase);
    if (dropShipResult1) { return true; }
    else {
      return singleItemConditionFilter(docTypeDict.direct_sales, thePhrase);
    }
  }
  else {
    //if (soDataItemKey == conditionToHeading.so_number) { Logger.log('soCommonDataFilter [' + thePhrase + ']'); }
    // soCommonDataFilter [SO22020020]
    //if (soDataItemKey == conditionToHeading.doc_type_select) { Logger.log('soCommonDataFilter - theKeyword: [' + theKeyword + '], thePhrase: [' + thePhrase + ']'); }
    // soCommonDataFilter - theKeyword: [rental], thePhrase: [DiCon Direct Sales]
    return singleItemConditionFilter(theKeyword, thePhrase);
  }
}

// Remark*
function soDataObjConditionFilter(conditionObj, soDataObj, filterCondition) {
  let filterResult = true;
  for (const [conditionItemKey, soDataItemKey] of Object.entries(filterCondition)) {
    
    if (soDataItemKey == conditionToHeading.so_number) {
      filterResult = filterResult && soCommonDataFilter(conditionObj, conditionItemKey, soDataObj, soDataItemKey);
    }
    else if (soDataItemKey == conditionToHeading.date_option) {
      // [start] revision by elite_lin - 2022/07/08
      const rawDocDateStr = soDataObj[soDataItemKey];
      const rawDocDate = new Date(rawDocDateStr);
      const theDocDateStr = givenDateToDateString(rawDocDate, false);
      // [end] revision by elite_lin - 2022/07/08
      // [start] revision by elite_lin - 2022/06/28
      //const startDate = conditionObj[formParamKeyDict.start_date];
      //const endDate = conditionObj[formParamKeyDict.end_date];
      const startDate = conditionObj[keyValueDefinitions.startDate];
      const endDate = conditionObj[keyValueDefinitions.endDate];
      // [start] added by elite_lin - 2022/07/08
      // const docDate = new Date(theDocDateStr);
      // Logger.log('soDataObjConditionFilter - theDocDateStr: [' + theDocDateStr + '], docDate: [' + docDate + '], startDate: [' + startDate + '], endDate: [' + endDate + ']');
      // [end] added by elite_lin - 2022/07/08
      // [end] revision by elite_lin - 2022/06/28
      filterResult = filterResult && singleItemDurationFilter(theDocDateStr, startDate, endDate);
    }
    // else if (soDataItemKey == conditionToHeading.shipping_status_select) {      
    //   filterResult = filterResult && soShippingStatusFilter(conditionObj, conditionItemKey, soDataObj, soDataItemKey);
    // }    
    else if (soDataItemKey == conditionToHeading.ck_status_select) {
      const theKeyword = conditionObj[conditionItemKey];
      const thePhrase = soDataObj[soDataItemKey];
      filterResult = filterResult && singleItemStatusFilter(theKeyword, thePhrase);
    }
    else if (soDataItemKey == conditionToHeading.doc_type_select) {
      filterResult = filterResult && soCommonDataFilter(conditionObj, conditionItemKey, soDataObj, soDataItemKey);
    }
    else if (soDataItemKey == conditionToHeading.brand_select) {
      filterResult = filterResult && soCommonDataFilter(conditionObj, conditionItemKey, soDataObj, soDataItemKey);
    }
    else if (soDataItemKey == conditionToHeading.model_number) {
      filterResult = filterResult && soModelNumberFilter(conditionObj, conditionItemKey, soDataObj, soDataItemKey);
    }    
    else if (soDataItemKey == conditionToHeading.customer_name) {      
      filterResult = filterResult && soCommonDataFilter(conditionObj, conditionItemKey, soDataObj, soDataItemKey);
    }
    //else { filterResult = filterResult && soCommonDataFilter(conditionObj, conditionItemKey, soDataObj, soDataItemKey); }
  
    if (!filterResult) { break; }
  }

  if (filterResult) {
    const keywordItemKeyObjectArray = [];
    const hasShippingStatus = filterCondition.hasOwnProperty(formParamKeyDict.shipping_status_select);
    const hasInvoiceNumber = filterCondition.hasOwnProperty(formParamKeyDict.invoice_number);
    if (hasShippingStatus) {
      const keywordItemKeyObject = {};
      keywordItemKeyObject[keyValueDefinitions.keyword] = conditionObj[formParamKeyDict.shipping_status_select];
      keywordItemKeyObject[keyValueDefinitions.item] = conditionToHeading.shipping_status_select;
      keywordItemKeyObjectArray.push(keywordItemKeyObject);
    }
    if (hasInvoiceNumber) {
      const keywordItemKeyObject = {};
      keywordItemKeyObject[keyValueDefinitions.keyword] = conditionObj[formParamKeyDict.invoice_number];
      keywordItemKeyObject[keyValueDefinitions.item] = conditionToHeading.invoice_number;
      keywordItemKeyObjectArray.push(keywordItemKeyObject);
    }

    if (keywordItemKeyObjectArray.length > 0) {
      if ((keywordItemKeyObjectArray.length == 1) && hasShippingStatus) {
        filterResult = filterResult && soShippingStatusFilter(conditionObj, 
          formParamKeyDict.shipping_status_select, soDataObj, conditionToHeading.shipping_status_select);
      }
      else {
        filterResult = filterResult && saDataObjectFilter(soDataObj, keywordItemKeyObjectArray);
      }
      // filterResult = filterResult && saDataObjectFilter(soDataObj, keywordItemKeyObjectArray);
    }
  }

  return filterResult;
}

// [start] added by elite_lin - 2022/06/24
function buildOutputResult(soJsonArrayObject, conditionObj) {
  //Logger.log('buildOutputResult - startDate: [' + conditionObj[keyValueDefinitions.startDate] + '], endDate: [' + conditionObj[keyValueDefinitions.endDate] + ']');
  
  const soJsonArray = bodyRowsArrayToJsonObjectArray(soJsonArrayObject.titleArray, soJsonArrayObject.bodyRowsArray);
  
  const filterCondition = decideIfNeedToFilterOut(conditionObj);
  const doesNeedToFilterOut = (Object.keys(filterCondition).length > 0);
  Logger.log('buildOutputResult - doesNeedToFilterOut: [' + doesNeedToFilterOut + ']');
  // if (!doesNeedToFilterOut) { 
  //   return convertObjectArrayIntoJsonString(soJsonArray); 
  // }
      
  const filteredOutSoJsonArray = [];
  const startDate = conditionObj[keyValueDefinitions.startDate];
  const endDate = conditionObj[keyValueDefinitions.endDate];

  const soJsonArrayDefaultDurationForEach = function(soJsonObj, rowIndex) {
    const rawDocDateStr = soJsonObj[conditionToHeading.date_option];
    const rawDocDate = new Date(rawDocDateStr);
    const theDocDateStr = givenDateToDateString(rawDocDate, false);
    const testResult = singleItemDurationFilter(theDocDateStr, startDate, endDate)    
    if (testResult) {      
      filteredOutSoJsonArray.push(soJsonObj);
    }
  };
  
  const soJsonArrayForEach = function(soJsonObj, rowIndex) {
    //Logger.log('soJsonArrayForEach - rowIndex: ' + rowIndex);
    //Logger.log(soJsonObj);
    if (soDataObjConditionFilter(conditionObj, soJsonObj, filterCondition)) {
      //Logger.log('soRowDataSetForEach - rowIndex: ' + rowIndex + ', include so Data');
      filteredOutSoJsonArray.push(soJsonObj);
    }
  };

  const forEachOperator = doesNeedToFilterOut ? soJsonArrayForEach : soJsonArrayDefaultDurationForEach;
  soJsonArray.forEach(forEachOperator);

  //soJsonArray.forEach(soJsonArrayForEach);
  return convertObjectArrayIntoJsonString(filteredOutSoJsonArray);
}
// [end] added by elite_lin - 2022/06/24
