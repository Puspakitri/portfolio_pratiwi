import { useEffect } from 'react'
import Lenis from 'lenis'
import 'lenis/dist/lenis.css'

const revealSelector = '.section-heading, .about-card, .language-card, .tool, .stack, .book-spotlight, .book-item, .project, .filmstrip, .social-links, .contact-panel'

export default function usePageMotion(enabled = true) {
  useEffect(() => {
    if (!enabled) return
    const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)')
    let lenis
    let observer
    const elements = new Set()
    const observeElements = () => {
      document.querySelectorAll(revealSelector).forEach(element => {
        if (elements.has(element)) return
        elements.add(element)
        const siblings = [...element.parentElement.children].filter(sibling => sibling.matches(revealSelector))
        element.style.setProperty('--reveal-delay', `${Math.min(siblings.indexOf(element), 5) * 65}ms`)
        element.classList.add('scroll-reveal')
        if (motionPreference.matches || !observer || element.getBoundingClientRect().top < window.innerHeight * .92) {
          element.classList.add('is-visible')
        } else {
          observer.observe(element)
        }
      })
    }

    const configureMotion = () => {
      lenis?.destroy()
      observer?.disconnect()
      lenis = undefined
      observer = undefined
      if (motionPreference.matches) {
        elements.forEach(element => element.classList.add('is-visible'))
        return
      }
      lenis = new Lenis({ autoRaf: true, lerp: .085, anchors: { offset: -100 }, prevent: node => node.tagName === 'TEXTAREA' })
      if ('IntersectionObserver' in window) {
        observer = new IntersectionObserver(entries => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              entry.target.classList.add('is-visible')
              observer.unobserve(entry.target)
            }
          })
        }, { threshold: .08, rootMargin: '0px 0px -35px 0px' })
        elements.forEach(element => { if (!element.classList.contains('is-visible')) observer.observe(element) })
      }
    }

    configureMotion()
    observeElements()
    const mutations = new MutationObserver(observeElements)
    mutations.observe(document.querySelector('main'), { childList: true, subtree: true })
    motionPreference.addEventListener('change', configureMotion)

    return () => {
      mutations.disconnect()
      observer?.disconnect()
      lenis?.destroy()
      motionPreference.removeEventListener('change', configureMotion)
      elements.forEach(element => {
        element.classList.remove('scroll-reveal', 'is-visible')
        element.style.removeProperty('--reveal-delay')
      })
    }
  }, [enabled])
}
