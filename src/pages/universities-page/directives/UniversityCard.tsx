import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { UniversityInterface } from '../../../interfaces/university.interface';
import { FixedSizeList as List, ListChildComponentProps } from 'react-window';
import ListItem from '@material-ui/core/ListItem';
import useWindowDimensions from '../../../helpers/getDimensions';
import CustomCard from "../../../components/card/Card";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            borderTop: `solid 2px ${theme.palette.primary.main}`,
            borderBottom: `solid 4px ${theme.palette.primary.main}`,
            padding: theme.spacing(4, 0,),
        },
        listItem: {
            "&:hover": {
                backgroundColor: "#FFF"
            }
        },
    }),
);
interface UniversityCardProps {
    data: UniversityInterface[]
    handleFavorite: (university: UniversityInterface) => void
}

export default function UniversityCard({ data, handleFavorite }: UniversityCardProps) {
    const classes = useStyles();
    const dimension = useWindowDimensions()

    const renderRow = (props: ListChildComponentProps) => {
        const { index, style } = props;
        return (
            <ListItem button style={style} className={classes.listItem} key={index}>
                <CustomCard data={data} index={index} handleFavorite={handleFavorite} />
            </ListItem>
        );
    }

    return (
        <List className={classes.root} height={dimension.height / 1.45} width={"100%"} itemSize={200} itemCount={data.length}>
            {renderRow}
        </List>
    );
}