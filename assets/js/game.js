/***************************************

        Pirate Battle "RPG"
        Main game logic

***************************************/
gameInit();

function gameInit()
{
    //Load Ships
    for(var ship in ships)
    {
        $(".characters").append("<div class='col-lg-3 ship' id='ship"+ships[ship].id+"'><p class='ship-name'>"+ships[ship].name+"</p><img class='ship-img' src='"+ships[ship].sprites[99]+"'/><p class='ship-health'>"+ships[ship].health+"</p></div>");
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
            else
            {
                console.log("You cant pick that!");
            }
        })
    }
}

function gameRun(myShip, enemyShip)
{
    console.log("Your ship: " + myShip.name);
    console.log("Enemy ship: " + enemyShip.name);
}
