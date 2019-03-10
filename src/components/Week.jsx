import React from 'react'
import _groupBy from 'lodash/groupBy'
import EXIF from 'exif-js'

import Modal from './Modal'
import PhotoList from './PhotoList'
import Calendar from './Calendar'

export default class Week extends React.Component {
  state = { modal: false, exif: {} }

  storeExif = () => {
    this.setState({exif: EXIF.getAllTags(this.exifSrc)})
  }

  getExif = (event) => {
    this.exifSrc = event.target
    EXIF.getData(event.target, this.storeExif)
  }

  render() {
    const [year, cw] = this.props.title.split("-")
    const groupedPhotos = _groupBy(this.props.photos, "day")

    return <div className="relative max-w-sm overflow-hiden shadow-lg mb-10 mx-auto border-4 border-white rounded">
      <img onLoad={this.getExif} className="w-full rounded cursor-pointer" src={this.props.image} onClick={() => this.setState({modal: true})} alt={this.props.name} />

      {this.state.modal && <Modal onClose={() => this.setState({modal: false})}>
        <img className="w-full rounded cursor-pointer" src={this.props.image} alt={this.props.name} />
      </Modal>}

      <div className='absolute pin-t' style={{right: -90, zIndex: -10}}>
        <Calendar top={year} bottom={`KW ${cw}`} color='grey-darker' />
      </div>

      <div className="p-3">
        <div className="mb-2 flex">
          <div className="font-sans font-normal text-xl flex-grow">
            {this.props.image_name}
          </div>
          <FNumber {...this.state.exif.FNumber} />
          <Exposure {...this.state.exif.ExposureTime} />
        </div>
        <p className="text-grey-darker text-base whitespace-pre-wrap">
          {this.props.image_description}
        </p>
      </div>

      <div className="px-6 py-4 flex items-center justify-between">
        <Day abbr='Mo' cw={cw} photos={groupedPhotos.Mo} />
        <Day abbr='Di' cw={cw} photos={groupedPhotos.Di} />
        <Day abbr='Mi' cw={cw} photos={groupedPhotos.Mi} />
        <Day abbr='Do' cw={cw} photos={groupedPhotos.Do} />
        <Day abbr='Fr' cw={cw} photos={groupedPhotos.Fr} />
        <Day abbr='Sa' cw={cw} photos={groupedPhotos.Sa} />
        <Day abbr='So' cw={cw} photos={groupedPhotos.So} />
      </div>
    </div>
  }
}

class Day extends React.Component {
  state = { modal: false }

  render() {
    if (this.props.photos) {
      return <div className="mr-2 bg-lightgrey">
        <div className='inline-block relative z-10 stack cursor-pointer' onClick={() => this.setState({modal: true})}>
          <img className="shadow bg-white w-12 p-1" alt="" src={this.props.photos[0].image} />
        </div>
        {this.state.modal && <Modal padded onClose={() => this.setState({modal: false})}>
          <PhotoList entries={this.props.photos} cw={this.props.cw} abbr={this.props.abbr} />
        </Modal>}
      </div>
    }
    return <div className="mr-2 bg-lightgrey">
      <h3 className='text-xl text-grey font-serif font-hairline cursor-default'>{this.props.abbr}</h3>
    </div>
  }
}

const Exposure = ({numerator, denominator}) => {
  if (numerator && denominator) {
    return <div className="text-grey-dark font-serif ml-2">1/{denominator / numerator}</div>
  } else {
    return null
  }
}

const FNumber = ({numerator, denominator}) => {
  if (numerator && denominator) {
    return <div className="text-grey-dark font-serif">f/{numerator / denominator}</div>
  } else {
    return null
  }
}
