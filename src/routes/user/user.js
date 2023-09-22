const {users, todos, get_email, deletes, updates} = require('./user.query');
const auth = require('../../middleware/auth');

module.exports = function(app, bcrypt) {
    app.get('/user', auth, (req, res) => {
        users(res);
    });
    app.get('/user/todos', auth, (req, res) => {
        todos(res, req.user);
    });
    app.get(':data', auth, (req, res) => {
        var data = req.params.data;

        get_email(res, data);
    });
    app.delete(':id', auth, (req, res) => {
        var id = req.params.id;

        deletes(res, id);
    });
    app.put(':id', auth, (req, res) => {
        var id = req.params.id;
        var m = req.body["email"];
        var n = req.body["name"];
        var fn = req.body["firstname"];
        var p = req.body["password"];

        if (id === undefined || m === undefined || n === undefined  ||
        fn === undefined || p === undefined) {
            res.status(500).json({"msg":"internal server error"});
            return;
        }
        p = bcrypt.hashSync(p, 10);
        updates(res, id, m, p, n, fn);
    });
}

module.exports = router;