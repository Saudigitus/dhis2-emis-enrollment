import React, { useState, useRef } from "react";
import classNames from "classnames";
import styles from "./modal.module.css";
import { Form } from "react-final-form";
import WithPadding from "../template/WithPadding";
import { useParams, useShowAlerts, useDeleteSelectedEnrollment } from "../../hooks";
import { Divider, ListItem, ListItemText } from "@material-ui/core";
import { ModalDeleteContentProps } from "../../types/modal/ModalProps";
import { ModalActions, Button, ButtonStrip, CircularLoader, CenteredContent, NoticeBox, IconCross24, IconCheckmark24 } from "@dhis2/ui";
import { useRecoilState, useRecoilValue } from "recoil";
import { ProgramConfigState } from "../../schema/programSchema";
import { TeiRefetch } from "../../schema/refecthTeiSchema";
import { getDisplayName } from "../../utils/table/rows/getDisplayNameByOption";
import GroupForm from "../form/GroupForm";

function ModalDeleteContent(props: ModalDeleteContentProps): React.ReactElement {
    const { setOpen, initialValues, loading: loadingInitialValues, sectionName } = props
    const { urlParamiters } = useParams();
    const { schoolName } = urlParamiters()
    const { show } = useShowAlerts()
    const formRef: React.MutableRefObject<FormApi<IForm, Partial<IForm>>> = useRef(null);
    const [clicked, setClicked] = useState<string>("");
    const getProgram = useRecoilValue(ProgramConfigState);
    const [refetch, setRefetch] = useRecoilState(TeiRefetch)
    const [loading, setLoading] = useState(false)
    const { deleteSelectedEnrollment } = useDeleteSelectedEnrollment()

    const modalActions = [
        { id: "cancel", type: "button", label: "Cancel", disabled: loading || loadingInitialValues, onClick: () => { setClicked("cancel"); setOpen(false) } },
        { id: "saveandcontinue", type: "submit", label: "Delete", destructive: true, disabled: loading || loadingInitialValues, loading: loading || loadingInitialValues, onClick: () => { setClicked("saveandcontinue"); } }
    ];

    async function onSubmit() {
        setLoading(true)
        deleteSelectedEnrollment(initialValues)
            .then(() => {
                setLoading(false)
                setRefetch(!refetch)
                setOpen(false)
            })
            .catch((error) => {
                setLoading(false)
                setRefetch(!refetch)
                show({ message: `An unknown error occurred while deleting the ${sectionName}: ${error.message}`, type: { critical: true } })
                setOpen(false)
            })
    }


    if (loadingInitialValues) {
        return (
            <CenteredContent>
                <CircularLoader />
            </CenteredContent>
        )
    }
    console.log(initialValues)
    return (
        <WithPadding>
            <Form initialValues={initialValues} onSubmit={onSubmit}>
                {({ handleSubmit, form }) => {
                    formRef.current = form;
                    return <form onSubmit={handleSubmit}>
                        <React.Fragment>
                            <div className={styles.detailsTableGroup}>
                                <div>
                                    <th colSpan={2}><strong>{sectionName} details</strong></th>
                                    {
                                        initialValues?.attributes?.map((x: any) => {
                                            return (
                                                <tr>
                                                    <td className={styles.leftCell}><span className={classNames(styles.textCapDetails)}>{x.displayName}: </span></td>
                                                    <td><strong> {getDisplayName({ metaData: x.attribute, value: x.value, program: getProgram })}</strong></td>
                                                </tr>
                                            )
                                        })
                                    }
                                </div>
                                <div>
                                    <th colSpan={2}> <strong>Enrollment details</strong></th>
                                    {
                                        initialValues?.registration?.map((x: any) =>
                                            <tr>
                                                <td className={styles.leftCell}><span className={classNames(styles.textCapDetails)}>{x.code}: </span></td>
                                                <td><strong>{x.value}</strong></td>
                                            </tr>
                                        )
                                    }
                                </div>
                            </div>
                        </React.Fragment>
                        <strong>Enrollment summary</strong>
                        {initialValues?.events?.map((event: any) =>
                            <>
                                <ListItem className={classNames(styles.listItem)}>
                                    <ListItemText primary={event.name} />
                                    <div className={classNames(styles.valuesFlex)}>
                                        <span className={classNames(styles[event.class])}>
                                            {event.repeatable ? event.value : event.value ? <IconCheckmark24 /> : <IconCross24 />}
                                        </span>
                                        <span className={classNames(styles[event.class], styles.iconLabel)}>
                                            {event.label}
                                        </span>
                                    </div>
                                </ListItem>
                                <Divider />
                            </>
                        )}

                        <br />
                        < NoticeBox
                            warning
                            title={<p className={styles.noticeBoxTitle}>Are you sure you want to <span className={classNames(styles.redIcon)}>delete</span> the selected {sectionName.toLowerCase()} from <strong>{schoolName}.</strong></p>}
                        >
                            This {sectionName.toLowerCase()} enrollment will be deleted and can no longer be accessed.
                        </NoticeBox>
                        <ModalActions>
                            <ButtonStrip end>
                                {modalActions.map((action, i) => (
                                    <Button
                                        key={i}
                                        {...action}
                                    >
                                        {action.label}
                                    </Button>
                                ))}
                            </ButtonStrip>
                        </ModalActions>
                    </form>
                }}
            </Form>
        </WithPadding >
    )
}

export default ModalDeleteContent;