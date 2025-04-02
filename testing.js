// Function to create d2 utility functions with context
function createD2(context) {
    const today = new Date().toISOString().split('T')[0]; // Current date in 'YYYY-MM-DD'

    return {
        hasValue: function (value) {
            return value !== null && value !== undefined && value !== '';
        },
        yearsBetween: function (date1, date2) {
            const d1 = new Date(date1);
            const d2 = new Date(date2);
            let years = d2.getFullYear() - d1.getFullYear();
            // Adjust if the full year hasn't been completed
            if (d2.getMonth() < d1.getMonth() ||
                (d2.getMonth() === d1.getMonth() && d2.getDate() < d1.getDate())) {
                years--;
            }
            return years;
        },
        daysBetween: function (date1, date2) {
            const d1 = new Date(date1);
            const d2 = new Date(date2);
            const diffTime = Math.abs(d2 - d1);
            return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        },
        addDays: function (date, days) {
            const d = new Date(date);
            d.setDate(d.getDate() + parseInt(days));
            return d.toISOString().split('T')[0];
        },
        substring: function (text, start, end) {
            if (typeof text !== 'string') return '';
            return text.substring(parseInt(start), parseInt(end));
        },
        today: function () {
            return today;
        },
        length: function (value) {
            return typeof value === 'string' ? value.length : 0;
        },
        inOrgUnitGroup: function (group) {
            return context.orgUnitGroups && context.orgUnitGroups.includes(group);
        },
        validatePattern: function (value, pattern) {
            if (typeof value !== 'string') return false;
            const regex = new RegExp(pattern);
            return regex.test(value);
        }
    };
}

// Function to evaluate an expression given a context
function evaluateExpression(expression, context) {
    const d2 = createD2(context);

    // Replace today() with d2.today()
    expression = expression.replace(/today\(\)/g, `d2.today()`);

    // Replace d2:function with d2.function
    expression = expression.replace(/d2:(\w+)/g, "d2.$1");

    // Replace #{variable} with context.dataElements['variable']
    expression = expression.replace(/#\{([^}]+)\}/g, (match, key) => {
        const value = context.dataElements[key];
        return typeof value === 'string' ? `'${value}'` : value === undefined ? 'undefined' : value;
    });

    // Replace A{attribute} with context.attributes['attribute']
    expression = expression.replace(/A\{([^}]+)\}/g, (match, key) => {
        const value = context.attributes[key];
        return typeof value === 'string' ? `'${value}'` : value === undefined ? 'undefined' : value;
    });

    // Replace V{variable} with context.variables['variable']
    expression = expression.replace(/V\{([^}]+)\}/g, (match, key) => {
        const value = context.variables[key];
        return typeof value === 'string' ? `'${value}'` : value === undefined ? 'undefined' : value;
    });

    // Evaluate the expression safely
    try {
        const func = new Function('d2', 'context', `return ${expression};`);
        return func(d2, context);
    } catch (error) {
        console.error('Error evaluating expression:', expression, error);
        return null;
    }
}

// Function to process rules and return results
function processRules(rules, context) {
    const results = {
        assignments: [],
        warnings: [],
        errors: [],
        hiddenFields: [],
        hiddenOptionGroups: [],
        shownOptionGroups: []
    };

    rules.forEach(rule => {
        const conditionResult = evaluateExpression(rule.condition, context);
        if (conditionResult) {
            switch (rule.programRuleActionType) {
                case 'ASSIGN':
                    let value;
                    if (rule.data.startsWith('#{')) {
                        const key = rule.data.slice(2, -1);
                        value = context.dataElements[key];
                    } else {
                        value = evaluateExpression(rule.data, context);
                    }
                    results.assignments.push({
                        variable: rule.variable || rule.content?.slice(2, -1),
                        value: value
                    });
                    break;
                case 'SHOWWARNING':
                    results.warnings.push({
                        variable: rule.variable,
                        content: rule.content
                    });
                    break;
                case 'SHOWERROR':
                    results.errors.push({
                        variable: rule.variable,
                        content: rule.content
                    });
                    break;
                case 'HIDEFIELD':
                    results.hiddenFields.push(rule.variable);
                    break;
                case 'HIDEOPTIONGROUP':
                    results.hiddenOptionGroups.push({
                        variable: rule.variable,
                        optionGroup: rule.optionGroup
                    });
                    break;
                case 'SHOWOPTIONGROUP':
                    results.shownOptionGroups.push({
                        variable: rule.variable,
                        optionGroup: rule.optionGroup
                    });
                    break;
                default:
                    console.warn('Unhandled programRuleActionType:', rule.programRuleActionType);
            }
        }
    });

    return results;
}

// Example usage with the provided rules and a sample context
const rules = [
    {
        "condition": "d2:hasValue(#{Receives bursary})",
        "programRuleActionType": "ASSIGN",
        "variable": "wsFrk0eBZgi",
        "type": "dataElement",
        "programStage": "Wi3KEZ7C3w9",
        "data": "#{Amount of bursary for exam fees} + #{Amount of bursary for other} + #{Amount of bursary for school fees}",
        "id": "JRFID0uTgeA",
        "program": "wQaiD2V27Dp"
    },
    {
        "condition": "d2:hasValue(#{Mathematics}) && (#{Mathematics} < 0 || #{Mathematics} > 20)",
        "programRuleActionType": "SHOWWARNING",
        "variable": "qPwGZal50yH",
        "type": "dataElement",
        "content": "Marks out of range (0 -20)",
        "id": "NdfYs50XeZe",
        "program": "wQaiD2V27Dp"
    },
    {
        "condition": "#{Attendance status} != 'Absent'",
        "programRuleActionType": "HIDEFIELD",
        "variable": "oLUMMT84ILM",
        "type": "dataElement",
        "programStage": "Ljyrr3cktAr",
        "id": "X2RZLHTX6ku",
        "program": "wQaiD2V27Dp"
    },
    {
        "condition": "#{Receives bursary} != 1",
        "programRuleActionType": "HIDEFIELD",
        "variable": "QRl2YSQXsYr",
        "type": "dataElement",
        "programStage": "Wi3KEZ7C3w9",
        "id": "TMEJEoUpSMs",
        "program": "wQaiD2V27Dp"
    },
    {
        "condition": "#{Receives bursary} != 1",
        "programRuleActionType": "HIDEFIELD",
        "variable": "woYJkG3KMga",
        "type": "dataElement",
        "programStage": "Wi3KEZ7C3w9",
        "id": "P5SomP0Rz4r",
        "program": "wQaiD2V27Dp"
    },
    {
        "condition": "#{Receives bursary} != 1",
        "programRuleActionType": "HIDEFIELD",
        "variable": "DXg4BfI9BQx",
        "type": "dataElement",
        "programStage": "Wi3KEZ7C3w9",
        "id": "nrl4h8rqPyg",
        "program": "wQaiD2V27Dp"
    },
    {
        "condition": "#{Receives bursary} != 1",
        "programRuleActionType": "HIDEFIELD",
        "variable": "H12Bz9ilOf1",
        "type": "dataElement",
        "programStage": "Wi3KEZ7C3w9",
        "id": "QtKRGCZrxxB",
        "program": "wQaiD2V27Dp"
    },
    {
        "condition": "#{Receives bursary} != 1",
        "programRuleActionType": "HIDEFIELD",
        "variable": "wsFrk0eBZgi",
        "type": "dataElement",
        "programStage": "Wi3KEZ7C3w9",
        "id": "wepHdsiD32I",
        "program": "wQaiD2V27Dp"
    },
    {
        "condition": "#{Grade} == 'Grade 1'",
        "programRuleActionType": "HIDEFIELD",
        "variable": "w75mLLmHYyS",
        "type": "dataElement",
        "id": "VKh4fS1rpgb",
        "program": "wQaiD2V27Dp"
    },
    {
        "condition": "#{Grade} == 'Grade 1'",
        "programRuleActionType": "HIDEFIELD",
        "variable": "cTTpaVY6m1Q",
        "type": "dataElement",
        "id": "nqzuSGjLe9M",
        "program": "wQaiD2V27Dp"
    },
    {
        "condition": "#{Grade} == 'Grade 2'",
        "programRuleActionType": "HIDEFIELD",
        "variable": "cTTpaVY6m1Q",
        "type": "dataElement",
        "id": "Wob2P8CPxK2",
        "program": "wQaiD2V27Dp"
    },
    {
        "condition": "d2:inOrgUnitGroup('PS')",
        "programRuleActionType": "HIDEOPTIONGROUP",
        "variable": "kNNoif9gASf",
        "type": "dataElement",
        "optionGroup": "Qpdm1zNZDEV",
        "id": "NXmBLjI3h2w",
        "program": "wQaiD2V27Dp"
    },
    {
        "condition": "!d2:hasValue(#{Destiny school})",
        "programRuleActionType": "HIDEFIELD",
        "variable": "ZdFo5gthBt2",
        "type": "dataElement",
        "id": "YBsT2m0KKDJ",
        "program": "wQaiD2V27Dp"
    },
    {
        "condition": "d2:length(A{full_name}) < 2 && d2:hasValue(A{full_name})",
        "programRuleActionType": "SHOWERROR",
        "variable": "gz8w04YBSS0",
        "type": "attribute",
        "content": "Name must be at least 2 characters long. Please enter a valid name.",
        "id": "srzQLiiTAj4",
        "program": "wQaiD2V27Dp"
    }
];

const context = {
    dataElements: {
        "SS_Academic year": "2024",              // SS_Academic year
        "woYJkG3KMga": 500,                 // SS_Amount of bursary for exam fees
        "QRl2YSQXsYr": 300,                 // SS_Amount of bursary for other
        "DXg4BfI9BQx": 700,                 // SS_Amount of bursary for school fees
        "zDXPJwCWJ1s": "Grade 1",           // SS_Grade
        "AYYkN0fkxzh": "Class A",           // SS_Class in enrolment details
        "J1odqnLrdD8": "Yes",               // SS_Classified as OVC
        "G0UQ8Qv5AWb": "Option A",          // SS_Distance learninga
        "pcBzg1tXvjh": "Option B",          // SS_Distance learningb
        "HYD9qxIfQX9": "Option C",          // SS_Distance learningc
        "Vuz74DEe65l": "Option D",          // SS_Distance learningd
        "dSlMYtdJZt2": "Yes",               // SS_First Time in grade
        "ZpDlB7MEBGn": "Yes",               // SS_Has Pin
        "WrdLzFIgEvz": "No",                // SS_Has Special Education needs
        "SjMxl9Cwha8": "Yes",               // SS_Receives Bursary
        "zUJzSmPo0mQ": "Stream B",          // SS_Stream from annual information
        "NdwgaSCq8XP": "Math",              // SS_Subject 1
        "fnPt9G4HW8J": "English",           // SS_Subject 2
        "DsWrKFF4s8r": "Yes",               // SS_Taught on life skills
        "SwprWyvtPT0": "No",                // SS_Transfer in
        "PlSlbmFeU9c": "Passport",          // SS_Type of alternative ID
        "G1KPc3baOA8": "Single Orphan"      // SS_Type of orphan
    },
    attributes: {
        "CTlcN7vKFgx": "1997-11-29",        // Date of Birth (SS_DOB)
        "Oa0NsV2Z5LF": 23,                  // Learner Age
        "sNFAEE8GJO1": "PIN12345"           // Learner PIN
    },
    variables: {
        "event_date": "2025-03-06",          // Example event date
        "enrollment_date": "2023-01-15"     // Example enrollment date
    }
};

// Example expressions to evaluate
const expressions = [
    "d2:yearsBetween(A{CTlcN7vKFgx}, V{event_date})",  // Calculate age from DOB to event date
    "#{zDXPJwCWJ1s} == 'Grade 1'",                     // Check if grade is Grade 1
    "#{SjMxl9Cwha8} == 'Yes' && #{DXg4BfI9BQx} > 800", // Check bursary received and amount > 500
    "#{SS_Academic year} != (d2:substring(V{enrollment_date}, 0, 4))"                      // Check if first time in grade has a value
];

// Evaluate and display results
expressions.forEach(expr => {
    const result = evaluateExpression(expr, context);
    console.log(`Expression: "${expr}" => Result: ${result}`);
});

// Execute the rules
// const results = processRules(rules, context);
// console.log(JSON.stringify(results, null, 2));

// const d2 = createD2();
// const result = evaluateExpression("d2:yearsBetween(A{SS_DOB}, V{event_date})", context);
// // Result: 23 (years between "2000-05-15" and "2023-05-15")
// console.log(result)