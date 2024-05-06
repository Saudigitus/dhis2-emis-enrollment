import React, { useState, useRef } from "react";
import classNames from "classnames";
import styles from "./modal.module.css";
import { Form } from "react-final-form";
import WithPadding from "../template/WithPadding";
import { useParams, useShowAlerts, useDeleteSelectedEnrollment } from "../../hooks";
import { Divider, ListItem, ListItemText } from "@material-ui/core";
import { ModalDeleteContentProps } from "../../types/modal/ModalProps";
import { ModalActions, Button, ButtonStrip, CircularLoader, CenteredContent, NoticeBox, IconCross24, IconCheckmark24 } from "@dhis2/ui";
import { useRecoilState } from "recoil";
import { TeiRefetch } from "../../schema/refecthTeiSchema";
import GroupForm from "../form/GroupForm";
import Subtitle from "../text/subtitle";
import { Collapse } from "@material-ui/core";
import WithBorder from "../template/WithBorder";
import { ExpandLess, ExpandMore } from "@material-ui/icons";

function ModalDeleteContent(props: ModalDeleteContentProps): React.ReactElement {
    const { setOpen, initialValues, loading: loadingInitialValues, sectionName } = props
    const { urlParamiters } = useParams();
    const { schoolName } = urlParamiters()
    const { show } = useShowAlerts()
    const formRef: React.MutableRefObject<FormApi<IForm, Partial<IForm>>> = useRef(null);
    const [clicked, setClicked] = useState<string>("");
    const [refetch, setRefetch] = useRecoilState(TeiRefetch)
    const [loading, setLoading] = useState(false)
    const { deleteSelectedEnrollment } = useDeleteSelectedEnrollment()
    const [collapse, setCollapse] = useState<boolean>(false)

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
    return (
        <WithPadding>
            <Form initialValues={{ ...initialValues.initialValues }} onSubmit={onSubmit}>
                {({ handleSubmit, form }) => {
                    formRef.current = form;
                    return <form onSubmit={handleSubmit}>
                        <div className={styles.detailsTableGroup}>
                            <GroupForm
                                disabled={true}
                                name={`${sectionName} profile`}
                                fields={initialValues?.attributes}
                            />

                            <WithPadding p={'0 0.8em'}>
                                <ButtonStrip end>
                                    <div dir="rtl">
                                        <Button small secondary onClick={() => setCollapse(!collapse)} icon={collapse ? <ExpandLess /> : <ExpandMore />}>Enrollment details</Button>
                                    </div>
                                </ButtonStrip>
                            </WithPadding>

                            <Collapse in={collapse}>
                                <GroupForm
                                    disabled={true}
                                    name={"Enrollment Details"}
                                    fields={initialValues?.registration}
                                />
                            </Collapse>
                        </div>
                        <WithPadding p={'0 0.4em'}>
                            <Subtitle label="Enrollment summary" />
                        </WithPadding>
                        <br />
                        <WithPadding p={'0 0.8em'}>
                            <WithBorder type="all">
                                {initialValues?.events?.map((event: any) =>
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
                                )}
                            </WithBorder>

                            <br />
                            < NoticeBox
                                warning
                                title={<p className={styles.noticeBoxTitle}>Are you sure you want
                                    to <span className={classNames(styles.redText)}>delete</span> the
                                    selected {sectionName.toLowerCase()} from <strong>{schoolName}?</strong></p>
                                }
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
                        </WithPadding>
                    </form>
                }}
            </Form>
        </WithPadding >
    )
}

export default ModalDeleteContent;