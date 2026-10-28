const dice = document.getElementById('dice');
const rollBtn = document.getElementById('rollBtn');

// Mapeamento dos ângulos para cada face cair de frente
const rotations = {
  1: { x: 0, y: 0 },
  2: { x: 90, y: 0 },
  3: { x: 0, y: -90 },
  4: { x: 0, y: 90 },
  5: { x: -90, y: 0 },
  6: { x: 0, y: -180 }
};

rollBtn.addEventListener('click', () => {
  // Sorteia um número de 1 a 6
  const randomValue = Math.floor(Math.random() * 6) + 1;
  const targetRotation = rotations[randomValue];

  // Adiciona giros extras (voltas completas) para dar efeito de animação real
  const extraSpinsX = 360 * 3;
  const extraSpinsY = 360 * 3;

  const finalX = extraSpinsX + targetRotation.x;
  const finalY = extraSpinsY + targetRotation.y;

  dice.style.transform = `rotateX(${finalX}deg) rotateY(${finalY}deg)`;
});
