import $ from 'jquery';
import {gameState} from '../index-test.js';
import {elements} from '../views/base.js';
import Goal from '../models/Goal.js';

const redStar = new Goal()
const orangeStar = new Goal();
const yellowStar = new Goal();
const defaultStar = new Goal();


export const displayProgress = () =>
{
    let progressMessage1, progressMessage2;
    
    elements.board.style.filter = 'blur(10px)';

    if(redStar.testComplete === false)
    {
        var redGoals;
        
        redStar.solvedInThree = gameState.moves === 3;
        redStar.maxMoveGoalMet = gameState.totalMoves === 3;
        redStar.maxAttemptGoalMet = gameState.attempts === 1;
        redStar.timeGoalMet = gameState.currentTime.totalSeconds <= 60;
        redStar.hintGoalMet = gameState.hintsUsed === false;

        if(!redStar.allGoalsMet())
            elements.redStarImg.src = '../images/stars/empty-star.png';
        else
            gameState.solvedInThree = true;

        redGoals = redStar.goalsToArray();
        
        elements.redListItemGoals.forEach((listItemGoal, i) =>
        {
            console.log(redGoals[i]);

            if(redGoals[i] === true)
                listItemGoal.style.color = 'green';
            else
                listItemGoal.style.color = 'red';
        });

        redStar.testComplete = true;
    }

    if(orangeStar.testComplete === false)
    {
        orangeStar.solvedInThree = gameState.moves === 3;
        orangeStar.maxMoveGoalMet = gameState.totalMoves <= 10;
        orangeStar.maxAttemptGoalMet = gameState.attempts <= 3;
        orangeStar.timeGoalMet = gameState.currentTime.totalSeconds <= 180;
        orangeStar.hintGoalMet = gameState.hintsUsed === false;

        if(orangeStar.stillInPlay()) // not solved in three but other goals still acheivable
        {
            elements.progressMessage1.innerText = `You solved the puzzle in ${gameState.moves} moves.`;
            elements.progressMessage2.innerText = 'But can you solve it in 3?`';
        }
        else 
        {
            var orangeGoals = orangeStar.goalsToArray();
            
            elements.orangeListItemGoals.forEach((listItemGoal, i) =>
            {
                if(orangeGoals[i] === true)
                    listItemGoal.style.color = 'green';
                else
                    listItemGoal.style.color = 'red';
            });

            if(orangeStar.allGoalsMet() === false)
            {
                elements.orangeStarImg.src = '../images/stars/empty-star.png';

                elements.progressMessage1.innerText = `You solved the puzzle in ${gameState.moves} moves.`;
                elements.progressMessage2.innerText = 'Try for the Yellow Star Goal!'
            }
            else
            {
                elements.progressMessage1.innerText = 'Congratulations! You solved the puzzle in 3 moves!.';
                elements.progressMessage2.innerText = 'Try again in a few days and see how quickly you can solve the puzzle!';
                gameState.solvedInThree = true;
            }

            orangeStar.testComplete = true;
        }
    }

    if(yellowStar.testComplete === false)
    {
        yellowStar.solvedInThree = gameState.moves === 3;

        if(yellowStar.stillInPlay()) // not solved in three but other goals still acheivable
        {
            elements.progressMessage1.innerText = `You solved the puzzle in ${gameState.moves} moves.`;
            elements.progressMessage2.innerText = 'But can you solve it in 3?';
        }
        else 
        {
            elements.yellowListItemGoals.forEach(listItemGoal => listItemGoal.style.color = 'green');

            elements.progressMessage1.innerText = 'Congratulations! You solved the puzzle in 3 moves!.';
            elements.progressMessage2.innerText = 'Try again in a few days and see how quickly you can solve the puzzle!';

            gameState.solvedInThree = true;

            yellowStar.testComplete = true;
        }
    }

    $(elements.progressMessageContainer).fadeIn(2000);
}

elements.progressContinueButton.addEventListener('click', () =>
{
    $(elements.progressMessageContainer).fadeOut(10);
    elements.board.style.filter = 'blur(0px)';
    
    document.dispatchEvent(new Event('next-attempt-started'));
})
