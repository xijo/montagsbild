import React from 'react'
import Week from './Week'

export default class WeekList extends React.Component {
  state = { limit: 5 }

  render() {
    const content = this.props.entries.slice(0, this.state.limit).map((cw, index) => { return <Week key={index} {...cw} /> })
    const showButton = this.state.limit < this.props.entries.length
    const increment = 5
    return <>
      {content}
      {showButton && <button onClick={() => this.setState({limit: this.state.limit + increment})}>mehr!</button>}
    </>
  }
}
