import React, { useState, useEffect } from 'react'
import { useTransition, animated } from 'react-spring'
import { useSwipeable } from "react-swipeable";
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import CarouselStepper from './CarouselStepper'
interface ImageInterface {
    title: string;
    subTitle: string;
    src: string;
}

interface CarouselProps {
    imagesArray: Array<ImageInterface>;
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            position: "relative"
        },
        carouselSlide: {
            position: 'relative',
            height: '240px',
            width: '100%'
        },
        carouselmg: {
            position: 'absolute',
            minWidth: '100%',
            width: '100%',
            height: '240px',
            filter: 'brightness(45%)',
            objectFit: 'cover'
        },
        carouselText: {
            position: 'absolute',
            zIndex: 99,
            color: 'white',
            left: theme.spacing(4),
            right: theme.spacing(4),
            top: '50%',
            transform: 'translateY(-50%)'
        }
    }),
);

export default function Carousel({ imagesArray }: CarouselProps) {
    const [index, setIndex] = useState<number>(0)
    const [imgUrls, setImgUrls] = useState<ImageInterface[]>([])
    const classes = useStyles();
    const [activeStep, setActiveStep] = React.useState<number>(0);

    useEffect(() => {
        setImgUrls(imagesArray)
    }, [imagesArray]);

    const transitions = useTransition(index, {
        from: { opacity: 0, },
        enter: { opacity: 1, },
        leave: { opacity: 0, },
    })

    const nextSlide = (): void => {
        const lastIndex = imgUrls.length - 1;
        const shouldResetIndex = index === lastIndex;
        const newIndex = shouldResetIndex ? 0 : index + 1;
        setIndex(newIndex)
        // setDirection(true)
        setActiveStep(newIndex);
    }
    const previousSlide = (): void => {
        const lastIndex = imgUrls.length - 1;
        const shouldResetIndex = index === 0;
        const newIndex = shouldResetIndex ? lastIndex : index - 1;
        setIndex(newIndex)
        // setDirection(false)
        setActiveStep(newIndex);
    }

    const handlers = useSwipeable({
        onSwipedLeft: () => { return nextSlide() },
        onSwipedRight: () => { return previousSlide() },
        preventDefaultTouchmoveEvent: true,
        trackMouse: true,
        delta: 10
    });

    return (
        <div className={classes.root}>
            {
                imgUrls.length > 0 &&
                <div className={classes.carouselSlide} {...handlers}>
                    {transitions((style) => (
                        <>
                            <div className={classes.carouselText}>
                                <Typography variant={"h5"}> {imgUrls[index].title}</Typography >
                                <p></p>
                                <Typography variant="subtitle2"> {imgUrls[index].subTitle}</Typography>
                            </div>
                            <animated.img
                                className={classes.carouselmg}
                                style={style}
                                src={imgUrls[index].src}
                                alt={"img-none"}
                            >
                            </animated.img>
                        </>
                    ))}
                </div>
            }
            <CarouselStepper nextSlide={nextSlide} previousSlide={previousSlide} activeStep={activeStep} steps={imagesArray.length} />
        </div>

    )
}