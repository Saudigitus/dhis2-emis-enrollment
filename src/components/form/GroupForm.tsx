import { Label } from "@dhis2/ui";
import React from "react";
import WithBorder from "../template/WithBorder";
import WithPadding from "../template/WithPadding";
import GenericFields from "../genericFields/GenericFields";
import Subtitle from "../text/subtitle";
import styles from './groupform.module.css'
import { GroupFormProps } from "../../types/form/GroupFormProps";

function GroupForm(props: GroupFormProps) {
    const { name, fields, description, bulkUpdate } = props

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
                                    <Label className={styles.label}>
                                        {x.labelName} {x.required ? " *" : ""}
                                    </Label>
                                </div>
                                <div className="col-12 col-md-6">
                                    <GenericFields
                                        attribute={
                                            (bulkUpdate && x.id !== 'RhABRLO2Fae') ? { ...x, required: false } : x
                                        }
                                        disabled={
                                            bulkUpdate ? x.id !== 'RhABRLO2Fae' : x.disabled
                                        }
                                        valueType={x.valueType}
                                    />
                                    <span className={styles.content}>
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
