const adminOnly = (req, res, next) => {

    console.log("========== ADMIN CHECK ==========");

    console.log("Raw role:", JSON.stringify(req.user?.role));

    if (!req.user) {
        return res.status(401).json({
            message: "Not authenticated"
        });
    }

    const role = String(req.user.role)
        .trim()
        .toLowerCase();

    console.log("Normalized role:", role);

    if (role !== "admin") {
        console.log("❌ ADMIN CHECK FAILED");

        return res.status(403).json({
            message: "Access denied. Admins only."
        });
    }

    console.log("✅ ADMIN CHECK PASSED");

    next();
};

module.exports = adminOnly;