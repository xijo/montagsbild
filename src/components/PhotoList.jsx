import React from 'react'
import {ChevronRight, ChevronLeft} from 'react-feather'

import Calendar from './Calendar'

export default class PhotoList extends React.Component {
  state = { active: 0 }

  nextPhoto = (event) => {
    this.stopPropagation(event, () => this.setState({active: this.state.active + 1}))
  }

  prevPhoto = (event) => {
    this.stopPropagation(event, () => this.setState({active: this.state.active - 1}))
  }

  stopPropagation = (event, func) => {
    event.stopPropagation()
    event.nativeEvent.stopImmediatePropagation()
    if (func) func()
  }

  render() {
    const photo = this.props.entries[this.state.active]
    const showNextButton = this.state.active < (this.props.entries.length - 1)
    const showPrevButton = this.state.active > 0

    return <div onClick={this.stopPropagation}>
      <div className="relative">
        <img className="w-full rounded" alt="" src={photo.image} />

        {showPrevButton && <div onClick={this.prevPhoto} className="absolute bg-white cursor-pointer rounded-tr pin-l pin-b h-10 w-10 flex justify-center items-center">
          <ChevronLeft size={30} />
        </div>}

        {showNextButton && <div onClick={this.nextPhoto} className="absolute bg-white cursor-pointer rounded-tl pin-r pin-b h-10 w-10 flex justify-center items-center">
          <ChevronRight size={30} />
        </div>}
      </div>

      <div className="flex mt-2">
        <Calendar top={`KW ${this.props.cw}`} bottom={this.props.abbr} />
        <div className="flex flex-col flex-grow ml-2">
          <p className="text-grey-darker text-base whitespace-pre-wrap">
            {photo.description}
          </p>
        </div>
      </div>
    </div>
  }
}
