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
    }

    disableDrag()
    {
        coinView.dragEnabled(false, this.id);
    }

    enableDrag()
    {
        coinView.dragEnabled(true, this.id);
    }

    isOver(posID)
    {
        this.lastPositionOver = posID;
    }

    overOrigin()
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

    highlightBlockingCoins()
    {
        this.blockingCoinIDs.forEach(coinID => coinView.highlightCoin(coinID));
    }
}
/* *************************************************************************************************** */
/*                       IMPORTS                                                                       */
/* *************************************************************************************************** */

import {board} from './GameController.js';
import * as coinView from '../views/coinView.js';

