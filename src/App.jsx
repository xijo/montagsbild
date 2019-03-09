import React, { Component, Fragment } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Helmet from 'react-helmet'

import ScrollToTop from './components/ScrollToTop'
import Meta from './components/Meta'
import Home from './views/Home'
import About from './views/About'
import Blog from './views/Blog'
import SinglePost from './views/SinglePost'
import Contact from './views/Contact'
import NoMatch from './views/NoMatch'
import Week from './components/Week'
import Nav from './components/Nav'
import Footer from './components/Footer'
import ServiceWorkerNotifications from './components/ServiceWorkerNotifications'
import data from './data.json'
import { slugify } from './util/url'
import { documentHasTerm, getCollectionTerms } from './util/collection'

import {getISOWeek} from 'date-fns'

import {Calendar} from 'react-feather'

import './css/custom.css'

// import formatRelative from 'date-fns/format_relative'
// import subDays from 'date-fns/sub_days'

const RouteWithMeta = ({ component: Component, ...props }) => (
  <Route
    {...props}
    render={routeProps => (
      <Fragment>
        <Meta {...props} />
        <Component {...routeProps} {...props} />
      </Fragment>
    )}
  />
)

class App extends Component {
  state = {
    data
  }

  getDocument = (collection, name) =>
    this.state.data[collection] &&
    this.state.data[collection].filter(page => page.name === name)[0]

  getDocuments = collection => this.state.data[collection] || []

  render () {
    const globalSettings = this.getDocument('settings', 'global')
    const {
      siteTitle,
      siteUrl,
      siteDescription,
      socialMediaCard,
      headerScripts
    } = globalSettings

    const posts = this.getDocuments('posts').filter(
      post => post.status !== 'Draft'
    )
    const categoriesFromPosts = getCollectionTerms(posts, 'categories')
    const postCategories = this.getDocuments('postCategories').filter(
      category => categoriesFromPosts.indexOf(category.name.toLowerCase()) >= 0
    )

    console.log(getISOWeek(new Date(2018, 11, 31)))
    console.log(getISOWeek(new Date(2005, 0, 2)))
    // console.log(formatRelative(subDays(new Date(), 3), new Date(), { locale: 'de' }))

    return <div className="w-full max-w-screen-xl mx-auto px-6">
      <div className="lg:flex -mx-6">
        <div className="mx-auto min-h-screen w-full lg:static lg:max-h-full lg:overflow-visible lg:w-3/4 xl:w-4/5 ">
          {/* <Calendar size={40}/> */}


          <h1 className='text-3xl mt-10 mb-5 font-serif font-normal text-center'>
            <span className='inline-block rounded border border-black font-bold border-t-8 py-2 px-1 mr-1 border-blue-dark'>Mo</span>
            ntagsbild
          </h1>

          <Week cw={3} year={2019} />
          <Week cw={2} year={2019} />
          <Week cw={1} year={2019} />
          <Week cw={52} year={2018} />
        </div>
      </div>
    </div>

    return (
      <Router>
        <div className='React-Wrap'>
          <ScrollToTop />
          <ServiceWorkerNotifications reloadOnUpdate />
          <Helmet
            defaultTitle={siteTitle}
            titleTemplate={`${siteTitle} | %s`}
          />
          <Meta
            headerScripts={headerScripts}
            absoluteImageUrl={
              socialMediaCard &&
              socialMediaCard.image &&
              siteUrl + socialMediaCard.image
            }
            twitterCreatorAccount={
              socialMediaCard && socialMediaCard.twitterCreatorAccount
            }
            twitterSiteAccount={
              socialMediaCard && socialMediaCard.twitterSiteAccount
            }
          />

          <Nav />

          <div className="container mx-auto">
            <div className="flex items-center py-2 mx-24">
              <div className="w-1/2">
                <div className="flex items-center">
                </div>
              </div>

            </div>
            <div className="flex mb-4">
              <div className="w-full bg-grey h-12"></div>
            </div>

          </div>

          <div className="flex mb-4">
            <div className="w-full bg-grey h-12"></div>
          </div>

          {/* <Switch>
            <RouteWithMeta
              path='/'
              exact
              component={Home}
              description={siteDescription}
              fields={this.getDocument('pages', 'home')}
            />
            <RouteWithMeta
              path='/about/'
              exact
              component={About}
              fields={this.getDocument('pages', 'about')}
            />
            <RouteWithMeta
              path='/contact/'
              exact
              component={Contact}
              fields={this.getDocument('pages', 'contact')}
              siteTitle={siteTitle}
            />
            <RouteWithMeta
              path='/blog/'
              exact
              component={Blog}
              fields={this.getDocument('pages', 'blog')}
              posts={posts}
              postCategories={postCategories}
            />

            {posts.map((post, index) => {
              const path = slugify(`/blog/${post.title}`)
              const nextPost = posts[index - 1]
              const prevPost = posts[index + 1]
              return (
                <RouteWithMeta
                  key={path}
                  path={path}
                  exact
                  component={SinglePost}
                  fields={post}
                  nextPostURL={nextPost && slugify(`/blog/${nextPost.title}/`)}
                  prevPostURL={prevPost && slugify(`/blog/${prevPost.title}/`)}
                />
              )
            })}

            {postCategories.map(postCategory => {
              const slug = slugify(postCategory.title)
              const path = slugify(`/blog/category/${slug}`)
              const categoryPosts = posts.filter(post =>
                documentHasTerm(post, 'categories', slug)
              )
              return (
                <RouteWithMeta
                  key={path}
                  path={path}
                  exact
                  component={Blog}
                  fields={this.getDocument('pages', 'blog')}
                  posts={categoryPosts}
                  postCategories={postCategories}
                />
              )
            })}

            <Route render={() => <NoMatch siteUrl={siteUrl} />} />
          </Switch> */}
          <Footer />
        </div>
      </Router>
    )
  }
}

export default App
