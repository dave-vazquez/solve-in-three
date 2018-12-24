/* *************************************************************************************************** */
/*                           GAME STATE                                                                */
/* *************************************************************************************************** */

export default class GameState
{
    constructor()
    {     
        this.init();
    }

    init()
    {
        this.moves = 0;
        this.hintsEnabled = false;

        this.totalMoves = 0;
        this.attempts = 0;
        this.hintsUsed = false;

        this.currentTime = {
            minutes: 0,
            seconds: 0,
            totalSeconds: 0
        }

        this.timerStarted = false;
        this.roundStarted = false;

        this.solvedInThree = false;
    }

    reset()
    {
        this.moves = 0;
        this.hintsEnabled = false;

        this.roundStarted = false;
    }

    resetAll()
    {
        this.init();
    }
}
