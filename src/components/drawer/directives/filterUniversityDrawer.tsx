import React, { MouseEventHandler } from 'react'
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import Button from '@material-ui/core/Button';

interface FilterState {
    country: string,
    state: string,
    ranking: string,
    tuition: string
}

interface FilterUniversityDrawerProps {
    classes: any;
    values: FilterState;
    toggleDrawer: (props: boolean) => MouseEventHandler<HTMLFormElement> | undefined
    handleChange: (event: React.ChangeEvent<{ name?: string | undefined; value: unknown; }>) => void
}

const filterUniversityDrawer = ({ classes, values, toggleDrawer, handleChange }: FilterUniversityDrawerProps) => (
    <form
        className={classes.content}
        role="presentation"
    >
        <Typography style={{ fontWeight: 600, textAlign: "center" }}>Filter By</Typography>

        <FormControl variant="outlined">
            <InputLabel htmlFor="outlined-age-native-simple">Country</InputLabel>
            <Select
                native
                fullWidth
                disabled
                value={values.country}
                onChange={handleChange}
                label="Country"
                inputProps={{
                    name: 'country',
                    id: 'outlined-age-native-simple',
                }}
            >
                <option aria-label="None" value="" />
            </Select>
        </FormControl>
        <FormControl variant="outlined">
            <InputLabel htmlFor="outlined-age-native-simple">State</InputLabel>
            <Select
                native
                value={values.state}
                onChange={handleChange}
                disabled
                label="State"
                inputProps={{
                    name: 'state',
                    id: 'outlined-age-native-simple',
                }}
            >
                <option aria-label="None" value="" />
            </Select>
        </FormControl>
        <FormControl variant="outlined">
            <InputLabel htmlFor="outlined-age-native-simple">University Ranking</InputLabel>
            <Select
                native
                disabled
                value={values.ranking}
                onChange={handleChange}
                label="University Ranking"
                inputProps={{
                    name: 'ranking',
                    id: 'outlined-age-native-simple',
                }}
            >
                <option aria-label="None" value="" />
            </Select>
        </FormControl>
        <FormControl variant="outlined">
            <InputLabel htmlFor="outlined-age-native-simple">Tuition</InputLabel>
            <Select
                native
                disabled
                value={values.tuition}
                onChange={handleChange}
                label="Tuition"
                inputProps={{
                    name: 'tuition',
                }}
            >
                <option aria-label="None" value="" />
            </Select>
        </FormControl>
        <Typography variant="subtitle2">*Sort feature coming soon</Typography>
        <Button disabled className={"btn-cta"} variant="contained" color="primary" disableElevation><b>Apply</b></Button>
    </form>
);

export default filterUniversityDrawer