import React, { MouseEventHandler } from 'react'
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import Button from '@material-ui/core/Button';

interface FilterState {
    category: string,
    dateAdded: string,
    nominalRange: string,
    upcomingDue: string
}

interface FilterBillingDrawerProps {
    classes: any;
    values: FilterState;
    toggleDrawer: (props: boolean) => MouseEventHandler<HTMLFormElement> | undefined
    handleChange: (event: React.ChangeEvent<{ name?: string | undefined; value: unknown; }>) => void
}

const filterBillingDrawer = ({ classes, values, toggleDrawer, handleChange }: FilterBillingDrawerProps) => (
    <form
        className={classes.content}
        role="presentation"
    >
        <Typography style={{ fontWeight: 600, textAlign: "center" }}>Sort By</Typography>

        <FormControl variant="outlined">
            <InputLabel htmlFor="outlined-age-native-simple">Category</InputLabel>
            <Select
                native
                fullWidth
                value={values.category}
                onChange={handleChange}
                label="Category"
                inputProps={{
                    name: 'category',
                    id: 'outlined-age-native-simple',
                }}
            >
                <option aria-label="None" value="" />
                <option value={'electricity'}>Electricity</option>
                <option value={'water'}>water</option>
            </Select>
        </FormControl>
        <FormControl variant="outlined">
            <InputLabel htmlFor="outlined-age-native-simple">Date Added</InputLabel>
            <Select
                native
                value={values.dateAdded}
                onChange={handleChange}
                label="Date Added"
                inputProps={{
                    name: 'dateAdded',
                    id: 'outlined-age-native-simple',
                }}
            >
                <option aria-label="None" value="" />
                <option value={'latest'}>latest</option>
                <option value={'newest'}>Newest</option>
            </Select>
        </FormControl>
        <FormControl variant="outlined">
            <InputLabel htmlFor="outlined-age-native-simple">Nominal Range</InputLabel>
            <Select
                native
                value={values.nominalRange}
                onChange={handleChange}
                label="Nominal Range"
                inputProps={{
                    name: 'nominalRange',
                    id: 'outlined-age-native-simple',
                }}
            >
                <option aria-label="None" value="" />
                <option value={'paid'}>Paid</option>
                <option value={'not paid'}>Not paid</option>
            </Select>
        </FormControl>
        <FormControl variant="outlined">
            <InputLabel htmlFor="outlined-age-native-simple">Upcoming Due</InputLabel>
            <Select
                native
                value={values.upcomingDue}
                onChange={handleChange}
                label="Upcoming Due"
                inputProps={{
                    name: 'upcomingDue',
                }}
            >
                <option aria-label="None" value="" />
                <option value={'Sooner'}>Sooner</option>
                <option value={'Later'}>Later</option>
            </Select>
        </FormControl>
        <Button className={"btn-cta"} variant="contained" color="primary" disableElevation><b>Apply</b></Button>
    </form>
);

export default filterBillingDrawer