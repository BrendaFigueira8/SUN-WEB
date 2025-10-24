import { useMemo, useState } from 'react';
import cat1 from '../assets/cat1.webp';
import cat2 from '../assets/cat2.webp';

export function RandomCatBackground() {
  // Gera posições aleatórias toda vez que o componente monta
  const catPositions = useMemo(() => {
    const positions = [];
    const minDistance = 15; // Distância mínima entre imagens em % da tela
    // Detecta largura da tela
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 700;
    const maxCats = isMobile ? 20 : 40;

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
      const candidate = {
        id: positions.length,
        image: positions.length % 2 === 0 ? cat1 : cat2,
        top: Math.random() * 100, // 0-100%
        left: Math.random() * 100, // 0-100%
        size: 80 + Math.random() * 50, // 80-130px
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

  // Tooltip state
  const [hoveredCat, setHoveredCat] = useState(null);
  const [showTooltip, setShowTooltip] = useState(false);
  let hoverTimeout = null;

  // Tooltip texts
  const tooltips = {
    cat1: {
      name: 'Amora',
      text:
        'Amora é antissocial, mas se rende aos tapinhas no bumbum e pede carinho batendo as patinhas como se fossem palmas. Detesta visitas e barulho, mas conquista corações com seu jeitinho único.'
    },
    cat2: {
      name: 'Simba',
      text:
        'Explorador nato e companheiro fiel. Simba adora passear, investigar cada cantinho e nunca gosta de ficar sozinho. Está sempre pronto para fazer companhia e trazer alegria para quem estiver por perto.'
    }
  };

  // Handler para mouse enter
  const handleMouseEnter = (cat, idx) => {
    hoverTimeout = setTimeout(() => {
      setHoveredCat({
        ...cat,
        tooltip: cat.image === cat1 ? tooltips.cat1 : tooltips.cat2
      });
      setShowTooltip(true);
    }, 1000);
  };

  // Handler para mouse leave
  const handleMouseLeave = () => {
    clearTimeout(hoverTimeout);
    setShowTooltip(false);
    setHoveredCat(null);
  };

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
            pointerEvents: 'auto',
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
              cursor: 'pointer',
            }}
            onMouseEnter={() => handleMouseEnter(cat, idx)}
            onMouseLeave={handleMouseLeave}
          />
          {/* Tooltip */}
          {showTooltip && hoveredCat && hoveredCat.id === cat.id && (
            <div
              style={{
                position: 'absolute',
                top: '-2.5rem',
                left: '50%',
                transform: 'translateX(-50%)',
                background: 'rgba(30,30,30,0.55)',
                color: '#F5F5F5',
                borderRadius: '8px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.18)',
                padding: '0.5rem 1rem',
                fontSize: '0.95rem',
                fontWeight: 500,
                zIndex: 10,
                pointerEvents: 'none',
                whiteSpace: 'pre-line',
                maxWidth: '340px',
                minWidth: '220px',
              }}
            >
              <span style={{ fontWeight: 700 }}>{hoveredCat.tooltip.name}</span><br />
              {hoveredCat.tooltip.text}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
