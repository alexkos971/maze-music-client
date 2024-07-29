import { MouseEvent } from "react";
import {EditBlack} from "@utils/images";
import { twMerge } from "tailwind-merge";

interface Props {    
    onClick: (event: MouseEvent<HTMLElement>) => void,
    className?: string;
}

const EditButton = ({className, ...props} :  Props ) => (
    <button {...props} type="button" className={twMerge('w-6 h-6 flex-shrink-0 svg-current-color text-inherit', className ?? '')}>
        <EditBlack className="w-full h-full object-contain"/>
    </button>
);

export default EditButton; 