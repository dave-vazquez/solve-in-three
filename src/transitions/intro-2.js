console.log('intro.js');

import {elements} from '../views/base.js';
import $ from 'jquery';
import 'jquery-shadow-animation/jquery.animate-shadow';

/* *************************************************************************************************** */
/*                                             INTRO                                                   */
/* *************************************************************************************************** */

export const animateIntro = () =>
{
    disableAll(0);
    
    bevelSweep(2000, 'all', 'in');
    bevelSweep(2800, 'all', 'out'); // 2000
    
    // Solve In Three
    fadeTitle(4000, 'in');
    fadeTitle(5000, 'out');
    
    bevelSweep(9000, 'all', 'in');
    bevelSweep(9800, 'all', 'out', [6, 7, 8, 11, 12, 13], 'beveled');
    slideCoins(10800, 'in');
    bevelSweep(11800, 'all', 'out');

    fadeTopPanel(11800, 'in');
    fadeBottomPanel(11800, 'in');

    // Welcome to Solve in Three
    
    fadeIntroMessage(12800, 'in', 0, 2000);
    fadeIntroMessage(15800, 'out', 0, 1000);
    
    // The goal of this puzzle
    fadeIntroMessage(18300, 'in', 1);
    
    // is to arrange these coins...
    fadeIntroMessage(19800, 'in', 2);
    highlightCoins(20800, 'rows');
    fadeCoins(21800, 'out');
    fadeIntroMessage(21800, 'out', 1);
    fadeIntroMessage(21800, 'out', 2);
    arrangeCoins(22800, 'ring');

    // ...into the shape of a ring.
    fadeIntroMessage(22800, 'in', 3);
    fadeCoins(22800, 'in');
    highlightCoins(23800, 'ring');
    fadeIntroMessage(25800, 'out', 3);
    fadeCoins(25800, 'out');
    arrangeCoins(26800, 'off-screen');

    // RESET
    bevelSweep(27800, 'all', 'in');
    bevelSweep(28800, 'all', 'out', [6, 7, 8, 9, 11, 12, 13, 14, 16, 17, 18, 19], 'bordered');
    slideCoins(29800, 'in');

    // There are two rules.
    fadeIntroMessage(31800, 'in', 4);
    fadeIntroMessage(33800, 'out', 4);

    // 1. A coin can only move where it will touch two or more coins.
    fadeIntroMessage(35800, 'in', 5);
    fadeIntroMessage(37800, 'in', 6);
    fadeIntroMessage(39800, 'out', 5);
    fadeIntroMessage(39800, 'out', 6);
    fadeCoins(39800, 'in');  

    // RULE 1 - fail
    changeCoinColor(41800, 0, 'light', 100);
    slideCoin(42800, 0, 222, 258, 400);
    lowerCoin(43200, 0);
    highlightCoin(43400, 5, 'dark');
    shakeCoin(43800, 0, 300, 20);
    slideCoin(44200, 0, 0, 0, 200);
    changeCoinColor(44200, 0, 'default', 200);
    lowerCoin(44400, 0);


    // RULE 1 - success 1
    changeCoinColor(46200, 0, 'light', 100);
    slideCoin(47200, 0, 222, 129, 400);
    lowerCoin(47600, 0);
    changeCoinColor(47600, 0, 'default', 100);
    highlightCoin(47800, 4, 'light');
    highlightCoin(47800, 5, 'light');

    // RULE 1 - success 2
    changeCoinColor(49800, 2, 'light', 100);
    slideCoin(50800, 2, 222, -258, 400);
    lowerCoin(51200, 2);
    changeCoinColor(51200, 2, 'default', 100);
    highlightCoin(51400, 0, 'light');
    highlightCoin(51400, 3, 'light');
    highlightCoin(51400, 4, 'light');

    // 2. A coin cannot move it it's blocked by the surrounding coins.
    fadeIntroMessage(52400, 'in', 7);
    fadeIntroMessage(54400, 'in', 8);
    fadeIntroMessage(56400, 'out', 7);
    fadeIntroMessage(56400, 'out', 8);

    // RULE 2 - fail
    changeCoinColor(58300, 4, 'light', 100);
    changeCoinColor(58500, 0, 'dark', 100);
    changeCoinColor(58500, 1, 'dark', 100);
    changeCoinColor(58500, 2, 'dark', 100);
    changeCoinColor(58500, 3, 'dark', 100);
    changeCoinColor(58500, 5, 'dark', 100);
    shakeCoin(59500, 4, 300, 10);

    changeCoinColor(60500, 0, 'default', 1500);
    changeCoinColor(60500, 1, 'default', 1500);
    changeCoinColor(60500, 2, 'default', 1500);
    changeCoinColor(60500, 3, 'default', 1500);
    changeCoinColor(60500, 4, 'default', 1500);
    changeCoinColor(60500, 5, 'default', 1500);

    fadeCoins(61500, 'out', 1000);
    fadePositions(61500, 'out', 1000);

    // ICONS
    bevelSweep(63500, 'all', 'in');
    bevelSweep(64500, 'all', 'out', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19], 'bordered');
    arrangeCoins(64500, 'off-screen');
    slideCoins(65500, 'in');

    // TIMER
    fadeTimerArrow(67500, 'in');
    fadeTimerContainer(67500, 'in');
    
    fadeTimerMessageContainer(68500, 'in');
    fadeTimerMessage(68500, 'in', 0);
    fadeTimerMessage(68500, 'in', 1);
    fadeTimerMessage(70500, 'out', 0);
    fadeTimerMessage(70500, 'out', 1);
    fadeTimerMessageContainer(70500, 'out');
    
    changeCoinColor(72500, 3, 'light', 100);
    raiseCoin(72500, 3);
    startTimer(73500);
    stopTimer(77500);
    changeCoinColor(77500, 3, 'default', 400);
    lowerCoin(77500, 3, 400);
    fadeTimerArrow(78500, 'out');

    // MOVES
    fadeMovesArrow(80500, 'in');
    fadeMovesContainer(80500, 'in');

    fadeMovesMessageContainer(82500, 'in');
    fadeMovesMessage(82500, 'in', 0);
    fadeMovesMessage(82500, 'in', 1);
    fadeMovesMessage(85500, 'out', 0);
    fadeMovesMessage(85500, 'out', 1);
    fadeMovesMessageContainer(85500, 'out');
    
    changeCoinColor(87500, 0, 'light');
    slideCoin(87500, 0, -112, 194, 600);
    changeCoinColor(88100, 0, 'default');
    lowerCoin(88100, 0);
    fadeInMoveBlock(88200, 1, 400);
    
    changeCoinColor(88600, 2, 'light');
    slideCoin(88600, 2, 222, -258, 600);
    changeCoinColor(89200, 2, 'default');
    lowerCoin(89200, 2);
    fadeInMoveBlock(89300, 2, 400);
    
    changeCoinColor(89700, 3, 'light');
    slideCoin(89700, 3, -112, 323, 600);
    changeCoinColor(90300, 3, 'default');
    lowerCoin(90300, 3);
    fadeInMoveBlock(90400, 3, 400);
    
    changeCoinColor(90800, 0, 'light');
    slideCoin(90800, 0, 112, -65, 600);
    changeCoinColor(91400, 0, 'default');
    lowerCoin(91400, 0);
    fadeInMoveBlock(91500, 4, 400);
    
    changeCoinColor(91900, 2, 'light');
    slideCoin(91900, 2, 0, -258, 600);
    changeCoinColor(92500, 2, 'default');
    lowerCoin(92500, 2);
    fadeInMoveBlock(92600, 5, 400);
    
    fadeOutMoveBlocks(94600);
    fadeMovesArrow(94600, 'out');

    // ATTEMPTS
    fadeAttemptsArrow(96600, 'in');
    fadeAttemptsContainer(96600, 'in');

    fadeAttemptsMessageContainer(98600, 'in');
    fadeAttemptsMessage(98600, 'in', 0);
    fadeAttemptsMessage(98600, 'in', 1);
    fadeAttemptsMessage(101600, 'out', 0);
    fadeAttemptsMessage(101600, 'out', 1);
    fadeAttemptsMessageContainer(101600, 'out');

    incrementAttempts(102600);
    fadeAttemptCount(106100);
    fadeAttemptsArrow(106100, 'out');

    // HINTS
    fadeHintArrow(109100, 'in');
    fadeHintContainer(109100, 'in');

    fadeHintsMessageContainer(111100, 'in');
    fadeHintMessage(111100, 'in', 0);
    fadeHintMessage(111100, 'in', 1);
    fadeHintMessage(113100, 'out', 0);
    fadeHintMessage(113100, 'out', 1);
    fadeHintsMessageContainer(113100, 'out');
    arrangeCoins(113100, 'default');

    activateHintButton(115100);

    // COIN 
    changeCoinColor(116100, 0, 'light');
    raiseCoin(116100, 0);
    bevelHintPosition(116100, 'in', 2);
    bevelHintPosition(116100, 'in', 6);
    bevelHintPosition(116100, 'in', 14);
    bevelHintPosition(116100, 'in', 17);
    bevelHintPosition(116100, 'in', 18);

    changeCoinColor(118100, 0, 'default');
    lowerCoin(118100, 0);
    bevelHintPosition(118100, 'out', 2);
    bevelHintPosition(118100, 'out', 6);
    bevelHintPosition(118100, 'out', 14);
    bevelHintPosition(118100, 'out', 17);
    bevelHintPosition(118100, 'out', 18);

    // COIN 
    changeCoinColor(119100, 1, 'light');
    raiseCoin(119100, 1);
    bevelHintPosition(119100, 'in', 5);
    bevelHintPosition(119100, 'in', 7);
    bevelHintPosition(119100, 'in', 14);
    bevelHintPosition(119100, 'in', 17);
    bevelHintPosition(119100, 'in', 18);

    changeCoinColor(121100, 1, 'default');
    lowerCoin(121100, 1);
    bevelHintPosition(121100, 'out', 5);
    bevelHintPosition(121100, 'out', 7);
    bevelHintPosition(121100, 'out', 14);
    bevelHintPosition(121100, 'out', 17);
    bevelHintPosition(121100, 'out', 18);

    // COIN 
    changeCoinColor(122100, 2, 'light');
    raiseCoin(122100, 2);
    bevelHintPosition(122100, 'in', 1);
    bevelHintPosition(122100, 'in', 5);
    bevelHintPosition(122100, 'in', 8);
    bevelHintPosition(122100, 'in', 17);
    bevelHintPosition(122100, 'in', 18);

    changeCoinColor(124100, 2, 'default');
    lowerCoin(124100, 2);
    bevelHintPosition(124100, 'out', 1);
    bevelHintPosition(124100, 'out', 5);
    bevelHintPosition(124100, 'out', 8);
    bevelHintPosition(124100, 'out', 17);
    bevelHintPosition(124100, 'out', 18);

    deactivateHintButton(126100);
    fadeHintArrow(127100, 'out');

    // OUTRO
    fadeIntroMessage(129100, 'in', 9);
    fadeIntroMessage(131100, 'out', 9);

    fadeIntroMessage(133100, 'in', 10);
    fadeIntroMessage(135100, 'in', 11);

    fadeIntroMessage(137100, 'out', 10);
    fadeIntroMessage(137100, 'out', 11);

    fadeIntroMessage(139100, 'in', 12);

    fadeIntroMessage(141100, 'out', 12);
    fadeIntroMessageContainer(141100, 'out');
    fadeHelpButton(141100, 'in');

    highlightCoins(142100, 'rows');
    
    highlightCoin(143100, 0, 'light');
    highlightCoin(143100, 1, 'light');
    highlightCoin(143100, 2, 'light');
    highlightCoin(143100, 3, 'light');
    highlightCoin(143100, 4, 'light');
    highlightCoin(143100, 5, 'light');
    
    enableAll(144600);
   
}

/* *************************************************************************************************** */
/*                                        ANIMATION FUNCTIONS                                          */
/* *************************************************************************************************** */

// const highlightHelpButton = (start) =>
// {
//     setTimeout(()=>
//     {
//         $(elements.helpButton).animate({backgroundColor: '#FFFF7F', boxShadow: '0 0 3px 5px #FFFF7F'}, 100);
//         $(elements.helpButton).animate({backgroundColor: '#d1d1d1', boxShadow: '0 0 0 0 #FFFF7F'}, 500);

//     }, start);
// }

const bevelHintPosition = (start, direction, posID) =>
{
    setTimeout(() => 
    {
        if(direction === 'in')
        {
            $(elements.position(posID)).finish().animate(
            {
                boxShadow: 'inset 4px 4px 8px rgba(0, 0, 0, 0.33)', 
                backgroundColor: '#c2c2c2'
            }, 
            {
                duration: 100, 
                queue: false
            });
            
            $(elements.position(posID)).css({border: '1px solid #666666'});
        }
        else if(direction === 'out')
        {
            $(elements.position(posID)).finish().animate(
            {
                boxShadow: 'inset 0px 0px 0px rgba(0, 0, 0, 0.33)', 
                backgroundColor: '#d1d1d1'
            }, 
            {
                duration: 100, 
                queue: false
            });
        
            $(elements.position(posID)).css({border: '1px solid #a7a6a6'});
        }
        
    }, start);
}

const activateHintButton = start =>
{
    setTimeout(() => 
    {
        $(elements.hintButton).css({
            boxShadow: 'inset 2px 2px 2px rgba(0, 0, 0, 0.33)',
            backgroundColor: '#c2c2c2'
        });

        setTimeout(() => $(elements.hintButtonImg).attr('src', './images/hints-black.png'), 300);

    }, start);
}

const deactivateHintButton = start =>
{
    setTimeout(() => 
    {            
        $(elements.hintButton).css({
            boxShadow: 'none',
            backgroundColor: '#d1d1d1'
        });

        $(elements.hintButtonImg).attr('src', './images/no-hints-black.png');

    }, start);
}

const fadeTimerMessageContainer = (start, direction) =>
{
    setTimeout(() => 
    {
        (direction === 'in') ? $(elements.timerMessageContainer).fadeIn(1000):
                               $(elements.timerMessageContainer).fadeOut(1000);
        
    }, start);
}

const fadeMovesMessageContainer = (start, direction) =>
{
    setTimeout(() => 
    {
        (direction === 'in') ? $(elements.movesMessageContainer).fadeIn(1000):
                               $(elements.movesMessageContainer).fadeOut(1000);
        
    }, start);
}

const fadeAttemptsMessageContainer = (start, direction) =>
{
    setTimeout(() => 
    {
        (direction === 'in') ? $(elements.attemptsMessageContainer).fadeIn(1000):
                               $(elements.attemptsMessageContainer).fadeOut(1000);
        
    }, start);
}

const fadeHintsMessageContainer = (start, direction) =>
{
    setTimeout(() => 
    {
        (direction === 'in') ? $(elements.hintMessageContainer).fadeIn(1000):
                               $(elements.hintMessageContainer).fadeOut(1000);
        
    }, start);
}

const fadePosition = (start, direction, posID) =>
{
    setTimeout(() => 
    {
        (direction === 'in') ? $(elements.position(posID)).fadeTo(1000, 1):
                               $(elements.position(posID)).fadeTo(1000, 0);

    }, start);
}

const incrementAttempts = start =>
{   
    let interval = 1000;
    
    for(let i = 0; i < 13; i++)
        interval = queueAnimations(i, interval * (.75 + (i * .02)));

    function queueAnimations(i, interval)
    {        
        setTimeout(()=>
        {
            $(elements.attempts).text(i + 1);

        }, start + interval);

        start += interval;
        
        console.log((i + 1), ': start', start, 'interval', interval);

        return interval;
    }
}

const fadeAttemptCount = start =>
{
    setTimeout(() => 
    {
        
        $(elements.attempts).fadeOut(1000).text('0').fadeIn(400);

        setTimeout(() => $(elements.attempts).text('0').fadeIn(400), 1000);

    }, start);
}

const fadeInMoveBlock = (start, blockNum, newDuration = 400) =>
{
    setTimeout(()=>
    {
        $(elements.moveBlock(blockNum)).fadeIn(newDuration);

    }, start);
}

const startTimer = start =>
{
    for(let i = 0; i < 4; i++)
        queueAnimations(i);

    function queueAnimations(i)
    {
        setTimeout(()=>
        {
            incrementSeconds(i);

        }, start + (i * 1000))
    }
    
    function incrementSeconds(i)
    {
        $(elements.timerSeconds).text(`:0${i + 1}`);
    }
}

const stopTimer = start =>
{
    setTimeout(()=>
    {
        $(elements.timerSeconds).fadeOut(400).text(`:00`).fadeIn(1000);

    }, start);
}

const arrangeCoins = (start, arrangement) =>
{
    if(arrangement === 'default')
    {
        setTimeout(()=>
        {
            $(elements.coin(0)).css({left: 0, top: 0});
            $(elements.coin(1)).css({left: 0, top: 0});
            $(elements.coin(2)).css({left: 0, top: 0});
            $(elements.coin(3)).css({left: 0, top: 0});
            $(elements.coin(4)).css({left: 0, top: 0});
            $(elements.coin(5)).css({left: 0, top: 0});

        }, start);
    }
    else if(arrangement === 'ring')
    {
        setTimeout(()=>
        {
            $(elements.coin(0)).css({left: -31, top: 63});
            $(elements.coin(1)).css({left: 32, top: -47});
            $(elements.coin(2)).css({left: -31, top: 63});
            $(elements.coin(3)).css({left: 97, top: -160});
            $(elements.coin(4)).css({left: -31, top: 63});
            $(elements.coin(5)).css({left: -31, top: 63});

        }, start);
    }
    else if(arrangement === 'off-screen')
    {
        setTimeout(()=>
        {
            $(elements.coin(0)).css({left: -1500, top: 0});
            $(elements.coin(1)).css({left: -1500, top: 0});
            $(elements.coin(2)).css({left: -1500, top: 0});
            $(elements.coin(3)).css({left: 1500, top: 0});
            $(elements.coin(4)).css({left: 1500, top: 0});
            $(elements.coin(5)).css({left: 1500, top: 0});

        }, start);
    }

    else if(arrangement === 'surrounded-1')
    {
        setTimeout(()=>
        {
            $(elements.coin(0)).css({left: 129, top: 222});
            $(elements.coin(1)).css({left: -129, top: 0});
            $(elements.coin(2)).css({left: -1500, top: 0});
            $(elements.coin(3)).css({left: 0, top: 0});
            $(elements.coin(4)).css({left: 0, top: 0});
            $(elements.coin(5)).css({left: 0, top: 0});

        }, start);
    }

    else if(arrangement === 'surrounded-2')
    {
        setTimeout(()=>
        {
            $(elements.coin(0)).css({left: 126, top: 222});
            $(elements.coin(1)).css({left: 0, top: 0});
            $(elements.coin(2)).css({left: -1500, top: 0});
            $(elements.coin(3)).css({left: 0, top: 0});
            $(elements.coin(4)).css({left: 0, top: 0});
            $(elements.coin(5)).css({left: 1500, top: 0});

        }, start);
    }
}

const disableAll = start =>
{
    setTimeout(()=>
    {
        elements.disableAll();

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

const enableAll = start =>
{
    setTimeout(()=>
    {
        elements.enableAll();

    }, start);
}

const fadeTimerContainer = (start, direction, duration = 1000) =>
{
    setTimeout(()=>
    {
        (direction === 'in') ? $(elements.timerContainer).fadeIn(duration):
                               $(elements.timerContainer).fadeOut(duration);
        
    }, start);
}

const fadeTimerArrow = (start, direction) =>
{
    var timerArrow = $(elements.timerArrow);

    timerArrow.queue()

    setTimeout(()=>
    {
        if(direction === 'in')
        {
            timerArrow.css({left: '-25px'});
            timerArrow.fadeIn({duration: 500, queue: false});
            timerArrow.finish().animate({left: 0}, {duration: 1000, queue: false});
        }
        else
            timerArrow.fadeOut({duration: 1000, queue: false});
        
    }, start);
}

const fadeMovesArrow = (start, direction, newDuration = 1000) =>
{
    var movesArrow = $(elements.movesArrow);

    console.log(movesArrow);

    movesArrow.queue()

    setTimeout(()=>
    {
        if(direction === 'in')
        {
            movesArrow.css({right: '-25px'});
            movesArrow.fadeIn({duration: newDuration, queue: false});
            movesArrow.finish().animate({right: 0}, {duration: newDuration, queue: false});
        }
        else
            movesArrow.fadeOut({duration: newDuration, queue: false});
        
    }, start);
}

const fadeAttemptsArrow = (start, direction) =>
{
    var attemptsArrow = $(elements.attemptsArrow);

    attemptsArrow.queue()

    setTimeout(()=>
    {
        if(direction === 'in')
        {
            attemptsArrow.css({left: '-25px'});
            attemptsArrow.fadeIn({duration: 500, queue: false});
            attemptsArrow.finish().animate({left: 0}, {duration: 1000, queue: false});
        }
        else
            attemptsArrow.fadeOut({duration: 1000, queue: false});
        
    }, start);
}

const fadeHintArrow = (start, direction) =>
{
    var hintArrow = $(elements.hintArrow);

    console.log(hintArrow);

    setTimeout(()=>
    {
        if(direction === 'in')
        {
            hintArrow.css({right: '-25px'});
            hintArrow.fadeIn({duration: 500, queue: false});
            hintArrow.finish().animate({right: 0}, {duration: 1000, queue: false});
        }
        else
            hintArrow.fadeOut({duration: 1000, queue: false});
        
    }, start);
}

const fadeTimerMessage = (start, direction, msgNum, duration = 1000) =>
{
    setTimeout(()=>
    {
        (direction === 'in') ? $(elements.timerMessage(msgNum)).fadeIn(duration):
                               $(elements.timerMessage(msgNum)).fadeOut(duration);
        
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

const fadeHintMessage = (start, direction, msgNum, duration = 1000) =>
{
    setTimeout(()=>
    {
        (direction === 'in') ? $(elements.hintMessage(msgNum)).fadeIn(duration):
                               $(elements.hintMessage(msgNum)).fadeOut(duration);
        
    }, start);
}

const fadeMovesMessage = (start, direction, msgNum, duration = 1000) =>
{
    setTimeout(()=>
    {
        (direction === 'in') ? $(elements.movesMessage(msgNum)).fadeIn(duration):
                               $(elements.movesMessage(msgNum)).fadeOut(duration);
        
    }, start);
}

const fadeOutMoveBlocks = start =>
{
    setTimeout(()=>
    {
        $(elements.allMoveBlocks).fadeOut(1000);

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

const fadeAttemptsMessage = (start, direction, msgNum, duration = 1000) =>
{
    setTimeout(()=>
    {
        (direction === 'in') ? $(elements.attemptsMessage(msgNum)).fadeIn(duration):
                               $(elements.attemptsMessage(msgNum)).fadeOut(duration);
        
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

const slideCoin = (start, coinID, newTop = null, newLeft = null, newDuration) =>
{
    setTimeout(()=>
    {
        $(elements.coin(coinID)).css({zIndex: 1});
        $(elements.coin(coinID)).animate({zIndex: 1, top: newTop, marginLeft: '-8px', marginTop: '-8px', boxShadow: '5px 5px 9px rgba(0, 0, 0, 0.33)'}, {duration: newDuration, queue: false});
        $(elements.coin(coinID)).animate({left: newLeft},{duration: newDuration, queue: false});
        
    }, start);
}

const raiseCoin = (start, coinID) =>
{
    setTimeout(()=>
    {
        let coin = elements.coin(coinID);

        $(coin).css({zIndex: 1});
        
        $(coin).animate({marginLeft: '-8px', marginTop: '-8px'}, {duration: 100, queue: false});
        $(coin).animate({boxShadow: '5px 5px 9px rgba(0, 0, 0, 0.33)'}, {duration: 100, queue: false});

    }, start);
}

const lowerCoin = (start, coinID, newDuration = 100) =>
{
    setTimeout(()=>
    {
        let coin = elements.coin(coinID);

        $(coin).css({zIndex: 0});

        $(coin).animate({zIndex: 0, marginLeft: '-4px', marginTop: '-4px'}, {duration: newDuration, queue: false});
        $(coin).animate({boxShadow: '2px 2px 5px rgba(0, 0, 0, 0.33)'}, {duration: newDuration, queue: false});

    }, start);
    
}

const shakeCoin = (start, coinID, newDuration, newDistance) =>
{
    setTimeout(()=>
    {
        $(elements.coin(coinID)).effect('shake', {duration: newDuration, distance: newDistance});
        
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

const fadeIntroMessage = (start, direction, msgNum, duration = 1000) =>
{
    setTimeout(()=>
    {
        (direction === 'in') ? $(elements.introMessages[msgNum]).fadeIn(duration):
                               $(elements.introMessages[msgNum]).fadeOut(duration);

    }, start);
}

const fadePositions = (start, direction, newDuration = 1000) =>
{
    setTimeout(() =>
    {
        (direction === 'in') ? $(elements.allPositions).animate({borderColor: '#c2c2c2'}, newDuration):
                               $(elements.allPositions).animate({borderColor: '#d1d1d1'}, newDuration);
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

const fadeCoins = (start, direction, duration = 1000) =>
{
    setTimeout(()=>
    {
        (direction === 'in') ? $(elements.allCoins).fadeTo(duration, 1):
                               $(elements.allCoins).fadeTo(duration, 0);
    }, start);
}


const highlightCoin = (start, coinID, type) =>
{
    setTimeout(()=>
    {
        $(elements.coin(coinID)).effect('highlight', {color: type === 'light' ? '#3cadf8' : '#2a7cb3'}, 1000);

    }, start);
}

const changeCoinColor = (start, coinID, colorType, newDuration = 100) =>
{
    setTimeout(()=>
    {
        let color = '';
        
        switch(colorType)
        {
            case('light'): color = '#3cadf8'; break;
            case('dark'):  color = '#2a7cb3'; break;
            default:       color = '#3498DB'; break;
        }

        $(elements.coin(coinID)).animate({backgroundColor: color}, {duration: newDuration, queue: false});

    }, start);
}

const fadeTitle = (start, type) =>
{
    for(let i = 0; i < 3; i++)
        queueAnimations(i, start, type)

    function queueAnimations(i)
    {
        // if(i === 2 && type === 'out')
        //     start += 750;

        setTimeout(() =>
        {
            fadeTitle(type, i);

        }, start + (i * 1000));
    }

    function fadeTitle(type, i)
    {
        type === 'in' ? $(elements.title(i)).fadeTo(800, 1) :
                        $(elements.title(i)).fadeTo(800, 0);

        if(type === 'out' && i === 2)
            setTimeout(()=>
            {
                $(elements.title(0)).css({display: 'none'});
                $(elements.title(1)).css({display: 'none'});
                $(elements.title(2)).css({display: 'none'});
            }, 800);
    }
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
