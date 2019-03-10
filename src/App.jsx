import React from 'react'
import Helmet from 'react-helmet'

import Meta from './components/Meta'
import WeekList from './components/WeekList'
import data from './data.json'

import './css/custom.css'

class App extends React.Component {
  state = {
    data
  }

  render () {
    // const globalSettings = this.getDocument('settings', 'global')
    // const {
    //   siteTitle,
    //   siteUrl,
    //   socialMediaCard,
    //   headerScripts
    // } = globalSettings

    const calendarweeks = this.state.data.calendarweeks.filter(cw => cw.visible)

    return <div className="w-full max-w-screen-xl mx-auto px-6 pb-20">
      <div className="lg:flex -mx-6">
        <div className="mx-auto min-h-screen w-full lg:static lg:max-h-full lg:overflow-visible lg:w-3/4 xl:w-4/5 ">
          <h1 className='text-3xl mt-10 mb-10 font-serif font-normal text-center'>
            <span className='inline-block rounded border border-black font-bold border-t-8 py-2 px-1 mr-1 border-blue-dark'>Mo</span>
            ntagsbild
          </h1>

          <WeekList entries={calendarweeks} />
        </div>
      </div>
    </div>
  }
}

export default App
