import { ReactNode, useState, useEffect } from "react";
import Form from "@components/UI/Form";
import { Text, TextArea, FilePicker } from "@components/UI/Field";
import Button from "@components/UI/Button";
import Title from "@components/UI/Title";
import { useUpdateProfileMutation } from "@store/api/usersApi";
import { useTranslation } from "next-i18next";

interface UpdateProps {
    title?: string, 
    name: string, 
    value?: any, 
    type: 'text' | 'textarea' | 'file'
}

const UpdateProfileForm = ({ name, value, title, type } : UpdateProps ) => {
    const [fields, setFields] = useState({});
    const [validFields, setValidFields] = useState({});
    let [update, { isLoading, isSuccess }] = useUpdateProfileMutation();

    const {t} = useTranslation('common');

    useEffect(() => {
        if (isSuccess) {
            setFields({});
            setValidFields({});
        }
    }, [isSuccess])

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
                        case 'file':
                            return <FilePicker
                                style=""
                                accept="image/jpeg, image/png"                                
                                name={name} 
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
                    className="mt-3 w-full" 
                    type="submit"
                    isLoading={isLoading}
                    disabled={!Object.keys(validFields).some(key  => validFields[key] == false )}
                    onClick={() => update(fields)}
                >
                    {t('interface.submit')}
                </Button>
            </Form>
        </>
    );
}

export default UpdateProfileForm;