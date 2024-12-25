const mazeContainer = document.createElement('div');
mazeContainer.id = 'maze';
document.body.appendChild(mazeContainer);

const maze = [
  ['S', ' ', 'W', 'W', 'W', ' ', ' ', ' ', ' ', ' '],
  ['W', ' ', 'W', ' ', 'W', ' ', 'W', 'W', 'W', ' '],
  ['W', ' ', ' ', ' ', 'W', ' ', ' ', ' ', 'W', ' '],
  ['W', 'W', 'W', ' ', 'W', 'W', 'W', ' ', 'W', ' '],
  ['W', ' ', ' ', ' ', ' ', ' ', 'W', ' ', ' ', ' '],
  ['W', ' ', 'W', 'W', 'W', ' ', 'W', 'W', 'W', 'W'],
  ['W', ' ', 'W', ' ', ' ', ' ', ' ', ' ', ' ', 'W'],
  ['W', 'W', 'W', ' ', 'W', 'W', 'W', 'W', ' ', 'W'],
  [' ', ' ', ' ', ' ', 'W', ' ', ' ', 'W', ' ', 'E'],
  ['W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W'],
];

let playerPosition = { x: 0, y: 0 };

// Génération du labyrinthe
maze.forEach((row, y) => {
  row.forEach((cell, x) => {
    const cellDiv = document.createElement('div');
    cellDiv.classList.add('cell');

    if (cell === 'W') 
        {cellDiv.classList.add('wall')}
    if (cell === 'S') {
      cellDiv.classList.add('start');
      playerPosition = { x, y };
    }
    if (cell === 'E') cellDiv.classList.add('end');
    if (x === playerPosition.x && y === playerPosition.y) {
      cellDiv.classList.add('player');
    }
    mazeContainer.appendChild(cellDiv);
  });
});

// Déplacement du joueur
document.addEventListener('keydown', (e) => {
  const { x, y } = playerPosition;
  let newX = x;
  let newY = y;

  if (e.key === 'ArrowUp') newY -= 1;
  if (e.key === 'ArrowDown') newY += 1;
  if (e.key === 'ArrowLeft') newX -= 1;
  if (e.key === 'ArrowRight') newX += 1;

  // Vérification des collisions avec les murs et limites du labyrinthe
  if (
    newX >= 0 &&
    newX < maze[0].length &&
    newY >= 0 &&
    newY < maze.length &&
    maze[newY][newX] !== 'W'
  ) {
    // Mettre à jour la position du joueur
    document
      .querySelectorAll('.cell')
      [y * maze[0].length + x].classList.remove('player');
    document
      .querySelectorAll('.cell')
      [newY * maze[0].length + newX].classList.add('player');
    playerPosition = { x: newX, y: newY };
  }

  // Vérification de la victoire
  if (maze[newY][newX] === 'E') {
    alert('Congratulations! You reached the end!');
  }
});