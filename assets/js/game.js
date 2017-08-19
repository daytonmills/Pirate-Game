/***************************************

        Pirate Battle "RPG"
        Main game logic

***************************************/

$("body").prepend("<div class='container game'></div>");
gameInit();

function gameInit()
{
    //Load selection state
    $(".game").append("<div class='fleet'><div class='row'><h2>Select Ship: </h2></div><div class='row shipsFleet'></div></div>");

    //Load ships into state
    for(var ship in ships)
    {
        $(".shipsFleet").append("<div class='col-lg-3 ship' id='ship"+ships[ship].id+"'><p class='ship-name'>"+ships[ship].name+"</p><img class='ship-img' src='"+ships[ship].sprites[99]+"'/><p class='ship-health'>"+ships[ship].health+"</p></div>");
    };

    var selected = {
        mine: false,
        enemy: false
    }

    //Ship Selection
    $(".ship").click(function(event) {
        if(!selected.mine)
        {
            const myShip = ships[event.target.id];
            myShip.selected = true;
            selected.mine = true;
            $("#ship"+myShip.id).addClass("selected");
            selectEnemy(myShip);
        }
    })

    function selectEnemy(myShip)
    {
        $(".ship").click(function(event) {
            if(!selected.enemy && ships[event.target.id] != myShip)
            {
                const enemyShip = ships[event.target.id];
                enemyShip.enemy = true;
                selected.enemy = true;
                $("#ship"+enemyShip.id).addClass("enemy");
                gameRun(myShip, enemyShip);
            }
        })
    }
}

function gameRun(myShip, enemyShip)
{

    setBattlefield();

    function setBattlefield()
    {
        //Load Arena State
        $(".fleet").empty();
        $(".game").append("<div class='arena'><div class='row'><h2>Arena: </h2></div><div class='row shipsArena'></div></div>");
        $(".game").prepend("<div class='row gameUI'><div class='col-lg-4'><div class='stats-"+myShip.id+"'></div></div><div class='col-lg-4'><h1>Pirate Battle</h1></div><div class='col-lg-4'><div class='stats-"+enemyShip.id+"'></div></div></div>");

        //Load ships into state
        var fleet = [myShip, enemyShip];
        for(s = 0; s < fleet.length; s++)
        {
            $(".shipsArena").append("<div class='col-lg-4 ship' id='ship"+fleet[s].id+"'><p class='ship-name'>"+fleet[s].name+"</p><img class='ship-img' src='"+fleet[s].sprites[99]+"'/><p class='ship-health'>"+fleet[s].health+"</p></div>");
            $(".stats-"+fleet[s].id).append("<p>Name: " + fleet[s].name + "</p>");
        }
    }

    console.log("Your ship: " + myShip.name);
    console.log("Enemy ship: " + enemyShip.name);
}
