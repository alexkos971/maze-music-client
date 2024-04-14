import { ReactNode, useState, useEffect } from "react";
import Form from "@components/UI/Form";
import { Text, TextArea, FilePicker } from "@components/UI/Field";
import Button from "@components/UI/Button";
import Title from "@components/UI/Title";
import { useUpdateProfileMutation } from "@store/api/usersApi";
import { useTranslation } from "next-i18next";
import { useAppSelector } from "@hooks";

interface UpdateProps {
    title?: string, 
    name: string, 
    value?: any, 
    type: 'text' | 'textarea' | 'avatar'
}

const UpdateProfileForm = ({ name, value, title, type } : UpdateProps ) => {
    const [fields, setFields] = useState({});
    const [validFields, setValidFields] = useState({});
    let [update, { isLoading, isSuccess }] = useUpdateProfileMutation();
    const modal = useAppSelector(state => state.interface.modal);

    const {t} = useTranslation('common');

    const clearForm = () => {
        setFields({});
        setValidFields({});
    }

    useEffect(() => {
        if (isSuccess || !modal.isOpened) clearForm();
    }, [isSuccess, modal]);

    return (
        <>
            { title ? <Title tag="h3" className="text-center">{title}</Title> : <></>}

            <Form fields={fields} setFields={setFields} validFields={validFields} setValidFields={setValidFields}>
                
                {(() : ReactNode => {
                    switch(type) {
                        case 'textarea':
                            return <TextArea
                                name={name} 
                                required={true}
                                value={value}/>
                        case 'avatar':
                            return <FilePicker
                                accept="image/jpeg, image/png"                                
                                name={name} 
                                style="avatar"
                                preview={value}
                                required={true}/>
                        case "text":
                        default:
                            return <Text 
                                name={name} 
                                required={true}
                                value={value}/>
                    }       
                })()}
                

                <Button 
                    className="mt-4 w-full" 
                    type="submit"
                    isLoading={isLoading}
                    // @ts-ignore
                    disabled={!Object.keys(validFields).some((key: string) => validFields[key] == false )}
                    onClick={() => update(fields)}
                >
                    {t('interface.submit')}
                </Button>
            </Form>
        </>
    );
}

export default UpdateProfileForm;