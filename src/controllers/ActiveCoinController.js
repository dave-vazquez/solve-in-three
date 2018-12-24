/* *************************************************************************************************** */
/*                       IMPORTS                                                                       */
/* *************************************************************************************************** */

import {board} from './GameController.js';
import * as coinView from '../views/coinView.js';

/* *************************************************************************************************** */
/*                       ACTIVE COIN CONTROLLER                                                        */
/* *************************************************************************************************** */

export default class ActiveCoinController
{
    constructor()
    {
        this.id = null;
        this.origin = null;
        this.lastPositionOver = null;

        this.isBlocked = false;
        this.blockingCoinIDs;

        this.moved = false;
        this.dropped = false;

        this.isActive = false;
    }

    initialize({id, origin})
    {
        this.id = id;
        this.origin = origin;
        this.lastPositionOver = this.origin;

        this.blockingCoinIDs = board.getCoinsBlocking(this.origin);

        this.blockingCoinIDs.length > 0  ?  this.isBlocked = true :
                                            this.isBlocked = false;
        
        this.moved = false;
        this.dropped = false;

        coinView.raiseZIndex(this.id);
        coinView.elevateCoin(true, this.id);

        this.isActive = true;
    }

    dropCoin()
    {
        coinView.elevateCoin(false, this.id);
    }

    release()
    {
        coinView.release(this.id);
        coinView.dropZIndex(this.id);
    }

    isOver(posID)
    {
        this.lastPositionOver = posID;
    }

    returnedToOrigin()
    {
        return this.lastPositionOver === this.origin;
    }

    isOut()
    {
        this.overDroppable = false;
    }

    reverted()
    {
        return this.overDroppable === false;
    }

    snapCoinTo(posID)
    {
        coinView.snapCoinTo(posID, this.id);
    }

    highlightSurroundingCoins()
    {
        this.blockingCoinIDs.forEach(coinID => coinView.highlightCoin(coinID));
    }
}


