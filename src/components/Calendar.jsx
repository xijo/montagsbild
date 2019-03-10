import React from 'react'

export default class Calendar extends React.Component {
  render() {
    return <div className='inline-block font-serif rounded border border-grey-darker border-t-8 p-2 pb-1 text-center'>
      <div>{this.props.top}</div>
      <div className='text-xl font-bold'>{this.props.bottom}</div>
    </div>
  }
}
