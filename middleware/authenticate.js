const isAuthenticated = (req, res, next) => {
    if (req.session.user === undefined) {
        return res.status(481).json("You are not allowed to make changes");
    } next();
};

module.exports = {
    isAuthenticated
}