import React from 'react';
import { makeStyles, createStyles, Theme, createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import purpleCard from '../../../assets/billing-card/purple.jpg';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            borderRadius: "16px",
            color: "#FFFFFF",
            boxSizing: "border-box",
            marginBottom: '1.2em',
            width: `100%`,
            backgroundImage: `url(${purpleCard})`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center center",
            backgroundSize: "cover",
        },
        title: {
            fontSize: 14,
            fontWeight: 600,
            color: "#FFFFFF",
            textAlign: "center",
            width: `100%`,
            marginBottom: theme.spacing(4)
        },
        count: {
            marginTop: '.6em'
        },
        billingDetail: {
            backgroundColor: `rgba(255, 255, 255, 0.255)`,
            boxShadow: `0px 4px 24px -1px rgba(0, 0, 0, 0.2)`,
            backdropFilter: `blur(15px)`,
            borderRadius: `16px`,
            padding: theme.spacing(4)
        },
        divider: {
            backgroundColor: "#ffff",
            opacity: .2
        }
    }));

interface UniversityAnalyticsInterface {
    billing_paid: number;
    completed_billing_current_month: number
    completed_billing_current_week: number
    rest_of_billing: number
    total_billing: number
    upcoming_billing_due: number
}
interface AnalyticsCardProps {
    data: UniversityAnalyticsInterface
}

export default function MyUniversityCard({ data }: AnalyticsCardProps) {
    const classes = useStyles();

    return (
        <Card className={classes.root} variant="outlined">
            <CardContent className="layout-column">
                <Typography className={classes.title} color="textSecondary" gutterBottom> My University </Typography>
                <section className={`layout-row content-between ${classes.billingDetail}`}>
                    <div className={`layout-column align-center`}>
                        <Typography variant="body2" component="p">University paid</Typography>
                        <Typography className={classes.count}> Rp {data.billing_paid}</Typography>
                    </div>
                    <Divider orientation="vertical" flexItem classes={{ root: classes.divider }} />
                    <div className={`layout-column align-center`}>
                        <Typography variant="body2" component="p">Rest of the bill</Typography>
                        <Typography className={classes.count}> Rp {data.rest_of_billing}</Typography>
                    </div>
                </section>
            </CardContent>
        </Card>
    );
}