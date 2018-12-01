const date = new Date();
      date.setTime(date.getTime() + (1 * 1000 * 60 * 60 * 24));

const expires = `expires=${date.toGMTString()}`;


export const set= (name, value) =>
{
    document.cookie = `${name}=${value};${expires}`;
}

export const get = name =>
{
    const cookieName = `${name}=`;
    const cookieArray = document.cookie.split(';');

    for(let i = 0; i < cookieArray.length; i++)
    {
        var cookie = cookieArray[i].trim();

        if(cookie.indexOf(name) === 0)
            return cookie.substring(cookieName.length, cookie.length);
    }

    return "";
}

export const reset= () =>
{
    document.cookie = 'timerStarted=false';
    document.cookie = 'seconds=:00';
    document.cookie = 'minutes=0';
}

export const destroy = () =>
{
    date.setTime(date.getTime() - (1000 * 60 * 60 * 24));
    const expires = `expires=${date.toGMTString()}`;

    document.cookie = `timerStarted=; ${expires}`;
    document.cookie = `seconds=; ${expires}`;
    document.cookie = `minutes=; ${expires}`;
    document.cookie = `totalSeconds=; ${expires}`;
}



/* **************************************** */
export const delayReplay = days =>
{
    date.setTime(date.getTime() + (days * 1000 * 60 * 60 * 24));
    const expires = `expires=${date.toGMTString()}`;
    document.cookie = `solvedInThree=true; ${expires}`;
}