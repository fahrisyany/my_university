import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import ProfileInfo from './directives/ProfileInfo';
import PremiumStatus from './directives/PremiumStatus';
import Divider from '@material-ui/core/Divider';
import PersonIcon from '@material-ui/icons/Person';
import StarsIcon from '@material-ui/icons/Stars';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import AssignmentIcon from '@material-ui/icons/Assignment';
import MenuList from '../../components/MenuList';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            padding: theme.spacing(8, 4, 0),
            flex: 1,
        },
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
        divider: {
            margin: theme.spacing(2, 0),
            backgroundColor: theme.palette.primary.main,
        },
    }));
interface MenuListInterface {
    icon: any;
    label: string;
    link: string
}
export default function ProfilePage() {
    const classes = useStyles()
    const menuList: MenuListInterface[] = [
        {
            label: "Personal Information",
            icon: <PersonIcon />,
            link: "/profile/personal-information",
        },
        {
            label: "Upgrade",
            icon: <StarsIcon />,
            link: "/profile/upgrade",
        },
        {
            label: "FAQs",
            icon: <ErrorOutlineIcon />,
            link: "/profile/personal-information",
        },
        {
            label: "Terms and Conditions",
            icon: <AssignmentIcon />,
            link: "/profile/personal-information",
        },
    ]

    return (
        <div className={classes.root}>
            <ProfileInfo />
            <Divider className={classes.divider} variant="middle" />
            <PremiumStatus />
            <MenuList menuList={menuList} />
        </div>
    );
}
