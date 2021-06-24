import React, { useEffect, useState } from 'react';
import Carousel from '../../components/Carousel'
import image1 from "../../assets/carousel/carousel-1.jpg"
import image2 from "../../assets/carousel/carousel-2.jpg"
import AnalyticsCard from './directives/AnalyticsCard'
import MyBillingCard from './directives/MyBillingCard'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import magentaCard from '../../assets/billing-card/magenta.jpg';
import limeCard from '../../assets/billing-card/lime.jpg';
import blueCard from '../../assets/billing-card/bue.jpg';
import Axios from 'axios';
import useProvideBilling from '../../services/universityService';
// import { BillingAnalyticsInterface } from '../../interfaces/university.interface';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flex: 1,
        },
        content: {
            padding: theme.spacing(4),
        }
    }));


    export default function HomePage() {
    const classes = useStyles()
    // const { getBillingAnalytics } = useProvideBilling()
    // const [state, setState] = useState<BillingAnalyticsInterface>({
    //     billing_paid: 0,
    //     completed_billing_current_month: 0,
    //     completed_billing_current_week: 0,
    //     rest_of_billing: 0,
    //     total_billing: 0,
    //     upcoming_billing_due: 0
    // })

    useEffect(() => {
        let source = Axios.CancelToken.source()
        const loadData = async () => {
            // try {
            //     let res: BillingAnalyticsInterface = await getBillingAnalytics(source)
            //     setState(res)
            // } catch (error) {
            //     if (Axios.isCancel(error)) {
            //         console.log('Cancel Call HomePage.....');
            //     } else {
            //         throw error
            //     }
            // }
        }
        loadData()
        return () => {
            console.log('Unmounting HomePage.....');
            source.cancel()
        }
    }, [])

    const images = [
        {
            title: "Promo bundle premium 3 bulan",
            subTitle: "Praesent lectus neque, iaculis et enim nec, consectetur pharetra turpis.",
            src: image1
        },
        {
            title: "Promo bundle premium 2 bulan",
            subTitle: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptas dicta! Nihil officia dolore numquam. Fugiat?.',
            src: image2
        }
    ]

    // const analyticsData = [
    //     {
    //         title: "Total Billings",
    //         subtTitle: "Last Updated : Monday, 15 April 2021",
    //         count: state.total_billing,
    //         bgImage: magentaCard
    //     },
    //     {
    //         title: "Upcoming Billings Due",
    //         subtTitle: "Last Due Date : Monday, 15 April 2021",
    //         count: state.upcoming_billing_due,
    //         bgImage: magentaCard
    //     },
    //     {
    //         title: "Completed Billings This Week",
    //         subtTitle: "Last Payment : Monday, 15 April 2021",
    //         count: state.completed_billing_current_week,
    //         bgImage: limeCard
    //     },
    //     {
    //         title: "Completed Billings This Month",
    //         subtTitle: "Last Payment : Monday, 15 April 2021",
    //         count: state.completed_billing_current_month,
    //         bgImage: blueCard
    //     }
    // ]

    return (
        <div className={classes.root}>
            <Carousel imagesArray={images} />
            <section className={classes.content}>
                {/* <MyBillingCard data={state} /> */}
                {/* <AnalyticsCard data={analyticsData} /> */}
            </section>
        </div>
    );
}