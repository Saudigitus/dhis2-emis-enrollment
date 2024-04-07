import React, { useState } from "react";
import classNames from "classnames";
import styles from "./modal.module.css";
import { Form } from "react-final-form";
import WithPadding from "../template/WithPadding";
import { useParams, useShowAlerts, useDeleteEvent, useDeleteEnrollment, useGetTotalEnrollments, useDeleteTEI } from "../../hooks";
import { Divider, ListItem, ListItemText } from "@material-ui/core";
import { ModalDeleteContentProps } from "../../types/modal/ModalProps";
import { ModalActions, Button, ButtonStrip, CircularLoader, CenteredContent, NoticeBox, IconCross24, IconCheckmark24 } from "@dhis2/ui";
import { useRecoilState, useRecoilValue } from "recoil";
import { ProgramConfigState } from "../../schema/programSchema";
import { TeiRefetch } from "../../schema/refecthTeiSchema";

function ModalDeleteContent(props: ModalDeleteContentProps): React.ReactElement {
    const { setOpen, initialValues, loading: loadingInitialValues, sectionName } = props
    const { urlParamiters } = useParams();
    const { schoolName, school } = urlParamiters()
    const { show } = useShowAlerts()
    const [clicked, setClicked] = useState<string>("");
    const getProgram = useRecoilValue(ProgramConfigState);
    const { deleteEvent } = useDeleteEvent()
    const { deleteEnrollment } = useDeleteEnrollment()
    const { getTotalEnrollment } = useGetTotalEnrollments()
    const { deleteTEI } = useDeleteTEI()
    const [refetch, setRefetch] = useRecoilState(TeiRefetch)
    const [loading, setLoading] = useState(false)

    const modalActions = [
        { id: "cancel", type: "button", label: "Cancel", disabled: loading || loadingInitialValues, onClick: () => { setClicked("cancel"); setOpen(false) } },
        { id: "saveandcontinue", type: "submit", label: "Delete enrollment", destructive: true, disabled: loading || loadingInitialValues, loading: loading || loadingInitialValues, onClick: () => { setClicked("saveandcontinue"); } }
    ];

    async function onSubmit() {
        setLoading(true)
        const promises = [];
        for (let index = 0; index < initialValues.eventsId.length; index++) {
            promises.push(deleteEvent(initialValues.eventsId[index]));
        }
        promises.push(deleteEnrollment(initialValues.enrollment))

        await getTotalEnrollment(getProgram.id, school as unknown as string, initialValues.trackedEntity)
            .then((resp: any) => {
                if (resp?.results?.instances?.length < 1) {
                    promises.push(deleteTEI(initialValues.trackedEntity))
                }
            })

        await Promise.all(promises)
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
                    {sectionName.toLowerCase()} from <strong>{schoolName}.</strong>{" "}<br/>
                    {
                        initialValues?.registration?.map((x: any) =>
                            <><span className={classNames(styles.textCapDetails)}>{x.code}: </span><strong>{x.value}.</strong>{" "}</>
                        )
                    }
                </p>
            </React.Fragment>
            <Form initialValues={initialValues} onSubmit={onSubmit}>
                {({ handleSubmit }) => {
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