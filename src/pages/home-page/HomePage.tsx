import React, { useEffect, useState } from 'react';
import Carousel from '../../components/carousel/Carousel'
import image1 from "../../assets/carousel/carousel-1.jpg"
import image2 from "../../assets/carousel/carousel-2.jpg"
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Axios from 'axios';
import useProvideUniversity from '../../services/universityService';
import { UniversityInterface } from '../../interfaces/university.interface';
import Loader from '../../components/loader/Loader'
import CustomCard from '../../components/card/Card'
import { Typography } from '@material-ui/core';
import InputButton from "../../components/inputButton/InputButton"
import TelegramIcon from '@material-ui/icons/Telegram';
import usersJson from "../../json/users.json";
import * as yup from 'yup';
import { SchemaOf } from 'yup';
import { useFormik } from 'formik';
import { useSnackbars } from '../../components/customSnackbar/CustomizedSnackbar';

interface SubscriberInterface {
    email: string
}
const validationSchema: SchemaOf<SubscriberInterface> = yup.object({
    email: yup
        .string()
        .email('Enter a valid email')
        .required('Email is required'),
});

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flex: 1,
        },
        content: {
            padding: theme.spacing(4),
            margin: 'auto',
        },
        form: {
            padding: theme.spacing(4),
            boxSizing: "border-box",
            '& > *': {
                width: '100%',
            },
        },
        title: {
            padding: theme.spacing(4, 4, 0, 4),
            textAlign: 'left',
            textDecoration: 'underline'
        },
        iconButton: {
            padding: 6,
            borderRadius: 5,
            color: "#ffff",
            backgroundColor: theme.palette.primary.main,
            marginLeft: theme.spacing(2),
            '&:hover': {
                backgroundColor: theme.palette.primary.main
            }
        },
    }));

export default function HomePage() {
    const classes = useStyles()
    const { getFromFavorites, toggleFavorites } = useProvideUniversity()
    const [universities, setuniversities] = useState<UniversityInterface[] | undefined>([])
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const { setSnackbarState } = useSnackbars()
    const [values] = useState<SubscriberInterface>({
        email: ""
    })

    useEffect(() => {
        let source = Axios.CancelToken.source()
        const loadData = async () => {
            setIsLoading(true)
            try {
                const universities: UniversityInterface[] | undefined = await getFromFavorites()
                setIsLoading(false)
                setuniversities(universities)
            } catch (error) {
                if (Axios.isCancel(error)) {
                    console.log('Cancel Call UniversityPage.....');
                } else {
                    throw error
                }
            }
        }
        loadData()
        return () => {
            console.log('Unmounting HomePage.....');
            source.cancel()
        }
    }, [getFromFavorites])

    const handleFavorite = (data: UniversityInterface) => {
        const newUniversity = universities?.map((uni) => {
            if (uni.name === data.name) {
                return ({ ...uni, isFavorite: !data.isFavorite })
            }
            return uni
        })
        toggleFavorites({ ...data, isFavorite: !data.isFavorite })
        setuniversities(newUniversity)
    }

    const images = [
        {
            title: 'Lorem ipsum dolor sit amet consectetur.',
            subTitle: "Praesent lectus neque, iaculis et enim nec, consectetur pharetra turpis.",
            src: image1
        },
        {
            title: 'Lorem ipsum dolor sit amet consectetur rerum.',
            subTitle: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Fugiat?.',
            src: image2
        }
    ]

    const handleSubmitFake = () => (): void => {

    };

    const formik = useFormik({
        initialValues: values,
        validationSchema: validationSchema,
        onSubmit: (values) => {
            let newUsersJson = [...usersJson as any[], { email: values.email }]
            const fileData = JSON.stringify(newUsersJson);
            const blob = new Blob([fileData], { type: "text/plain" });
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.download = `users.json`;
            link.href = url;
            link.click();
            setSnackbarState({ status: true, message: "Thank you, we'll keep you up to date", severity: "success" })

        }
    });


    return (
        <div className={classes.root}>
            <Carousel imagesArray={images} />
            <Typography className={classes.title} variant="h5">Our Newsletter:</Typography>
            <form className={`${classes.form}`} onSubmit={formik.handleSubmit}>
                <Typography variant="subtitle2">
                    Stay up to date on the latest university news, study tutorials, resources, and more. Delivered every Tuesday, for free.
                </Typography>
                <br />
                <InputButton
                    id="email"
                    name="email"
                    value={formik.values.email}
                    handleOnChange={formik.handleChange}
                    toggleAction={handleSubmitFake}
                    icon={<TelegramIcon />}
                    placeholder={'Confirm your email address'} />
            </form>

            <Typography className={classes.title} variant="h5">Your Favorites:</Typography>
            <section className={`${classes.content} layout-column content-center`}>
                {
                    isLoading ? <Loader /> : universities?.map((data, i) => (<CustomCard key={i} data={universities as UniversityInterface[]} index={i} handleFavorite={handleFavorite} />))
                }
            </section>
        </div>
    );
}