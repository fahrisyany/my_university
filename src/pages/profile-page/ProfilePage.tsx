import React, { useEffect, useState } from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import ProfileInfo from './directives/ProfileInfo';
import Divider from '@material-ui/core/Divider';
import PersonIcon from '@material-ui/icons/Person';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import AssignmentIcon from '@material-ui/icons/Assignment';
import MenuList from '../../components/menuList/MenuList';
import useProvideProfile from '../../services/profileService'
import { UserInterface } from '../../interfaces/user.interface';

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
                    backgroundColor: theme.palette.secondary.main,
                    borderRadius: 4,
                    minWidth: 0,
                    color: theme.palette.secondary.main
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
    const { getProfileInfo } = useProvideProfile()
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [profile, setProfile] = useState<UserInterface | undefined>()

    const menuList: MenuListInterface[] = [
        {
            label: "Personal Information",
            icon: <PersonIcon />,
            link: "/profile/personal-information",
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

    useEffect(() => {
        setIsLoading(true)
        const loadData = async () => {
            try {
                const res: UserInterface | undefined = await getProfileInfo()
                setIsLoading(false)
                setProfile(res)
            } catch (error) {
                throw error
            }
        }
        loadData()
        return () => {
            console.log('Unmounting UniversityPage.....');
        }
    }, [getProfileInfo])

    return (
        <div className={classes.root}>
            <ProfileInfo data={profile} isLoading={isLoading}/>
            <br/>
            <Divider className={classes.divider} variant="middle" />
            <MenuList menuList={menuList} />
        </div>
    );
}
