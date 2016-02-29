function selectElementContents(el) {
    var range = document.createRange();
    range.selectNodeContents(el);
    var sel = window.getSelection();
    sel.removeAllRanges();
    sel.addRange(range);
}
module.exports = {

    data: function () {
        return {
            dogs: [],
            messages: [],
            changedRows: []
        }
    },
    computed: {
        sumaKwota() {
            var suma = 0
            this.dogs.forEach(function(item) {
                suma += parseFloat(item.kwota)
            })
            return suma
        },
        sumaStyczen() {
            var suma = 0
            this.dogs.forEach(function(item) {
                suma += parseFloat(item.styczen)
            })
            return suma
        },
        sumaLuty() {
            var suma = 0
            this.dogs.forEach(function(item) {
                suma += parseFloat(item.luty)
            })
            return suma
        },
        sumaMarzec() {
            var suma = 0
            this.dogs.forEach(function(item) {
                suma += parseFloat(item.marzec)
            })
            return suma
        },
        sumaKwiecien() {
            var suma = 0
            this.dogs.forEach(function(item) {
                suma += parseFloat(item.kwiecien)
            })
            return suma
        },
        sumaMaj() {
            var suma = 0
            this.dogs.forEach(function(item) {
                suma += parseFloat(item.maj)
            })
            return suma
        },
        sumaCzerwiec() {
            var suma = 0
            this.dogs.forEach(function(item) {
                suma += parseFloat(item.czerwiec)
            })
            return suma
        },
        sumaLipiec() {
            var suma = 0
            this.dogs.forEach(function(item) {
                suma += parseFloat(item.lipiec)
            })
            return suma
        },
        sumaSierpien() {
            var suma = 0
            this.dogs.forEach(function(item) {
                suma += parseFloat(item.sierpien)
            })
            return suma
        },
        sumaWrzesien() {
            var suma = 0
            this.dogs.forEach(function(item) {
                suma += parseFloat(item.wrzesien)
            })
            return suma
        },
        sumaPazdziernik() {
            var suma = 0
            this.dogs.forEach(function(item) {
                suma += parseFloat(item.pazdziernik)
            })
            return suma
        },
        sumaListopad() {
            var suma = 0
            this.dogs.forEach(function(item) {
                suma += parseFloat(item.listopad)
            })
            return suma
        },
        sumaGrudzien() {
            var suma = 0
            this.dogs.forEach(function(item) {
                suma += parseFloat(item.grudzien)
            })
            return suma
        }
    },
    methods: {
        // Let's fetch some dogs
        fetch: function (successHandler) {
            var that = this
            client({path: '/wydatki'}).then(
                function (response) {
                    // Look ma! Puppies!
                    that.$set('dogs', response.entity.data)
                    successHandler(response.entity.data)
                },
                function (response, status) {
                    if (_.contains([401, 500], status)) {
                        that.$dispatch('userHasLoggedOut')
                    }
                }
            )
        },
        addNew () {
            console.log(this.$els.newrow)
            this.createNewFromHTML(this.$els.newrow)
        },
        createNewFromHTML (el) {
            var that = this;
            var $el = $(el);
            var newRow = {};
            var $tds = $el.find('td').each(function(index, item) {
                if (!index) return
                var currentValue = item.innerText
                var name = item.getAttribute('data-name')
                console.log(index,item)
                var tmp = name.split('.')
                var idRow = tmp[0]
                var attr = tmp[1]
                newRow[attr] = currentValue
                item.innerText = "";
            });
            if (newRow) {
                client({path: 'wydatki', entity: newRow}).then(
                    function (response, status) {
                        that.dogs.push(response.entity.wydatki)
                        that.messages = [ {type: 'success', message: 'New row was created'} ]
                    },
                    function (response, status) {
                        that.messages = []
                        for (var key in response.entity) {
                            that.messages.push({type: 'danger', message: response.entity[key]})
                        }
                    }
                )
            }
        },
        updateTable() {
            var that = this;
            this.changedRows.forEach(function (index) {
                var row = that.dogs[index]
                client({path: '/wydatki/' + row.id, entity: row, method: 'PUT'}).then(
                    function (response, status) {
                        console.log(response, status)
                        that.messages = [{type: 'success', message: 'Rows was updated'}]
                        //unset(this.changedRows[index])
                    },
                    function (response, status) {
                        that.messages = []
                        for (var key in response.entity) {
                            that.messages.push({type: 'danger', message: index+ '<-index '+ response.entity[key]})
                        }
                    }
                )
            })

        },
        cellClicked: function (event) {
            if (event.target.nodeName !== 'TD') return false
            var $clickedElem = $(event.target)
            $clickedElem.prop('contenteditable', "true")
            $clickedElem.one('focus', function (e, a) {
                selectElementContents(event.target)
            })
            var self = this;
            $clickedElem.one('blur', function (e, a) {
                var el = e.target
                var currentValue = el.innerText
                var name = el.getAttribute('data-name')
                if (!name) return
                var tmp = name.split('.')
                var idRow = tmp[0]
                if (idRow == 'new') return
                var attr = tmp[1]
                var oldValue = self.dogs[idRow][attr];
                self.dogs[idRow][attr] = currentValue;
                if (oldValue != currentValue) {
                    self.changedRows.push(idRow)
                }
                console.log('event blur', currentValue, ":", self.dogs[idRow][attr], name, idRow, attr, tmp)
            })
        },
        deleteDog: function (index) {
            var that = this
            client({path: '/wydatki/' + this.dogs[index].id, method: 'DELETE'}).then(
                function (response) {
                    that.dogs.splice(index, 1)
                    that.messages = [{type: 'success', message: 'Great, dog purged.'}]
                },
                function (response) {
                    that.messages.push({type: 'danger', message: 'There was a problem removing the dog'})
                }
            )
        },


    },

    route: {
        // Ooh, ooh, are there any new puppies yet?
        data: function (transition) {
            this.fetch(function (data) {
                transition.next({dogs: data})
            })
        }
    }

}
