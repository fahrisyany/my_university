import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { useHistory } from "react-router-dom";
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        list: {
            width: '100%',
            '& > .MuiListItem-gutters': {
                padding: theme.spacing(4, 0),
                '& >  .MuiListItemIcon-root:first-of-type': {
                    padding: theme.spacing(2),
                    marginRight: theme.spacing(4),
                    backgroundColor: '#DCF1FF',
                    borderRadius: 4,
                    minWidth: 0,
                    color: '#4C74BD'
                },
                '& >  .MuiListItemIcon-root:last-of-type': {
                    color: theme.palette.primary.main,
                    minWidth: 0,
                }
            },
        },
    }));


interface MenuListInterface {
    icon: any;
    label: string;
    link: string
}

interface MenuListProps {
    menuList: MenuListInterface[]
}

export default function MenuList({ menuList }: MenuListProps) {
    const classes = useStyles()
    const history = useHistory();

    return (
        <List component="nav" className={classes.list}>
            {
                menuList.map((menu: MenuListInterface, i: number) => (
                    <ListItem button onClick={(e) => history.push(menu.link)} key={i} disabled>
                        <ListItemIcon>
                            {menu.icon}
                        </ListItemIcon>
                        <ListItemText primary={menu.label} />
                        <ListItemIcon>
                            <ArrowForwardIosIcon />
                        </ListItemIcon>
                    </ListItem>
                ))
            }
        </List>
    );
}
