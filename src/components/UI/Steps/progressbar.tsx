import { Children } from "react";
import styles from "./Steps.module.scss";

const ProgressItem = ({ 
    isDisabled, title, onClick 
} : { 
    isDisabled: boolean, 
    title: string, 
    index: number, 
    onClick?: () => void 
}) => (

    <button 
        type="button" 
        onClick={onClick ?? undefined}
        className={`${styles['steps__progress-item']} ${isDisabled ? styles['steps__progress-item_disabled'] : ''}`}>
        {title}
    </button>
)

interface ProgressBarProps {
    steps: JSX.Element[],
    currentStep: number,
    onChangeStep: (number: number) => void 
}

const ProgressBar = ({
    currentStep,
    steps,
    onChangeStep
} : ProgressBarProps) => {
    return (
        <div className={styles.steps__progress}>
            {
                Children.map(steps, (item, index) => {
                    if (!item.props.title) return;

                    return (
                        <ProgressItem 
                            key={'progress' + index}
                            title={item.props.title} 
                            index={index}
                            onClick={() => currentStep >= index ? onChangeStep(index) : false}
                            isDisabled={index > currentStep}
                        />
                    );
                })
            }
        </div>
    );
}

export default ProgressBar;