import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import MobileStepper from '@material-ui/core/MobileStepper';
import Button from '@material-ui/core/Button';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
interface CarouselStepperProps {
    steps: number;
    activeStep: number;
    nextSlide: () => void;
    previousSlide: () => void;
}

const useStyles = makeStyles({
    root: {
        flexGrow: 1,
        backgroundColor: "transparent",
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        color: '#ffff'
    },
    text: {
        color: "#ffff",
        fontSize: ".8em",
    },
    disabled: {
        color: "#ffffff87 !important"
    },
    dotActive: {
        backgroundColor: "#FFFFFF !important",
        borderRadius: '8px !important',
        width: '24px !important',
    },
    dot: {
        backgroundColor: "#ffffff87",
        width: '8px',
        height: '8px',
        margin: "0 4px"
    }
});

export default function CarouselStepper(props: CarouselStepperProps) {
    const { nextSlide, previousSlide, steps, activeStep } = props
    const classes = useStyles();
    const theme = useTheme();

    const buttonStyle = {
        text: classes.text, disabled: classes.disabled
    }
    const MobileStepperStyle = {
        root: classes.root, dotActive: classes.dotActive, dot: classes.dot
    }

    return (
        <MobileStepper
            variant="dots"
            steps={steps}
            position="static"
            activeStep={activeStep}
            classes={MobileStepperStyle}
            nextButton={
                <Button size="small" onClick={nextSlide} disabled={activeStep === steps - 1} classes={buttonStyle}>
                    Next
                    {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
                </Button>
            }
            backButton={
                <Button size="small" onClick={previousSlide} disabled={activeStep === 0} classes={buttonStyle}>
                    {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
                     Back
                </Button>
            }
        />
    );
}