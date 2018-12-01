import $ from 'jquery';
import {elements} from './base.js';

export const incrementMoves = moves =>
{
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

export const resetMoves = () =>
{
    $(elements.allMoveBlocks).css({display: 'none'});
    $(elements.moveCount).css({display: 'none'});
}

export const incrementAttempts = (attempts) =>
{
    elements.attempts.innerText = attempts;
}