console.log('position.js');

/* *************************************************************************************************** */
/*                                        POSITION MODEL                                               */
/* *************************************************************************************************** */

export default class Position
{
    constructor(id)
    {
        this.id = id;
        
        this.coin = null;
        this.hasCoin = false;
    }

    getCoinID()
    {
        return this.coin.id;
    }

    addCoin(newCoin)
    {        
        this.coin = newCoin;
        this.hasCoin = true;
    }

    removeCoin()
    {   
        var removedCoin = this.coin;

        this.coin = null;
        this.hasCoin = false;

        return removedCoin;
    }
}
