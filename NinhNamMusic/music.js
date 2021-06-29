 
 const $ = document.querySelector.bind(document)
 const $$ = document.querySelectorAll.bind(document)

 const NINHNAM_MUSIC = "NINHNAM_MUSIC_PLAYER"
 const PlAYER_STORAGE = "NINHNAM_PLAYER"

 const cdThumb = $('.cd-thumb')
 const heading = $('header h2')
 const audio = $('audio')

 const playBtn = $('.btn-toggle-play')

 const playlist = $('.playlist')
 const player = $('.player')
 const progress = $('.progress')

 const prevBtn = $('.btn-prev')
 const nextBtn = $('.btn-next')
 const randomBtn = $('.btn-random')
 const repeatBtn = $('.btn-repeat')

 const app = {
    currentIndex : 0 ,
    isPlaying : false ,
    isRandom : false ,
    isRepeat : false ,
    config : JSON.parse(localStorage.getItem(PlAYER_STORAGE)) || {} ,
    setConfig: function (key, value) {
      this.config[key] = value;
      localStorage.setItem(PlAYER_STORAGE, JSON.stringify(this.config));
    } ,
    songs: [
        {
          name: "Vách Ngọc Ngà",
          singer: "Anh Rồng",
          path: "./music/Vach Ngoc Nga - Anh Rong.mp3",
          image: "./Image/vách-ngọc-ngà.jpg"
        },
        {
          name: "Tình Ka",
          singer: "G5R",
          path: "./music/Tinh Ka - G5RSquad.mp3",
          image:
            "./Image/tình-ka.jpg"
        },
        {
          name: "Save Me",
          singer: "Deam",
          path:
            "./music/SaveMe-Deamn-4780867.mp3",
          image: "./Image/save-me.jpg"
        },
        {
          name: "Ép Duyên",
          singer: "Long nón lá",
          path: "./music/EpDuyenCover-LongNonLaKaydee-6971600.mp3",
          image:
            "./Image/ép-duyên.jpg"
        },
        {
          name: "Hẹn em kiếp sau",
          singer: "Duy Phúc",
          path: "./music/Hen Em Kiep Sau - La_ x Duy Phuc x TiB.mp3",
          image:
            "./Image/hệnmKS.jpg"
        },
        {
          name: "Chiều thu họa bóng nàng",
          singer: "Datkka",
          path:
            "./music/Chieu Thu Hoa Bong Nang - DatKaa.mp3",
          image:
            "./Image/chiều-thu.jpg"
        },
        {
          name: "Ghé qua",
          singer: "Bạn có tài mà",
          path: "./music/Ghe Qua - Tofu_ PC_ Dick.mp3",
          image:
            "./Image/ghé qua.jpg"
        },
        {
          name: "Nevada",
          singer: "ViceToneCo",
          path:
            "./music/Nevada-VicetoneCoziZuehlsdorff-4498121.mp3",
          image:
            "./Image/nevada.jpg"
        },
        {
          name: "SummerTime",
          singer: "K-391",
          path:
            "./music/Summertime-K391-3549537.mp3",
          image:
            "./Image/summerTime.jpg"
        },
        {
          name: "Tương phùng",
          singer: "Long nón la X 199x",
          path:
            "./music/Tuong Phung - Long Non La_ The 199X.mp3",
          image:
            "./Image/tương-phùng.jpg"
        },
      ],

    defineProperties : function () {
        Object.defineProperty(this, 'currentSong', {
          get: function () {
            return this.songs[this.currentIndex]
          }
        })
      },

    renderSongs : function () {
      const htmls = this.songs.map(function (song, index) {
        return `<div class="song" data="${index}">
        <div class="thumb" style="background-image: url('${song.image}')">
        </div>
        <div class="body">
          <h3 class="title">${song.name}</h3>
          <p class="author">${song.singer}</p>
        </div>
        <div class="option">
          <i class="fas fa-ellipsis-h"></i>
        </div>
      </div>`
      })
      playlist.innerHTML = htmls.join('')
      $$('.song')[this.currentIndex].classList.add('active')
    },

    handleEvent : function () {
      const cd = $('.cd')
      const cdWidth = cd.offsetWidth
      const _this = this

      document.onscroll = function () {
        
        const scrollTop = window.scrollY || document.documentElement.scrollTop;
        const newCdWidth = cdWidth - scrollTop
        
        cd.style.width = (newCdWidth < 0) ? 0 : newCdWidth
        cd.style.opacity = newCdWidth / cdWidth
      }

      const cdThumbAnimate = cdThumb.animate([
        // keyframes
        { transform: 'rotate(360deg)' }
      ], {
        // timing options
        duration: 5000,
        iterations: Infinity
      });
      cdThumbAnimate.pause()

      playBtn.onclick = function () {
        this.isPlaying = !this.isPlaying

        if(this.isPlaying) {
          audio.play()
        }
        else {
          audio.pause()
        }

      }

      audio.onplay = function () {
        player.classList.add('playing')
        cdThumbAnimate.play()
      }
      audio.onpause = function () {
        player.classList.remove('playing')
        cdThumbAnimate.pause()
      }

      // audio.ontimeupdate = function () {
      //   if (audio.duration) {
      //     const progressPercent = Math.floor(audio.currentTime * 100 / audio.duration )
      //     progress.value = progressPercent
      //   }
      // }

      setInterval(() => {
        const progressPercent = Math.floor(audio.currentTime * 100 / audio.duration )
          progress.value = progressPercent
      }, 1000);

      progress.onchange = function (e) {
        audio.currentTime = audio.duration / 100 *  e.target.value
      }

      nextBtn.onclick = function () {
        if (_this.isRandom) {
          _this.randomSong()
        }
        else {
          _this.nextSong()
        }
        _this.renderSongs()
        audio.play()
      }

      prevBtn.onclick = function () {
        if (_this.isRandom) {
          _this.randomSong()
        }
        else {
          _this.prevSong()
        }
        _this.renderSongs()
        audio.play()
      }

      audio.onended = function () {
        if (_this.isRepeat) {
          _this.loadCurrentSong()
        }
        else if (_this.isRandom) {
          _this.randomSong()
        }
        else {
          _this.currentIndex ++
        }
        _this.loadCurrentSong()
        audio.play()
      }

      randomBtn.onclick = function () {
        _this.isRandom = !_this.isRandom
        randomBtn.classList.toggle('active')
        _this.setConfig('isRandom', _this.isRandom)
        // _this.randomSong()
      }

      repeatBtn.onclick = function () {
        _this.isRepeat = !_this.isRepeat
        repeatBtn.classList.toggle('active')
        _this.setConfig('isRepeat', _this.isRepeat)
      }

      playlist.onclick = function (e) {
        const songNode = e.target.closest('.song:not(.active)')
        const option = !e.target.closest('.option')
        if(songNode && option ) {
          _this.currentIndex = songNode.getAttribute('data')
          _this.loadCurrentSong()
          audio.play()
          console.log(songNode.getAttribute('data'))  
        }
      }

    },

    loadCurrentSong : function () {
      cdThumb.style.backgroundImage = `url('${this.currentSong.image}')`
      heading.innerHTML = this.currentSong.name
      audio.src = this.currentSong.path
      this.renderSongs()
      this.scrollActiveSong()
    },

    loadConfig : function () {
      this.isRandom = this.config.isRandom
      this.isRepeat = this.config.isRepeat

      if(this.isRandom) {
        randomBtn.classList.add('active')
      }
      if(this.isRepeat) {
        repeatBtn.classList.add('active')
      }
      // randomBtn.classList.toggle('active', this.isRandom)
      // repeatBtn.classList.toggle('active', this.isRepeat)
      this.loadCurrentSong()
    },

    scrollActiveSong : function () {
      setTimeout(() => {
        $('.song.active').scrollIntoView({
          behavior: "smooth",
          block: "center"
        });
      }, 300);
    },

    nextSong : function () {
      if(this.currentIndex == this.songs.length - 1) {
        this.currentIndex = 0
      }
      else {
        this.currentIndex ++
      }
      this.loadCurrentSong()
    },

    prevSong : function () {
      if(this.currentIndex == 0) {
        this.currentIndex = this.songs.length - 1
      }
      else {
        this.currentIndex --
      }
      this.loadCurrentSong()
    },

    randomList : [] ,
    randomSong : function () {
      this.randomList.push(this.currentIndex)
      if(this.randomList.length > this.songs.length - 1) {
        this.randomList.shift()
      }

      let randomIndex
      do {
       randomIndex = Math.floor( Math.random() * 10)
      }
      while(randomIndex === this.currentIndex || this.randomList.includes(randomIndex))

      this.currentIndex = randomIndex
      
      this.loadCurrentSong()
    },



    start : function () {
        this.defineProperties()

        this.loadConfig()
        
        this.loadCurrentSong()
        
        this.handleEvent()
    }
 }

app.start()
