import { useForm, ValidationError } from '@formspree/react'

const formId = import.meta.env.VITE_FORMSPREE_FORM_ID?.trim()

function FormFields({ state, configured = true }) {
  return <>
    <label htmlFor="name">YOUR NAME</label>
    <input id="name" name="name" placeholder="What should I call you?" autoComplete="name" required maxLength={120} aria-describedby="name-error" />
    <ValidationError id="name-error" className="form-error" field="name" prefix="Name" errors={state?.errors} />
    <label htmlFor="email">EMAIL ADDRESS</label>
    <input id="email" name="email" type="email" placeholder="you@example.com" autoComplete="email" required aria-describedby="email-error" />
    <ValidationError id="email-error" className="form-error" field="email" prefix="Email" errors={state?.errors} />
    <label htmlFor="message">WHAT’S ON YOUR MIND?</label>
    <textarea id="message" name="message" placeholder="Tell me a little about your idea…" rows={4} required maxLength={5000} data-lenis-prevent aria-describedby="message-error" />
    <ValidationError id="message-error" className="form-error" field="message" prefix="Message" errors={state?.errors} />
    <input type="hidden" name="subject" value="New inquiry from Pratiwi’s portfolio" />
    <div className="form-bottom"><span>Let’s start a conversation.</span><button className="button" type="submit" disabled={!configured || state?.submitting}>{state?.submitting ? 'Sending…' : 'Send message'}<span aria-hidden="true">↗</span></button></div>
    <div aria-live="polite"><ValidationError className="form-error" errors={state?.errors} /></div>
  </>
}

function ConnectedForm() {
  const [state, handleSubmit, reset] = useForm(formId)

  if (state.succeeded) {
    return <div className="contact-success" role="status"><span className="success-icon" aria-hidden="true">✓</span><h4>Message received.</h4><p>Thank you for reaching out. I’m looking forward to our conversation.</p><button className="button" onClick={reset}>Send another message <span aria-hidden="true">↗</span></button></div>
  }

  return <form onSubmit={handleSubmit} aria-busy={state.submitting}><fieldset disabled={state.submitting}><FormFields state={state} /></fieldset></form>
}

export default function ContactForm() {
  if (!formId) {
    return <form onSubmit={event => event.preventDefault()}><FormFields configured={false} /><p className="form-status">The contact form is coming soon. In the meantime, reach out through my social links above.</p></form>
  }

  return <ConnectedForm />
}
