import { Label } from "@dhis2/ui";
import React from "react";
import WithBorder from "../template/WithBorder";
import WithPadding from "../template/WithPadding";
import GenericFields from "../genericFields/GenericFields";
import { type CustomAttributeProps } from "../../types/table/AttributeColumns";
import Subtitle from "../text/subtitle";

interface FormProps {
    name: string
    description: string
    fields: CustomAttributeProps[]
    disabled: boolean
}

function GroupForm(props: FormProps) {
    const { name, fields, description } = props

    return (
        <WithBorder type={"all"}>
            <WithPadding p={"16px 5px 0px 5px"}>
                <Subtitle label={name} />
                <WithPadding />
                <Label>{description}</Label>
                <WithPadding p="0.2rem" />
                <WithPadding p={"10px"}>
                    {fields?.filter(x => x.visible)?.map((x, i) => {
                        return (
                            <div className="row d-flex align-items-center" key={i}
                                style={{ display: "flex", padding: (x.error ?? false) ? "8px 8px 8px 12px" : "8px 8px 8px 5px", backgroundColor: (x.error === true) ? "#FBEAE5" : i % 2 === 0 ? "#ebf0f6" : "#FFFF", height: (x.error ?? false) ? 102 : "auto" }}>
                                <div className="col-12 col-md-6 d-flex">
                                    <Label style={{ color: "rgba(0, 0, 0, 0.87)" }}>
                                        {x.labelName} {x.required ? " *" : ""}
                                    </Label>
                                </div>
                                <div className="col-12 col-md-6">
                                    <GenericFields
                                        attribute={x}
                                        disabled={x.disabled}
                                        valueType={x.valueType}
                                    />
                                    <span style={{ color: "#E53935", marginTop: 20 }}>
                                        {x.content}
                                    </span>
                                </div>
                            </div>
                        )
                    }
                    )}
                </WithPadding>
            </WithPadding>
        </WithBorder>
    )
}

export default GroupForm;
