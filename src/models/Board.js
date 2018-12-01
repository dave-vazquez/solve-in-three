/* *************************************************************************************************** */
/*                       GAME BOARD MODEL                                                              */
/* *************************************************************************************************** */

const ADJACENT_OFFSETS  = [[-1, -1], [ 0, -1],      // top-left, top-right
                           [ 1,  0], [ 1,  1],      // right, bottom-right
                           [ 0,  1], [-1,  0]];     // bottom-left, left

const WINNING_OFFSETS =  /* top-left */ [[1, 0],    // top-right   
                                 [2, 1], [2, 2],    
                                 [1, 2], [0, 1]];

const BLOCKING_PATTERNS = [[true , false, true , false, true , false],   // 3-coin block
                           [false, true , false, true , false, true ],   // 3-coin block
                           [true , true , false, true , true , false],   // 4-coin block
                           [false, true , true , false, true , true ],   // 4-coin block
                           [true , false, true , true , false, true ]];  // 4-coin block

export default class Board
{
    constructor()
    {
        this.board;
        this.init();
    }

    init()
    {
        this.board = Array(5);          // x, columns

        for(let x = 0; x < 5; x++)
            this.board[x] = Array(4);   // y, rows
    }

    add(newPosition)
    {
        var {x, y} = get2DIndex(newPosition.id);

        this.board[x][y] = newPosition;
    }

    addCoinTo(posID, newCoin)
    {
        var {x, y} = get2DIndex(posID);

        this.board[x][y].addCoin(newCoin);
    }

    removeCoinFrom(posID)
    {
        var {x, y} = get2DIndex(posID);

        var removedCoin = this.board[x][y].removeCoin();

        return removedCoin;
    }

    getCoinsBlocking(posID) // !!!
    {   
        let blockingCoins = [];
        const testPattern = [];
        
        for(let {adjX, adjY} of getAdjacentCoordinates(posID))
        {
            if(inBounds(adjX, adjY))
            {
                var adjacentPosition = this.board[adjX][adjY];

                if(adjacentPosition.hasCoin)
                {
                    blockingCoins.push(adjacentPosition.getCoinID());
                    testPattern.push(true);
                }
                else
                    testPattern.push(false);
            }
            else
                testPattern.push(false);
        };

        for(let casePattern of BLOCKING_PATTERNS)
        {
            var coinsAreBlocking = true;

            for(let i = 0; i < casePattern.length && coinsAreBlocking; i++)
                if(casePattern[i] === true && testPattern[i] === false)
                    coinsAreBlocking = false;
            
            if(coinsAreBlocking)
                return blockingCoins;
        }

        return [];
    }

    getOpenPositions() // !!!
    {
        let adjacentCoins = 0;
        const openPositions = [];

        for(let currentPosition of board_toArray(this.board))
        { 
            if(!currentPosition.hasCoin /* && this.getCoinsBlocking(currentPosition.id).length < 0 */) //second condition currentPosition.coin.isBlocking?
            {
                for(let {adjX, adjY} of getAdjacentCoordinates(currentPosition.id))
                    if(inBounds(adjX, adjY) && this.board[adjX][adjY].hasCoin)
                        adjacentCoins++;

                if(adjacentCoins >= 2) openPositions.push(currentPosition.id);
            }

            adjacentCoins = 0;
        }

        return openPositions;
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

function getAdjacentCoordinates(posID)
{
    var {x, y} = get2DIndex(posID);

    let adjacentCoordinates = [];
    
    for(let offset of ADJACENT_OFFSETS)
    {
        let adjX = x + offset[0];
        let adjY = y + offset[1];

        adjacentCoordinates.push({adjX, adjY})
    }

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

// function parse1DIndex(x, y)
// {
//     return (y * 5) + x;
// }

