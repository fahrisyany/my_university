import React, { useEffect, useState } from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import FilterBillingsInput from './directives/FilterInput'
import BillingCard from './directives/UniversityCard'
import { useHistory } from "react-router-dom";
import useProvideBilling from '../../services/universityService';
import Axios from 'axios';
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


function BillingPage() {
    const classes = useStyles()
    const history = useHistory();
    const { getUniversities } = useProvideBilling()
    const [state, setState] = useState<UniversityInterface[]>([])

    useEffect(() => {
        let source = Axios.CancelToken.source()
        const loadData = async () => {
            try {
                let res: UniversityInterface[] = await getUniversities(source)
                setState(res)
            } catch (error) {
                if (Axios.isCancel(error)) {
                    console.log('Cancel Call BillingPage.....');
                } else {
                    throw error
                }
            }
        }
        loadData()
        return () => {
            console.log('Unmounting BillingPage.....');
            source.cancel()
        }
    }, [])

    return (
        <div className={classes.root}>
            <FilterBillingsInput />
            <section className={`${classes.universityList} layout align-center`}>
                {
                    state.length === 0 ? <Loader /> : <BillingCard data={state} />
                }
            </section>
        </div>
    );
}

export default BillingPage;
