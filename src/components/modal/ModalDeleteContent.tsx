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
        { id: "saveandcontinue", type: "submit", label: "Delete enrollment", destructive: true, disabled: loading || loadingInitialValues, loading: loading || loadingInitialValues, onClick: () => { setClicked("saveandcontinue"); } }
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


    if (loading || loadingInitialValues) {
        return (
            <CenteredContent>
                <CircularLoader />
            </CenteredContent>
        )
    }

    return (
        <WithPadding>
            <React.Fragment>
                <p>
                    Are you sure you want to  <span className={classNames(styles.redIcon)}>delete</span> the seleted {" "}
                    {sectionName.toLowerCase()} from <strong>{schoolName}.</strong>{" "}<br /><br />

                    <strong>{sectionName} Details:</strong><br />{
                        initialValues?.attributes?.map((x: any) => {
                            return (
                                <>
                                    <span className={classNames(styles.textCapDetails)}>{x.displayName}: </span><strong> {getDisplayName({ metaData: x.attribute, value: x.value, program: getProgram })}.</strong>{" "}
                                    <br />
                                </>
                            )
                        })
                    }
                    <br />
                    <strong>Enrollment Details:</strong><br />{
                        initialValues?.registration?.map((x: any) =>
                            <><span className={classNames(styles.textCapDetails)}>{x.code}: </span><strong>{x.value}.</strong>{" "}</>
                        )
                    }
                    <br />
                </p>
            </React.Fragment>
            <Form initialValues={initialValues} onSubmit={onSubmit}>
                {({ handleSubmit, form }) => {
                    formRef.current = form;
                    return <form onSubmit={handleSubmit}>

                        {initialValues?.events?.map((event: any, index: number) =>
                            <>
                                <ListItem className={classNames(styles.item)}>
                                    <ListItemText primary={event.name} />
                                    <span className={classNames(styles[event.class])}>
                                        {event.repeatable ? event.value : event.value ? <IconCheckmark24 /> : <IconCross24 />}
                                    </span>
                                </ListItem>
                                <Divider />
                            </>
                        )}

                        <br />
                        < NoticeBox error>
                            <strong>Attention:</strong> This {sectionName.toLowerCase()} enrollment will be deleted and can no longer be accessed.
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