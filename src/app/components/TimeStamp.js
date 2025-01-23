import React from "react";
import { parseISO,formatDistanceToNow } from "date-fns";


const TimeStamp = ({timestamp}) => {

    let time=''
    if(timestamp)
    {
        const date=parseISO(timestamp);
        const timePeriod=formatDistanceToNow(date);
        time=`${timePeriod} ago`;
    }
    return <div>{time}</div>;
    };

export default TimeStamp;
