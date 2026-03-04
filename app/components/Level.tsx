"use client"
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';


export default function Level(level: number, percentage: number, harka: string) {

    return (
        <div style={{ width: 200, height: 200 }}>
            <CircularProgressbar
                value={percentage}
                text={`MaxHarka ${level}`}
                //text={{harka} {level}}
                styles={buildStyles({

                    textSize: '12px',

                    pathColor: `rgba(62, 152, 199, ${percentage / 100})`,
                    textColor: 'rgba(177, 153, 16, 1)',
                    trailColor: '#d6d6d6',
                })}
            />
        </div>

    );
}