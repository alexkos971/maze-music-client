import React, { ReactNode, createContext, Children, cloneElement } from "react";
import ProgressBar from './progressbar';
import styles from "./Steps.module.scss";

interface StepsContextType {
    activeStep: number,
    availableSteps?: number[]
}

type StepComponent = React.FC<{ children: ReactNode, title: string, index?: number }>;
type StepsComponent = React.FC<{ 
    children: JSX.Element | JSX.Element[], 
    activeStep?: number, 
    setActiveStep: (step: number) => void,
    availableSteps?: number[] 
}>;

const StepsContext = createContext<StepsContextType>({
    activeStep: 0,
});

const Steps : StepsComponent = ({ 
    children,
    activeStep = 0,
    setActiveStep,
    availableSteps = [0]
}) => {
    // Make children as array by default
    children = !Array.isArray(children) ? [children] : children;
    
    // let [availableSteps, setAvailableSteps] = useState([0]);
    // let [currentStep, setCurrentStep] = useState(activeStep);


    let changeStep = (step: number): void => {
        setActiveStep(step);
    }

    return (
        <StepsContext.Provider value={{ activeStep, availableSteps }}>
            <div className={styles.steps}>
                <div className={styles.steps__wrap}>
                    {
                        Children.map(children, (child, index) => (
                            cloneElement(child, { index, key: 'step' + index })
                        ))
                    }
                </div>

                <ProgressBar 
                    availableSteps={availableSteps} 
                    currentStep={activeStep}
                    onChangeStep={changeStep}
                    steps={children}/>
            </div>
        </StepsContext.Provider>
    );
}

const Step : StepComponent = ({
    title, 
    children,
    index
}) => {
    
    return (
        <StepsContext.Consumer>
            {({ activeStep }) => {
                let isCurrent = typeof index == 'number' && index == activeStep;
                let stepOffsetCSS = isCurrent ? '0%' : ((typeof index == 'number' && activeStep > index) ? '-100%' : '100%');

                return (
                    <div 
                        style={{'--step-offset': stepOffsetCSS} as React.CSSProperties}
                        className={[styles.steps__step, isCurrent ? styles.steps__step_current : ''].join(' ')} 
                        data-title={title}>
                            {children}
                    </div>
                )
            }}
        </StepsContext.Consumer>
    );
}

export {Steps, Step, StepsContext};