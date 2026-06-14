import { useState, useEffect, useRef, useCallback } from 'react'
import { generateScramble } from './scramble'
import { CubeNet } from './CubeFace'
import './index.css'

type Phase = 'idle' | 'inspection' | 'running' | 'done'

interface Solve {
  id: number
  ms: number
  scramble: string
  date: Date
}

const INSPECTION_TOTAL = 15

function formatTime(ms: number): string {
  if (ms < 0) ms = 0
  const totalSeconds = Math.floor(ms / 1000)
  const minutes = Math.floor(totalSeconds / 60)
  const seconds = totalSeconds % 60
  const centis = Math.floor((ms % 1000) / 10)
  if (minutes > 0) {
    return `${minutes}:${String(seconds).padStart(2, '0')}.${String(centis).padStart(2, '0')}`
  }
  return `${seconds}.${String(centis).padStart(2, '0')}`
}

function formatClock(date: Date): string {
  return date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit', second: '2-digit' })
}

function getTimerClass(phase: Phase, inspectionLeft: number): string {
  if (phase === 'running') return 'timer-running'
  if (phase === 'inspection') {
    return inspectionLeft <= 3 ? 'timer-inspect-critical' : 'timer-inspect'
  }
  return 'timer-idle'
}

const PARTICLES = [
  { size: 6,  top: '10%', left: '5%',  color: '#ff0080', delay: '0s',  cls: 'particle-1' },
  { size: 10, top: '70%', left: '8%',  color: '#00cfff', delay: '-3s', cls: 'particle-2' },
  { size: 5,  top: '20%', left: '90%', color: '#ffd700', delay: '-1s', cls: 'particle-3' },
  { size: 8,  top: '80%', left: '85%', color: '#00ff88', delay: '-5s', cls: 'particle-4' },
  { size: 7,  top: '50%', left: '3%',  color: '#8b5cf6', delay: '-2s', cls: 'particle-5' },
  { size: 4,  top: '40%', left: '92%', color: '#ff8c00', delay: '-7s', cls: 'particle-1' },
  { size: 9,  top: '15%', left: '50%', color: '#ff0080', delay: '-4s', cls: 'particle-2' },
  { size: 6,  top: '85%', left: '45%', color: '#00cfff', delay: '-6s', cls: 'particle-3' },
]

const MOVE_COLORS = ['#ff6b9d', '#ffd700', '#00ff88', '#00cfff', '#ff8c00', '#8b5cf6']

export default function App() {
  const [phase, setPhase] = useState<Phase>('idle')
  const [scramble, setScramble] = useState(() => generateScramble())
  const [inspectionLeft, setInspectionLeft] = useState(INSPECTION_TOTAL)
  const [solveMs, setSolveMs] = useState(0)
  const [solves, setSolves] = useState<Solve[]>([])
  const [scrambleKey, setScrambleKey] = useState(0)
  const solveIdRef = useRef(0)

  const solveStart = useRef<number>(0)
  const rafRef = useRef<number>(0)
  const inspectionRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const phaseRef = useRef<Phase>('idle')
  phaseRef.current = phase

  const stopInspection = useCallback(() => {
    if (inspectionRef.current) {
      clearInterval(inspectionRef.current)
      inspectionRef.current = null
    }
  }, [])

  const startSolve = useCallback(() => {
    stopInspection()
    solveStart.current = performance.now()
    setPhase('running')

    const tick = () => {
      setSolveMs(performance.now() - solveStart.current)
      rafRef.current = requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)
  }, [stopInspection])

  const stopSolve = useCallback(() => {
    cancelAnimationFrame(rafRef.current)
    const elapsed = performance.now() - solveStart.current
    setSolveMs(elapsed)
    setSolves(prev => {
      const newSolve: Solve = {
        id: ++solveIdRef.current,
        ms: elapsed,
        scramble: scramble,
        date: new Date(),
      }
      return [newSolve, ...prev]
    })
    setPhase('done')
  }, [scramble])

  const startInspection = useCallback(() => {
    setInspectionLeft(INSPECTION_TOTAL)
    setPhase('inspection')

    inspectionRef.current = setInterval(() => {
      setInspectionLeft(prev => {
        if (prev <= 1) {
          startSolve()
          return 0
        }
        return prev - 1
      })
    }, 1000)
  }, [startSolve])

  const reset = useCallback(() => {
    stopInspection()
    cancelAnimationFrame(rafRef.current)
    setScramble(generateScramble())
    setScrambleKey(k => k + 1)
    setInspectionLeft(INSPECTION_TOTAL)
    setSolveMs(0)
    setPhase('idle')
  }, [stopInspection])

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.repeat) return
      if (e.key === 'Escape') { reset(); return }

      const p = phaseRef.current
      if (p === 'idle') startInspection()
      else if (p === 'inspection') startSolve()
      else if (p === 'running') stopSolve()
      else if (p === 'done') reset()
    }

    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [startInspection, startSolve, stopSolve, reset])

  const times = solves.map(s => s.ms)
  const best = times.length ? Math.min(...times) : null
  const avg5 = times.length >= 5 ? times.slice(0, 5).reduce((a, b) => a + b, 0) / 5 : null
  const avg12 = times.length >= 12 ? times.slice(0, 12).reduce((a, b) => a + b, 0) / 12 : null

  const deletesolve = (id: number) => setSolves(prev => prev.filter(s => s.id !== id))

  const timerDisplay =
    phase === 'inspection' ? String(inspectionLeft)
    : phase === 'idle' ? '0.00'
    : formatTime(solveMs)

  const timerClass = getTimerClass(phase, inspectionLeft)

  const statusText =
    phase === 'idle'       ? 'Aperte qualquer tecla para iniciar a inspeção'
    : phase === 'inspection' && inspectionLeft <= 3 ? `⚠️ ${inspectionLeft}s — COMEÇA JÁ!`
    : phase === 'inspection' ? `Inspeção: ${inspectionLeft}s — Analise o cubo!`
    : phase === 'running'  ? 'Aperte qualquer tecla para parar o timer'
    : 'Aperte qualquer tecla para novo scramble'

  return (
    <div className="bg-animated relative w-full min-h-screen flex flex-col items-center justify-start overflow-x-hidden">
      {/* Background particles */}
      {PARTICLES.map((p, i) => (
        <div
          key={i}
          className={`particle ${p.cls}`}
          style={{
            width: p.size,
            height: p.size,
            top: p.top,
            left: p.left,
            background: p.color,
            boxShadow: `0 0 ${p.size * 2}px ${p.color}`,
            animationDelay: p.delay,
          }}
        />
      ))}

      {/* Subtle grid */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            'linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      <div className="relative z-10 flex flex-col items-center gap-6 w-full max-w-3xl px-6 py-10">
        {/* Title */}
        <div className="flex items-center gap-3">
          <CubeNet size={30} />
          <h1
            className="font-timer text-2xl font-bold tracking-widest text-white/70 uppercase m-0"
            style={{ fontFamily: "'Rajdhani', sans-serif" }}
          >
            Cube Timer
          </h1>
          <CubeNet size={30} />
        </div>

        {/* Scramble */}
        <div
          key={scrambleKey}
          className={`animate-scramble-in w-full rounded-2xl border-2 p-5 text-center
            ${phase === 'idle' || phase === 'done' ? 'animate-rainbow-border' : 'border-white/10'}
          `}
          style={{ background: 'rgba(255,255,255,0.04)', backdropFilter: 'blur(12px)' }}
        >
          <p className="text-white/40 text-xs uppercase tracking-widest mb-2 font-semibold">
            Embaralhamento WCA
          </p>
          <p
            className="font-timer text-2xl font-bold tracking-wider leading-relaxed"
            style={{ fontFamily: "'Rajdhani', sans-serif" }}
          >
            {scramble.split(' ').map((move, i) => (
              <span key={i} style={{ color: MOVE_COLORS[i % MOVE_COLORS.length] }}>
                {move}{' '}
              </span>
            ))}
          </p>
        </div>

        {/* Timer */}
        <div
          className={`font-timer font-bold select-none ${timerClass}`}
          style={{
            fontSize: 'clamp(80px, 18vw, 160px)',
            lineHeight: 1,
            letterSpacing: '-0.02em',
            fontFamily: "'Rajdhani', sans-serif",
          }}
        >
          {timerDisplay}
        </div>

        {/* Status */}
        <p
          className={`text-center text-sm font-medium tracking-wide ${
            phase === 'inspection' && inspectionLeft <= 3
              ? 'text-red-400 animate-countdown-pulse'
              : 'text-white/50'
          }`}
        >
          {statusText}
        </p>

        {/* Stats cards */}
        {solves.length > 0 && (
          <div className="flex flex-wrap justify-center gap-3 w-full">
            {best !== null && (
              <div className="text-center px-4 py-2 rounded-xl"
                style={{ background: 'rgba(255,215,0,0.08)', border: '1px solid rgba(255,215,0,0.25)' }}>
                <p className="text-yellow-400/60 text-xs uppercase tracking-widest">Melhor</p>
                <p className="text-xl font-bold text-yellow-400" style={{ fontFamily: "'Rajdhani', sans-serif" }}>{formatTime(best)}</p>
              </div>
            )}
            {avg5 !== null && (
              <div className="text-center px-4 py-2 rounded-xl"
                style={{ background: 'rgba(0,207,255,0.08)', border: '1px solid rgba(0,207,255,0.2)' }}>
                <p className="text-cyan-400/60 text-xs uppercase tracking-widest">Média 5</p>
                <p className="text-xl font-bold text-cyan-400" style={{ fontFamily: "'Rajdhani', sans-serif" }}>{formatTime(avg5)}</p>
              </div>
            )}
            {avg12 !== null && (
              <div className="text-center px-4 py-2 rounded-xl"
                style={{ background: 'rgba(139,92,246,0.08)', border: '1px solid rgba(139,92,246,0.25)' }}>
                <p className="text-purple-400/60 text-xs uppercase tracking-widest">Média 12</p>
                <p className="text-xl font-bold text-purple-400" style={{ fontFamily: "'Rajdhani', sans-serif" }}>{formatTime(avg12)}</p>
              </div>
            )}
            <div className="text-center px-4 py-2 rounded-xl"
              style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)' }}>
              <p className="text-white/40 text-xs uppercase tracking-widest">Solves</p>
              <p className="text-xl font-bold text-white/70" style={{ fontFamily: "'Rajdhani', sans-serif" }}>{solves.length}</p>
            </div>
          </div>
        )}

        {/* History */}
        {solves.length > 0 && (
          <div className="w-full rounded-2xl overflow-hidden"
            style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}>
            <div className="flex items-center justify-between px-4 py-3"
              style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
              <p className="text-white/50 text-xs uppercase tracking-widest font-semibold">Histórico</p>
              <button
                onClick={() => setSolves([])}
                className="text-red-400/60 hover:text-red-400 text-xs uppercase tracking-widest transition-colors cursor-pointer"
              >
                Limpar tudo
              </button>
            </div>
            <div className="history-scroll max-h-64 overflow-y-auto overflow-x-hidden">
              {solves.map((solve, i) => {
                const isBest = solve.ms === best
                return (
                  <div
                    key={solve.id}
                    className="flex items-center gap-3 px-4 py-3 group transition-colors hover:bg-white/5"
                    style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}
                  >
                    {/* Number */}
                    <span className="text-white/25 text-xs w-6 text-right shrink-0">
                      {solves.length - i}
                    </span>

                    {/* Time */}
                    <span
                      className={`font-bold text-lg w-20 shrink-0 ${isBest ? 'text-yellow-300' : 'text-white/90'}`}
                      style={{ fontFamily: "'Rajdhani', sans-serif" }}
                    >
                      {isBest && <span className="text-yellow-400 mr-1">★</span>}
                      {formatTime(solve.ms)}
                    </span>

                    {/* Scramble */}
                    <span className="text-white/30 text-xs truncate flex-1 hidden sm:block">
                      {solve.scramble}
                    </span>

                    {/* Time */}
                    <span className="text-white/25 text-xs shrink-0">
                      {formatClock(solve.date)}
                    </span>

                    {/* Delete */}
                    <button
                      onClick={() => deletesolve(solve.id)}
                      className="text-white/20 hover:text-red-400 transition-colors opacity-0 group-hover:opacity-100 shrink-0 cursor-pointer text-sm"
                    >
                      ✕
                    </button>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        <p className="text-white/20 text-xs tracking-widest uppercase">ESC para resetar</p>
      </div>
    </div>
  )
}
