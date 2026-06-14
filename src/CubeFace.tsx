const COLORS = {
  U: '#ffffff',
  D: '#ffd700',
  F: '#ff4444',
  B: '#ff8c00',
  L: '#00aaff',
  R: '#00cc55',
}

type Face = keyof typeof COLORS

interface CubeFaceProps {
  face: Face
  size?: number
}

export function CubeFace({ face, size = 48 }: CubeFaceProps) {
  const color = COLORS[face]
  const cellSize = size / 3

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      {[0, 1, 2].map(row =>
        [0, 1, 2].map(col => (
          <rect
            key={`${row}-${col}`}
            x={col * cellSize + 1}
            y={row * cellSize + 1}
            width={cellSize - 2}
            height={cellSize - 2}
            rx={2}
            fill={row === 1 && col === 1 ? color : '#1a1a2e'}
            stroke={color}
            strokeWidth={0.5}
            opacity={row === 1 && col === 1 ? 1 : 0.3}
          />
        ))
      )}
    </svg>
  )
}

export function CubeNet({ size = 36 }: { size?: number }) {
  const faces: [Face, number, number][] = [
    ['U', 1, 0],
    ['L', 0, 1],
    ['F', 1, 1],
    ['R', 2, 1],
    ['B', 3, 1],
    ['D', 1, 2],
  ]

  const totalW = size * 4
  const totalH = size * 3

  return (
    <svg width={totalW} height={totalH} viewBox={`0 0 ${totalW} ${totalH}`}>
      {faces.map(([face, gx, gy]) => {
        const color = COLORS[face]
        const ox = gx * size
        const oy = gy * size
        const cellSize = size / 3

        return [0, 1, 2].map(row =>
          [0, 1, 2].map(col => (
            <rect
              key={`${face}-${row}-${col}`}
              x={ox + col * cellSize + 1}
              y={oy + row * cellSize + 1}
              width={cellSize - 2}
              height={cellSize - 2}
              rx={1.5}
              fill={color}
              opacity={0.7 + (row === 1 && col === 1 ? 0.3 : 0)}
              stroke={color}
              strokeWidth={0.3}
            />
          ))
        )
      })}
    </svg>
  )
}
