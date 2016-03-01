module.exports = {

    data: function () {
        return {
            configIncome: {
                header: "Przychody",
                apiUrl: '/przychody'
            },
            configOutcome: {
                header: "Wydatki",
                apiUrl: '/wydatki'
            },
            changedRows: []
        }
    },

    methods: {

    },
}
