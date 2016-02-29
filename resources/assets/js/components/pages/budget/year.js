import $ from 'jquery'
import 'bootstrap-table'
Vue.directive('table', {
    twoWay: true,
    priority: 1000,

    params: ['tableData'],

    bind: function () {
        var self = this
        $(this.el)
            .bootstrapTable({
                data: this.tableData
            })
    },
    update: function (value) {
        //$(this.el).val(value).trigger('change')
    },
    unbind: function () {
        //$(this.el).off().select2('destroy')
    }
})
module.exports = {
    data: function () {
        return {
            budgetMessage: 'hello',
            messages: [],
            budgetData: [
                {id: 1, name: "John", age: "20"},
                {id: 2, name: "Jane", age: "24"},
                {id: 3, name: "Susan", age: "16"},
                {id: 4, name: "Chris", age: "55"},
                {id: 5, name: "Dan", age: "40"}
            ],
            budgetTableOptions: {
                columns: ['id', 'name', 'age']
            },
            tableData: [
                {
                    "name": "bootstrap-table",
                    "stargazers_count": "526",
                    "forks_count": "122",
                    "description": "An extended Bootstrap table with radio, checkbox, sort, pagination, and other added features. (supports twitter bootstrap v2 and v3) "
                },
                {
                    "name": "multiple-select",
                    "stargazers_count": "288",
                    "forks_count": "150",
                    "description": "A jQuery plugin to select multiple elements with checkboxes :)"
                },
                {
                    "name": "bootstrap-show-password",
                    "stargazers_count": "32",
                    "forks_count": "11",
                    "description": "Show/hide password plugin for twitter bootstrap."
                },
                {
                    "name": "blog",
                    "stargazers_count": "13",
                    "forks_count": "4",
                    "description": "my blog"
                },
                {
                    "name": "scutech-redmine",
                    "stargazers_count": "6",
                    "forks_count": "3",
                    "description": "Redmine notification tools for chrome extension."
                }
            ]
        }
    },
    ready () {
    },
    methods: {
    }
}
