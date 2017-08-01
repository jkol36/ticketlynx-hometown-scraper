import { queryRef, artistRef } from './config'
import wiki from 'wikijs'


const start = () => {
  queryRef.on('child_added', s => {
    wiki()
      .page(s.val())
      .then(page => {
        return page.info()
      })
      .then(info => {
        let {homeTown, birthPlace} = info
        console.log(homeTown, birthPlace, s.val())
        if(homeTown && birthPlace) {
          return artistRef.child(s.val().split(' ').join('-')).update({homeTown})
        }
        else if(homeTown && !birthPlace) {
          return artistRef.child(s.val().split(' ').join('-')).update({homeTown})
        }

        else if(!homeTown && birthPlace) {
          return artistRef.child(s.val().split(' ').join('-')).update({homeTown:birthPlace})
        }
        else if(!homeTown && !birthPlace) {
          return artistRef.child(s.val().split(' ').join('-')).update({homeTown:'unknown'})
        }
      })
      .catch(err => {
        return artistRef.child(s.val().split(' ').join('-')).update({homeTown:'unknown'})
      })
  })
}

start()