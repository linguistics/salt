var React = require('react');

class Submission extends React.Component {
  render() {
    const {author, title} = this.props;
    return (
      <div>
        <span>{author}: </span>
        <i>{title}</i>
      </div>
    );
  }
}

class Day extends React.Component {
  render() {
    const {title, events} = this.props;
    return (
      <section>
        <h1>{title}</h1>
        {events.map((event, i) =>
          <div key={i} className="event">
            <header>
              <span>{event.start} - {event.end}</span>
              <span className="spacer">
                <hr />
              </span>
              <span>{event.title}</span>
            </header>
            <ul className="submissions">
              {(event.submissions || []).map((submission, j) =>
                <li key={j}>
                  <Submission {...submission} />
                </li>
              )}
            </ul>
          </div>
        )}
      </section>
    );
  }
}

class Program extends React.Component {
  render() {
    var days = this.props.days;
    return (
      <div>
        {days.map((day, i) => <Day key={i} {...day} />)}
      </div>
    );
  }
}

module.exports = Program;
