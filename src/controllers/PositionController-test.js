/* *************************************************************************************************** */
/*                       IMPORTS                                                                       */
/* *************************************************************************************************** */

import {board} from './GameController.js';
import Coin from '../models/Coin.js';
import * as positionView from '../views/positionView.js';

/* *************************************************************************************************** */
/*                       POSITION CONTROLLER                                                           */
/* *************************************************************************************************** */

export default class PositionController
{
    constructor()
    {
        this.openPositionIDs = null;
    }
    
    detatchCoinFrom(posID)
    {
        board.removeCoinFrom(posID);
    }

    addCoinTo(posID, coinID)
    {
        board.addCoinTo(posID, new Coin(coinID));
    }

    enableOpenPositions()
    {
        this.openPositionIDs = board.getOpenPositions();

        this.openPositionIDs.forEach(posID => positionView.dropEnabled(true, posID));
    }

    disableOpenPositions()
    {
        this.openPositionIDs.forEach(posID => positionView.dropEnabled(false, posID));
    }

    disablePosition(posID)
    {
        positionView.dropEnabled(false, posID);
    }
    
    revealOpenPositions()
    {        
        this.openPositionIDs.forEach(posID => positionView.positionBeveled(true, posID)); 
    }

    concealOpenPositions()
    {
        this.openPositionIDs.forEach(posID => positionView.positionBeveled(false, posID)); 
    }
}

