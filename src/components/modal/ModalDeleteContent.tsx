import React, { useState, useRef } from "react";
import classNames from "classnames";
import styles from "./modal.module.css";
import { Form } from "react-final-form";
import WithPadding from "../template/WithPadding";
import { useParams, useShowAlerts } from "../../hooks";
import { Divider, ListItem, ListItemText } from "@material-ui/core";
import { ModalDeleteContentProps } from "../../types/modal/ModalProps";
import { ModalActions, Button, ButtonStrip, CircularLoader, CenteredContent, NoticeBox, IconCross24, IconCheckmark24 } from "@dhis2/ui";


function ModalDeleteContent(props: ModalDeleteContentProps): React.ReactElement {
    const { setOpen, eventsList, loading, sectionName } = props
    const { urlParamiters } = useParams();
    const { schoolName } = urlParamiters()
    const { show } = useShowAlerts()
    const [initialValues] = useState<object>({})
    const [clickedButton, setClickedButton] = useState<string>("");
    const formRef: React.MutableRefObject<FormApi<IForm, Partial<IForm>>> = useRef(null);
    const modalActions = [
        { id: "cancel", type: "button", label: "Cancel", disabled: false, onClick: () => { setClickedButton("cancel"); setOpen(false) } },
        { id: "saveandcontinue", type: "submit", label: "Delete enrollment", destructive: true, disabled: false, loading: false, onClick: () => { setClickedButton("saveandcontinue"); } }
    ];

    function onSubmit() { }

    if (0) {
        show({ message: "An unknown error occurred while deleting the student", type: { critical: true } })
    }

    function onChange(e: any): void { }


    if (loading) {
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
                    {sectionName.toLowerCase()} from <strong>{schoolName}.</strong>{" "} Enrollment Details:{" "}
                    {
                        eventsList?.registration?.map((x: any) =>
                            <><strong>{x.code.toUpperCase()}: </strong><span>{x.value}.</span>{" "}</>
                        )
                    }
                </p>
            </React.Fragment>
            <Form initialValues={initialValues} onSubmit={onSubmit}>
                {({ handleSubmit, values, form }) => {
                    formRef.current = form;
                    return <form
                        onSubmit={handleSubmit}
                        onChange={onChange(values) as unknown as () => void}
                    >
                        {eventsList?.events?.map((event: any, index: number) =>
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
                            <strong>Attention:</strong> The {sectionName.toLowerCase()} will be deleted and can no longer be accessed.
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