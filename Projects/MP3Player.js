/*Implement an MP3 player playlist that is capable of: 
  - play/pause
  - stop
  - skip forward/ backward
  - add/ remove song
  - sort by artists/ album/ year
  - search by artists/ album/ year
*/

function PlaylistAudioFile(data){
  this.next = null
  this.prev = null
  this.data = data
}

function Playlist(){
  this.head = null;
  this.tail = null;

  this.stopped = true;
  this.currentAudioFile = null
  this.length = 0;
}

Playlist.prototype.getInfo = function(index){
  var current = this.head;

  while(current){
    if(current.data.index === index){
      return current
    }
    current = current.next
  } 
}

Playlist.prototype.add = function(data){
  var newAudioFile = new PlaylistAudioFile(data)

  this.length++;

  if(!this.head){
    newAudioFile.data.index = 0
    this.head = newAudioFile
    this.tail = newAudioFile
  } else {
    newAudioFile.data.index = this.length - 1;

    this.tail.next = newAudioFile
    newAudioFile.prev = this.tail
    this.tail = newAudioFile
  }
}

Playlist.prototype.remove = function(index){
  var current = this.head;

  while(current){ 
    if(current.data.index === index) {
      if(current === this.head){
        this.head = this.head.next
      } else if(current === this.tail){
          this.tail = this.tail.prev
      } else {
          current.prev.next = current.next
      } 
    } else if(current.data.index > index) {
        current.data.index--
    }

    current = current.next
  }

  this.length--;
}

Playlist.prototype.play = function(){
  this.stopped = !this.stopped   

  if(!this.currentAudioFile){
    this.currentAudioFile = this.head
  }
}

Playlist.prototype.stop = function(){
  this.stopped = true   
  this.currentAudioFile = null
}

Playlist.prototype.skipBackward = function(){
  if(!this.currentAudioFile.prev){
    return false
  }

  this.currentAudioFile = this.currentAudioFile.prev
}

Playlist.prototype.skipForward = function(){
  if(!this.currentAudioFile.next){
    return false
  }

  this.currentAudioFile = this.currentAudioFile.next  
}

Playlist.prototype.sortBy = function(type){
  // initialize left/ right linked lists
  var current = this.head

  // if this.length < 2, return this

  while(current){
    // if current.index <= this.length / 2
      // insert current into left side LL
    // else if current.index > this.length / 2
      // insert current into right side LL
    current = current.next
  }

  // return _merge(leftLL.sortBy(type), rightLL.sortBy(type))
}

Playlist.prototype._merge = function(leftSide, rightSide){
  // initialize resultsLL 
  // while leftside and rightSide length > 1
    // if leftSide.data.index <= rightSide.data.index
      // insert leftSide into resultsLL
    // else 
      // insert rightSide into resultsLL
  // return resultsLL
}

Playlist.prototype.search = function(query){
  
}

Playlist.prototype.print = function(){
  var current = this.head, 
    result = '';

  while(current){
    if(current === this.head){
      result += `${current.data.index} - [${current.data.title} by ${current.data.artist}]`
    } else {
      result += `\n |\n |\n v\n${current.data.index} - [${current.data.title} by ${current.data.artist}]`
    }

    current = current.next
  }

  return result
}

var hiphopPlaylist = new Playlist()

hiphopPlaylist.add({
    index: null,
    artist: 'Wu-Tang Clan',
    album: 'Enter the 36 Chambers' ,
    title: 'C.R.E.A.M',
    genre: 'Hip-Hop',
    rating: 5,
    length: '4:01'
  })

hiphopPlaylist.add({
  index: null,
  artist: 'Nas',
  album: 'Illmatic' ,
  title: 'The World Is Yours',
  genre: 'Hip-Hop',
  rating: 5,
  length: '4:08'
})

hiphopPlaylist.add({
  index: null,
  artist: 'Naughty By Nature',
  album: '19 Naughty III' ,
  title: 'Hip Hop Hooray',
  genre: 'Hip-Hop',
  rating: 5,
  length: '4:33'
})

hiphopPlaylist.add({
  index: null,
  artist: 'Digable Planets',
  album: 'Reachin (A New Refutation of Time and Space)' ,
  title: 'Rebirth of Slick (Cool Like Dat)',
  genre: 'Hip-Hop',
  rating: 5,
  length: '4:20'
})

hiphopPlaylist.add({
  index: null,
  artist: 'A Tribe Called Quest',
  album: 'The Low End Theory' ,
  title: 'Scenario',
  genre: 'Hip-Hop',
  rating: 5,
  length: '4:24'
})

console.log(hiphopPlaylist)

// Playlist {
//   head: 
//    PlaylistAudioFile {
//      next: PlaylistAudioFile { next: [PlaylistAudioFile], prev: [Circular], data: [Object] },
//      prev: null,
//      data: 
//       { index: 0,
//         artist: 'Wu-Tang Clan',
//         album: 'Enter the 36 Chambers',
//         title: 'C.R.E.A.M',
//         genre: 'Hip-Hop',
//         rating: 5,
//         length: '4:01' } },
//   tail: 
//    PlaylistAudioFile {
//      next: null,
//      prev: PlaylistAudioFile { next: [Circular], prev: [PlaylistAudioFile], data: [Object] },
//      data: 
//       { index: 4,
//         artist: 'A Tribe Called Quest',
//         album: 'The Low End Theory',
//         title: 'Scenario',
//         genre: 'Hip-Hop',
//         rating: 5,
//         length: '4:24' } },
//   stopped: true,
//   currentAudioFile: null,
//   length: 5 }

hiphopPlaylist.remove(2)
// console.log(hiphopPlaylist.print())

hiphopPlaylist.play()
// console.log(hiphopPlaylist.currentAudioFile, hiphopPlaylist.stopped)

hiphopPlaylist.play()
// console.log(hiphopPlaylist.currentAudioFile, hiphopPlaylist.stopped)

hiphopPlaylist.stop()
// console.log(hiphopPlaylist.currentAudioFile, hiphopPlaylist.stopped)

hiphopPlaylist.play()
// console.log(hiphopPlaylist.currentAudioFile)

hiphopPlaylist.skipBackward()
// console.log(hiphopPlaylist.currentAudioFile)

hiphopPlaylist.skipForward()
// console.log(hiphopPlaylist.currentAudioFile)

// console.log(hiphopPlaylist.getInfo(1))