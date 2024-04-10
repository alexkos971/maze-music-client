import classNames from "classnames";
import styles from "./Modal.module.scss";
import { useAppDispatch, useAppSelector } from "@hooks";
import { toggleModal } from "@store/reducers/interfaceReducer";

export interface ModalProps {
    isOpened: boolean,
    content: JSX.Element | null,
    onClose?: () => void
}

const Modal = () => {
    const dispatch = useAppDispatch();
    const { content, isOpened, onClose } = useAppSelector(state => state.interface.modal);

    const closeModal = () => {
        dispatch(toggleModal({isOpened: false}))
        onClose && onClose();
    }

    return (
        <div className={classNames(styles.modal, isOpened ? styles.modal_opened : '')}>
            <div className={styles.modal__background} onClick={closeModal}></div>
            
            <div className={styles.modal__content}>
                <button onClick={closeModal} className={styles['modal__close-btn']}></button>
                
                {content ?? <></>}
            </div>
        </div>
    )
}

export default Modal;