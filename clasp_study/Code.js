
function doGet() {
  // [Can one set title in google script](https://stackoverflow.com/questions/38542820/can-one-set-title-in-google-script)  
  const htmlOutput = HtmlService.createTemplateFromFile('index').evaluate();
  htmlOutput.setTitle('L - SO Tracking (Preview)');
  return htmlOutput;
}

///

// [start] revision by elite_lin - 2022/07/27
const SO_TRACKING_LIGHTING_VARIABLES = {
  debugMode:          true,
  
  // SoTracking_Lighting_Dev:
  // https://docs.google.com/spreadsheets/d/1T19J694S1GI5KoHCyLASmqHaSQ5NiYbVdNNHxXEQQeI/
  sheetIdDev:         '1T19J694S1GI5KoHCyLASmqHaSQ5NiYbVdNNHxXEQQeI',

  // SoTracking_Lighting_Dev2:
  // https://docs.google.com/spreadsheets/d/1OuC63GRFwgjPDUlHhlBzWS4qNMBBQwZ__24ll52rxzE/
  //sheetIdDev:         '1OuC63GRFwgjPDUlHhlBzWS4qNMBBQwZ__24ll52rxzE',

  // SoTracking_Lighting:
  // https://docs.google.com/spreadsheets/d/1eanl8rZ9RiCBBZ3yyokcP-8uDmVBdEbAUXFVSiWrqAk/
  sheetId:            '1eanl8rZ9RiCBBZ3yyokcP-8uDmVBdEbAUXFVSiWrqAk',
};
// [end] revision by elite_lin - 2022/07/27

///

// [start] revision by elite_lin - 2022/07/27
function getSheetId() {
  if (SO_TRACKING_LIGHTING_VARIABLES.debugMode) {
    return SO_TRACKING_LIGHTING_VARIABLES.sheetIdDev;
  }
  else {
    return SO_TRACKING_LIGHTING_VARIABLES.sheetId; 
  }  
}
// [end] revision by elite_lin - 2022/07/27

function getSheetTabName(conditionObj) {
  const isForYx = conditionObj[formParamKeyDict.yx_number_checkbox];
  return isForYx ? SHEET_TAB_DEFINITIONS.yxAllSheet : SHEET_TAB_DEFINITIONS.soAllSheet; 
}
///

// [start] added by elite_lin - 2022/07/07
function getSoJsonStringFromRowObject(jsonRowObject) {
  const jsonKeys = [
    keyValueDefinitions.json, 
    keyValueDefinitions.jsonOne, 
    keyValueDefinitions.jsonTwo, 
    keyValueDefinitions.jsonThree
  ];
  let soJsonString = ''
  for (let i = 0; i < jsonKeys.length; i++) {
    const jsonString = jsonRowObject[jsonKeys[i]];
    if (isEmptyContent(jsonString)) {
      if (i == 0) { Logger.log('getSoJsonStringFromRowObject - error: jsonString is empty for [' + jsonKeys[i] + ']'); }      
    }
    else { soJsonString = soJsonString + jsonString; }
  }
  return soJsonString;  
}
// [end] added by elite_lin - 2022/07/07

///

// [start] revision by elite_lin - 2022/07/27
function getYxConditions(formObject, conditionObj, yxEnableKey) {
  let isForYx = false;
  if (yxEnableKey in formObject) {
    const yxEnabled = formObject[yxEnableKey];
    if (yxEnabled) { isForYx = true; }
  }
  Logger.log('getYxConditions - isForYx: [' + isForYx + ']');
  conditionObj[yxEnableKey] = isForYx;
}
// [end] revision by elite_lin - 2022/07/27

function replaceConditionObjectContent(conditionObj) {
  if (formParamKeyDict.brand_select in conditionObj) {
    const brandValue = conditionObj[formParamKeyDict.brand_select];
    if (brandValue in brandDict) {
      conditionObj[formParamKeyDict.brand_select] = brandDict[brandValue];
    }
    else {
      Logger.log('replaceConditionObjectContent - fail to replace for [' + brandValue + ']');
    }
  }    
}

// [start] added by elite_lin - 2022/06/28
const decideIfNeedToFilterOut = function(conditionObj) {
  //Logger.log('decideIfNeedToFilterOut - conditionObj:');
  //Logger.log(conditionObj);
  //const doesNotNeedToFilterOut = (Object.keys(conditionObj).length === 0) && (conditionObj.constructor === Object);
  //return !doesNotNeedToFilterOut;

  const filterCondition = {};
  if (conditionObj.hasOwnProperty(formParamKeyDict.so_number)) {
    filterCondition[formParamKeyDict.so_number] = conditionToHeading.so_number;
  }
  if (conditionObj.hasOwnProperty(formParamKeyDict.date_option)) {
    filterCondition[formParamKeyDict.date_option] = conditionToHeading.date_option;
  }
  if (conditionObj.hasOwnProperty(formParamKeyDict.doc_type_select)) {
    filterCondition[formParamKeyDict.doc_type_select] = conditionToHeading.doc_type_select;
  }
  if (conditionObj.hasOwnProperty(formParamKeyDict.brand_select)) {
    filterCondition[formParamKeyDict.brand_select] = conditionToHeading.brand_select;
  }
  if (conditionObj.hasOwnProperty(formParamKeyDict.shipping_status_select)) {
    filterCondition[formParamKeyDict.shipping_status_select] = conditionToHeading.shipping_status_select;
  }  
  if (conditionObj.hasOwnProperty(formParamKeyDict.ck_status_select)) {
    filterCondition[formParamKeyDict.ck_status_select] = conditionToHeading.ck_status_select;
  }
  if (conditionObj.hasOwnProperty(formParamKeyDict.model_number)) {
    filterCondition[formParamKeyDict.model_number] = conditionToHeading.model_number;
  }

  // [start] history
  if (conditionObj.hasOwnProperty(formParamKeyDict.customer_name)) {
    filterCondition[formParamKeyDict.customer_name] = conditionToHeading.customer_name;
  }
  if (conditionObj.hasOwnProperty(formParamKeyDict.invoice_number)) {
    filterCondition[formParamKeyDict.invoice_number] = conditionToHeading.invoice_number;
  }
  // Logger.log('invoice_number: ' + conditionObj.hasOwnProperty(formParamKeyDict.invoice_number));
  // Logger.log('customer_name: ' + conditionObj.hasOwnProperty(formParamKeyDict.customer_name));
  // [end] history

  // Logger.log('so_number: ' + conditionObj.hasOwnProperty(formParamKeyDict.so_number));
  // Logger.log('date_option: ' + conditionObj.hasOwnProperty(formParamKeyDict.date_option));
  // Logger.log('doc_type: ' + conditionObj.hasOwnProperty(formParamKeyDict.doc_type_select));
  // Logger.log('brand: ' + conditionObj.hasOwnProperty(formParamKeyDict.brand_select));
  // Logger.log('shipping_status: ' + conditionObj.hasOwnProperty(formParamKeyDict.shipping_status_select));
  // Logger.log('ck_status: ' + conditionObj.hasOwnProperty(formParamKeyDict.ck_status_select));
  // Logger.log('so_number: ' + conditionObj.hasOwnProperty(formParamKeyDict.model_number));
  Logger.log(filterCondition);
  return filterCondition;
};
// [end] added by elite_lin - 2022/06/28

///

function processForm(formObject) {
  Logger.log(formObject);
  const conditionObj = {};
  getDurationCondition(formObject, conditionObj);
  getYxConditions(formObject, conditionObj, formParamKeyDict.yx_number_checkbox);
  getConditionItem(formObject, formParamKeyDict.so_number_checkbox, formParamKeyDict.so_number, conditionObj);
  getConditionItem(formObject, formParamKeyDict.model_number_checkbox, formParamKeyDict.model_number, conditionObj);
  getConditionItem(formObject, formParamKeyDict.doc_type_checkbox, formParamKeyDict.doc_type_select, conditionObj);
  getConditionItem(formObject, formParamKeyDict.brand_checkbox, formParamKeyDict.brand_select, conditionObj);
  getConditionItem(formObject, formParamKeyDict.shipping_status_checkbox, formParamKeyDict.shipping_status_select, conditionObj);
  getConditionItem(formObject, formParamKeyDict.ck_status_checkbox, formParamKeyDict.ck_status_select, conditionObj);

  // [start] history
  getConditionItem(formObject, formParamKeyDict.invoice_number_checkbox, formParamKeyDict.invoice_number, conditionObj);
  getConditionItem(formObject, formParamKeyDict.customer_name_checkbox, formParamKeyDict.customer_name, conditionObj);
  // [end] history

  replaceConditionObjectContent(conditionObj);
  decideSearchEnum(conditionObj);
  const searchEnum = conditionObj[keyValueDefinitions.search_enum];
  if ((searchEnum < 1) || (searchEnum > 3)) { buildDefaultDurationDates(conditionObj); }
  Logger.log(conditionObj);

  try {
    //return getEmptyResult(true);
    return loadSoJsonData(conditionObj);
  }
  catch(error) {
    Logger.log('error on processForm!!');
    Logger.log(error);
    return getEmptyResult();
  }
}
