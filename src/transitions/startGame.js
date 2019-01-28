console.log('startGame.js');

import {elements} from '../views/base.js';
import $ from 'jquery';
import 'jquery-shadow-animation/jquery.animate-shadow';

export const startGame = ()=>
{
    disableAll(0);
    
    fadeTopPanel(2000, 'in');
    fadeBottomPanel(2000, 'in');

    bevelSweep(3000, 'all', 'in');
    bevelSweep(3800, 'all', 'out', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19], 'bordered');

    slideCoins(4800, 'in');

    fadeAttemptsContainer(5800, 'in');
    fadeMovesContainer(5800, 'in');
    fadeTimerContainer(5800, 'in');
    fadeHintContainer(5800, 'in');
    fadeHelpButton(5800, 'in');

    //fadeIntroMessageContainer(6800, 'in');
    fadeIntroMessage(6800, 'in', 12);
    fadeIntroMessage(8800, 'in', 12);
    fadeIntroMessageContainer(8800, 'out');

    highlightCoins(9800, 'rows');

    highlightCoin(10800, 0, 'light');
    highlightCoin(10800, 1, 'light');
    highlightCoin(10800, 2, 'light');
    highlightCoin(10800, 3, 'light');
    highlightCoin(10800, 4, 'light');
    highlightCoin(10800, 5, 'light');

    enableAll(12300);
}

const fadeTopPanel = (start, type) =>
{    
    setTimeout(() =>
    {
        type === 'in' ? $(elements.topPanel).fadeTo(1600, 1):
                        $(elements.topPanel).fadeTo(1000, 0);
    }, start);
}

const fadeBottomPanel = (start, type) =>
{
    setTimeout(() =>
    {
        type === 'in' ? $(elements.bottomPanel).fadeTo(1600, 1):
                        $(elements.bottomPanel).fadeTo(1000, 0);
    }, start);
}

const bevelSweep = (start, group, direction, trail = null, trailType = null) =>
{
    for(let i = 0; i < 6; i++)
        queueAnimations(i);

    function queueAnimations(i)
    {
        let posID = i;

        setTimeout(() =>
        {
            switch(group)
            {
                case('all'): {
                    bevelPosition(direction, posID, 200);
                    bevelPosition(direction, posID += 5, 200);
                    bevelPosition(direction, posID += 5, 200);
                    bevelPosition(direction, posID += 5, 200);

                } break;

                case('center-six'): {
                    posID += 6;
                    bevelPosition(direction, posID, 200);
                    bevelPosition(direction, posID += 5, 200);

                } break;

                case('bottom-right'): {
                    posID += 6;
                    if(posID < 10) {
                        bevelPosition(direction, posID, 200);
                        bevelPosition(direction, posID += 5, 200);
                        bevelPosition(direction, posID += 5, 200);
                    }
                } break;
            }

        }, start + (i * 100));
    }

    function bevelPosition(direction, posID, duration)         
    {
        var position = elements.position(posID);

        var beveled = {
            boxShadow: 'inset 4px 4px 8px rgba(0, 0, 0, 0.33)',
            borderColor: '#aaaaaa'
        };

        var unbeveled = {
            boxShadow: 'inset 0px 0px 0px rgba(0, 0, 0, 0.33)',
            borderColor: '#d1d1d1'
        };

        var bordered = {
            boxShadow: 'inset 0px 0px 0px rgba(0, 0, 0, 0.33)',
            borderColor: '#aaaaaa'
        };

        // trail includes posID, trail is beveled or bordered

        if(trailIncludes(posID))
            $(position).finish().animate((trailType === 'beveled' ? beveled : bordered), duration);
        
        else if(direction === 'in')
            $(position).animate(beveled, duration);

        else if(direction ==='out') 
            $(position).finish().animate(unbeveled, duration);

    }

    function trailIncludes(posID)
    {
        if(trail)
            return trail.includes(posID);
        
        return false;
    }
}

const slideCoins = (start, direction) =>
{
    for(let i = 0; i < 6; i++)
        queueAnimations(i, start, direction);

    function queueAnimations(i)
    {
        setTimeout(() =>
        {
            switch(i)
            {
                case(0): slideCoin(2, direction); break;
                case(1): slideCoin(3, direction); break;
                case(2): slideCoin(1, direction); break;
                case(3): slideCoin(4, direction); break;
                case(4): slideCoin(0, direction); break;
                case(5): slideCoin(5, direction); break;
            }

        }, start + (i * 100));
    }

    function slideCoin(coinID)
    {
        if(coinID < 3)
            direction === 'in' ? $(elements.coin(coinID)).animate({left: '0px'}, {duration: 400, queue: false}) :
                            $(elements.coin(coinID)).animate({left: '-1500px'}, {duration: 400, queue: false});
        else
            direction === 'in' ? $(elements.coin(coinID)).animate({left: '0px'}, {duration: 400, queue: false}) :
                            $(elements.coin(coinID)).animate({left: '1500px'}, {duration: 400, queue: false});

        direction === 'in' ? $(elements.coin(coinID)).fadeTo(400, 1) :
                             $(elements.coin(coinID)).fadeTo(400, 0); 
    }
}

const fadeTimerContainer = (start, direction, duration = 1000) =>
{
    setTimeout(()=>
    {
        (direction === 'in') ? $(elements.timerContainer).fadeIn(duration):
                               $(elements.timerContainer).fadeOut(duration);
        
    }, start);
}

const fadeAttemptsContainer = (start, direction, duration = 1000) =>
{
    setTimeout(()=>
    {
        (direction === 'in') ? $(elements.attemptsContainer).fadeIn(duration):
                               $(elements.attemptsContainer).fadeOut(duration);
        
    }, start);
}

const fadeMovesContainer = (start, direction, duration = 1000) =>
{
    setTimeout(()=>
    {
        (direction === 'in') ? $(elements.movesContainer).fadeIn(duration):
                               $(elements.movesContainer).fadeOut(duration);

        //$(elements.movesContainer).effect('highlight', {color: '#FFFF7F'}, 1000);
        
    }, start);
}

const fadeHintContainer = (start, direction, duration = 1000) =>
{
    setTimeout(()=>
    {   
        (direction === 'in') ? $(elements.hintButtonContainer).fadeIn(duration):
                               $(elements.hintButtonContainer).fadeOut(duration);

        //$(elements.movesContainer).effect('highlight', {color: '#FFFF7F'}, 1000);
        
    }, start);
}

const fadeHelpButton = (start, direction, duration = 1000) =>
{
    setTimeout(()=>
    {
        (direction === 'in') ? $(elements.helpButton).fadeIn(duration):
                               $(elements.helpButton).fadeOut(duration);
        
    }, start);
}

const highlightCoins = (start, pattern) =>
{
    for(let i = 0; i < 7; i++)
        queueAnimations(i);

    function queueAnimations(i)
    {
        setTimeout(()=>
        {
            let coinSeq = (pattern === 'rows') ? [0, 1, 2, 5, 4, 3]:
                                                 [3, 1, 2, 5, 4, 0];
            switch(i) 
            {
                case(0): highlightCoin(coinSeq[0]); break;
                case(1): highlightCoin(coinSeq[1]); break;
                case(2): highlightCoin(coinSeq[2]); break;
                case(3): highlightCoin(coinSeq[3]); break;
                case(4): highlightCoin(coinSeq[4]); break;
                case(5): highlightCoin(coinSeq[5]); break;
                case(6): if(pattern === 'ring') {highlightCoin(coinSeq[0])} break;
            }

        }, start + (i * 100));
    }

    function highlightCoin(coinID)
    {
        $(elements.coin(coinID)).effect('highlight', {color: '#3cadf8'}, {duration: 500, queue: false});
    }
}

const highlightCoin = (start, coinID, type) =>
{
    setTimeout(()=>
    {
        $(elements.coin(coinID)).effect('highlight', {color: type === 'light' ? '#3cadf8' : '#2a7cb3'}, 1000);

    }, start);
}

const fadeIntroMessageContainer = (start, direction) =>
{
    setTimeout(() => 
    {
        (direction === 'in') ? $(elements.introMessageContainer).fadeIn(1000):
                               $(elements.introMessageContainer).fadeOut(1000);
        
    }, start);
}

const fadeIntroMessage = (start, direction, msgNum, duration = 1000) =>
{
    setTimeout(()=>
    {
        (direction === 'in') ? $(elements.introMessages[msgNum]).fadeIn(duration):
                               $(elements.introMessages[msgNum]).fadeOut(duration);

    }, start);
}

const disableAll = start =>
{
    setTimeout(()=>
    {
        elements.disableAll();

    }, start);
}

const enableAll = start =>
{
    setTimeout(()=>
    {
        elements.enableAll();

    }, start);
}
