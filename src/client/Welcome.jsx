import React from 'react'

class Welcome extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      message: ''
    }
  }

  componentDidMount() {
    fetch("/api/hello", { method: 'POST' })
      .then(res => res.text())
      .then(
        (result) => {
          this.setState({
            message: result
          })
        }
      )
  }

  render() {
    return (
      <div className="welcome">
        <div className="logo" />
        <p>{this.state.message.toString()}</p>
      </div>
    )
  }
}

export default Welcome