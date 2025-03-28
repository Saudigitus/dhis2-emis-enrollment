import { format } from "date-fns";
import { useState, useEffect } from "react";
import { useRecoilValue } from "recoil";
import { OptionGroupsConfigState } from "../../../schema/optionGroupsSchema";
import { OrgUnitsGroupsConfigState } from "../../../schema/orgUnitsGroupSchema";
import { compareStringByLabel } from "../../../utils/commons/sortStringsByLabel";
import { ProgramRulesFormatedState } from "../../../schema/programRulesFormated";
import { ProgramConfigState } from "../../../schema/programSchema";
import { useFormatProgramRulesVariables } from "../useFormatProgramRulesVariables";

interface RulesEngineProps {
    variables: any[]
    values: Record<string, any>
    type: "programStage" | "programStageSection" | "attributesSection"
    formatKeyValueType?: any
}

export const CustomDhis2RulesEngine = (props: RulesEngineProps) => {
    const { variables, values, type, formatKeyValueType } = props
    const getOptionGroups = useRecoilValue(OptionGroupsConfigState)
    const newProgramRules = useRecoilValue(ProgramRulesFormatedState)
    const [updatedVariables, setupdatedVariables] = useState([...variables])
    const orgUnitsGroups = useRecoilValue(OrgUnitsGroupsConfigState)
    const { programRulesVariables } = useFormatProgramRulesVariables()
    const programConfig = useRecoilValue(ProgramConfigState)

    useEffect(() => {
        if (updatedVariables.length === 0) {
            setupdatedVariables([...variables])
        }
    }, [variables])

    function runRulesEngine() {
        if (type === "programStageSection") rulesEngineSections()
        else if (type === "programStage") rulesEngineDataElements()
        else if (type === "attributesSection") rulesEngineAttributesSections()
    }

    // rules engine function for attributes/programSections
    function rulesEngineAttributesSections() {
        const localVariablesSections = [...updatedVariables]
        const updatedVariablesCopy = localVariablesSections?.map(section => {
            const updatedSection = { ...section };
            updatedSection.variable = section?.variable?.map((variable: any) => {
                return applyRulesToVariable(variable);
            });
            return updatedSection;
        });
        setupdatedVariables(updatedVariablesCopy)
    }

    // rules engine function for programStageSections
    function rulesEngineSections() {
        const localVariablesSections = [...updatedVariables]
        const updatedVariablesCopy = localVariablesSections?.map(section => {
            const updatedSection = { ...section };
            updatedSection.fields = section?.fields?.map((variable: any) => {
                return applyRulesToVariable(variable);
            });
            return updatedSection;
        });
        setupdatedVariables(updatedVariablesCopy)
    }

    // rules engine function for simple variables without sections
    function rulesEngineDataElements() {
        const localVariables = [...updatedVariables]
        const updatedVariablesCopy = localVariables?.map(variable => {
            return applyRulesToVariable(variable);
        });

        setupdatedVariables(updatedVariablesCopy);
    }

    function evaluateExpression(expression: any, context: any, values: any, programRulesVariables: any) {
        const d2 = createD2(context);

        expression = expression.replace(/today\(\)/g, `d2.today()`);
        expression = expression.replace(/d2:(\w+)/g, "d2.$1");
        expression = expression.replace(/V\{event_date\}/g, "V{enrollment_date}");

        // Replace #{variable} with values['variable']
        expression = expression.replace(/#\{([^}]+)\}/g, (match: any, key: any) => {
            const value = values[programRulesVariables[key]];
            return typeof value === 'string' ? `'${value}'` : value === undefined ? 'undefined' : value;
        });

        // Replace A{attribute} with values['attribute']
        expression = expression.replace(/A\{([^}]+)\}/g, (match: any, key: any) => {
            const value = values[programRulesVariables[key]];
            return typeof value === 'string' ? `'${value}'` : value === undefined ? 'undefined' : value;
        });

        // Replace V{variable} with values['variable'] (consider revising for DHIS2 program variables)
        expression = expression.replace(/V\{([^}]+)\}/g, (match: any, key: any) => {
            const value = values[key];
            return typeof value === 'string' ? `'${value}'` : value === undefined ? 'undefined' : value;
        });

        try {
            const func = new Function('d2', 'context', `return ${expression};`);
            return func(d2, context);
        } catch (error) {
            console.error('Error evaluating expression:', expression, error);
            return null;
        }
    }

    function createD2(context: any) {
        const today = new Date().toISOString().split('T')[0]; // Current date in 'YYYY-MM-DD'

        return {
            hasValue: function (value: any) {
                return value !== null && value !== undefined && value !== '';
            },
            yearsBetween: function (date1: any, date2: any) {
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
            daysBetween: function (date1: any, date2: any) {
                const d1 = new Date(date1) as unknown as number;
                const d2 = new Date(date2) as unknown as number;
                const diffTime = Math.abs(d2 - d1);
                return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            },
            addDays: function (date: any, days: any) {
                const d = new Date(date);
                d.setDate(d.getDate() + parseInt(days));
                return d.toISOString().split('T')[0];
            },
            substring: function (text: any, start: any, end: any) {
                if (typeof text !== 'string') return '';
                return text.substring(parseInt(start), parseInt(end));
            },
            today: function () {
                return today;
            },
            length: function (value: any) {
                return typeof value === 'string' ? value.length : 0;
            },
            inOrgUnitGroup: function (orgUnitGroup: any) {
                return orgUnitsGroups?.filter(x => x.value === orgUnitGroup);
            },
            validatePattern: function (value: any, pattern: any) {
                try {
                    const regex = new RegExp(pattern);
                    return regex.test(value);
                } catch (error) {
                    console.error('Invalid pattern:', pattern, error);
                    return false;
                }
            },
            concatenate: function (...args: any) {
                return args.join('');
            },
            left: function (text: any, num: number) {
                return text.substring(0, num)
            }
        };
    }

    // apply rules to variables
    function applyRulesToVariable(variable: any) {
        console.log(newProgramRules)
        for (const programRule of newProgramRules.filter(x => x.variable === variable.name) || []) {
            const firstCondition = evaluateExpression(programRule.condition, variable, values, programRulesVariables);
            switch (programRule.programRuleActionType) {
                case "ASSIGN":
                    if (variable.name === programRule.variable) {
                        const value = evaluateExpression(programRule.data, variable, values, programRulesVariables);

                        if (firstCondition) {
                            if (!isNaN(value) && isFinite(value) && value !== undefined) {
                                values[variable.name] = value
                            } else {
                                values[variable.name] = ""
                            }
                        }
                        variable.disabled = true
                    }
                    break;
                case "SHOWOPTIONGROUP":
                    if (variable.name === programRule.variable) {
                        if (firstCondition) {
                            const options = getOptionGroups?.filter((op) => op.id === programRule.optionGroup)?.[0]?.options || []
                            variable.options = { optionSet: { options: options } }
                        }
                    }
                    break;
                case "SHOWWARNING":
                    if (variable.name === programRule.variable) {
                        if (firstCondition) {
                            variable.content = programRule.content
                            variable.warning = true
                        } else {
                            variable.content = ""
                            variable.warning = false
                        }
                    }
                    break;
                case "SHOWERROR":
                    if (variable.name === programRule.variable) {
                        if (firstCondition) {
                            variable.error = true;
                            variable.content = programRule.content
                            variable.required = true;
                        } else {
                            variable.error = false;
                            variable.content = ""
                            variable.required = false;
                        }
                    }
                    break;
                case "HIDEFIELD":
                    if (variable.name === programRule.variable) {
                        if (firstCondition) {
                            variable.visible = false;
                        } else {
                            variable.visible = true;
                        }
                    }
                    break;
                case "HIDESECTION":
                    break;

                case "HIDEOPTIONGROUP":
                    if (variable.name === programRule.variable) {
                        // const orgUnitGroup = programRule?.condition?.replace(/[^a-zA-Z]/g, '')
                        if (firstCondition) {
                            console.log(variable)
                            if (firstCondition[0]?.organisationUnits.findIndex((x: any) => x.value === values["orgUnit"]) > -1) {
                                const options = getOptionGroups?.filter((op) => op.id === programRule.optionGroup)?.[0]?.options?.slice()?.sort(compareStringByLabel) || []

                                variable.options = { optionSet: { options: variable?.optionSet?.options?.filter((obj1: any) => !options.some(obj2 => obj2.value === obj1.value)) || variable?.initialOptions?.optionSet?.options?.filter((obj1: any) => !options.some(obj2 => obj2.value === obj1.value)) } }
                            }
                        }
                    }
                    break;
            }
        }
        return variable;
    }

    return {
        runRulesEngine,
        updatedVariables
    }
}


// export function getValueTypeVariable(variables: any, variable: any, type: string) {
//     if (type === "programStageSection") {
//         let variableType = ""
//         variables?.map((section: any) => {
//             section?.fields?.map((sectionVar: any) => {
//                 if (sectionVar.name === variable.variable) {
//                     variableType = sectionVar.valueType
//                 }
//             });
//         });
//         return variableType
//     }
// }