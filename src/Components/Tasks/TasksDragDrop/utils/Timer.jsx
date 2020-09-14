import React, { useEffect, useContext } from "react";
import { TaskTrackerContext } from "../../../../store/TaskTrackerStore";


const Timer = ({onComplete}) => {

    const {
      timerMinutes,
      setTimerMinutes,
      timerSeconds,
      setTimerSeconds,
      setCountdown
    } = useContext(TaskTrackerContext);

    // handles the change in timer per second
   /* this effect will run every time seconds or minutes change,
    and will wait (timeout) 1000 ms (1sec) to update the seconds and minutes again 
    until it reaches 0, where it stops the countdown, saves the countdown time to the
    task in progress and completes the task*/
    useEffect(() => {
      const timeout  = setTimeout(() => {
        if (timerSeconds > 0) {
          setTimerSeconds((prevSec) => prevSec - 1);
        }
        if (timerSeconds === 0) {
          // stop timer when we reach 0:00
          if (timerMinutes === 0) {
            // stops timer, sets countdown in task and completes the task
            clearTimeout(timeout);
            setCountdown()
            onComplete()
          // change minutes and seconds when a minute ends (3:00 => 2:59)
          } else {
            setTimerMinutes((prevMin) => prevMin - 1);
            setTimerSeconds(59);            
          }
        }
      }, 1000);
    
      return () => {
        setCountdown()
        clearTimeout(timeout) 
      }
        
      }, [timerMinutes, timerSeconds]);
  

  // formats the timer mins and secs for view
  const showTime = (mins, secs) => {
    return `${mins > 9 ? mins : `0${mins}`}m ${secs > 9 ? secs : `0${secs}`}s`
  }

  return (
    <>
          {`-${showTime(timerMinutes, timerSeconds)}`}
    </>
  );
};

export default Timer;
