const comments = []

const socket = new WebSocket('ws://localhost:5000')

socket.addEventListener('open', e => {
  console.log('WebSocket: open', e)
})

socket.addEventListener('message', e => {
  const msg = JSON.parse(e.data)
  console.log(msg)
  comments.push(msg)
})

Vue.component('comment-item', {
  props: ['comment'],
  template: `
    <article class="media">
      <figure class="media-left">
        <p class="image is-64x64">
          <img src="http://bulma.io/images/placeholders/128x128.png">
        </p>
      </figure>
      <div class="media-content">
        <div class="content">
          <strong>{{ comment.user }}</strong>
          <small>{{ dateFormat(comment.timestamp) }}</small>
          <div>
            {{ comment.message }}
          </div>
        </div>
        <nav class="level is-mobile">
          <div class="level-left">
            <a class="level-item">
              <span class="icon is-small"><i class="fa fa-reply"></i></span>
            </a>
            <a class="level-item">
              <span class="icon is-small"><i class="fa fa-retweet"></i></span>
            </a>
            <a class="level-item">
              <span class="icon is-small"><i class="fa fa-heart"></i></span>
            </a>
          </div>
        </nav>
      </div>
      <div class="media-right">
        <button class="delete"></button>
      </div>
    </article>
  `,
  methods: {
    dateFormat: date => moment(date).format('YYYY-MM-DD HH:mm')
  }
})

Vue.component('comment-list', {
  template: `
    <div>
      <comment-item v-for="c in comments" key="c.id" :comment="c">
      </comment-item>
    </div>
  `,
  data () {
    return {
      comments,
    }
  }
})

new Vue({
  el: '#app',
  template: `
    <comment-list></comment-list>
  `
})
