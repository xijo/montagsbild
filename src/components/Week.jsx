import React from 'react'

export default class Week extends React.Component {
  state = { expanded: true }

  render() {
    return <div className="relative max-w-sm overflow-hiden shadow-lg mb-10 mx-auto border-4 border-white rounded">
      <img className="w-full rounded cursor-pointer" src="https://tailwindcss.com/img/card-top.jpg" onClick={() => this.setState({expanded: !this.state.expanded})} alt="Sunset in the mountains" />

      <div className='absolute block font-serif rounded border border-black border-t-8 p-2 pb-1 mr-1 pin-t border-blue-dark text-center' style={{right: -70, zIndex: -10}}>
        <div>{this.props.year}</div>
        <div className='text-2xl font-bold'>{this.props.cw}</div>
      </div>

      { this.state.expanded && <div className="p-3">
        <div className="font-sans font-normal text-xl mb-2">The Coldest Sunset</div>
        <p className="text-grey-darker text-base">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et perferendis eaque, exercitationem praesentium nihil.
        </p>
      </div> }
      { this.state.expanded && <div className="px-6 py-4 flex items-center justify-between">
        <Day abbr='Mo' />
        <Day abbr='Di' />
        <Day abbr='Mi' images={['http://placeowl.com/40/30']} />
        <Day abbr='Do' />
        <Day abbr='Fr' />
        <Day abbr='Sa' />
        <Day abbr='So' />
      </div> }
    </div>
  }
}

class Day extends React.Component {
  render() {
    if (this.props.images) {
      return <div className="mr-2 bg-lightgrey">
        <div className='inline-block relative z-10 stack cursor-pointer'>
          <img className="shadow bg-white p-1" alt="" src={this.props.images[0]} />
        </div>
      </div>
    }
    return <div className="mr-2 bg-lightgrey">
      <h3 className='text-xl text-grey font-serif font-hairline cursor-default'>{this.props.abbr}</h3>
    </div>
  }
}
