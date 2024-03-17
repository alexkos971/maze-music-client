import { ReactNode, useState } from "react";
import Form from "@components/UI/Form";
import { Text, TextArea, FilePicker } from "@components/UI/Field";
import Button from "@components/UI/Button";
import Title from "@components/UI/Title";
import { useUpdateMutation } from "@store/api/profileApi";

interface UpdateProps {
    title?: string, 
    name: string, 
    value?: any, 
    type: 'text' | 'textarea' | 'file'
}

const UpdateProfileForm = ({ name, value, title, type } : UpdateProps ) => {
    const [fields, setFields] = useState({});
    const [validFields, setValidFields] = useState({});
    let [update, { isLoading }] = useUpdateMutation();

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
                    disabled={!Object.keys(validFields).some(key => validFields[key] == false )}
                    onClick={() => update(fields)}
                >Submit</Button>
            </Form>
        </>
    );
}

export default UpdateProfileForm;