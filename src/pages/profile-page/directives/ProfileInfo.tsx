import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import profilePlaceholder from '../../../assets/image/profile-placeholder.png'

const useStyles = makeStyles({
    root: {
        display: 'flex',
        flexDirection: 'row',
        border: 'none'
    },
    media: {
        width: '100px',
        objectFit: 'contain'
    },
});

export default function ProfileInfo() {
    const classes = useStyles();

    return (
        <Card className={classes.root} variant="outlined">
            <img
                className={classes.media}
                src={profilePlaceholder}
                alt="Contemplative Reptile"
            />
            <CardContent>
                <Typography gutterBottom variant="h6">
                    Daria Yusupova
                </Typography>
                <Typography gutterBottom variant="body2" component="p">
                    dariayusupova@mail.com
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                    0813 8899 7766
                </Typography>
            </CardContent>
        </Card>
    );
}