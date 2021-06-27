import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import CardActions from '@material-ui/core/CardActions';
import { UniversityInterface } from '../../interfaces/university.interface';
import IconButton from '@material-ui/core/IconButton';
import FavoriteIcon from '@material-ui/icons/Favorite';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        card: {
            width: '100%',
            backgroundColor: theme.palette.background.paper,
            boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;",
            border: 'none',
            margin: 'none',
            transition: 'all .2s ease-in-out',
            marginBottom: theme.spacing(4),
            '&:hover': { transform: 'scale(1.02)' }
        },
        title: {
            fontSize: 14,
        },
        pos: {
            marginBottom: 12,
        },
        favIcon: {
            color: 'red'
        }
    }),
);


interface UniversityCardProps {
    data: UniversityInterface[]
    index: number
    handleFavorite: (university: UniversityInterface) => void
}

export default function CustomCard({ data, index, handleFavorite }: UniversityCardProps) {
    const classes = useStyles();

    return (

        <Card className={classes.card} variant="outlined">
            <CardContent>
                <Typography className={classes.title} color="textSecondary" gutterBottom>
                    {data[index].country}
                </Typography>
                <Typography className={classes.pos} color="primary">
                    {data[index].name}
                </Typography>
                <Typography variant="body2" component="p">
                    {data[index].web_pages[0]}
                </Typography>
            </CardContent>
            <CardActions>
                <IconButton aria-label="add to favorites" onClick={() => handleFavorite(data[index])}>
                    <FavoriteIcon className={data[index].isFavorite ? classes.favIcon : ""} />
                </IconButton>
                <Button size="small">Learn More</Button>
            </CardActions>
        </Card>
    );
}