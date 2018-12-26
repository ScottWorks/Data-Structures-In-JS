/*Implement an MP3 player playlist that is capable of: 
  - play/pause
  - stop
  - skip forward/ backward
  - add/ remove song
  - sort by artists/ album/ year
  - search by artists/ album/ year
*/

function PlaylistAudioFile(data) {
  this.next = null;
  this.prev = null;
  this.data = data;
}

function Playlist() {
  this.head = null;
  this.tail = null;

  this.stopped = true;
  this.currentAudioFile = null;
  this.length = 0;
}

Playlist.prototype.getInfo = function(index) {
  var current = this.head;

  while (current) {
    if (current.data.index === index) {
      return current;
    }
    current = current.next;
  }
};

Playlist.prototype.add = function(data) {
  var newAudioFile = new PlaylistAudioFile(data);

  this.length++;

  if (!this.head) {
    newAudioFile.data.index = 0;
    this.head = newAudioFile;
    this.tail = newAudioFile;
  } else {
    newAudioFile.data.index = this.length - 1;

    this.tail.next = newAudioFile;
    newAudioFile.prev = this.tail;
    this.tail = newAudioFile;
  }
};

Playlist.prototype.remove = function(index) {
  var current = this.head,
    previous = this.head;

  while (current) {
    if (current.data.index === index) {
      if (current === this.head && current === this.tail) {
        this.head = null;
        this.tail = null;
      } else if (current === this.head) {
        this.head = this.head.next;
        this.head.prev = null;
      } else if (current === this.tail) {
        this.tail = previous;
      } else {
        previous.next = current.next;
      }

      this.length--;
    } else if (current.data.index > index) {
      current.data.index--;
    } else {
      previous = current;
    }

    current = current.next;
  }
};

Playlist.prototype.play = function() {
  this.stopped = !this.stopped;

  if (!this.currentAudioFile) {
    this.currentAudioFile = this.head;
  }
};

Playlist.prototype.stop = function() {
  this.stopped = true;
  this.currentAudioFile = null;
};

Playlist.prototype.skipBackward = function() {
  if (!this.currentAudioFile.prev) {
    return false;
  }

  this.currentAudioFile = this.currentAudioFile.prev;
};

Playlist.prototype.skipForward = function() {
  if (!this.currentAudioFile.next) {
    return false;
  }

  this.currentAudioFile = this.currentAudioFile.next;
};

Playlist.prototype.sortBy = function(type) {
  var left = new Playlist(),
    right = new Playlist(),
    current = this.head;

  const length = this.length;

  if (length === 1) {
    return this;
  }

  while (current) {
    if (current.data) {
      if (current.data.index < Math.floor(length / 2)) {
        left.add(current.data);
      } else {
        right.add(current.data);
      }
    }

    current = current.next;
  }

  return this._merge(left.sortBy(type), right.sortBy(type), type);
};

Playlist.prototype._merge = function(left, right, type) {
  var result = new Playlist(),
    currentLeft = left.head,
    currentRight = right.head;

  while (currentLeft && currentRight) {
    if (currentLeft.data[type] <= currentRight.data[type]) {
      result.add(currentLeft.data);
      currentLeft = currentLeft.next;
    } else {
      result.add(currentRight.data);
      currentRight = currentRight.next;
    }
  }

  if (currentLeft) result.add(currentLeft.data);
  if (currentRight) result.add(currentRight.data);

  return result;
};

Playlist.prototype.search = function(query) {
  var current = this.head,
    result = new Playlist();

  while (current) {
    console.log(current.data);
    if (
      current.data.artist.includes(query) ||
      current.data.album.includes(query) ||
      current.data.title.includes(query)
    ) {
      result.add(current.data);
    }

    current = current.next;
  }

  return result;
};

Playlist.prototype.print = function() {
  var current = this.head,
    result = '';

  while (current) {
    if (current === this.head) {
      result += `${current.data.index} - [${current.data.title} by ${
        current.data.artist
      }]`;
    } else {
      result += `\n |\n |\n v\n${current.data.index} - [${
        current.data.title
      } by ${current.data.artist}]`;
    }

    current = current.next;
  }

  return result;
};
var hiphopPlaylist = new Playlist();

hiphopPlaylist.add({
  index: null,
  artist: 'Wu-Tang Clan',
  album: 'Enter the 36 Chambers',
  title: 'C.R.E.A.M',
  genre: 'Hip-Hop',
  rating: 5,
  length: '4:01'
});

hiphopPlaylist.add({
  index: null,
  artist: 'Nas',
  album: 'Illmatic',
  title: 'The World Is Yours',
  genre: 'Hip-Hop',
  rating: 5,
  length: '4:08'
});

hiphopPlaylist.add({
  index: null,
  artist: 'Naughty By Nature',
  album: '19 Naughty III',
  title: 'Hip Hop Hooray',
  genre: 'Hip-Hop',
  rating: 5,
  length: '4:33'
});

hiphopPlaylist.add({
  index: null,
  artist: 'Digable Planets',
  album: 'Reachin (A New Refutation of Time and Space)',
  title: 'Rebirth of Slick (Cool Like Dat)',
  genre: 'Hip-Hop',
  rating: 5,
  length: '4:20'
});

hiphopPlaylist.add({
  index: null,
  artist: 'A Tribe Called Quest',
  album: 'The Low End Theory',
  title: 'Scenario',
  genre: 'Hip-Hop',
  rating: 5,
  length: '4:24'
});

console.log(hiphopPlaylist);

hiphopPlaylist.remove(2);
// console.log(hiphopPlaylist.print())

hiphopPlaylist.play();
// console.log(hiphopPlaylist.currentAudioFile, hiphopPlaylist.stopped)

hiphopPlaylist.play();
// console.log(hiphopPlaylist.currentAudioFile, hiphopPlaylist.stopped)

hiphopPlaylist.stop();
// console.log(hiphopPlaylist.currentAudioFile, hiphopPlaylist.stopped)

hiphopPlaylist.play();
// console.log(hiphopPlaylist.currentAudioFile)

hiphopPlaylist.skipBackward();
// console.log(hiphopPlaylist.currentAudioFile)

hiphopPlaylist.skipForward();
// console.log(hiphopPlaylist.currentAudioFile)

console.log(hiphopPlaylist.getInfo(1));

const sorted = hiphopPlaylist.sortBy('artist');
console.log(sorted.print());

const search = hiphopPlaylist.search('The');
console.log(search.print());
