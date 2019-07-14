import React from 'react'

export default class Modal extends React.Component {
  render() {
    return <div onClick={this.props.onClose} className="fixed inset-0 z-50 overflow-auto flex" style={{background: 'rgba(0, 0, 0, 0.4)'}}>
      <div className={`relative w-full max-w-modal m-auto flex-col flex rounded shadow-lg p-2 bg-white`}>
        {this.props.children}
      </div>
      <span className="absolute pin-t pin-r pt-4 px-4" onClick={this.props.onClose}>
        <svg className="h-12 w-12 text-gray-500 hover:text-gray-900" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"/></svg>
      </span>
    </div>
  }
}
