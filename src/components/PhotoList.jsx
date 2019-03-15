import React from 'react'
import {ChevronRight, ChevronLeft} from 'react-feather'

import Calendar from './Calendar'
import Exif from './Exif'

import { getImageSrc } from '../util/getImageUrl'

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
    const exif = this.props.exifs.find(e => e.filename === photo.image)

    return <div onClick={this.stopPropagation}>
      <div className="relative">
        <img className="w-full rounded cursor-pointer" onClick={this.props.onClose} alt="" src={getImageSrc(photo.image, 784)} />

        {showPrevButton && <div onClick={this.prevPhoto} className="absolute bg-white hover:text-black text-grey-dark cursor-pointer rounded-tr pin-l pin-b h-12 w-12 flex justify-center items-center">
          <ChevronLeft size={40} />
        </div>}

        {showNextButton && <div onClick={this.nextPhoto} className="absolute bg-white hover:text-black text-grey-dark cursor-pointer rounded-tl pin-r pin-b h-12 w-12 flex justify-center items-center">
          <ChevronRight size={40} />
        </div>}
      </div>

      <div className="flex items-start mt-2">
        <Calendar color='grey-darker' top={`KW ${this.props.cw}`} bottom={this.props.abbr} />
        <div className="flex flex-col flex-grow ml-2">
          <Exif {...exif} />
          <p className="text-grey-darker text-base whitespace-pre-wrap">
            {photo.description}
          </p>
        </div>
      </div>
    </div>
  }
}
