const checkExistsUserAccount = async (req, res, next) => {
    const { username } = req.headers;
    const user = await req.prisma.user.findUnique({ where: { username } });

    if (!user) {
        return res.status(404).json({ error: 'User not exists' });
    }

    req.user = user;
    return next();
};

module.exports = checkExistsUserAccount;
