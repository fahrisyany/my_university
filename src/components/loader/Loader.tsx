import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            '& > div': {
                backgroundColor: theme.palette.primary.main
            }
        }
    }));


export default function Loader() {
    const classes = useStyles()

    return (
        <div className={`${classes.root} lds-facebook`}><div></div><div></div><div></div></div>
    );
}
