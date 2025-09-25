import React from 'react';

interface ClockProps {
  name: string;
}

interface ClockState {
  time: Date;
}

export class Clock extends React.Component<ClockProps, ClockState> {
  state: ClockState = {
    time: new Date(),
  };

  intervalId?: number;

  componentDidMount() {
    this.intervalId = window.setInterval(() => {
      const now = new Date();

      this.setState({ time: now });

      const formattedTime = now.toUTCString().slice(-12, -4);

      // eslint-disable-next-line no-console
      console.log(formattedTime);
    }, 1000);
  }

  componentDidUpdate(prevProps: ClockProps) {
    if (prevProps.name !== this.props.name) {
      // eslint-disable-next-line no-console
      console.warn(`Renamed from ${prevProps.name} to ${this.props.name}`);
    }
  }

  componentWillUnmount() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  render() {
    const { name } = this.props;
    const { time } = this.state;
    const formattedTime = time.toUTCString().slice(-12, -4);

    return (
      <div className="Clock">
        <strong className="Clock__name">{name}</strong> time is{' '}
        <span className="Clock__time">{formattedTime}</span>
      </div>
    );
  }
}
