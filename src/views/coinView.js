/* *************************************************************************************************** */
/*                           COIN VIEW                                                                 */
/* *************************************************************************************************** */

/* *************************************************************************************************** */
/*                            IMPORTS                                                                  */
/* *************************************************************************************************** */

import $ from 'jquery';
import 'jquery-ui/ui/widgets/draggable';
import 'jquery-ui/ui/effects/effect-highlight';
import 'jquery-ui/ui/effects/effect-shake';
import 'jquery-shadow-animation/jquery.animate-shadow';
import {elements} from './base.js'

/* *************************************************************************************************** */
/*                       EVENT LISTENERS                                                               */
/* *************************************************************************************************** */

export const bindDraggable = coin =>
{   
    $(coin).draggable()
    
    $(coin).on('mousedown', function()
    {    
        $(this).stop(true, true); // stops all animations on coin

        document.dispatchEvent(new CustomEvent('coin-selected', 
        {
            detail: {coinID: this.id, posID: this.parentNode.id}
        }));
    });

    $(coin).on('dragstart', function()
    {
        document.dispatchEvent(new Event('coin-moved'));
    });

    $(coin).on('mouseup', function() 
    { 
        document.dispatchEvent(new Event('coin-released'));
    });

    $(coin).draggable({revert: function()
    {
        document.dispatchEvent(new Event('coin-reverted'));
        return 'invalid';
    }});
}
bindDraggable((elements.classCoin));

/* *************************************************************************************************** */
/*                                 FUNCTIONS                                                           */
/* *************************************************************************************************** */

export const raiseZIndex = coinID =>
{
    elements.allCoins.forEach(coin => coin.style.zIndex = 0); 

    elements.coin(coinID).style.zIndex = 1;
}

export const dropZIndex = coinID =>
{
    elements.coin(coinID).style.zIndex = 0;
}

export const elevateCoin = (toggle, coinID) =>
{
    var coin = elements.coin(coinID);
    
    if(toggle)
    {
        $(coin).animate({marginLeft: '-4px', marginTop: '-4px'}, {duration: 100, queue: false});
        $(coin).animate({boxShadow: '5px 5px 8px rgba(0, 0, 0, 0.33)'}, {duration: 100, queue: false});
    }
    else
    {
        $(coin).animate({marginLeft: '-2px', marginTop: '-2px'}, {duration: 100, queue: false});
        $(coin).animate({boxShadow: '2px 2px 5px rgba(0, 0, 0, 0.33)'}, {duration: 100, queue: false});
    }
}

export const dragEnabled = (toggle, coinID) =>
{
    var coin = elements.coin(coinID);

    if(toggle === true)
        $(coin).draggable('enable');
    else
        $(coin).draggable('disable');
}

export const release = coinID =>
{
    var coin = elements.coin(coinID);

    $(coin).trigger('mouseup');
}

export const highlightCoin = coinID =>
{
    var coin = elements.coin(coinID);

    $(coin).stop(true,true).effect('highlight', {color: '#2a7cb3', queue: false}, 1500);
}

/* 
   snapCoin - Simulates the effect of a coin 'snapping' to a position on the board by
              1) Inserting a copy of the "active coin" element into the new DOM "position",
              2) Deleting the original "active coin" element from the DOM
              3) Re-initializing the draggable properties/events on the "active coin" copy
*/
export const snapCoinTo = (posID, coinID) => 
{
    let coin = elements.coin(coinID); // original "active coin"

    // insert a copy of the "active coin" into the new position
    elements.position(posID).innerHTML = `<div id="coin${coinID}" class="coin"></div>`;

    // coin.parentNode will be null if the coin was returned back to it's origin (within a single move)
    if(coin.parentNode !== null) 
        coin.parentNode.removeChild(coin);

    coin = elements.coin(coinID); // "active coin" copy

    // re-initialize draggable properties
    $(coin).draggable(
    {   
        revertDuration: 100,
        containment: 'document'
    });

    //events 
    bindDraggable(coin); 
}

function parseID(id)
{
    return parseInt(id.match(/\d+/)[0]);
}
