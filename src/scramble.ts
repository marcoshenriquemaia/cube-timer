const FACES = ['U', 'D', 'F', 'B', 'L', 'R'] as const
const MODIFIERS = ['', "'", '2'] as const

export function generateScramble(length = 20): string {
  const moves: string[] = []
  let lastFace = ''
  let secondLastFace = ''

  while (moves.length < length) {
    const face = FACES[Math.floor(Math.random() * FACES.length)]
    const modifier = MODIFIERS[Math.floor(Math.random() * MODIFIERS.length)]

    const oppositePairs: Record<string, string> = { U: 'D', D: 'U', F: 'B', B: 'F', L: 'R', R: 'L' }
    if (face === lastFace) continue
    if (face === oppositePairs[lastFace] && oppositePairs[face] === secondLastFace) continue

    secondLastFace = lastFace
    lastFace = face
    moves.push(face + modifier)
  }

  return moves.join(' ')
}
