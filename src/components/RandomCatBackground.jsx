import { useMemo } from 'react';
import cat1 from '../assets/cat1.webp';
import cat2 from '../assets/cat2.webp';

export function RandomCatBackground() {
  // Gera posições aleatórias toda vez que o componente monta
  const catPositions = useMemo(() => {
    const positions = [];
    const minDistance = 15; // Distância mínima entre imagens em % da tela
    // Detecta largura da tela
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 700;
  const maxCats = isMobile ? 10 : 40;

    // Função para verificar se duas posições se sobrepõem
    const isOverlapping = (pos1, pos2) => {
      const distance = Math.sqrt(
        Math.pow(pos1.left - pos2.left, 2) + 
        Math.pow(pos1.top - pos2.top, 2)
      );
      return distance < minDistance;
    };

    // Função para verificar se uma nova posição é válida
    const isValidPosition = (newPos) => {
      return positions.every(existingPos => !isOverlapping(newPos, existingPos));
    };

    // Gerar posições não sobrepostas
    let attempts = 0;
    const maxAttempts = 1000; // Limite de tentativas para evitar loop infinito

    while (positions.length < maxCats && attempts < maxAttempts) {
      const baseSize = isMobile ? 60 : 80;
      const sizeRange = isMobile ? 30 : 50;
      const candidate = {
        id: positions.length,
        image: positions.length % 2 === 0 ? cat1 : cat2,
        top: Math.random() * 100, // 0-100%
        left: Math.random() * 100, // 0-100%
        size: baseSize + Math.random() * sizeRange, // menor no mobile
        rotation: Math.random() * 360, // 0-360 graus
        animationDelay: Math.random() * 60 // 0-60s
      };
      if (isValidPosition(candidate)) {
        positions.push(candidate);
      }
      attempts++;
    }

    return positions;
  }, []); // Array vazio = gera apenas uma vez por montagem do componente

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 0 }}>
      {catPositions.map((cat, idx) => (
        <div
          key={cat.id}
          style={{
            position: 'absolute',
            top: `${cat.top}%`,
            left: `${cat.left}%`,
            width: `${cat.size}px`,
          }}
        >
          <img
            src={cat.image}
            alt=""
            className="opacity-[0.06] animate-subtle-float"
            style={{
              width: '100%',
              transform: `rotate(${cat.rotation}deg)`,
              animationDelay: `${cat.animationDelay}s`,
            }}
          />
        </div>
      ))}
    </div>
  );
}
