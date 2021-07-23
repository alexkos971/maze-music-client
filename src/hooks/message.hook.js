import { useCallback, useState} from 'react';
// import Message from "./index.jsx";

export const useMessage = () => {
    const [ isVisible, setIsVisible ] = useState(false);
    const [ message, setMessage ] = useState(null);

    return useCallback(text => {
        if (text) {
            alert(text)
            setIsVisible(true);
            
            setTimeout(() => {
                setIsVisible(false);
                setMessage(null)
            }, 3000);
        }
        return { isVisible, message, setMessage }
    }, [message, isVisible])
}