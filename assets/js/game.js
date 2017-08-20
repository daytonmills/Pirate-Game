/***************************************

        Pirate Battle "RPG"
        Main game logic

***************************************/
var ships = {
  'ship1': {
    id: 1,
    name: 'Pirate Ship',
    selected: false,
    enemy: false,
    health: 180,
    attack: 10,
    counter: 10,
    sprites: {
      '99': 'assets/img/ships/ship1/99.png',
      '66': 'assets/img/ships/ship1/66.png',
      '33': 'assets/img/ships/ship1/33.png',
      '0': 'assets/img/ships/ship1/0.png'
    }
  },
  'ship2': {
    id: 2,
    name: 'Red Ship',
    selected: false,
    enemy: false,
    health: 150,
    attack: 10,
    counter: 10,
    sprites: {
      '99': 'assets/img/ships/ship2/99.png',
      '66': 'assets/img/ships/ship2/66.png',
      '33': 'assets/img/ships/ship2/33.png',
      '0': 'assets/img/ships/ship2/0.png'
    }
  },
  'ship3': {
    id: 3,
    name: 'Green Ship',
    selected: false,
    enemy: false,
    health: 120,
    attack: 10,
    counter: 10,
    sprites: {
      '99': 'assets/img/ships/ship3/99.png',
      '66': 'assets/img/ships/ship3/66.png',
      '33': 'assets/img/ships/ship3/33.png',
      '0': 'assets/img/ships/ship3/0.png'
    }
  },
  'ship4': {
    id: 4,
    name: 'Blue Ship',
    selected: false,
    enemy: false,
    health: 100,
    attack: 10,
    counter: 10,
    sprites: {
      '99': 'assets/img/ships/ship4/99.png',
      '66': 'assets/img/ships/ship4/66.png',
      '33': 'assets/img/ships/ship4/33.png',
      '0': 'assets/img/ships/ship4/0.png'
    }
  }
};

$('body').prepend("<div class='container game'></div>");
gameInit();

function gameInit () {
  // Load selection state
  $('.game').append("<div class='fleet'><div class='row'><h2>Select Ship: </h2>" +
  "</div><div class='row shipsFleet'></div></div>");

  // Load ships into state
  for (var ship in ships) {
    $('.shipsFleet').append("<div class='col-lg-3 ship' id='ship" + ships[ship].id + "'>" +
    "<p class='ship-name'>" + ships[ship].name + "</p><img class='ship-img' src='" + ships[ship].sprites[99] + "'/>" +
    "<p class='ship-health'>" + ships[ship].health + '</p></div>');
  };

  var selected = {
    mine: false,
    enemy: false
  };

  // Ship Selection
  $('.ship').click(function (event) {
    if (!selected.mine) {
      var myShip = ships[event.target.id];
      myShip.selected = true;
      selected.mine = true;
      $('#ship' + myShip.id).addClass('selected');
      selectEnemy(myShip);
    }
  });

  function selectEnemy (myShip) {
    $('.ship').click(function (event) {
      if (!selected.enemy && ships[event.target.id] !== myShip) {
        var enemyShip = ships[event.target.id];
        enemyShip.enemy = true;
        selected.enemy = true;
        $('#ship' + enemyShip.id).addClass('enemy');
        gameRun(myShip, enemyShip);
      }
    });
  }
}

function gameRun (myShip, enemyShip) {
  var fleet = [myShip, enemyShip];
  var events = [];
  setBattlefield();

  function setBattlefield () {
    // Load Arena State
    $('.fleet').empty();
    $('.game').append("<div class='arena'><div class='row'><h2>Arena: </h2>" +
    "</div><div class='row shipsArena'></div></div>");

    $('.game').prepend("<div class='gameUI'><div class='row'><div class='col-lg-4'>" +
    "<div class='stats-" + myShip.id + "'></div></div><div class='col-lg-4'><h1>Pirate Battle</h1></div>" +
    "<div class='col-lg-4'><div class='stats-" + enemyShip.id + "'></div></div></div>" +
    "<div class='row'><div class='col-lg-4'><button class='btn btn-sm btn-outline-danger' id='attack'>Attack</button>" +
    "</div><div class='col-lg-8'><div class='eventLog'></div></div></div></div>");

    for(let s = 0; s < fleet.length; s++) {
      $('.shipsArena').append("<div class='col-lg-4 ship' id='ship" + fleet[s].id + "'>" +
      "<p class='ship-name'>" + fleet[s].name + "</p><img class='ship-img' src='" + fleet[s].sprites[99] + "'/>" +
      "<p class='ship-health'>" + fleet[s].health + '</p></div>');
    }

    updateUI();
  }

  function eventLog (events) {
    for (let e = 0; e < events.length; e++) {
      $('.eventLog').prepend('<p>' + events[e] + '</p>');
    }
  }

  function updateUI () {
    for (let s = 0; s < fleet.length; s++) {
      $('.stats-' + fleet[s].id).innerHTML('<p>Name: ' + fleet[s].name + '</p><p>Health: ' + fleet[s].health + '</p>');
      $('#ship' + fleet[s].id + ' > .ship-health').innerHTML(fleet[s].health);
    }
  }

  // Attacking
  $('#attack').click(function (event) {
    attack();
    counter();

    function attack () {
      enemyShip.health -= myShip.attack;
      events = [];
      events.push(myShip.name + ' attacked ' + enemyShip.name + ' for ' + myShip.attack + ' damage!');
      eventLog(events);
    }

    function counter () {
      myShip.health -= enemyShip.counter;
      events = [];
      events.push(enemyShip.name + ' counter-attacked ' + myShip.name + ' for ' + enemyShip.counter + ' damage!');
      eventLog(events);
    }
    updateUI();
  });
}
