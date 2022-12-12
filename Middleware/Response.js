function ResponseAPI(req, res) {
    if (req.result == "" || req.result == undefined || req.result == null) {
        res.status(404).json({
            message: "OH NO 404 😂"
        });
    } else {
        res.json({
            result: req.result,
            message: req.message
        });
    }
}

module.exports = ResponseAPI;