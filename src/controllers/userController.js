const { v4: uuidv4 } = require('uuid');

const createUser = async (req, res) => {
    const { name, username } = req.body;
    const userExists = await req.prisma.user.findUnique({ where: { username } });

    if (userExists) {
        return res.status(400).json({ error: 'Username already exists' });
    }

    const user = await req.prisma.user.create({
        data: {
            name,
            username,
        }
    });

    return res.status(201).json(user);
};

module.exports = {
    createUser,
};
