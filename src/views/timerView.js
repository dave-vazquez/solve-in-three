console.log('timerView.js');

import {elements} from './base.js';
import * as cookie from '../controllers/cookieController.js';

/* *************************************************************************************************** */
/*                                        TIMER VIEW                                                   */
/* *************************************************************************************************** */

export default class TimerView
{
    constructor()
    {
        this.minutes = 0;
        this.seconds = 0
        this.totalSeconds = 0
        this.timerInterval = null;
    }
    
    startTimer()
    {
        if(cookie.get('timerStarted') === 'false')
        cookie.set('timerStarted', true);

        this.timerInterval = setInterval(()=>
        {
            this.totalSeconds++;
            
            this.minutes = parseInt((this.totalSeconds / 60));
            this.seconds = parseInt((this.totalSeconds % 60));

            this.updateTimer();

        }, 1000);
    }

    stopTimer()
    {
        clearInterval(this.timerInterval);

        return {minutes: this.minutes, seconds: this.seconds, totalSeconds: this.totalSeconds};
    }

    updateTimer()
    {
        cookie.set('minutes', this.minutes.toString());
        cookie.set('seconds', this.seconds.toString());
        
        elements.timerMinutes.innerText = this.minutes;
        elements.timerSeconds.innerText = this.seconds < 10 ? `:0${this.seconds}` : `:${this.seconds}`;
    }

    setTime(min, sec, totalSec)
    {
        this.minutes = min;
        this.seconds = sec;
        this.totalSeconds = totalSec;
    }

    getTime()
    {
        return {minutes: this.minutes, seconds: this.seconds, totalSeconds: this.totalSeconds};
    }

    resetTime()
    {
        this.minutes = 0;
        this.seconds = 0;
        this.totalSeconds = 0;

        cookie.set('minutes', minutes.toString());
        cookie.set('seconds', seconds.toString());

        elements.timerMinutes.innerText = '0';
        elements.timerSeconds.innerText = ':00';
    }
}
