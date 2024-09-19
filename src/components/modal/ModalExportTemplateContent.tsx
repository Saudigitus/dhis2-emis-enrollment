import React, { useState, useRef, useEffect } from "react";
import { ModalActions, Button, ButtonStrip, Tag, IconInfo16 } from "@dhis2/ui";
import { Form } from "react-final-form";
import GroupForm from "../form/GroupForm";
import { ModalExportTemplateProps } from "../../types/modal/ModalProps";
import { useParams } from "../../hooks";
import { getDataStoreKeys } from "../../utils/commons/dataStore/getDataStoreKeys";
import useGetExportTemplateForm from "../../hooks/form/useGetExportTemplateForm";
import { formFields } from "../../utils/constants/exportTemplate/exportEmptyTemplateForm";
import { removeFalseKeys } from "../../utils/commons/removeFalseKeys";
import useExportTemplate from "../../hooks/exportTemplate/useExportTemplate";
import { useRecoilState } from "recoil";
import { ProgressState } from "../../schema/linearProgress";
import styles from '../modal/modal.module.css'
import IteractiveProgress from "../progress/interactiveProgress";

const loading = false;

function ModalExportTemplateContent(props: ModalExportTemplateProps): React.ReactElement {
    const {
        setOpen,
        sectionName
    } = props;
    const { exportFormFields } = useGetExportTemplateForm();
    const { registration } = getDataStoreKeys()

    const { urlParamiters } = useParams();
    const {
        school: orgUnit,
        schoolName: orgUnitName,
        academicYear
    } = urlParamiters();

    const formRef: React.MutableRefObject<FormApi<IForm, Partial<IForm>>> = useRef(null);

    const [values, setValues] = useState<Record<string, string>>({})
    const [initialValues] = useState<object>({
        orgUnitName,
        [registration?.academicYear]: academicYear
    })
    const [loadingExport, setLoadingExport] = useState(false)
    const [progress, updateProgress] = useRecoilState(ProgressState)
    const { handleExportToWord } = useExportTemplate()

    useEffect(() => {
        if (progress?.progress >= 100) {
            const timeout = setTimeout(() => {
                updateProgress({ progress: null, buffer: null });
            }, 400);
            return () => clearTimeout(timeout)
        }
    }, [progress?.progress])

    async function onSubmit() {
        await handleExportToWord({
            academicYearId: values[registration.academicYear],
            orgUnit: values.orgUnit,
            orgUnitName: values.orgUnitName,
            studentsNumber: values.studentsNumber,
            setLoadingExport
        })
        // window.open(`${baseUrl}/api/documents/${documentId?.id}/data`, "_blank");
        setOpen(false)
    }

    function onChange(e: any): void {
        // object with form fields data
        setValues(removeFalseKeys(e))
    }

    const modalActions = [
        {
            id: "cancel",
            type: "button",
            label: progress.progress != null ? "Hide" : "Cancel",
            disabled: loading,
            onClick: () => {
                setOpen(false)
            }
        },
        {
            id: "downloadTemplate",
            type: "submit",
            label: "Export",
            primary: true,
            disabled: loadingExport,
            className: progress.prgress != null && styles.remove
        }
    ];

    const Actions = () => {
        return <ModalActions>
            <ButtonStrip end>
                {modalActions.map((action, i) => {
                    return (
                        <Button key={i} {...action} >
                            {action.label}
                        </Button>
                    )
                })}
            </ButtonStrip>
        </ModalActions>
    }
    return (
        <div>
            {
                progress.progress != null ?
                    <>
                        <IteractiveProgress />
                        <Actions />
                    </>
                    :
                    <>
                        <Tag positive icon={<IconInfo16 />} maxWidth="100%">
                            This file will allow the import of new {sectionName} data into the system. Please respect the blocked
                            fields to avoid conflicts.
                        </Tag>

                        <Form initialValues={{
                            ...initialValues,
                            orgUnit
                        }} onSubmit={onSubmit}>
                            {({
                                handleSubmit,
                                values,
                                form
                            }) => {
                                formRef.current = form;
                                return <form
                                    onSubmit={handleSubmit}
                                    onChange={onChange(values) as unknown as () => void}
                                >
                                    {
                                        formFields(exportFormFields, sectionName)?.map((field: any, index: number) => {
                                            return (
                                                <GroupForm
                                                    name={field.section}
                                                    description={field.description}
                                                    key={index}
                                                    fields={field.fields}
                                                    disabled={false}
                                                />
                                            )
                                        })
                                    }
                                    <br />
                                    <Actions />
                                </form>
                            }}
                        </Form>
                    </>
            }
        </div>
    )
}

export default ModalExportTemplateContent;
