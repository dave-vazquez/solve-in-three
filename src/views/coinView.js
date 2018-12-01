/* *************************************************************************************************** */
/*                       EVENT LISTENERS                                                               */
/* *************************************************************************************************** */

$//('.splash-message-1').draggable();

export const bindDraggable = coin =>
{   
    $(coin).draggable()
    
    $(coin).on('mousedown', function()
    {    
        $(this).stop(true, true); // stops all animations on coin
        
        this.style.zIndex = 1;

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
        this.style.zIndex = 0;
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
/*                       COIN VIEW FUNCTIONS                                                           */
/* *************************************************************************************************** */

export const dragEnabled = (toggle, coinID) =>
{
    var coin = elements.coin(coinID);

    if(toggle === false)
    {
        $(coin).on('drag', () => toggle);  // when do I disbale this thing?
    }
    else
        $(coin).draggable('enable');
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

/* *************************************************************************************************** */
/*                       IMPORTS                                                                       */
/* *************************************************************************************************** */

import $ from 'jquery';
import 'jquery-ui/ui/widgets/draggable';
import 'jquery-ui/ui/effects/effect-highlight';
import 'jquery-ui/ui/effects/effect-shake';
import {elements} from './base.js'