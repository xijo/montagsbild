import React from 'react'
import Helmet from 'react-helmet'
import WeekList from './components/WeekList'
import Calendar from './components/Calendar'
import data from './data.json'

class App extends React.Component {
  state = {
    data
  }

  render () {
    const calendarweeks = this.state.data.calendarweeks.filter(cw => cw.visible)
    const settings = this.state.data.settings[0]

    return <div className="w-full mx-auto px-6 pb-20">
      <Helmet title={settings.siteTitle} />

      <div className="lg:flex -mx-6">
        <div className="mx-auto min-h-screen w-full lg:static lg:max-h-full lg:overflow-visible lg:w-3/4 xl:w-4/5 ">
          <h1 className='text-3xl mt-10 mb-10 font-serif font-normal text-center'>
            <Calendar color='blue-700' className='font-bold mr-2'>Mo</Calendar>
            ntagsbild
          </h1>

          <WeekList entries={calendarweeks} exifs={this.state.data.exifs} />

          <hr/>

          <div className="max-w-content mx-auto text-gray-dark mt-20 text-sm">
            <h3 className="text-2xl font-serif font-normal text-center mb-2">Impressum</h3>

            <div className="mb-4">
              Günther Opper<br/>
              Eltvillerstr. 49<br/>
              65232 Taunusstein
            </div>

            <div className="mb-4">
              Inhaltlich Verantwortlicher gemäß § 10 Absatz 3 MDStV:<br/>
              Günther Opper<br/>
              opper[at]gmx.de
            </div>

            <div className="mb-4 font-bold">
              Haftung für Inhalte
            </div>
            <div className="mb-4">
              Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen.
            </div>
            <div className="mb-4">
              Verpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen nach den allgemeinen Gesetzen bleiben hiervon unberührt. Eine diesbezügliche Haftung ist jedoch erst ab dem Zeitpunkt der Kenntnis einer konkreten Rechtsverletzung möglich. Bei Bekanntwerden von entsprechenden Rechtsverletzungen werden wir diese Inhalte umgehend entfernen.
            </div>
            <div className="mb-4 font-bold">
              Haftung für Links
            </div>
            <div className="mb-4">
              Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich. Die verlinkten Seiten wurden zum Zeitpunkt der Verlinkung auf mögliche Rechtsverstöße überprüft. Rechtswidrige Inhalte waren zum Zeitpunkt der Verlinkung nicht erkennbar.
            </div>
            <div className="mb-4">
              Eine permanente inhaltliche Kontrolle der verlinkten Seiten ist jedoch ohne konkrete Anhaltspunkte einer Rechtsverletzung nicht zumutbar. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Links umgehend entfernen.
            </div>
            <div className="mb-4 font-bold">
              Urheberrecht
            </div>
            <div className="mb-4">
              Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers. Downloads und Kopien dieser Seite sind nur für den privaten, nicht kommerziellen Gebrauch gestattet.
            </div>
            <div className="mb-4">
              Soweit die Inhalte auf dieser Seite nicht vom Betreiber erstellt wurden, werden die Urheberrechte Dritter beachtet. Insbesondere werden Inhalte Dritter als solche gekennzeichnet. Sollten Sie trotzdem auf eine Urheberrechtsverletzung aufmerksam werden, bitten wir um einen entsprechenden Hinweis. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Inhalte umgehend entfernen.
            </div>
          </div>
        </div>
      </div>
    </div>
  }
}

export default App
