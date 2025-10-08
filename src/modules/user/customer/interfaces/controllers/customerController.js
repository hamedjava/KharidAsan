const service = require('../../application/services/customerService');

exports.getAll = async (req, res, next) => {
  try {
    const result = await service.getAllCustomers();
    res.json({ success: true, data: result });
  } catch (err) {
    next(err);
  }
};
