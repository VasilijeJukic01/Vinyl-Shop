// Helper functions for CRUD operations
const handleRoute = async (req, res, operation) => {
    try {
        const result = await operation(req.params.id, req.body);
        return res.json(result);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Error", data: err });
    }
};

module.exports = {
    handleRoute,
};
