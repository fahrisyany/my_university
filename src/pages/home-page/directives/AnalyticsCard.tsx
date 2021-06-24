import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
    root: {
        borderRadius: "16px",
        color: "#fafafa",
        boxSizing: "border-box",
        marginBottom: '1.2em',
        border: "none",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center center",
        backgroundSize: "cover",
    },
    title: {
        fontSize: 14,
        fontWeight: 700,
        color: "#fafafa"
    },
    count: {
        fontSize: '2.4em',
    },
});

interface AnalyticsCardProps {
    data: any
}

export default function AnalyticsCard({ data }: AnalyticsCardProps) {
    const classes = useStyles();

    return (
        <>
            {
                data.map((item: { bgImage: any; title: boolean | React.ReactChild | React.ReactFragment | React.ReactPortal | null | undefined; subtTitle: boolean | React.ReactChild | React.ReactFragment | React.ReactPortal | null | undefined; count: string | number | boolean | {} | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactNodeArray | React.ReactPortal | null | undefined }, index: number) => (
                    <Card className={classes.root} variant="outlined" key={index} style={{ backgroundImage: `url(${item.bgImage})` }}>
                        <CardContent className="layout-row content-between content-center">
                            <div >
                                <Typography className={classes.title} color="textSecondary" gutterBottom>
                                    {item.title}
                                </Typography>
                                <Typography variant="body2" component="p">
                                    {item.subtTitle}
                                </Typography>
                            </div>
                            <div>
                                <Typography className={classes.count}>  {item.count}</Typography>
                            </div>
                        </CardContent>
                    </Card>

                ))
            }
        </>
    );
}