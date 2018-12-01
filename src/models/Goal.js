export default class Goal 
{
    constructor()
    {
        this.solvedInThree = true;
        this.maxMoveGoalMet = true;
        this.maxAttemptGoalMet = true;
        this.timeGoalMet = true;
        this.hintGoalMet = true;
        
        this.testComplete = false;
    }

    allGoalsMet()
    {
        this.allGoalsMet = this.solvedInThree &&
                           this.maxMoveGoalMet && 
                           this.maxAttemptGoalMet && 
                           this.timeGoalMet && 
                           this.hintGoalMet;

        return this.allGoalsMet;
    }

    stillInPlay()
    {
        return this.solvedInThree === false &&
               this.maxMoveGoalMet && 
               this.maxAttemptGoalMet && 
               this.timeGoalMet && 
               this.hintGoalMet;
    }

    goalsToArray()
    {
        return [this.solvedInThree,
                this.maxMoveGoalMet,
                this.maxAttemptGoalMet,
                this.timeGoalMet,
                this.hintGoalMet];
    }
}