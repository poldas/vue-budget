module.exports = {
    data: function () {
        return {
            budgetMessage: 'hello',
            messages: [],
            budgetData: [
                {id:1, name:"John",age:"20"},
                {id:2, name:"Jane",age:"24"},
                {id:3, name:"Susan",age:"16"},
                {id:4, name:"Chris",age:"55"},
                {id:5, name:"Dan",age:"40"}
            ],
            budgetTableOptions: {
                columns:['id','name','age']
            }
        }
    },

    methods: {
    }
}
