"use client"
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

type LevelProps = {
  level: number;
};


export default function Level({level} :LevelProps) {

    const percentage = level 

    const getRank = (level: number) => {
    if (level < 5) return "Starter";
    if (level < 10) return "Beast";
    if (level < 20) return "Prestige";
    if (level < 30) return "Elite";
    return "Harka";
  };
    const text = getRank(level);

    return (
        <div style={{ width: 200, height: 200 }}>
            <CircularProgressbar
                value={percentage}
                text={`${text} ${level}`}
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