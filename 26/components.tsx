import {existsSync} from 'fs';
import {join} from 'path';
import * as React from 'react';

export const Layout = ({children, version, current_variable}) =>
  <html>
    <head>
      <meta charSet="utf-8" />
      <title>SALT 26 - Semantics and Linguistic Theory</title>
      <meta name="keywords" content="semantics, linguistics, theory, salt, 26, ut, utexas, ut austin, austin, texas, tx" />
      <meta name="description" content="Semantics and Linguistic Theory (SALT) is the premiere North American conference on Formal Semantics as a part of Linguistic Theory. The 26th SALT will take place on May 12-15, 2016, at The University of Texas at Austin." />
      <script src={`site.js?t=${version}`}></script>
      <link href={`site.css?t=${version}`} rel="stylesheet" type="text/css" />
      <link href="img/favicon.ico" rel="icon" type="image/x-icon" />
    </head>
    <body>
      <div className="drs-tuple">
        <div className="drop">
          <div className="punctuation-huge">〈</div>
          <nav className="drs-box" style={{width: '10em'}}>
            <div className="drs-store">
              <i>m</i>
              <i>p</i>
              <i>r</i>
              <i>a</i>
              <i>l</i>
              <i>i</i>
              <i><del>c</del></i>
            </div>
            <div>
              <ul>
                <li><a href=".">main(m)</a></li>
                <li><a href="program">program(p)</a></li>
                <li><a href="registration">registration(r)</a></li>
                <li><a href="about">about(a)</a></li>
                <li><a href="local">local(l)</a></li>
                <li><a href="instructions">instructions(i)</a></li>
                <li><a href="call"><del>call for abstracts(c)</del></a></li>
              </ul>
              {current_variable &&
                <ul>
                  <li><b>current(<span>{current_variable}</span>)</b></li>
                </ul>}
            </div>
            <div id="admin" style={{display: 'none', opacity: 0.5}}>
              <ul>
                <li><a href="http://salt.ling.utexas.edu/26/">production</a></li>
                <li><a href="https://github.com/linguistics/salt">source</a></li>
              </ul>
            </div>
          </nav>
          <div className="punctuation-large">,</div>
        </div>
        <div className="drs-box" style={{width: '40em'}}>
          <div className="banner">
            <div style={{float: 'right', textAlign: 'center', margin: '0 0.8em'}}>
              <h2>May 12-15, 2016</h2>
              <h4 className="ut">at the University of Texas at Austin</h4>
            </div>
            <h1>SALT 26</h1>
            <h3>Semantics and Linguistic Theory</h3>
          </div>
          {children}
        </div>
        <div className="drop">
          <div className="punctuation-huge">〉</div>
        </div>
      </div>
    </body>
  </html>;

export const About = ({}) =>
  <div>
    <section>
      <h2>Local organizing committee</h2>

      <ul>
        <li>David Beaver (Committee Chair)</li>
        <li>John Beavers</li>
        <li>Christopher Brown</li>
        <li>Josh Dever</li>
        <li>Hans Kamp</li>
        <li>Tammi Stout</li>
        <li>Stephen Wechsler</li>
      </ul>
    </section>

    <section>
      <h2>Special session committee</h2>

      <ul>
        <li>Cleo Condoravdi</li>
        <li>Stefan Kaufmann</li>
      </ul>
    </section>

    <section>
      <h2>Selection committee</h2>

      <ul className="selection-committee">
        <li><span className="team1">David Beaver</span></li>
        <li><span className="team1">Luke Pinette</span></li>
        <li><span className="team2">Joshua Dever</span></li>
        <li><span className="team2">Tammi Stout</span></li>
        <li><span className="team2">Zach Childers</span></li>
        <li><span className="team3">Stephen Wechsler</span></li>
        <li><span className="team3">Christopher Brown</span></li>
        <li><span className="team4">John Beavers</span></li>
        <li><span className="team4">Megan Hyska</span></li>
        <li><span className="team5">Hans Kamp</span></li>
        <li><span className="team5">Alexandra Teodorescu</span></li>
        <li><span className="team5">Katya Levina</span></li>
      </ul>
    </section>

    <section>
      <h2>SALT 26 is sponsored by:</h2>

      <ul>
        <li><a href="https://www.utexas.edu/cola/">UT College of Liberal Arts</a></li>
        <li><a href="https://www.utexas.edu/cola/linguistics/">UT Department of Linguistics</a></li>
        <li><a href="https://www.utexas.edu/cola/philosophy/">UT Department of Philosophy</a></li>
        <li><a href="https://www.utexas.edu/cola/frenchitalian/">UT Department of French & Italian</a></li>
        <li><a href="https://www.utexas.edu/cola/spanish/">UT Department of Spanish & Portuguese</a></li>
        <li><a href="https://www.utexas.edu/cola/english/">UT Department of English</a></li>
      </ul>
    </section>
  </div>;

const Submission = ({id, author, title, abstract}) => {
  const abstract_filename = join('abstracts', abstract || `${id}.pdf`);
  const abstract_exists = existsSync(join(__dirname, abstract_filename));
  return (
    <div>
      <span>{author}: </span>
      {abstract_exists ? <a href={abstract_filename}><i>{title}</i></a> : <i>{title}</i>}
    </div>
  );
};

export const Program = ({days}) =>
  <div>
    <div className="flex-fill">
      <a href="#">Show all</a>
      {days.map(({name}) =>
        <a key={name} href={'#' + name.toLowerCase()}>{name}</a>
      )}
    </div>
    <div id="days">
      {days.map(({name, date, events, location}) =>
        <section key={name} className={`day ${name.toLowerCase()}`}>
          <div className="flex-fill">
            <h1>{name}, {date}</h1>
            <h3>
              <a href={location.url}>
                <i>{location.description}</i>
              </a>
            </h3>
          </div>
          {events.map(({start, end, title, chair, submissions = []}) =>
            <div key={start} className="event">
              <header>
                <span>{`${start}\xA0-\xA0${end}`}</span>
                <span className="spacer"><hr /></span>
                <span className="title">{title}</span>
              </header>
              {chair &&
                <div className="chair">{chair}</div>}
              <ul className="submissions">
                {submissions.map((submission, j) =>
                  <li key={j}>
                    <Submission {...submission} />
                  </li>
                )}
              </ul>
            </div>
          )}
        </section>
      )}
    </div>
    <script>initializeProgram();</script>
  </div>;

export const Help = ({}) =>
  <section>
    <h2>EasyChair troubleshooting</h2>

    <h4>Reviewers only having "author" role access</h4>

    As a reviewer, you should have the "PC" role on EasyChair. If you log into EasyChair and appear to have only the role of "author", the email address associated with your reviewer identity is most likely different from the one you're currently logged in with. To determine what email address EasyChair associated with your reviewer identity, look at the "To:" field of an email notification you've received from EasyChair.
    <br />
    To resolve this issue you can either log out and then log back in with the email address associated with your reviewer account, or follow the steps below to link your primary account with the other email address:

    <ol>
      <li>Login to EasyChair with your usual account and find the "My account"
        link in the dropdown menu under "EasyChair"</li>
      <li>In the "Email Addresses" section, add a "New alternative address" with
        the <i>exact</i> email address that a (reviewing-related) EasyChair notification was sent to.</li>
      <li>EasyChair will send an email to that address to confirm that you have access to that account.</li>
      <li>Open that email and click the URL to confirm, which should take you back to the EasyChair site.</li>
    </ol>

    In rarer cases, you may have two distinct EasyChair accounts, and it won't
    allow you add an "alternative address." In that case, you have to "merge" the
    two accounts. Go to "My account" under the "EasyChair" dropdown in the main
    horizontal navigation bar. At the bottom of that page there is a
    "Merge accounts" section that will merge the other account into your current account.
  </section>;

export const Instructions = ({}) =>
  <div>
    <section id="posters">
      <h2>Posters</h2>

      <b>Lightning talks</b>

      <ul>
        <li>
          <b>The lightning talks will proceed in the order listed on <a href="http://salt.ling.utexas.edu/26/program">the program</a>.</b>
          The order within a single session may change slightly before the conference, but who's in which session will not (barring any emergencies).
        </li>
        <li>
          <b>You will have three minutes</b>, and this time limit will be strictly enforced. This is not very long, but keep in mind that the goal is just to give an overview of your poster and facilitate longer discussions during the poster session hour.
        </li>
        <li>
          Optionally, if you want to run through a few <b>slides</b> during your lightning talk (or just project your poster, verbatim) we will have a presentation device set up, and will combine all slides for each lightning talk session into a single presentation, prior to the conference. Any slides you want to show must be submitted:
          <ul>
            <li>before May 12, 2016</li>
            <li>to <a href="mailto:salt26conf@gmail.com">salt26conf@gmail.com</a></li>
            <li>using the subject line "SALT lightning talk slides"</li>
            <li>as a PDF attachment</li>
            <li>with the filename
              <code style={{display: 'flex', alignItems: 'center'}}>
                <span className="punctuation-large">{'{'}</span>
                <div>friday<br/>saturday</div>
                <span className="punctuation-large">{'}'}</span>-
                <span className="punctuation-large">{'{'}</span>
                <div>morning<br/>afternoon</div>
                <span className="punctuation-large">{'}'}</span>-
                <span>{'{'}</span><i>first author's last name(s)</i><span>{'}'}.pdf</span>
              </code> (without the curly braces!) e.g., <code>saturday-morning-brown.pdf</code>
              <br />
              <i>N.b.</i>, if you don't follow these instructions, your slides may end up in the wrong session!
            </li>
          </ul>
          Unless you specify otherwise in your email, these slides will (eventually) be made available on the website alongside your updated abstract PDF.
        </li>
        <li>
          We recommend that only one author gives the lightning talk, even if all authors are present.
        </li>
        <li>
          The moderator will indicate when your time is up, at which point you must stop and yield the stage to the next presenter.
        </li>
      </ul>

      <b>Poster layout</b>

      <ul>
        <li>
          <b>Recommended size: 48 in. wide, 36 in. tall</b>
        </li>
        <li>
          Posters will be affixed to stands via binder clips (which we will provide).
          The vertical uprights are 72 in. apart, the top crossbar is around 80 in. off the ground, and the middle crossbar can be set to either 36 in. or 42 in. below the top crossbar.
          So technically your poster could be taller than 42 in., and just hang past the crossbar, but definitely no taller than 80 in.
          There's a example of the stand (in a different place / configuration) at the bottom of <a href="http://bit.ly/utstands">this page</a>.
        </li>
        <li>
          The stands will all be in place, but you are responsible for attaching your poster. A map on the SALT website will indicate where your poster should go (check back by May 12). Please attach your poster in its designated place during lunchtime on the day of your lightning talk, whether your lightning talk is in the morning or the afternoon.
        </li>
        <li>
          Please remove your poster before you leave the building at the end of the day.
          We expect to have some storage space in the Edgar A. Smith building if you want to bring your poster early or stash it for removal the following day.
        </li>
      </ul>

      <h3>Local poster printing options</h3>
      <p>If you want to print your poster here in Austin, here are some options, with current (as of April 2016) price quotes:</p>
      <ul id="printing">
        <li>
           <a href="https://documentsolutions.utexas.edu/copycenters/contact">UT Copy Services</a> quoted me ~$72 for a 48"x36" color (b&w is the same price) poster (alternatively, ~$6 / ft²), with 24-48 hour turn-around. They're only open Monday-Friday 8a-5p, so you would need to place your order before you arrive and pick it up Thursday or Friday. You can get in contact with them via phone: 512-471-1615, or email: <a href="mailto:utcopy@austin.utexas.edu">utcopy@austin.utexas.edu</a>.
        </li>
        <li>
          <a href="http://www.jennscopies.com/">Jenn's Copy & Binding</a>, quoted me $60 ($5 / ft²), with at most a 24-hour turn-around (same price for b&w). Paper weight: 28 lb. Phone: 512-473-8669. Address: 2200 Guadalupe St (so, super close).
        </li>
        <li>
          <a href="http://www.dynamicreprographics.com/">Dynamic Reprographics</a>: 4x3 ft² in full color: $50, 24 hour turn-around, 28 lb. paper. For the same size and paper, in black & white: $9, with a turn-around of 10 minutes, as long as they're not too busy. Very nice customer rep. said they could likely do full color even quicker if you're in a rush. Phone: 512-474-8842. Address: 817 W 12th St (not quite as close as Jenn's or UT Copy, but walkable).
        </li>
        <li>
          <a href="http://www.copy-sense.com/">Copy Sense</a>: $66 in full color / $12 in B&W, around an hour turn-around. Our phone connection was flaky, so call to double check I got those figures right: 512-481-9090. Address: 121 E 8th St, #100B (walkable).
        </li>
        <li>
          <a href="http://www.qpaustin.com/">Quik Print</a>: $96, as they don't have standard sheets at 48", and would have to use photo paper (matte or glossy), or $120 for printing on foam core (which wouldn't really work with our stands).
          Address: 410 Congress Ave, Phone: 512-477-2014.
        </li>
        <li>
          Minuteman Press Printing: 48 hours turn around time, they won't give me a price (rude!).
        </li>
      </ul>

    </section>

    <section id="presentations">
      <h2>Presentations</h2>

      <p>
        Each oral presentation is allotted 40 minutes.
        Your talk should be 30 minutes long, allowing for 10 minutes of discussion.
      </p>

      <h3>Slides</h3>

      <p>If you are planning to show slides during your talk, you have two options:</p>
      <ol>
        <li>
          <b>(Recommended)</b> Use the built-in A/V console's Mac to display your slides.
          This is the easier option, and will hopefully avoid the usual A/V issues.
          <ul>
            <li>Please email your slides, as an attachment, to our Box folder, <a href="#">(the salt26/slides Box email)</a>, by midnight on the day before your talk.
            </li>
            <li>Box should send you a confirmation email for each file; email us at <a href="mailto:salt26conf@gmail.com"><code>salt26conf@gmail.com</code></a> if you have any trouble.
            </li>
            <li>
              Files emailed to that address will be synced to the A/V console's desktop, and you will be able to open your files from there.
            </li>
            <li>
             Please name your attachment(s) with the following prefix:
              <div>
                <code style={{display: 'flex', alignItems: 'center'}}>
                  <span className="punctuation-large">{'{'}</span>
                  <div>thursday<br/>friday<br/>saturday<br/>sunday</div>
                  <span className="punctuation-large">{'}'}</span>-
                  <span className="punctuation-large">{'{'}</span>
                  <div>session1<br/>session2<br/>session3</div>
                  <span className="punctuation-large">{'}'}</span>-
                  <span>{'{'}</span><i>presenter's last name(s)</i><span>{'}'}</span>
                </code>
                (but without the curly braces!) e.g., <code>sunday-session1-brown.ppt</code>, <code>sunday-session1-brown-demo.mp4</code>
              </div>
            </li>
            <li>
              You can supply PDF, Keynote, PowerPoint, and generally any other format that a basic Mac OS X setup can display.<br/>
            </li>
            <li>
              If you want to share your slides / files with the SALT 26 participants, see <a href="#sharing">sharing</a>, below.
            </li>
          </ul>
        </li>
        <li>
          Bring your own laptop, and connect it directly to the A/V system via the VGA (and optionally 3.5mm audio) connectors.
          <ul>
            <li>
              You will be responsible for supplying whatever adapters / power sources your machine might need.
            </li>
            <li>
              This option will give you more flexibility, e.g., if you need to use specific software, but setup delays may encroach into your talk's allotted time if your laptop has trouble connecting to the projector or adapting resolution properly, etc.
            </li>
            <li>
              If you decide you absolutely must use your own laptop, please arrive early on the day of your talk, whenever registration / breakfast is scheduled to begin.
              Find one of the organizers or ask whoever is manning the registration desk to help you test out your configuration, to clear up any issues before the day's events get started.
            </li>
          </ul>
        </li>
      </ol>

      <h3>Handouts</h3>

      <p>If you are planning to distribute handouts, you are responsible for printing them.</p>

      <ul>
        <li>
          We are expecting somewhere between 100 and 150 participants at each session.
        </li>
        <li>
          We recommend printing your handouts beforehand and bringing them with you, but there are a few local print shops; see the <a href="#printing">poster printing section</a> above for a non-exhaustive list.
        </li>
        <li>
          If you want to distribute handouts digitally, see <a href="#sharing">sharing</a>, below.
        </li>
      </ul>

      <h3 id="sharing">Sharing files</h3>
      <ul>
        <li>
          To make slides, handouts, or other materials available to all SALT participants, email them to <a href="#">(the salt26share Box email)</a>.
        </li>
        <li>
          These can be accessed at <a href="#">(the salt26share public URL)</a>; all SALT 26 participants will receive a link to this shared folder shortly before the conference begins.
        </li>
        <li>
          Please use the same naming convention as for slides, described above.
        </li>
        <li>
          You can overwrite existing files by emailing a file with exactly the same filename.
        </li>
        <li>
          These files will be made available on the <a href="http://salt.ling.utexas.edu/26">SALT 26 website</a> shortly after the conference ends. If you don't want your files published on the website, use that overwrite trick to replace your original file with a blank document before May 16, 2016.
        </li>
      </ul>

      <h3>Venues</h3>
      <ul>
        <li id="cla">
          <div>CLA (Thursday):</div>
          <ul>
            <li>Capacity: 110</li>
            <li>Wireless (lapel) mic</li>
            <li>The room will be configured without the desks depicted in the photos below</li>
          </ul>
          <blockquote>
            The center's custom-built audio/visual presentation systems give easy touch-screen control of LAITS's newest generation of instructional technology.
          </blockquote>
          <img src="http://www.utexas.edu/cola/laits/_files/pre_2014_08_files/images/building-services-photos/Photos_Rooms_CLA_1_302B.jpg" style={{maxWidth: '100%'}} />
        </li>
        <li id="eas">
          <div>EAS (Friday-Sunday):</div>
          <ul>
            <li>Capacity: 299</li>
            <li>There will be a wired microphone, and we are currently trying to procure a wireless mic that will work in that room</li>
            <li>There is a clicker / laser pointer, but the laser pointer doesn't show up great on white backgrounds</li>
          </ul>
          <blockquote>
            The Blanton Auditorium in the Smith Building may be privately rented for special speaker engagements, panel presentations, and film screenings. No food or beverage permitted inside auditorium. The auditorium comes equipped with A/V capabilities with rear digital projection, film screen, and built in seats with tablet arms.
          </blockquote>
          <img src="http://blantonmuseum.org/images/bma/about/auditorium.jpg" />{' '}
          <img src="http://blantonmuseum.org/images/bma/about/smith_adtrm.jpg" />
        </li>
      </ul>
    </section>
  </div>;


export const Local = ({}) =>
  <div>
    <section>
      <h3>DoubleTree</h3>
      <p>
        We have reserved a block of 30 rooms at the <a href="http://doubletree.hilton.com/en/dt/groups/personalized/A/AUSFLDT-SLT-20160511/index.jhtml?WT.mc_id=POG">DoubleTree Suites by Hilton Hotel</a>, for the dates of May 11 (check-in) through May 16 (check-out).
        The address is <a href="https://www.google.com/maps/place/DoubleTree+Suites+by+Hilton+Hotel+Austin,+303+W+15th+St,+Austin,+TX+78701">303 W 15th St, Austin, TX 78701</a> (the corner of 15th and Lavaca), which is about half a mile from where most of SALT will take place.
      </p>

      <p>Please use this personalized reservation page to access our group rates:
        <a href="http://doubletree.hilton.com/en/dt/groups/personalized/A/AUSFLDT-SLT-20160511/index.jhtml?WT.mc_id=POG"><small><code>http://doubletree.hilton.com/en/dt/groups/personalized/A/AUSFLDT-SLT-20160511/index.jhtml?WT.mc_id=POG</code></small></a>
      </p>

      <p><b>The special rate ($200 / night) block offer expires at 1 AM on April 14th, 2016.</b></p>

      <p>You can also make a reservation over the phone; call 800-222-8733 and mention the group code "SLT".</p>

      <p>If you reserve a room at the DoubleTree Suites, or plan to, please let us know via email (<a href="mailto:salt26conf@gmail.com">salt26conf@gmail.com</a>) so that, if demand exceeds our expectations, we can request more rooms to be added to the block.</p>

      <h3>Alternatives</h3>
      <p>
        For other lodging options and more information about Austin, see <a href="http://linguistics.github.io/local">Local Information</a>.
      </p>
      <p>
        Wikitravel has a page on <a href="http://wikitravel.org/en/Austin/UT_and_the_Drag">UT and nearby attractions</a>.
      </p>

      <h3>Food</h3>
      <p>
        For now, please see the <a href="http://nasslli2012.com/food">NASSLLI 2012 - Food</a> page for a listing of restaurants / cafés near campus.
        (I'll try to do a full update before SALT starts.)
      </p>
      <p>
        Most of the places on the NASSLLI page are still there, but I would recommend checking <a href="https://www.yelp.com/search?find_desc=Restaurants&find_loc=78712">Yelp!</a> or <a href="https://www.google.com/maps/search/Restaurants+near+78712">Google Maps</a> before venturing out.
      </p>

      <h3>Extra coffee</h3>
      <ul>
        <li>On Thursday, the closest coffee shop is the Starbucks in the SAC, the building just west of the CLA.</li>
        <li>On Friday through Sunday, there is a cafe on the first floor, the <a href="http://blantonmuseum.org/visit/cafe_menu/">Blanton Café</a>, which is open:
          <ul>
            <li>Mon–Fri: 8am–4pm</li>
            <li>Sat–Sun: 12pm–4pm</li>
          </ul>
        </li>
      </ul>

      <h3 id="parking">Parking</h3>
      <p>
        The <a href="http://www.utexas.edu/parking/parking/garages/index.php">UT Parking</a> system has two garages that are near the CLA (Thursday) and very near EAS (Friday-Sunday): the Conference Center garage and the Brazos garage. Their parking rates are hourly, with a maximum of $18 / day.
      </p>
      <p>
        There are private parking lots near / on campus that are cheaper, if not as close or predictable.
      </p>
      <p>
        Due to the central location of the UT campus, you will have to venture about a mile out to find free street parking (I'd recommend looking just east of I-35), and then walk or bus over, but I know of some people who do that.
      </p>
    </section>
  </div>;

export const Registration = ({}) =>
  <div>
    <section>
      <h2>Registration</h2>

      <p>
        <b>Everyone who plans to attend the conference
        should fill out this <a href="http://goo.gl/forms/7Ed850YQzN">Google form</a>.</b>
      </p>
      <ul>
        <li>UT students and faculty should fill out this form as well.</li>
        <li>The form includes an option to apply for a student scholarship. <i>Note that scholarships are intended for students without independent travel support.</i>
        </li>
      </ul>

      <p>
        <b>If you are not affiliated with the University of Texas at Austin</b>,
        and have not receieved a fee waiver (e.g., as part of a scholarship offer),
        you will need to <b>pay the registration fee via
        the <a href="http://salt26.eventbrite.com">Eventbrite payment page</a></b>.
      </p>
      <ul>
        <li>
          UT faculty, staff, and students may attend the entire SALT 26 conference
          free of charge, thanks to generous support from the College of Liberal Arts.
          Please register, though, via the Google form linked above.
        </li>
        <li>
          The registration fees, which cover the special session on presupposition, are:
          <ul>
            <li>$75 for students</li>
            <li>$125 for non-students</li>
          </ul>
        </li>
      </ul>

      <p>
        On site payment of the registration fee will be possible, but we strongly
        recommend registering prior to arriving in Austin.
      </p>
    </section>
  </div>;

export const Index = ({}) =>
  <div>
    <section>
      <h1>Reminders</h1>

      <p>
        SALT 26 is just around the corner; here's your to-do list:
      </p>

      <ol>
        <li><b><a href="registration">Register</a> if you haven't yet!</b>
          <ul>
            <li>Attendance is free for UT students and faculty, but registration is required.</li>
          </ul>
        </li>
        <li>
          Travel: if you were awarded a student scholarship, hang on to your receipts!
        </li>
        <li>
          Lodging: while the deadline for the group rate has passed, you
          may still be able to reserve a room in our block at the DoubleTree Suites.
          See <a href="local">local</a> for details.
        </li>
        <li>
          <b>Presenting a poster?</b> Details are on
          the <a href="instructions#posters">instructions page</a>, but here's the gist:
          <ul>
            <li>Recommended size: 4 ft. wide, 3 ft. tall</li>
            <li>Lightning talk: 3 minutes, maximum</li>
            <li>If you want to show a couple slides during your talk, email to them us before May 12.</li>
          </ul>
        </li>
      </ol>
    </section>

    <section>
      <h2>About</h2>

      <p>
        The 26th conference on Semantics and Linguistic Theory (SALT) will be held at the <a href="http://www.utexas.edu/">University of Texas at Austin</a> <time dateTime="2016-05-12/2016-05-15">from Thursday, May 12, to Sunday, May 15, 2016</time>.
      </p>
      <p>
        The conference will begin with a special session on presupposition on <time dateTime="2016-05-16">Thursday (May 12)</time>, followed by the main session, which will run <time dateTime="2016-05-13/2016-05-15">Friday to Sunday (May 13–15)</time>.
      </p>
      <ul>
        <li>
          Thursday's sessions will be held in the <a href="https://goo.gl/maps/SX9rSeKZaiC2">College of Liberal Arts building</a>, on the ground floor, in the Glickman Conference center (CLA 1.302).
        </li>
        <li>
          All other sessions will take place in the <a href="https://goo.gl/maps/kQbVRD7f2Kv">Edgar A. Smith building</a> (2nd floor).
        </li>
      </ul>
    </section>

    <section>
      <h2>Invited Speakers</h2>

      <ul>
        <li><a href="https://www.uni-tuebingen.de/en/faculties/faculty-of-humanities/fachbereiche/neuphilologie/english-department/subdivisions/linguistik-des-englischen/lehrstuhl-prof-dr-sigrid-beck/prof-dr-sigrid-beck.html">Sigrid Beck</a>, University of Tübingen</li>
        <li><a href="http://ricknouwen.org/">Rick Nouwen</a>, Utrecht University</li>
        <li><a href="http://ruccs.rutgers.edu/~k-syrett/">Kristen Syrett</a>, Rutgers University</li>
      </ul>

      <p>
        <i>
        Edit Doron has had to stand down as a speaker due to a scheduling conflict: she will be <a href="http://new.huji.ac.il/en/article/28904">receiving the prestigious Israel Prize</a>, the highest honor offered by the state. Congratulations Edit!
        </i>
      </p>
    </section>

    <section>
      <h2>Call for Abstracts</h2>

      <p>We are accepting submissions of abstracts via EasyChair <b>until December 20, 2015</b>.
      See the <a href="call">Call for Abstracts</a> page for full details, requirements, and policies.</p>
    </section>

    <section>
      <h3>Questions?</h3>

      <p>Email us at <a href="mailto:salt26conf@gmail.com"><code>salt26conf@gmail.com</code></a></p>
    </section>
  </div>;

export const Call = ({}) =>
  <div>
    <section>
      <h1>SALT 26 Call for Abstracts</h1>
      <p>The 26th conference on Semantics and Linguistic Theory will take place on May 12–15, 2016, at The University of Texas at Austin. There will be keynote presentations by:</p>

      <ul>
        <li><a href="https://www.uni-tuebingen.de/en/faculties/faculty-of-humanities/fachbereiche/neuphilologie/english-department/subdivisions/linguistik-des-englischen/lehrstuhl-prof-dr-sigrid-beck/prof-dr-sigrid-beck.html">Sigrid Beck</a>, University of Tübingen</li>
        <li><a href="http://ricknouwen.org/">Rick Nouwen</a>, Utrecht University</li>
        <li><a href="http://ruccs.rutgers.edu/~k-syrett/">Kristen Syrett</a>, Rutgers University</li>
      </ul>

      <p>We invite submission of abstracts for 30-minute oral presentations (with an additional 10 minutes for questions) or posters on any topic in natural language semantics with relevance to linguistic theory.</p>
    </section>

    <section>
      <h3>Submission details</h3>

      <p>Deadline: December 20, 2015, 11:59 pm Central Standard Time (UTC-6)</p>

      <p>Submissions should be made via the SALT 26 <a href="https://easychair.org/conferences/?conf=salt26">EasyChair</a> site.</p>

      <p>As with SALT 25, there will be a short period for authors and reviewers to exchange feedback. Author feedback is scheduled for January 23–29, 2016.</p>

      <p><i>Please read all instructions on this page before submitting your abstract.</i></p>
    </section>

    <section>
      <h3>Requirements</h3>

      <p>Abstracts must be anonymous. The main text should be at most 3 pages (US Letter or A4) in length, including examples, with an optional fourth page for references. The abstract should use a 12pt font and 1 inch margins (for US Letter) or 3 cm margins (for A4) on all four sides. The abstract must be submitted as a single PDF file. These limitations will be strictly enforced. In addition to the intellectual merit of the abstract, clarity and readability will also be taken into account in reviewing.</p>

      <p>SALT 26 will feature a poster session. Poster presentations will be published as regular papers in the proceedings. Poster presenters will be asked to give a short &ldquo;lightning round&rdquo; presentation prior to the poster session.</p>
    </section>

    <section>
      <h3>Special Session on Presupposition</h3>

      <p>In addition to the regular sessions of SALT 26 there will be a one day special session on Presupposition, organized by Cleo Condoravdi (Stanford University) and Stefan Kaufmann (University of Connecticut). We are happy to announce three further invited speakers for this session:</p>

      <ul>
        <li><a href="http://web.stanford.edu/~laurik/">Lauri Karttunen</a>, Stanford University</li>
        <li><a href="https://www-csli.stanford.edu/people/peters-stanley">Stanley Peters</a>, Stanford University</li>
        <li><a href="http://www.ling.ohio-state.edu/~judith/">Judith Tonhauser</a>, The Ohio State University</li>
      </ul>

      <p>We encourage papers on any theoretical, experimental, fieldwork-based, or corpus approaches to presupposition, presupposition triggering, or presuppositional inference.</p>
      <p>The special session has the same submission and reviewing process as the main session.</p>
    </section>

    <section>
      <h3>Policies</h3>

      <p>Authors may be involved in at most two abstracts and may be the sole author of at most one abstract.</p>

      <p>SALT does not accept papers that at the time of the conference have been published or have been accepted for publication. In addition, preference will be given to presentations that are not duplicated at other major conferences.</p>
      <p>If the work or a close variant of it is under submission to or accepted for publication or presentation in any other major venue (such as a national or international conference or a journal/book chapter), we request that the authors create a small section titled &ldquo;Additional Submission&rdquo; after the references at the end of the paper. This section should include the other venue(s) for which the work has been submitted, the status of those submissions, and an indication of any major aspects of the SALT abstract not submitted elsewhere. We require that authors update us by email if/when there is a relevant change in the status of other submissions.</p>
    </section>

    <section>
      <h3>Proceedings</h3>

      <p>All papers presented at the main or the special session of the conference will be published in a SALT 26 volume following the conclusion of the conference, edited at Cornell University and published by the <a href="http://www.linguisticsociety.org/">Linguistic Society of America</a>.</p>
    </section>

    <section>
      <h2>EasyChair instructions</h2>

      <p>On the EasyChair submission page, there are several additional options to pay attention to:</p>
      <ol>
        <li>A checkbox to indicate if you want your abstract to be considered for poster presentation (if you do not check this, your paper will be considered <i>only</i> for oral presentation).</li>
        <li>A checkbox to indicate if you would like your abstract to be considered for the Special Session on Presupposition.</li>
        <li>An extensive (but not comprehensive) list of topics that will be used to help assign reviewers. Select all topics relevant to your paper (we estimate most papers will select 1-3 topics).</li>
        <li>You may use the Keywords textbox to prioritize or add additional topics.</li>
      </ol>

      <p>
        <b>Submit your abstract here</b>: <a href="https://easychair.org/conferences/?conf=salt26"><code>https://easychair.org/conferences/?conf=salt26</code></a>
      </p>
    </section>
  </div>;
