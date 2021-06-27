import React, { useEffect, useState } from 'react';
import Carousel from '../../components/Carousel'
import image1 from "../../assets/carousel/carousel-1.jpg"
import image2 from "../../assets/carousel/carousel-2.jpg"
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Axios from 'axios';
import useProvideUniversity from '../../services/universityService';
import { UniversityInterface } from '../../interfaces/university.interface';
import Loader from '../../components/Loader'
import CustomCard from '../../components/card/Card'
import { Typography } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flex: 1,
        },
        content: {
            padding: theme.spacing(4),
            margin: 'auto',
        },
        title: {
            marginBottom: theme.spacing(4),
            textAlign: 'left'
        }
    }));


export default function HomePage() {
    const classes = useStyles()
    const { getFromFavorites, toggleFavorites } = useProvideUniversity()
    const [universities, setuniversities] = useState<UniversityInterface[] | undefined>([])
    const [isLoading, setIsLoading] = useState<boolean>(false)


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

    return (
        <div className={classes.root}>
            <Carousel imagesArray={images} />
            <section className={`${classes.content} layout-column content-center`}>
                <Typography className={classes.title} variant="h5">Your Favorites:</Typography>
                {
                    isLoading ? <Loader /> : universities?.map((data, i) => (<CustomCard key={i} data={universities as UniversityInterface[]} index={i} handleFavorite={handleFavorite} />))
                }
            </section>
        </div>
    );
}