import React from 'react'
import Week from './Week'
import _sortBy from 'lodash/sortBy'

export default class WeekList extends React.Component {
  state = { limit: 2 }

  increment = () => {
    this.setState({limit: this.state.limit + 5})
  }

  render() {
    const content = _sortBy(this.props.entries, 'title').reverse().slice(0, this.state.limit).map((cw, index) => { return <Week key={index} {...cw} exifs={this.props.exifs} /> })
    const showButton = this.state.limit < this.props.entries.length

    return <>
      {content}
      {showButton && <button onClick={this.increment} className='block mx-auto bg-blue-700 hover:bg-blue text-white font-normal py-2 px-4 rounded'>Mehr anzeigen!</button>}
    </>
  }
}
