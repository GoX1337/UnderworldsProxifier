module.exports = (bandName) => {
    switch(bandName){
        case "steelhearts-champions" :
        case "the-farstriders" :
        case "stormsires-cursebreakers" :
        case "ironsouls-condemners" :
        case "rippas-snarlfangs": return 3;

        case "ironskulls-boyz" :
        case "the-chosen-axes" :
        case "magores-fiends" :
        case "mollogs-mob" :
        case "yltharis-guardians" :
        case "lady-harrows-mournflight" : return 4;

        case "garreks-reavers" :
        case "spiteclaws-swarm" :
        case "the-eyes-of-the-nine" :
        case "thundriks-profiteers" :
        case "skaeths-wild-hunt" : return 5;

        case "godsworn-hunt" :
        case "grashraks-despoilers" : return 6;

        case "sepulchral-guard" :
        case "thorns-of-the-briar-queen" :
        case "the-grymwatch" : return 7;

        case "zarbags-gitz" : return 9;
    }
}