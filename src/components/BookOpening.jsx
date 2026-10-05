import { useEffect, useState } from 'react'
import './BookOpening.css'

export default function BookOpening({ onComplete }) {
  const [leaving, setLeaving] = useState(false)

  useEffect(() => {
    const root = document.documentElement
    const previousOverflow = root.style.overflow
    root.style.overflow = 'hidden'
    const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)')
    const finish = () => onComplete()
    const onKeyDown = event => { if (event.key === 'Escape') finish() }
    const onMotionChange = event => { if (event.matches) finish() }
    const fadeTimer = window.setTimeout(() => setLeaving(true), 2600)
    const finishTimer = window.setTimeout(finish, 3200)
    window.addEventListener('keydown', onKeyDown)
    motionPreference.addEventListener('change', onMotionChange)

    return () => {
      root.style.overflow = previousOverflow
      window.clearTimeout(fadeTimer)
      window.clearTimeout(finishTimer)
      window.removeEventListener('keydown', onKeyDown)
      motionPreference.removeEventListener('change', onMotionChange)
    }
  }, [onComplete])

  return <div className={`book-opening ${leaving ? 'is-leaving' : ''}`} role="dialog" aria-modal="true" aria-labelledby="opening-title">
    <span className="opening-masthead">PRATIWI PUSPAKITRI</span>
    <div className="opening-scene" aria-hidden="true">
      <div className="opening-book">
        <div className="opening-back-cover" />
        <div className="opening-paper-stack" />
        <div className="opening-final-page"><span>CHAPTER 01</span><strong>A world<br />of possibilities.</strong><i>Data. Design. Stories.</i><span className="opening-page-number">01</span></div>
        {[0, 1, 2, 3].map(index => <div className="opening-page" key={index} style={{ '--page-delay': `${700 + index * 260}ms`, '--page-layer': 8 - index }}><div className="opening-page-front"><span>THE PERSONAL PORTFOLIO</span><div className="opening-page-lines" /><i>{['Curiosity', 'Imagination', 'Discovery', 'A new chapter'][index]}</i><span className="opening-page-number">0{index + 2}</span></div><div className="opening-page-back"><div className="opening-page-lines" /></div></div>)}
        <div className="opening-cover"><div className="opening-cover-front"><span>A COLLECTION OF</span><strong>Thoughts,<br />stories &<br /><em>possibilities.</em></strong><div className="opening-cover-rule" /><span>PRATIWI PUSPAKITRI</span><small>THE PERSONAL PORTFOLIO</small></div><div className="opening-cover-back"><span>PP</span></div></div>
      </div>
    </div>
    <div className="opening-caption"><span className="eyebrow">EVERY STORY BEGINS</span><h2 id="opening-title">With a turn of the page.</h2><div className="opening-progress"><span /></div></div>
    <button className="opening-skip" onClick={onComplete} autoFocus>Skip intro <span aria-hidden="true">↗</span></button>
  </div>
}
