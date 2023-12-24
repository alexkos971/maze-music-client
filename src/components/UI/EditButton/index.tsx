import { MouseEvent } from "react";
import {EditBlack} from "@helpers/images";
import styles from './EditButton.module.scss';

interface Props {    
    onClick: (event: MouseEvent<HTMLElement>) => void,
    className?: string;
}

const EditButton = ({className, ...props} :  Props ) => (
    <button {...props} type="button" className={`${styles['edit-button']} ${className ?? ''}`}>
        <EditBlack/>
    </button>
);

export default EditButton; 