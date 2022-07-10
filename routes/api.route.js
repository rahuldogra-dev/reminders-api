const router = require('express').Router();
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

router.get('/reminders', async (req, res, next) => {
  try {
    const allReminders = await prisma.reminder.findMany({});
    res.json(allReminders);
  } catch (error) {
    next(error);
  }
});

router.get('/reminders/:id', async (req, res, next) => {
  try {
    const { id } = req.params;

    const uniqueReminder = await prisma.reminder.findUnique({
      where: {
        id: id,
      },
    });

    res.json(uniqueReminder);
  } catch (error) {
    next(error);
  }
});

router.post('/reminders', async (req, res, next) => {
  try {
    const createdReminder = await prisma.reminder.create({
      data: req.body,
    });

    res.json(createdReminder);
  } catch (error) {
    next(error);
  }
});

router.delete('/reminders/:id', async (req, res, next) => {
  try {
    const { id } = req.params;

    const deleteReminder = await prisma.reminder.delete({
      where: {
        id: id,
      },
    });

    res.json(deleteReminder);
  } catch (error) {
    next(error);
  }
});

router.patch('/reminders/:id', async (req, res, next) => {
  try {
    const { id } = req.params;

    const updatedReminder = await prisma.reminder.update({
      where: {
        id: id,
      },
      data: req.body,
    });

    res.json(updatedReminder);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
