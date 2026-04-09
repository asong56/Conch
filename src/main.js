import { lockStorage }               from './storage-guard.js'
import { initRenderer, spawnParticles } from './particles.js'

// ─── Boot ─────────────────────────────────────────────────────────────────────

lockStorage()

const ta  = document.getElementById('ta')
const btn = document.getElementById('btn')
const cnt = document.getElementById('cnt')
const cv  = document.getElementById('c')

initRenderer(cv)
setTimeout(() => ta.focus(), 350)

// ─── Input state ──────────────────────────────────────────────────────────────

ta.addEventListener('input', () => {
  const n = ta.value.length
  btn.classList.toggle('on', n > 0)
  cnt.textContent = n || ''
  cnt.classList.toggle('on', n > 0)
})

// ─── Keyboard shortcut: ⌘ / Ctrl + Enter ─────────────────────────────────────

ta.addEventListener('keydown', e => {
  if ((e.metaKey || e.ctrlKey) && e.key === 'Enter' && ta.value.trim()) release()
})

btn.addEventListener('click', release)

// ─── Release ──────────────────────────────────────────────────────────────────

function release() {
  const text = ta.value
  if (!text.trim()) return

  document.body.classList.add('go')

  ta.style.transition = 'color 0.18s, opacity 0.18s'
  ta.style.color      = 'transparent'
  ta.style.opacity    = '0'

  spawnParticles(text, ta)

  setTimeout(() => {
    ta.value = ''
    cnt.classList.remove('on')
    btn.classList.remove('on')

    ta.style.transition = 'none'
    ta.style.color      = ''
    ta.style.opacity    = ''

    requestAnimationFrame(() => {
      ta.style.transition = ''
      document.body.classList.remove('go')
      ta.focus()
    })
  }, 220)
}
