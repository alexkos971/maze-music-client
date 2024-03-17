import { classnames } from "@helpers/classnames";
import styles from "./Modal.module.scss";
import { useAppDispatch, useAppSelector } from "@hooks";
import { toggleModal } from "@store/reducers/interfaceReducer";

export interface ModalProps {
    isOpened: boolean,
    content: JSX.Element | null
}

const Modal = () => {
    const dispatch = useAppDispatch();
    const [ { content, isOpened } ] = useAppSelector(state => [ state.interface.modal ]);

    return (
        <div className={classnames(styles.modal, isOpened ? styles.modal_opened : '')}>
            <div className={styles.modal__background} onClick={() => dispatch(toggleModal({isOpened: false}))}></div>
            
            <div className={styles.modal__content}>
                <button onClick={() => dispatch(toggleModal({isOpened: false}))} className={styles['modal__close-btn']}></button>
                
                {content ?? <></>}
            </div>
        </div>
    )
}

export default Modal;