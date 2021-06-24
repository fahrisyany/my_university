import React, { CSSProperties } from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import CardActions from '@material-ui/core/CardActions';
import { useHistory, useLocation } from "react-router-dom";
import { UniversityInterface } from '../../../interfaces/university.interface';
import { FixedSizeList as List, ListChildComponentProps } from 'react-window';
import ListItem from '@material-ui/core/ListItem';
import useWindowDimensions from '../../../helpers/getDimensions';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            borderTop: `solid 2px ${theme.palette.primary.main}`,
            borderBottom: `solid 4px ${theme.palette.primary.main}`,
        },
        listItem: {
            "&:hover": {
                backgroundColor: "#FFF"
            }

        },
        card: {
            width: '100%',
            minHeight: 140,
            backgroundColor: theme.palette.background.paper,
            boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;",
            border: 'none',
            margin: 'none',
            transition: 'all .2s ease-in-out',
            '&:hover': { transform: 'scale(1.02)' }
        },
        title: {
            fontSize: 14,
        },
        pos: {
            marginBottom: 12,
        },
    }),
);


interface UniversityCardProps {
    data: UniversityInterface[]
}

export default function UniversityCard({ data }: UniversityCardProps) {
    console.log("🚀 ~ file: UniversityCard.tsx ~ line 47 ~ UniversityCard ~ data", data)
    const classes = useStyles();
    const history = useHistory();
    const dimension = useWindowDimensions()
    console.log("🚀 ~ file: UniversityCard.tsx ~ line 52 ~ UniversityCard ~ dimension", dimension)
    const renderRow = (props: ListChildComponentProps) => {
        const { index, style } = props;
        return (
            <ListItem button style={style} className={classes.listItem} key={index}>
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
                        <Button size="small">Learn More</Button>
                    </CardActions>
                </Card>
            </ListItem>
        );
    }

    return (

        <List className={classes.root} height={dimension.height / 1.45} width={"100%"} itemSize={190} itemCount={data.length}>
            {renderRow}
        </List>
    );
}