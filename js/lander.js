import init, {
  get_lander,
  get_terrain,
  get_input_buffer,
  init_panic,
  lander_move,
  lander_intersects_terrain,
  lander_successfully_landed,
  lander_is_out_of_bounds,
  lander_get_speed,
  lander_get_coords,
  terrain_get_coords,
  terrain_get_landing_zone_coords,
} from "./lander_rust.js";

window.onload = initialize;

function draw(ctx, coords) {
  ctx.beginPath();
  ctx.strokeStyle = "white";
  ctx.moveTo(...coords[0]);
  for (let i = 1; i < coords.length; i++) {
    ctx.lineTo(...coords[i]);
  }
  ctx.lineTo(...coords[0]);
  ctx.stroke();
  ctx.fill();
}

function drawLandingZoneFlags(ctx, landingZoneCoords) {
  for (const landingCoord of landingZoneCoords) {
    ctx.beginPath();
    ctx.strokeStyle = "white";
    ctx.moveTo(...landingCoord);
    ctx.lineTo(landingCoord[0], landingCoord[1] - 20);
    ctx.lineTo(landingCoord[0] - 2, landingCoord[1] - 18);
    ctx.lineTo(landingCoord[0], landingCoord[1] - 16);
    ctx.stroke();
  }
}

function unflattenCoords(flatCoords) {
  const coords = [];
  for (let i = 0; i < flatCoords.length; i += 2) {
    coords.push(
      [flatCoords[i], flatCoords[i + 1]]
    );
  }
  return coords;
}

let inputBuffer, lander, terrain, prevTimestamp;


function initialize() {
  const startButton = document.querySelector("#start-game");
  startButton.addEventListener("click", startGame, true);
}

function startGame(e) {
  init()
    .then(() => {
      initializeClasses();
      e.target.innerHTML = "Reset Game";
      e.target.removeEventListener("click", startGame, true);
      e.target.addEventListener("click", initializeClasses, true);
    });
}

function initializeClasses() {
  const ctx = document.getElementById("canvas").getContext("2d");
  init_panic();
  inputBuffer = get_input_buffer();
  lander = get_lander();
  terrain = get_terrain(6);
  document.addEventListener("keydown", (e) => inputBuffer.receive_key_down(e.code));
  document.addEventListener("keyup", (e) => inputBuffer.receive_key_up(e.code));
  requestAnimationFrame((timestamp) => tick(timestamp, ctx));
}

function getAndUpdateElapsedTime(timestamp) {
  const elapsed = prevTimestamp ? timestamp - prevTimestamp : Math.floor(1000 / 60);
  prevTimestamp = timestamp;
  return elapsed;
}

function resetPrevTimeStamp() {
  prevTimestamp = undefined;
}

function tick(timestamp, ctx) {
  if (!document.hasFocus()) {
    requestAnimationFrame((timestamp) => {
      resetPrevTimeStamp();
      tick(timestamp, ctx);
    });
    return;
  }
  lander = lander_move(
    lander,
    inputBuffer,
    getAndUpdateElapsedTime(timestamp),
  );
  drawWorld(ctx);
  updateTelemetry();
  gameHasEnded() ? endGame(ctx) : requestAnimationFrame((timestamp) => tick(timestamp, ctx));
}

function drawWorld(ctx) {
  ctx.clearRect(0, 0, 640, 480);
  draw(ctx, unflattenCoords(lander_get_coords(lander)));
  draw(ctx, unflattenCoords(terrain_get_coords(terrain)));
  drawLandingZoneFlags(ctx, unflattenCoords(terrain_get_landing_zone_coords(terrain)));
}

function gameHasEnded() {
  return lander_is_out_of_bounds(lander) || lander_intersects_terrain(lander, terrain);
}

function endGame() {
  if (lander_successfully_landed(lander, terrain)) {
    win();
  } else {
    lose();
  }
}

function updateTelemetry() {
  const [horizontalSpeed, verticalSpeed] = lander_get_speed(lander);
  const hs = document.querySelector("#horizontalSpeed");
  const vs = document.querySelector("#verticalSpeed");
  vs.innerHTML = verticalSpeed.toFixed(1);
  hs.innerHTML = horizontalSpeed.toFixed(1);
}

function win() {
  window.alert("You have won! Congratulations");
}

function lose() {
  window.alert("That was a bad landing, the crew have not survived.");
}
