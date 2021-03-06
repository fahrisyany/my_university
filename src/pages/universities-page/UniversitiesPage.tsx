import React, { useEffect, useState } from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import UniversityCard from './directives/UniversityCard'
import useProvideUniversity from '../../services/universityService';
import Axios, { CancelTokenSource } from 'axios';
import { UniversityInterface } from '../../interfaces/university.interface';
import Loader from '../../components/loader/Loader'
import { useDebounce } from 'use-debounce';
import InputButton from "../../components/inputButton/InputButton"
import TuneIcon from '@material-ui/icons/Tune';
import { useDrawer } from "../../components/drawer/Drawer"

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            padding: theme.spacing(8, 4, 0),
            flex: 1,
        },
        universityList: {
            marginTop: theme.spacing(4),
            margin: 'auto',
        },
    }));


function UniversityPage() {
    const classes = useStyles()
    const { getUniversities, toggleFavorites, getFromFavorites } = useProvideUniversity()
    const [universities, setuniversities] = useState<UniversityInterface[]>([])
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [query, setquery] = useState<string>("indonesia")
    const [queryValue] = useDebounce(query, 800);
    const { toggleDrawer } = useDrawer()

    useEffect(() => {
        const source = Axios.CancelToken.source()
        setIsLoading(true)
        const loadData = async (source: CancelTokenSource) => {
            try {
                const favorites = await getFromFavorites()
                const res: UniversityInterface[] = await getUniversities(source, queryValue)
                const createFavorite = res.map((uni) => {
                    favorites?.forEach(fav => {
                        if (fav.name === uni.name) {
                            uni.isFavorite = fav.isFavorite
                        }
                    })
                    return uni
                })

                setIsLoading(false)
                setuniversities(createFavorite)
            } catch (error) {
                if (Axios.isCancel(error)) {
                    console.log('Cancel Call UniversityPage.....');
                } else {
                    throw error
                }
            }
        }
        loadData(source)
        return () => {
            console.log('Unmounting UniversityPage.....');
            source.cancel()
        }
    }, [getUniversities, queryValue, getFromFavorites])

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

    const handleOnChange = (e: any) => {
        setquery(e.target.value)
    }

    return (
        <div className={classes.root}>
            <InputButton value={query} toggleAction={toggleDrawer} handleOnChange={handleOnChange} icon={<TuneIcon />} placeholder={'Search country'} />
            <section className={`${classes.universityList} layout align-center`}>
                {
                    isLoading ? <Loader /> : <UniversityCard data={universities} handleFavorite={handleFavorite} />
                }
            </section>
        </div>
    );
}

export default UniversityPage;
