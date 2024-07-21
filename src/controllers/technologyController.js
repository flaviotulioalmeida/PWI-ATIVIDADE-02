const { v4: uuidv4 } = require('uuid');

const listTechnologies = async (req, res) => {
    const { user } = req;
    const technologies = await req.prisma.technology.findMany({ where: { userId: user.id } });
    return res.json(technologies);
};

const createTechnology = async (req, res) => {
    const { title, deadline } = req.body;
    const { user } = req;

    const technology = await req.prisma.technology.create({
        data: {
            title,
            studied: false,
            deadline: new Date(deadline),
            created_at: new Date(),
            userId: user.id,
        }
    });

    return res.status(201).json(technology);
};

const updateTechnology = async (req, res) => {
    const { id } = req.params;
    const { title, deadline } = req.body;
    const { user } = req;

    const technology = await req.prisma.technology.findUnique({ where: { id } });

    if (!technology || technology.userId !== user.id) {
        return res.status(404).json({ error: 'Technology not found' });
    }

    const updatedTechnology = await req.prisma.technology.update({
        where: { id },
        data: { title, deadline: new Date(deadline) }
    });

    return res.json(updatedTechnology);
};

const markTechnologyAsStudied = async (req, res) => {
    const { id } = req.params;
    const { user } = req;

    const technology = await req.prisma.technology.findUnique({ where: { id } });

    if (!technology || technology.userId !== user.id) {
        return res.status(404).json({ error: 'Technology not found' });
    }

    const updatedTechnology = await req.prisma.technology.update({
        where: { id },
        data: { studied: true }
    });

    return res.json(updatedTechnology);
};

const deleteTechnology = async (req, res) => {
    const { id } = req.params;
    const { user } = req;

    const technology = await req.prisma.technology.findUnique({ where: { id } });

    if (!technology || technology.userId !== user.id) {
        return res.status(404).json({ error: 'Technology not found' });
    }

    await req.prisma.technology.delete({ where: { id } });

    const remainingTechnologies = await req.prisma.technology.findMany({ where: { userId: user.id } });
    return res.status(200).json(remainingTechnologies);
};

module.exports = {
    listTechnologies,
    createTechnology,
    updateTechnology,
    markTechnologyAsStudied,
    deleteTechnology
};
