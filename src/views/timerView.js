import $ from 'jquery';
import {elements} from './base.js';
import * as cookie from '../controllers/cookieController.js';

let minutes, seconds, totalSeconds, timerInterval;

export const startTimer = ()=>
{   
    if(cookie.get('timerStarted') === 'false')
        cookie.set('timerStarted', true);
    
    //totalSeconds = cookie.get('totalSeconds');

    timerInterval = setInterval(function()
    {
        totalSeconds++;

        console.log(totalSeconds);
        
        minutes = parseInt((totalSeconds / 60));
        seconds = parseInt((totalSeconds % 60));

        console.log('Minutes: ', minutes, 'Seconds:', seconds);

        updateTimer();

    }, 1000);
}

export const stopTimer = () =>
{
    clearInterval(timerInterval);

    return {minutes, seconds, totalSeconds}
}

export const updateTimer = () =>
{
    cookie.set('minutes', minutes.toString());
    cookie.set('seconds', seconds.toString());
    
    elements.timerMinutes.innerText = minutes;
    elements.timerSeconds.innerText = seconds < 10 ? `:0${seconds}` : `:${seconds}`;
}

export const setTime = (min, sec, totalSec) =>
{
    minutes = min;
    seconds = sec;
    totalSeconds = totalSec;
}

export const getTime = () => {minutes, seconds, totalSeconds};