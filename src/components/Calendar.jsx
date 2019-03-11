import React from 'react'

export default class Calendar extends React.Component {
  render() {
    return <div className={`relative inline-block font-serif rounded border border-${this.props.color} border-t-8 p-2 pb-1 text-center ${this.props.className || ''}`} style={{minWidth: 65}}>
      <div className={`absolute bg-${this.props.color} rounded-full border-white`} style={{width: 5, height: 10, top: -13, left: 10, borderWidth: 1}} />
      <div className={`absolute bg-${this.props.color} rounded-full border-white`} style={{width: 5, height: 10, top: -13, right: 10, borderWidth: 1}} />
      {this.props.children}
      <div>{this.props.top}</div>
      <div className='text-xl font-bold'>{this.props.bottom}</div>
    </div>
  }
}
