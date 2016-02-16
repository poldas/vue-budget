module.exports = {

  data: function () {
    return {
      row: {
        dokiedy: '',
        zaco: '',
        kwota: 0,
        completed: false,
        styczen: 0,
        luty: 0,
        marzec: 0,
        kwiecien: 0,
        maj: 0,
        czerwiec: 0,
        lipiec: 0,
        sierpien: 0,
        wrzesien: 0,
        pazdziernik: 0,
        listopad: 0,
        grudzien: 0
      },
      messages: []
    }
  },

  methods: {
    // Let's fetch the dog
    fetch: function (id, successHandler) {
      var that = this
      client({ path: '/wydatki/' + id }).then(
        function (response) {
          that.$set('row', response.entity.data)
          successHandler(response.entity.data)
        },
        function (response, status, request) {
          // Go tell your parents that you've messed up somehow
          if (status === 401) {
            self.$dispatch('userHasLoggedOut')
          } else {
            console.log(response)
          }
        }
      )
    },

    updateDog: function (e) {
      e.preventDefault()
      var self = this
      client({ path: '/wydatki/' + this.row.id, entity: this.row, method: 'PUT'}).then(
        function (response) {
          self.messages = []
          self.messages.push({type: 'success', message: 'Woof woof! Your dog was updated'})
        },
        function (response) {
          self.messages = []
          for (var key in response.entity) {
            self.messages.push({type: 'danger', message: response.entity[key]})
          }
        }
      )
    }

  },

  route: {
    // Ooh, ooh, are there any new puppies yet?
    data: function (transition) {
      this.fetch(this.$route.params.id, function (data) {
        transition.next({dog: data})
      })
    }
  }
}
