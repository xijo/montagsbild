import React from 'react'

const Exif = ({ExposureTime, FNumber, ExposureBiasValue}) => {
  if (ExposureTime && FNumber) {
    return <div className="text-grey-dark font-serif">f/{FNumber} 1/{1/ExposureTime}</div>
  } else {
    return null
  }
}

export default Exif
