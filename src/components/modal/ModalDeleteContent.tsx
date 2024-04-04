import React, { useState, useEffect, useRef } from "react";
import { format } from "date-fns";
import { Form } from "react-final-form";
import { ModalActions, Button, ButtonStrip, CircularLoader, CenteredContent, NoticeBox } from "@dhis2/ui";
import { useParams, useShowAlerts } from "../../hooks";
import WithPadding from "../template/WithPadding";
import GroupForm from "../form/GroupForm";
import { ModalDeleteContentProps } from "../../types/modal/ModalProps";


function ModalDeleteContent(props: ModalDeleteContentProps): React.ReactElement {
    const { setOpen } = props
    const { useQuery } = useParams();
    const formRef: React.MutableRefObject<FormApi<IForm, Partial<IForm>>> = useRef(null);
    const orgUnitName = useQuery().get("schoolName");
    const [, setValues] = useState<object>({})
    const [fieldsWitValue, setFieldsWitValues] = useState<any[]>([])
    const [enrollmentDate, setEnrollmentDate] = useState<any>(format(new Date(), "yyyy-MM-dd"));
    const [clickedButton, setClickedButton] = useState<string>("");
    const { hide, show } = useShowAlerts()
    const [initialValues] = useState<object>({
        registerschoolstaticform: orgUnitName,
        eventdatestaticform: format(new Date(), "yyyy-MM-dd")
    })

    useEffect(() => {  }, [])

    function onSubmit() {
        const allFields = fieldsWitValue.flat()
        
    }




    const modalActions = [
        { id: "cancel", type: "button", label: "Cancel", disabled: false, onClick: () => { setClickedButton("cancel"); setOpen(false) } },
        { id: "saveandcontinue", type: "submit", label: "Delete enrollment", primary: true, disabled: false, loading: false, onClick: () => { setClickedButton("saveandcontinue");  } }
    ];

    if (0) {
        show({ message: "An unknown error occurred while deleting the student", type: { critical: true } })
    }

    if (0) {
        return (
            <CenteredContent>
                <CircularLoader />
            </CenteredContent>
        )
    }

    function onChange(e: any): void {
       
    }

    return (
        <WithPadding>
            <React.Fragment>
                < NoticeBox title={``} warning>
                    
                </NoticeBox>
                <br />
            </React.Fragment>
            <Form initialValues={initialValues} onSubmit={onSubmit}>
                {({ handleSubmit, values, form }) => {
                    formRef.current = form;
                    return <form
                        onSubmit={handleSubmit}
                        onChange={onChange(values) as unknown as ()=> void}
                    >
                        
                        <br />
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
