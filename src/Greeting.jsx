import './Greeting.css'

function Greeting() {
  return (
    <main className="greeting">
      <div className="greeting-loader" role="status" aria-label="Preparing your birthday greeting">
        <span className="loader-logo">
          <img src="/images/quick-solutions-logo.jpeg" alt="" />
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
                src="/images/quick-solutions-logo.jpeg"
                alt=""
              />
              <img
                className="brand-logo brand-logo-back"
                src="/images/quick-solutions-logo.jpeg"
                alt=""
              />
            </span>
            <span className="brand-copy">
              <span>Quick Solutions International</span>
              <small>TOGETHER WE GROW</small>
            </span>
          </a>
         
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
              src="/images/birthday-portrait.jpg"
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
