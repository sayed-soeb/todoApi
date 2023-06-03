const Task = require('../models/Task');
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
dotenv.config();


// Function to send email notification
const sendEmailNotification = async (recipientEmail, subject, message) => {
  try {
    // Create a transporter with your email service provider configuration
    const transporter = nodemailer.createTransport({
      // Provide the SMTP server details and authentication credentials
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: process.env.user,
        pass: process.env.pass,
      },
    });

    // Compose the email options
    const mailOptions = {
      from: process.env.user,
      to: recipientEmail,
      subject: subject,
      text: message,
    };

    // Send the email
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info.messageId);
  } catch (error) {
    console.error('Error sending email:', error);
  }
};


exports.createTask = async (req, res) => {
  try {
    const { name, description, status } = req.body;
    const userId = req.user.userId;

    // Check if recipient email exists
    if (!req.user.email) {
      throw new Error('Recipient email not found');
    }

    // Get recipient email from the authenticated user
    const recipientEmail = req.user.email;

    // Send email notification to the recipient
    const subject = 'New Task Created';
    const message = 'A new task has been created.';
    await sendEmailNotification(recipientEmail, subject, message);

    // Create the task
    const task = await Task.create({ name, description, status, userId });
    res.status(201).json(task);
  } catch (error) {
    console.error('Error creating task:', error);
    res.sendStatus(500);
  }
};



// Get all tasks with sorting
exports.getAllTasks = async (req, res) => {
    try {
      const userId = req.user.userId;
      const { sortBy, sortOrder } = req.query;
  
      const sortOptions = { [sortBy]: sortOrder === 'desc' ? -1 : 1 };
  
      const tasks = await Task.find({ userId }).sort(sortOptions);
  
      res.json(tasks);
    } catch (error) {
      console.error('Error getting tasks:', error);
      res.sendStatus(500);
    }
  };
  

// Get a task by ID
exports.getTaskById = async (req, res) => {
  try {
    const taskId = req.params.id;
    const userId = req.user.userId;

    const task = await Task.findOne({ _id: taskId, userId });
    if (!task) {
      return res.sendStatus(404);
    }

    res.json(task);
  } catch (error) {
    console.error('Error getting task:', error);
    res.sendStatus(500);
  }
};

// Update a task by ID
exports.updateTaskById = async (req, res) => {
  try {
    const taskId = req.params.id;
    const { name, description, status } = req.body;
    const userId = req.user.userId;

    const task = await Task.findOneAndUpdate(
      { _id: taskId, userId },
      { name, description, status },
      { new: true }
    );
    if (!task) {
      return res.sendStatus(404);
    }
     // Get recipient email from the authenticated user
     const recipientEmail = req.user.email;

     // Send email notification to the recipient
     const subject = 'Task Updated';
     const message = 'Your task status is updated.';
     await sendEmailNotification(recipientEmail, subject, message);
    res.json(task);
  } catch (error) {
    console.error('Error updating task:', error);
    res.sendStatus(500);
  }
};

// Delete a task by ID
exports.deleteTaskById = async (req, res) => {
  try {
    const taskId = req.params.id;
    const userId = req.user.userId;

    const task = await Task.findOneAndDelete({ _id: taskId, userId });
    if (!task) {
      return res.sendStatus(404);
    }

    res.sendStatus(204);
  } catch (error) {
    console.error('Error deleting task:', error);
    res.sendStatus(500);
  }
};
