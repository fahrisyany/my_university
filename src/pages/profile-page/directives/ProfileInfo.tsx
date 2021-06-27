import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import profilePlaceholder from '../../../assets/image/profile-placeholder.png'
import { UserInterface } from '../../../interfaces/user.interface';
import Skeleton from '@material-ui/lab/Skeleton';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            border: 'none',
        },
        content: {
            border: 'none',
            width: '100%'
        },
        media: {
            width: '100px',
            objectFit: 'contain'
        },
    }))

interface ProfileInfoInterface {
    data: UserInterface | undefined
    isLoading: boolean
}

export default function ProfileInfo({ data, isLoading }: ProfileInfoInterface) {
    const classes = useStyles();

    return (
        <Card className={` layout-row ${classes.root}`} variant="outlined">
            <img
                className={classes.media}
                src={profilePlaceholder}
                alt="Contemplative Reptile"
            />
            <CardContent classes={{ root: classes.content }}>
                <Typography gutterBottom variant="subtitle1">
                    {isLoading ? <Skeleton animation="wave" /> : data?.email}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                    {isLoading ? <Skeleton animation="wave" /> : <>Created at:&nbsp; {data?.createdAt} </>}
                </Typography>
            </CardContent>
        </Card>
    );
}