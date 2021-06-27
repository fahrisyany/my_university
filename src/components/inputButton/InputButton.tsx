import React, { ChangeEventHandler, ReactElement } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
            alignItems: 'center',
        },
        input: {
            flex: 1,
            backgroundColor: '#F6F6F6',
            borderRadius: 5,
            padding: theme.spacing(1, 4)
        },
        iconButton: {
            padding: 6,
            borderRadius: 5,
            color: "#ffff",
            backgroundColor: theme.palette.primary.main,
            marginLeft: theme.spacing(2),
            '&:hover': {
                backgroundColor: theme.palette.primary.main
            }
        },
    }),
);

interface InputButtonPropsInterface {
    value: string,
    handleOnChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>
    toggleAction: (props: boolean | any) => any
    icon: ReactElement<any, any>
    placeholder: string,
    id?: string,
    name?: string,
}

export default function InputButton({ value, handleOnChange, toggleAction, icon, placeholder, id, name }: InputButtonPropsInterface) {
    const classes = useStyles();

    return (
        <Paper elevation={0} className={classes.root}>
            <InputBase
                id={id}
                name={name}
                className={classes.input}
                placeholder={placeholder}
                inputProps={{ 'aria-label': placeholder }}
                value={value}
                onChange={handleOnChange}
            />
            <IconButton color="primary" className={classes.iconButton} onClick={toggleAction(true)}>
                {icon}
            </IconButton>
        </Paper>
    );
}