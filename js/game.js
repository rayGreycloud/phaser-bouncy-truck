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

  // Load assets

  // Load physics data
  
}

// Create state
function create() {

}

// Update state
function update() {

}

// Helper functions
