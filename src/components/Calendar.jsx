import React from 'react'
import {Triangle, Edit2} from 'react-feather'

export default class Calendar extends React.Component {
  render() {
    return <div className={`relative inline-block font-serif rounded border border-${this.props.color} border-t-8 p-2 pb-1 text-center ${this.props.className || ''}`}>
      {/* <div className="absolute" style={{top: -27, zIndex: -10, left: 'calc(50% - 12px)'}}>
        <Triangle color={'#606f7b'} />
      </div>
      <div className="absolute" style={{top: -35, zIndex: -10, left: 'calc(50% - 1px)'}}>
        <Edit2 size={10}/>
      </div> */}
      <div className={`absolute bg-${this.props.color} rounded-full border-white`} style={{width: 5, height: 10, top: -13, left: 10, borderWidth: 1}} />
      <div className={`absolute bg-${this.props.color} rounded-full border-white`} style={{width: 5, height: 10, top: -13, right: 10, borderWidth: 1}} />
      {this.props.children}
      <div>{this.props.top}</div>
      <div className='text-xl font-bold'>{this.props.bottom}</div>
    </div>
  }
}
