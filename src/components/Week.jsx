import React from 'react'
import _groupBy from 'lodash/groupBy'

import Modal from './Modal'
import PhotoList from './PhotoList'
import Calendar from './Calendar'
import Exif from './Exif'

import { getImageSrc } from '../util/getImageUrl'

export default class Week extends React.Component {
  state = { modal: false, exif: {} }

  render() {
    const [year, cw] = this.props.title.split("-")
    const groupedPhotos = _groupBy(this.props.photos, "day")
    const exif = this.props.exifs.find(e => e.filename === this.props.image)
    const mediumImage = getImageSrc(this.props.image, 472)
    const largeImage = getImageSrc(this.props.image, 784)

    return <div className="relative max-w-content overflow-hiden shadow-2xl mb-10 mx-auto border-4 border-white rounded">
      <img className="w-full rounded cursor-pointer" src={mediumImage} onClick={() => this.setState({modal: true})} alt={this.props.name} />

      {this.state.modal && <Modal onClose={() => this.setState({modal: false})}>
        <img className="w-full rounded cursor-pointer" src={largeImage} alt={this.props.name} />
      </Modal>}

      <div className='absolute top-0' style={{right: -95, zIndex: -10}}>
        <Calendar top={year} bottom={`KW ${cw}`} border='border-gray-600' bg='bg-gray-600' />
      </div>

      <div className="p-3">
        <div className="mb-2 flex">
          <div className="font-sans font-normal text-xl flex-grow">
            {this.props.image_name}
          </div>
          <Exif {...exif} />
        </div>
        <p className="text-gray-700 text-base whitespace-pre-wrap">
          {this.props.image_description}
        </p>
      </div>

      <div className="px-6 py-4 flex items-center justify-between">
        <Day abbr='Mo' cw={cw} photos={groupedPhotos.Mo} exifs={this.props.exifs} />
        <Day abbr='Di' cw={cw} photos={groupedPhotos.Di} exifs={this.props.exifs} />
        <Day abbr='Mi' cw={cw} photos={groupedPhotos.Mi} exifs={this.props.exifs} />
        <Day abbr='Do' cw={cw} photos={groupedPhotos.Do} exifs={this.props.exifs} />
        <Day abbr='Fr' cw={cw} photos={groupedPhotos.Fr} exifs={this.props.exifs} />
        <Day abbr='Sa' cw={cw} photos={groupedPhotos.Sa} exifs={this.props.exifs} />
        <Day abbr='So' cw={cw} photos={groupedPhotos.So} exifs={this.props.exifs} />
      </div>
    </div>
  }
}

class Day extends React.Component {
  state = { modal: false }

  closeModal = () => {
    this.setState({modal: false})
  }

  render() {
    if (this.props.photos) {
      return <div className="mr-2 bg-lightgrey">
        <div className='inline-block relative z-10 stack cursor-pointer' onClick={() => this.setState({modal: true})}>
          <img className="shadow bg-white w-12 p-1" alt="" src={getImageSrc(this.props.photos[0].image, 48)} />
        </div>
        {this.state.modal && <Modal padded onClose={this.closeModal}>
          <PhotoList entries={this.props.photos} cw={this.props.cw} abbr={this.props.abbr} onClose={this.closeModal} exifs={this.props.exifs} />
        </Modal>}
      </div>
    }
    return <div className="mr-2 bg-lightgrey">
      <h3 className='text-xl text-gray-600 font-serif font-hairline cursor-default'>{this.props.abbr}</h3>
    </div>
  }
}
