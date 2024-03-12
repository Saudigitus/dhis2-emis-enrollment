import { format } from "date-fns";
import { useState, useEffect } from "react";
import { useRecoilValue } from "recoil";
import { OptionGroupsConfigState } from "../../../schema/optionGroupsSchema";
import { OrgUnitsGroupsConfigState } from "../../../schema/orgUnitsGroupSchema";
import { compareStringByLabel } from "../../../utils/commons/sortStringsByLabel";
import { ProgramRulesFormatedState } from "../../../schema/programRulesFormated";
import { ProgramConfigState } from "../../../schema/programSchema";

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

    // apply rules to variables
    function applyRulesToVariable(variable: any) {
        for (const programRule of newProgramRules.filter(x => x.variable === variable.name) || []) {
            switch (programRule.type) {
                case "attribute":
                case "dataElement":
                    switch (programRule.programRuleActionType) {
                        case "ASSIGN":
                            if (variable.name === programRule.variable) {
                                const firstCondition = existValue(programRule.condition, values, formatKeyValueType);
                                const value = executeFunctionName(programRule.functionName, existValue(programRule.data, values, formatKeyValueType))

                                if (eval(firstCondition)) {
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
                                if (executeFunctionName(programRule.functionName, existValue(programRule.condition, values, formatKeyValueType))) {
                                    const options = getOptionGroups?.filter((op) => op.id === programRule.optionGroup)?.[0]?.options || []
                                    variable.options = { optionSet: { options: options } }
                                }
                            }
                            break;
                        case "SHOWWARNING":
                            if (variable.name === programRule.variable) {
                                if (executeFunctionName(programRule.functionName, existValue(programRule.condition, values, formatKeyValueType))) {
                                    variable.content = programRule.content
                                } else {
                                    variable.content = ""
                                }
                            }
                            break;
                        case "SHOWERROR":
                            if (variable.name === programRule.variable) {
                                if (executeFunctionName(programRule.functionName, existValue(programRule.condition, values, formatKeyValueType))) {
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
                                if (executeFunctionName(programRule.functionName, existValue(programRule.condition, values, formatKeyValueType))) {
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
                                const orgUnitGroup = programRule?.condition?.replace(/[^a-zA-Z]/g, '')
                                const foundOrgUnitGroup = orgUnitsGroups?.filter(x => x.value === orgUnitGroup)

                                if (foundOrgUnitGroup.length > 0) {

                                    if (foundOrgUnitGroup[0]?.organisationUnits.findIndex(x => x.value === values["orgUnit"]) > -1) {
                                        const options = getOptionGroups?.filter((op) => op.id === programRule.optionGroup)?.[0]?.options?.slice()?.sort(compareStringByLabel) || []

                                        variable.options = { optionSet: { options: variable?.initialOptions?.optionSet?.options?.filter(obj1 => !options.some(obj2 => obj2.value === obj1.value)) } }
                                    }
                                }
                            }
                            break;

                        default:
                            break;
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

// remove scpecial characters
export function removeSpecialCharacters(text: string | undefined) {
    if (typeof text === "string") {
        return text
            .replaceAll("d2:hasValue", "")
            .replaceAll("d2:yearsBetween", "")
            .replaceAll("d2:concatenate", "")
            .replaceAll("d2:inOrgUnitGroup", "")
            .replaceAll("#{", "")
            .replaceAll("A{", "")
            .replaceAll("V{", "")
            .replaceAll("}", "")
            .replaceAll("current_date", `'${format(new Date(), "yyyy-MM-dd")}'`);
    }
}

// replace condition with specific variable
export function replaceConditionVariables(condition: string | undefined, variables: Record<string, string | undefined>) {
    let newcondition = condition;
    for (const value of Object.keys(variables)) {
        if (newcondition?.includes(value)) {
            newcondition = newcondition.replaceAll(value, `'${variables[value]}'` || "''")
        }
    }
    return newcondition;
}

// get function name
export function getFunctionExpression(condition: string | undefined) {
    return condition?.split("d2:")?.[1]?.split("(")[0];
}

// replace variables with specific value
export function replaceEspecifValue(values: Record<string, any>, variables: Record<string, string>, variable: string) {
    // eslint-disable-next-line no-prototype-builtins
    if (values.hasOwnProperty(variables[variable])) {
        if (values[variables[variable]] != false) {

            return `'${values[variables[variable]]}'`;
        }
    }

    return false;
}

// execute function
function executeFunctionName(functionName: string | undefined, condition: string | undefined) {
    switch (functionName) {
        case "hasValue":
            return eval(condition ?? "");
        case "yearsBetween":
            return eval(d2YearsBetween(condition, condition?.split(")")) ?? "");

        case "inOrgUnitGroup":
            console.log(condition);
            return true
        default:
            return eval(condition ?? "");
    }
}

// get years between dates
function d2YearsBetween(origin: string | undefined, condition: string[] | undefined): string | undefined {
    if (!origin || !condition || condition.length !== 1) {
        return undefined;
    }
    const [date1Str, date2Str] = condition[0].split(",").map(date => date.trim());
    const date1 = new Date(date1Str.replaceAll("(", ""));
    const date2 = new Date(date2Str);
    if (isNaN(date1.getTime()) || isNaN(date2.getTime())) {
        return undefined;
    }
    const diffYears = Math.abs(date2.getFullYear() - date1.getFullYear());
    return origin.replace(condition[0], String(diffYears)).replace(")", "");
}



// replace varieble by value from condition
export function existValue(condition: string | undefined, values: Record<string, any> = {}, formatKeyValueType: any) {
    let localCondition = `'false'`;
    for (const value of Object.keys(values) || []) {
        if (condition?.includes(value)) {
            if (localCondition.includes(`'false'`)) {
                localCondition = condition
            }

            switch (formatKeyValueType[value]) {
                case "BOOLEAN":
                    localCondition = localCondition.replaceAll(value, `${values[value]}`.replace("false", "0").replace("true", "1"))
                    break;

                case "NUMBER":
                case "INTEGER_ZERO_OR_POSITIVE":
                    localCondition = localCondition.replaceAll(`'${value}'`, String(Number(values[value] ?? 0)))
                    break;

                default:
                    localCondition = localCondition.replaceAll(value, `${values[value]}`)
                    break;
            }
        }
    }

    return localCondition;
}

export function getValueTypeVariable(variables: any, variable: any, type: string) {
    if (type === "programStageSection") {
        let variableType = ""
        variables?.map((section: any) => {
            section?.fields?.map((sectionVar: any) => {
                if (sectionVar.name === variable.variable) {
                    variableType = sectionVar.valueType
                }
            });
        });
        return variableType
    }
}