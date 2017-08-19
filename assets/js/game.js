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

    var shipSelected = false;

    //Ship Selection
    $(".ship").click(function(event) {
        if(!shipSelected)
        {
            selectShip(event.target.id);
        }
    })

    function selectShip(ship)
    {
        ships[ship].selected = true;
        shipSelected = true;
        console.log(ships[ship]);
        $("#ship"+ships[ship].id).addClass("selected");
    }
}

function gameRun()
{

}
