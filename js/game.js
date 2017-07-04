// game.js
// Set game parameters
let width = 800;
let height = 500;
let renderer = 'Phaser.AUTO';
let parent = 'gameDiv';
let state = {
    preload,
    create,
    update
  };

// Create game
let game = new Phaser.Game(width, height, renderer, parent, state);

// Initialize app variables
let truck, wheels, wheelMaterial;
// Show physics body polygons
let showBodies = false;
// Truck bounce flag
let allowTruckBounce = true;

// Preload state
function preload() {
  // Set background color
  game.stage.backgroundColor = '#eee';
  // Load assets
  game.load.image('truck', 'assets/truck.png');
  game.load.image('wheel', 'assets/wheel.png');
  game.load.image('hill', 'assets/hill.png');
  // Load physics data
  game.load.physics('physics', 'data/physics.json');
}

// Create state
function create() {
  // Set world boundaries
  game.world.setBounds(0, 0, width*2, height);
  // Start physics engine
  game.physics.startSystem(Phaser.Physics.P2J2);
  // Set gravity
  game.physics.p2.gravity.y = 300;

  // Initialize truck
  truck = game.add.sprite(width*0.25, height*0.8, 'truck');
  game.physics.p2.enable(truck, showBodies);
  truck.body.clearShapes();
  truck.body.loadPolygon('physics', 'truck');
  truck.body.kinematic = false;
  game.camera.follow(truck);

  // Initialize wheel group
  wheels = game.add.group();

  // Create materials for wheels and world
  wheelMaterial = game.physics.p2.createMaterial('wheelMaterial');
  var worldMaterial = game.physics.p2.createMaterial('worldMaterial');

  // Initialize wheels
  var distBelowTruck = 24
  initWheel([55, distBelowTruck]);
  initWheel([-52, distBelowTruck]);

  // Set world materials for all 4 sides
  game.physics.p2.setWorldMaterial(worldMaterial, true, true, true, true);
  // Create contact material wheels/world
  var contactMaterial = game.physics.p2.createContactMaterial(wheelMaterial, worldMaterial);
  contactMaterial.friction = 1e3;
  contactMaterial.restitution = 0.3; // Bounciness

  // Initialize arrow game controls
  cursors = game.input.keyboard.createCursorKeys();
  // Initialize space bar
  var spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
  // Set up truck bounce
  spaceKey.onDown.add(function () {
    if (allowTruckBounce) {
      truck.body.moveUp(500);
      allowTruckBounce = false;
    }
  }, game);

  // Initialize hill
  var hill = game.add.sprite(width, height, 'hill');
  hill.position.y -= hill.height * 0.5;
  game.physics.p2.enable(hill, showBodies);
  hill.body.clearShapes();
  hill.body.loadPolygon('physics', 'hill');
  hill.body.kinematic = true; // turn off collisions
  // Give hill worldMaterial so high friction with wheels
  hill.body.setMaterial(worldMaterial);

}

// Update state
function update() {

}

// Helper functions
