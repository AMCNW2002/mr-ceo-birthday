import { useCallback, useEffect, useRef, useState } from 'react'
import './Greeting.css'

const publicImages = `${import.meta.env.BASE_URL}images/`
const companyLogo = `${publicImages}quick-solutions-logo.jpeg`
const birthdayPortrait = `${publicImages}birthday-portrait.jpg`

const birthdayMelody = [
  [392, 0.75], [392, 0.25], [440, 1], [392, 1], [523.25, 1], [493.88, 2],
  [392, 0.75], [392, 0.25], [440, 1], [392, 1], [587.33, 1], [523.25, 2],
  [392, 0.75], [392, 0.25], [783.99, 1], [659.25, 1], [523.25, 1],
  [493.88, 1], [440, 2],
  [698.46, 0.75], [698.46, 0.25], [659.25, 1], [523.25, 1], [587.33, 1], [523.25, 2],
]

const birthdayChords = [
  { startBeat: 0, beats: 6, notes: [130.81, 164.81, 196] },
  { startBeat: 6, beats: 6, notes: [98, 146.83, 174.61] },
  { startBeat: 12, beats: 7, notes: [87.31, 110, 130.81] },
  { startBeat: 19, beats: 6, notes: [130.81, 164.81, 196] },
]

function playNote(context, frequency, startTime, duration, volume, type = 'sine') {
  const oscillator = context.createOscillator()
  const envelope = context.createGain()
  const endTime = startTime + duration

  oscillator.type = type
  oscillator.frequency.setValueAtTime(frequency, startTime)
  envelope.gain.setValueAtTime(0.0001, startTime)
  envelope.gain.exponentialRampToValueAtTime(volume, startTime + 0.045)
  envelope.gain.setValueAtTime(volume, startTime + Math.max(0.05, duration * 0.72))
  envelope.gain.exponentialRampToValueAtTime(0.0001, endTime)
  oscillator.connect(envelope)
  envelope.connect(context.destination)
  oscillator.start(startTime)
  oscillator.stop(endTime + 0.02)
}

function Greeting() {
  const [musicOn, setMusicOn] = useState(false)
  const [musicStarting, setMusicStarting] = useState(false)
  const [musicNotice, setMusicNotice] = useState('')
  const audioContextRef = useRef(null)
  const musicTimerRef = useRef(null)

  const startMusic = useCallback(async (autoplay = false) => {
    if (audioContextRef.current) return
    if (!window.AudioContext) {
      setMusicNotice('This browser does not support background music.')
      return
    }

    const context = new window.AudioContext()
    audioContextRef.current = context
    setMusicStarting(true)
    setMusicNotice('')

    try {
      if (autoplay) {
        const resumed = await Promise.race([
          context.resume().then(() => true),
          new Promise((resolve) => window.setTimeout(() => resolve(false), 250)),
        ])
        if (audioContextRef.current !== context) return
        if (!resumed || context.state !== 'running') {
          audioContextRef.current = null
          if (context.state !== 'closed') await context.close()
          setMusicStarting(false)
          setMusicNotice()
          return
        }
      } else {
        await context.resume()
      }

      if (audioContextRef.current !== context) return
      setMusicOn(true)
      const beatDuration = 0.44
      const melodyDuration = birthdayMelody.reduce((total, [, beats]) => total + beats, 0)
      const loopDuration = melodyDuration * beatDuration

      const playLoop = () => {
        const startTime = context.currentTime + 0.08
        let beatPosition = 0

        birthdayMelody.forEach(([frequency, beats]) => {
          const duration = beats * beatDuration
          playNote(context, frequency, startTime + beatPosition * beatDuration, duration * 0.9, 0.022, 'sine')
          beatPosition += beats
        })

        birthdayChords.forEach(({ startBeat, beats, notes }) => {
          notes.forEach((frequency) => {
            playNote(context, frequency, startTime + startBeat * beatDuration, beats * beatDuration * 0.94, 0.006, 'sine')
          })
        })

        musicTimerRef.current = window.setTimeout(playLoop, loopDuration * 1000)
      }

      setMusicStarting(false)
      playLoop()
    } catch (error) {
      console.error('Could not start the birthday music.', error)
      if (audioContextRef.current === context) audioContextRef.current = null
      setMusicStarting(false)
      setMusicOn(false)
      setMusicNotice('Music could not be started. Please try again.')
      if (context.state !== 'closed') {
        try {
          await context.close()
        } catch (closeError) {
          console.error('Could not close the birthday music audio context.', closeError)
        }
      }
    }
  }, [])

  const stopMusic = useCallback(async () => {
    window.clearTimeout(musicTimerRef.current)
    musicTimerRef.current = null
    const context = audioContextRef.current
    audioContextRef.current = null
    setMusicStarting(false)
    setMusicOn(false)

    if (context && context.state !== 'closed') {
      try {
        await context.close()
      } catch (error) {
        console.error('Could not stop the birthday music.', error)
        setMusicNotice('Music could not be stopped. Please refresh the page.')
      }
    }
  }, [])

  const toggleMusic = useCallback(() => {
    if (musicOn || musicStarting) {
      void stopMusic()
    } else {
      void startMusic()
    }
  }, [musicOn, musicStarting, startMusic, stopMusic])

  useEffect(() => {
    const autoplayTimer = window.setTimeout(() => {
      void startMusic(true)
    }, 0)
    return () => window.clearTimeout(autoplayTimer)
  }, [startMusic])

  useEffect(() => () => {
    window.clearTimeout(musicTimerRef.current)
    const context = audioContextRef.current
    audioContextRef.current = null
    if (context && context.state !== 'closed') {
      context.close().catch((error) => {
        console.error('Could not close the birthday music audio context.', error)
      })
    }
  }, [])

  return (
    <main className="greeting">
      <div className="greeting-loader" role="status" aria-label="Preparing your birthday greeting">
        <span className="loader-logo">
          <img src={companyLogo} alt="" />
        </span>
        <span className="loader-caption">A special wish is on its way</span>
        <span className="loader-progress" aria-hidden="true"><span /></span>
      </div>
      <article className="greeting-card" aria-labelledby="birthday-title">
        <header className="greeting-header">
          <a className="brand" href="#home" aria-label="Quick Solutions International home">
            <span className="brand-logo-cube" aria-hidden="true">
              <img
                className="brand-logo brand-logo-front"
                src={companyLogo}
                alt=""
              />
              <img
                className="brand-logo brand-logo-back"
                src={companyLogo}
                alt=""
              />
            </span>
            <span className="brand-copy">
              <span>Quick Solutions International</span>
              <small>TOGETHER WE GROW</small>
            </span>
          </a>
          <div className="music-controls">
            <button
              className={`music-toggle${musicOn ? ' is-playing' : ''}`}
              type="button"
              aria-label={musicOn || musicStarting ? 'Stop birthday music' : 'Play birthday music'}
              aria-pressed={musicOn}
              onClick={toggleMusic}
            >
              <span className="music-icon" aria-hidden="true">{musicOn ? '■' : '♫'}</span>
              <span className="music-label">
                {musicOn ? 'Stop music' : musicStarting ? 'Starting music…' : 'Play music'}
              </span>
            </button>
            {musicNotice && <span className="music-notice" role="status">{musicNotice}</span>}
          </div>
        </header>

        <section className="birthday-content" id="home">
          <div className="birthday-message">
            

            <br/><br/><p className="pretitle">WISHING YOU A VERY</p><br/><br/><br/><br/>
            <h1 id="birthday-title">
              <span data-shine-text="Happy">Happy</span>
              <span data-shine-text="Birthday">Birthday</span>
            </h1>
            <p className="leader-title">OUR VISIONARY LEADER</p>
            <span className="gold-rule" aria-hidden="true" />
            <div className="wish-copy">
              <p>
                Today, we celebrate not only your birthday but also the vision,
                dedication and leadership that inspire us to achieve more every day.
              </p>
              <p>
                May the year ahead bring you continued success, happiness, good
                health and many new milestones.
              </p>
            </div>
            <p className="signoff">
              With Best Wishes,<br/>
              <span>The Team October Batch<b aria-label="love">♥</b></span>
            </p>
            <span className="signature-swoosh" aria-hidden="true" />
          </div>

          <div className="portrait-wrap">
            <img
              className="birthday-portrait"
              src={birthdayPortrait}
              alt="Our birthday honoree in a blue suit"
            />
            <div className="portrait-shade" aria-hidden="true" />
          </div>
        </section>

        <footer className="greeting-footer">
          <p>ONCE AGAIN,</p>
          <p className="footer-happy" data-shine-text="Happy Birthday!">Happy Birthday!</p>
          <div className="footer-blessing">
            <span aria-hidden="true" />
            STAY BLESSED, ALWAYS.
            <span aria-hidden="true" />
          </div>
          <p className="creator-credit">@AMC SANDARUWAN</p>
        </footer>
        <span className="corner corner-top" aria-hidden="true" />
        <span className="corner corner-bottom" aria-hidden="true" />
      </article>
    </main>
  )
}

export default Greeting
