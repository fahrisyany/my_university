import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            backgroundColor: theme.palette.primary.main,
            color: '#FFFFFF',
            padding: theme.spacing(2, 4),
            position: 'relative',
            marginTop: theme.spacing(6),
            '& p': {
                position: 'relative',
                zIndex: 1,
            }
        },
        boxDecoration: {
            width: '50px',
            height: '50px',
            background: '#44AEF2',
            borderRadius: '4px',
            position: 'absolute',
            left: 0,
            top: 0
        }
    }));

export default function PremiumStatus() {
    const classes = useStyles();

    return (
        <Paper className={classes.root} elevation={0}>
            <Typography gutterBottom variant="body1" component="p" style={{
                fontWeight: 600,
                fontStyle: 'italic'
            }}>
                Premium Subscription Starter
            </Typography>
            <Typography gutterBottom variant="body2" component="p">
                Valid Until : 25 May 2021
            </Typography>
            <div className={classes.boxDecoration} />
        </Paper>
    );
}