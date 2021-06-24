import React, { useEffect, useState } from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import FilterUniversitysInput from './directives/FilterInput'
import UniversityCard from './directives/UniversityCard'
import useProvideUniversity from '../../services/universityService';
import Axios, { CancelTokenSource } from 'axios';
import { UniversityInterface } from '../../interfaces/university.interface';
import Loader from '../../components/Loader'

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            padding: theme.spacing(3, 4, 0),
            flex: 1,
        },
        universityList: {
            marginTop: theme.spacing(8),
            margin: 'auto'
        },
    }));


function UniversityPage() {
    const classes = useStyles()
    const { getUniversities } = useProvideUniversity()
    const [state, setState] = useState<UniversityInterface[]>([])



    useEffect(() => {
        let source = Axios.CancelToken.source()
        const loadData = async (source: CancelTokenSource) => {
            try {
                let res: UniversityInterface[] = await getUniversities(source)
                setState(res)
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
    }, [getUniversities])

    return (
        <div className={classes.root}>
            <FilterUniversitysInput />
            <section className={`${classes.universityList} layout align-center`}>
                {
                    state.length === 0 ? <Loader /> : <UniversityCard data={state} />
                }
            </section>
        </div>
    );
}

export default UniversityPage;
