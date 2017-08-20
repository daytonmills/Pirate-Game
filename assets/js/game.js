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
    var fleet = [myShip, enemyShip];
    var events = [];
    setBattlefield();

    function setBattlefield()
    {
        //Load Arena State
        $(".fleet").empty();
        $(".game").append("<div class='arena'><div class='row'><h2>Arena: </h2></div><div class='row shipsArena'></div></div>");
        $(".game").prepend("<div class='gameUI'><div class='row'><div class='col-lg-4'><div class='stats-"+myShip.id+"'></div></div><div class='col-lg-4'><h1>Pirate Battle</h1></div><div class='col-lg-4'><div class='stats-"+enemyShip.id+"'></div></div></div><div class='row'><div class='col-lg-4'><button class='btn btn-sm btn-outline-danger' id='attack'>Attack</button></div><div class='col-lg-8'><div class='eventLog'></div></div></div></div>");

        //Load ships into state
        for(s = 0; s < fleet.length; s++)
        {
            $(".shipsArena").append("<div class='col-lg-4 ship' id='ship"+fleet[s].id+"'><p class='ship-name'>"+fleet[s].name+"</p><img class='ship-img' src='"+fleet[s].sprites[99]+"'/><p class='ship-health'>"+fleet[s].health+"</p></div>");
        }

        updateUI();
    }

    function eventLog(events)
    {
        for(e = 0; e < events.length; e++)
        {
            $(".eventLog").prepend("<p>"+events[e]+"</p>");
        }
    }

    function updateUI()
    {
        for(s = 0; s < fleet.length; s++)
        {
            $(".stats-"+fleet[s].id).html("<p>Name: " + fleet[s].name + "</p><p>Health: " + fleet[s].health + "</p>");
            $("#ship"+fleet[s].id+" > .ship-health").html(fleet[s].health);
        }
    }

    //Attacking
    $("#attack").click(function(event) {
        attack();
        counter();

        function attack()
        {
            enemyShip.health -= myShip.attack;
            events = [];
            events.push(myShip.name + " attacked " + enemyShip.name + " for " + myShip.attack + " damage!");
            eventLog(events);
        }

        function counter()
        {
            myShip.health -= enemyShip.counter;
            events = [];
            events.push(enemyShip.name + " counter-attacked " + myShip.name + " for " + enemyShip.counter + " damage!");
            eventLog(events);
        }
        updateUI();
    })
}
