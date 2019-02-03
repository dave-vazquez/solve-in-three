import $ from 'jquery';
import 'jquery-ui/ui/widgets/draggable';
import 'jquery-ui/ui/effects/effect-highlight';
import 'jquery-ui/ui/effects/effect-shake';
import 'jquery-shadow-animation/jquery.animate-shadow';

import {elements} from './base.js';
import {game} from '../index.js';

/* *************************************************************************************************** */
/*                           COIN VIEW                                                                 */
/* *************************************************************************************************** */

export default class CoinView 
{
    constructor()
    {
        this.init();
    }

    init(coins = elements.allCoins)
    {
        $(coins).draggable({
            revertDuration: 100,
            containment: 'document' 
        });

        this.bindCoinEvents(coins);
    }

    bindCoinEvents(coin)
    {
        $(coin).on('mousedown', function() {
            $(coin).stop(true, true);
            game.selectCoin(this.id, this.parentNode.id)
        });
        
        $(coin).on('dragstart', () => game.moveCoin());
        
        $(coin).on('mouseup', () => game.releaseCoin());
        
        $(coin).draggable({revert: function() {
            game.handleCoinRevert();
            return 'invalid';
        }});  

        $(document).mouseleave(() => {  
            if(game.activeCoin.isActive)
                game.forceCoinRelease()
        });
    }

    stopAnimation(coinID)
    {
        $(elements.coin(coinID)).finish();
    }

    forceRelease(coinID)
    {
        let coin = elements.coin(coinID);

        $(coin).trigger('mouseup');

        $(coin).css({zIndex: 0});
    }

    raiseCoin(coinID)
    {
        let coin = elements.coin(coinID);

        $(coin).finish().animate({marginLeft: '-8px', marginTop: '-8px'}, {duration: 100, queue: false});
        $(coin).finish().animate({boxShadow: '5px 5px 9px rgba(0, 0, 0, 0.33)'}, {duration: 100, queue: false});
    
        $(coin).css({zIndex: 1});
    }

    lowerCoin(coinID)
    {
        let coin = elements.coin(coinID);

        $(coin).finish().animate({marginLeft: '-4px', marginTop: '-4px'}, {duration: 100, queue: false});
        $(coin).finish().animate({boxShadow: '2px 2px 5px rgba(0, 0, 0, 0.33)'}, {duration: 100, queue: false});
    
        $(coin).css({zIndex: 0});
    }

    highlightCoins(coinIDs)
    {
        coinIDs.forEach(coinID =>
        {
            let coin = elements.coin(coinID);
    
            $(coin).stop(true,true).effect('highlight', {color: '#2a7cb3', queue: false}, 1500);
        });
    }

    snapCoinTo(posID, coinID)
    {
        let coin = elements.coin(coinID); // original "active coin"

        // insert a copy of the "active coin" into the new position
        elements.position(posID).innerHTML = `<div id="coin${coinID}" class="coin"></div>`;
    
        // coin.parentNode will be null if the coin is returned back to it's origin (within a single move)
        if(coin.parentNode !== null) 
            coin.parentNode.removeChild(coin);
    
        coin = elements.coin(coinID); // "active coin" copy
    
        this.resetCoinProperties(1, 0, 'auto', coinID);
        
        this.init(coin);
    }

    resetCoinPositions()
    {
        var initialCoinPositions = [6, 7, 8, 11, 12, 13];

        initialCoinPositions.forEach((posID, coinID) =>
        {
            elements.position(posID).innerHTML = `<div id="coin${coinID}" class="coin"></div>`;

            this.resetCoinProperties(0, 1500, 'none', coinID);
            
        });

        elements.refresh();

        this.init(elements.allCoins);
    }

    resetCoinProperties(opacVal, posVal, pointEvtVal, coinID)
    {
        var coin = elements.coin(coinID);
        
        coinID < 3 ? $(coin).css({opacity: opacVal, left: `-${posVal}px`, pointerEvents: pointEvtVal}):
                     $(coin).css({opacity: opacVal, left: `${posVal}px`, pointerEvents: pointEvtVal}) ;
    }
}
