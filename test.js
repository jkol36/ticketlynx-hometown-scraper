import { expect } from 'chai'
import { artistRef } from './config'
import wiki from 'wikijs'


describe('hometownscraper', () => {
  let finalHomeTown
  let artist = 'J Cole'
  it('should load wikijs library', done => {
    expect(wiki).to.not.be.undefined
    done()
  })
  it('should fetch wikipedia info for artist', done => {
    wiki()
    .page(artist)
    .then(page => {
      expect(page).to.not.be.undefined
      expect(page.info).to.not.be.undefined
      return page.info()
    })
    .then(info => {
      expect(info).to.not.be.undefined
      let { homeTown, birthPlace } = info
      if(homeTown)
        finalHomeTown = homeTown
      else {
        finalHomeTown = birthPlace
      }
      expect(finalHomeTown).to.not.be.undefined
      done()
    })
  })
  it('should save hometown for artist', done => {
    artistRef.child(artist.split(' ').join('-')).child('homeTown').set(finalHomeTown, () => {
      done()
    })
  })
})