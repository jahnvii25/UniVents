const adminMiddleware = (req, res, next) => {

    if (!req.user) {
        return res.status(401).json({
            message: "Authentication required"
        });
    }

    if (
        String(req.user.role).trim().toLowerCase() !== "admin"
    ) {
        return res.status(403).json({
            message: "Admin access required"
        });
    }

    next();
};

module.exports = adminMiddleware;