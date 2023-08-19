const checkDate = (req, res, next) => {
  if (!req.body.date) {
    res.status(400).json({ error: "'Date' is required" });
  } else {
    next();
  }
};

const checkTitle = (req, res, next) => {
  if (!req.body.title) {
    res.status(400).json({ error: "'Title' is required" });
  } else {
    next();
  }
};

const checkDescription = (req, res, next) => {
  if (!req.body.description) {
    res.status(400).json({ error: "'Description' is required" });
  } else {
    next();
  }
};

const checkPriority = (req, res, next) => {
  if (!req.body.priority) {
    res.status(400).json({ error: "'Priority' is required." });
  } else {
    next();
  }
};

const checkUsername = (req, res, next) => {
  if (!req.body.username) {
    res.status(400).json({ error: "'Username' is required" });
  } else {
    next();
  }
};

module.exports = {
  checkDate,
  checkTitle,
  checkDescription,
  checkPriority,
  checkUsername,
};
