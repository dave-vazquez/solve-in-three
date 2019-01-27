console.log('board.js');

import Coin from "./Coin";
import Position from "./Position";

/* *************************************************************************************************** */
/*                                         BOARD MODEL                                                 */
/* *************************************************************************************************** */

const ADJACENT_OFFSETS  = [[-1, -1], [ 0, -1],      // top-left, top-right
                           [ 1,  0], [ 1,  1],      // right, bottom-right
                           [ 0,  1], [-1,  0]];     // bottom-left, left

const WINNING_OFFSETS =                 [[1, 0],     
                                 [2, 1], [2, 2],    
                                 [1, 2], [0, 1]];

export default class Board 
{
    constructor()
    {
        this.board;
        this.occupiedPosIDs = [6, 7, 8, 11, 12, 13];
        this.openPositions;
        this.surroundingCoins;

        this.init();
    }

    init()
    {
       this.initializeBoard();
       this.initializeOccupiedPostions();
    }

    initializeBoard()
    {
        this.board = Array(5);          

        for(let x = 0; x < 5; x++)
            this.board[x] = Array(4);   
    }

    initializeOccupiedPostions()
    {
        let coinID = -1;
        
        for(let i = 0; i < 20; i++)
        {
            this.add(new Position(i));

            if(this.occupiedPosIDs.includes(i))
                this.addCoinTo(i, ++coinID);
        }
    }

    add(newPosition)
    {
        var {x, y} = get2DIndex(newPosition.id);
        
        this.board[x][y] = newPosition;
    }

    addCoinTo(posID, coinID)
    {
        var {x, y} = get2DIndex(posID);

        this.board[x][y].addCoin(new Coin(coinID));

        this.addOccupiedPosID(posID);

        console.log('ADDED OCC-POSITION:', posID, 'TO:', this.occupiedPosIDs);
    }

    removeCoinFrom(posID)
    {
        var {x, y} = get2DIndex(posID);

        var removedCoin = this.board[x][y].removeCoin();
        
        this.removeOccupiedPosID(posID);
        this.initializeOpenPositions();

        console.log('REMOVED OCC-POSITION:', posID, 'FROM:', this.occupiedPosIDs);

        return removedCoin;
    }

    removeOccupiedPosID(posID)
    {
        var index = this.occupiedPosIDs.indexOf(posID);
        
        this.occupiedPosIDs.splice(index, 1);
    }

    addOccupiedPosID(posID)
    {
        if(!this.occupiedPosIDs.includes(posID))
            this.occupiedPosIDs.push(posID);
    }

    initializeOpenPositions()
    {
        let adjacentCoins;
        const openPositions = [];

        // iterate through every position on the board
        for(let currentPosition of board_toArray(this.board))
        { 
            adjacentCoins = 0;
            
            // if the current position does not have a coin
            if(!currentPosition.hasCoin /* && !this.positionBlocked(currentPosition) */)
            {
                // iterate through the coordinates of the positions surrounding the current position
                for(let {adjX, adjY} of getAdjacentCoordinates(currentPosition.id))
                {
                    // if the coordinates are in bounds of the board, proceed
                    if(inBounds(adjX, adjY))
                    {
                        var adjacentPosition = this.board[adjX][adjY];

                        // if the adjacent position has a coin, increment adjacentCoints
                        if(adjacentPosition.hasCoin)
                            adjacentCoins++;
                    }
                }

                // if there are 2 or more adjacent coins, the position is available to be occupied
                if(adjacentCoins >= 2) 
                    openPositions.push(currentPosition.id);
            }
        }

        this.openPositions = openPositions;
    }

    coinIsBlocked(coinPosID)
    {   
        let consecutiveOpenPositions = 0;
        let surroundingCoins = [];

        // iterate through the coordinates of all surrounding positions
        for(let {adjX, adjY} of getAdjacentCoordinates(coinPosID, true))
        {
            // if the coordinates are out of bounds, the coin is not blocked
            if(!inBounds(adjX, adjY))
                return false; // return an empty array
            
            // get the position from the board using the adjancent coordinates
            var adjacentPosition = this.board[adjX][adjY];

            // if the adjacent position does not have a coin
            if(!adjacentPosition.hasCoin)
                // increment consecutiveOpenPositions
                consecutiveOpenPositions++;
            else 
            {
                // reset consecutiveOpenPositions to '0'
                consecutiveOpenPositions = 0;
                // and push the 'id' of the adjacent coin to the blockingCoinsarray
                surroundingCoins.push(adjacentPosition.getCoinID());
            }
            
            // if two consecutive open positions are found, the coin is not blocked
            if(consecutiveOpenPositions === 2)
                return false; // return an empty array
        }

        this.surroundingCoins = surroundingCoins.slice(0, 5);

        // id's of all blocking coins will return if coin is not blocked
        return true;
    }

    solutionFound()
    {
        let firstOccupiedID;

        for(let currentPosition of board_toArray(this.board))
            if(currentPosition.hasCoin)
            {
                firstOccupiedID = currentPosition.id;
                break;
            }

        for(let {winX, winY} of getWinningCoordinates(firstOccupiedID))
            if(!inBounds(winX, winY) || !this.board[winX][winY].hasCoin) 
                return false;

        this.init(); // reset board        

        return true;
    }

    logBoardState()
    {
        let boardState = ``;
        
        for(let y = 0; y < 4; y++)
        {
            for(let x = 0; x < 5; x++)
            {
                var position = this.board[x][y];

                var posID      = position.id < 10     ?  `${position.id} `              : `${position.id}`;
                var hasCoin    = position.hasCoin  ?  `true `                        : `false`;
                var coinID     = position.hasCoin  ?  ` (${position.getCoinID()})  ` : `      `;

                boardState += `${posID}  ${hasCoin}  ${coinID}    `;
            }

            boardState += `\n\n`;
        }

        console.log(boardState + '\n\n');
    }

}

/* *************************************************************************************************** */
/*                                                                                                     */
/* *************************************************************************************************** */

function board_toArray(board)
{
    const boardArray = [];
    
    for(let y = 0; y < 4; y++)
        for(let x = 0; x < 5; x++)
            boardArray.push(board[x][y]);
    
    return boardArray;
}

function get2DIndex(position)
{
    return {
        x: position % 5,
        y: ~~(position / 5)
    }
}

function inBounds(x, y)
{   
    return x >= 0 && x <= 4 && y >= 0 && y <= 3;
}

function getAdjacentCoordinates(posID, extendToFirstCoordinate = false)
{
    var {x, y} = get2DIndex(posID);

    let adjacentCoordinates = [];
    
    for(let offset of ADJACENT_OFFSETS)
    {
        let adjX = x + offset[0];
        let adjY = y + offset[1];

        adjacentCoordinates.push({adjX, adjY})
    }

    if(extendToFirstCoordinate)
        adjacentCoordinates.push(adjacentCoordinates[0]);

    return adjacentCoordinates;
}

function getWinningCoordinates(posID)
{
    var {x, y} = get2DIndex(posID);

    let winningCoordinates = [];
    
    for(let offset of WINNING_OFFSETS)
    {
        let winX = x + offset[0];
        let winY = y + offset[1];

        winningCoordinates.push({winX, winY})
    }

    return winningCoordinates;
}
