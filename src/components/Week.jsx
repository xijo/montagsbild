import React from 'react'
import _groupBy from 'lodash/groupBy'

import Modal from './Modal'
import PhotoList from './PhotoList'
import Calendar from './Calendar'

export default class Week extends React.Component {
  state = { modal: false, exif: {} }

  render() {
    const [year, cw] = this.props.title.split("-")
    const groupedPhotos = _groupBy(this.props.photos, "day")
    const exif = this.props.exifs.find(e => e.filename === this.props.image)

    return <div className="relative max-w-sm overflow-hiden shadow-lg mb-10 mx-auto border-4 border-white rounded">
      <img className="w-full rounded cursor-pointer" src={this.props.image} onClick={() => this.setState({modal: true})} alt={this.props.name} />

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
          <FNumber value={exif.FNumber[0]} />
          <Exposure value={1/exif.ExposureTime} />
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

  closeModal = () => {
    this.setState({modal: false})
  }

  render() {
    if (this.props.photos) {
      return <div className="mr-2 bg-lightgrey">
        <div className='inline-block relative z-10 stack cursor-pointer' onClick={() => this.setState({modal: true})}>
          <img className="shadow bg-white w-12 p-1" alt="" src={this.props.photos[0].image} />
        </div>
        {this.state.modal && <Modal padded onClose={this.closeModal}>
          <PhotoList entries={this.props.photos} cw={this.props.cw} abbr={this.props.abbr} onClose={this.closeModal} />
        </Modal>}
      </div>
    }
    return <div className="mr-2 bg-lightgrey">
      <h3 className='text-xl text-grey font-serif font-hairline cursor-default'>{this.props.abbr}</h3>
    </div>
  }
}

const Exposure = ({value}) => {
  if (value) {
    return <div className="text-grey-dark font-serif ml-2">1/{value}</div>
  } else {
    return null
  }
}

const FNumber = ({value}) => {
  if (value) {
    return <div className="text-grey-dark font-serif">f/{value}</div>
  } else {
    return null
  }
}
