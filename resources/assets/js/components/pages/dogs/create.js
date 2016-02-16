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
    createDog: function (e) {
      e.preventDefault()
      var that = this
      client({path: 'wydatki', entity: this.row}).then(
        function (response, status) {
          that.row.kwota = ''
          that.row.zaco = ''
          that.messages = [ {type: 'success', message: 'Debt was created'} ]
          Vue.nextTick(function () {
            document.getElementById('nameInput').focus()
          })
        },
        function (response, status) {
          that.messages = []
          for (var key in response.entity) {
            that.messages.push({type: 'danger', message: response.entity[key]})
          }
        }
      )
    }
  }
}
