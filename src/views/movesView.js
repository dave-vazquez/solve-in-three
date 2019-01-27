console.log('movesView.js');

import $ from 'jquery';
import {elements} from './base.js';

/* *************************************************************************************************** */
/*                                           MOVES VIEW                                                */
/* *************************************************************************************************** */

export default class MovesView
{
    incrementMoves(moves)
    {
        // if(moves === 1)
        // {
        //     var moveBlock = elements.moveBlock(1);
    
        //     $(elements.moveLabel).fadeOut(200);
        //     $(moveBlock).delay(200).fadeIn();
        // }
        if(moves <= 5)
        {
            var moveBlock = elements.moveBlock(moves);
    
            $(moveBlock).fadeIn();
        }
        else
        {
            var moveCount = elements.moveCount;
    
            moveCount.innerText = moves;
    
            $(moveCount).fadeIn();
        }
    }

    resetMoves()
    {
        $(elements.allMoveBlocks).css({display: 'none'});
        $(elements.moveCount).css({display: 'none'});
        $(elements.moveLabel).css({display: 'inline'});
    }
}
