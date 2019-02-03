import {elements} from '../views/base.js';
import $ from 'jquery';

/* *************************************************************************************************** */
/*                                     NEW ATTEMPT TRANSITION                                          */
/* *************************************************************************************************** */

const initialBoardState = $(elements.board).clone();

export const animateTransition = async () =>
{   
    return new Promise(resolve => 
    {
        fadeProgressMessage(0);
        resetHintsButton(0);
        unblurBoard(0)
        //fadeCoins(0, 'out');
        fadeOutMoves(0);
        fadeCoins(700, 'in');
        slideCoins(700);
        fadeInMoveLabel(1500);
        enableButtons(1500);
        enableCoins(1500);
        
        setTimeout(() => resolve(), 1500);
    });
}

/* *************************************************************************************************** */
/*                                        ANIMATION FUNCTIONS                                          */
/* *************************************************************************************************** */

const fadeProgressMessage = start =>
{
    setTimeout(()=>
    {
        $(elements.progressMessageContainer).finish().fadeOut(200);
    }, start);
}

const resetHintsButton = start =>
{
    $(elements.hintButton).val('Show Hints');
}

const unblurBoard = start =>
{
    setTimeout(()=>
    {
        $(elements.board).css({transition: '.2s filter linear', filter: 'none'});

    }, start);
}

const fadeCoins = (start, type) =>
{
    var opacity = type === 'in' ? 1 : 0;
    
    setTimeout(()=>
    {
        $(elements.coin(0)).fadeTo(200, opacity);
        $(elements.coin(1)).fadeTo(200, opacity);
        $(elements.coin(2)).fadeTo(200, opacity);
        $(elements.coin(3)).fadeTo(200, opacity);
        $(elements.coin(4)).fadeTo(200, opacity);
        $(elements.coin(5)).fadeTo(200, opacity);

    }, start);
}

const fadeOutMoves = start =>
{
    setTimeout(() =>
    {
        $(elements.allMoveBlocks).fadeOut(200);
        $(elements.moveCount).fadeOut(200);

    }, start);
}

const resetBoard = start =>
{
    setTimeout(()=>
    {
        $(elements.board).replaceWith(initialBoardState.clone());

        elements.refresh();

        $(elements.allCoins).css({opacity: 1});
        $(elements.coin(0)).css({ right: '1500px' });
        $(elements.coin(1)).css({ right: '1500px' });
        $(elements.coin(2)).css({ right: '1500px' });
        $(elements.coin(3)).css({ left: '1500px' });
        $(elements.coin(4)).css({ left: '1500px' });
        $(elements.coin(5)).css({ left: '1500px' });

    }, start);
}

const slideCoins = start =>
{

    for(let i = 0; i < 6; i++)
        queueAnimations(i);

    function queueAnimations(i)
    {
        setTimeout(() =>
        {
            switch(i)
            {
                case(0): slideCoin(2); break;
                case(1): slideCoin(3); break;
                case(2): slideCoin(1); break;
                case(3): slideCoin(4); break;
                case(4): slideCoin(0); break;
                case(5): slideCoin(5); break;
            }

        }, start + (i * 100));
    }

    function slideCoin(coinID)
    {
        $(elements.coin(coinID)).animate({left: '0px'}, {duration: 400, queue: false});
    }
}

function fadeInMoveLabel(start)
{
    setTimeout(() =>
    {
        $(elements.moveLabel).fadeIn(1000);

    }, start);
}

const enableButtons = start =>
{
    setTimeout(()=>
    {
        $('#game-container *').prop('disabled', false);

    }, start);
}

const enableCoins = start =>
{
    setTimeout(()=>
    {
        $(elements.allCoins).css({pointerEvents: 'auto'});

    }, start);
}
