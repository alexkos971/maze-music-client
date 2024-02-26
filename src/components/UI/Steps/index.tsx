import React, { ReactNode, createContext, Children, cloneElement } from "react";
import ProgressBar from './progressbar';
import styles from "./Steps.module.scss";

export interface StepsContextType {
    activeStep: number,
    goToStep?: number[]
}

type StepComponent = React.FC<{ children: ReactNode, title: string, index?: number }>;
type StepsComponent = React.FC<{ 
    children: JSX.Element | JSX.Element[], 
    activeStep?: number, 
    goToStep: (step: number) => void,
    availableSteps?: number[] 
}>;

const StepsContext = createContext<StepsContextType>({
    activeStep: 0,
});

const Steps : StepsComponent = ({ 
    children,
    activeStep = 0,
    goToStep,
}) => {
    // Make children as array by default
    children = !Array.isArray(children) ? [children] : children;

    let changeStep = (step: number): void => {
        goToStep(step);
    }

    return (
        <StepsContext.Provider value={{ activeStep }}>
            <div className={styles.steps}>
                <div className={styles.steps__wrap}>
                    {
                        Children.map(children, (child, index) => (
                            cloneElement(child, { index, key: 'step' + index })
                        ))
                    }
                </div>

                <ProgressBar 
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