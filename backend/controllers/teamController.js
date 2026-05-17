const Team = require("../models/Team");

exports.createMember = async (req, res) => {
  try {
    const member = await Team.create(req.body);

    res.status(201).json(member);

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

exports.getMembers = async (req, res) => {
  try {

    const members = await Team.find();

    res.status(200).json(members);

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

exports.updateMember = async (req, res) => {
  try {

    const updatedMember = await Team.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.status(200).json(updatedMember);

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

exports.deleteMember = async (req, res) => {
  try {

    await Team.findByIdAndDelete(req.params.id);

    res.status(200).json({
      message: "Member Deleted Successfully"
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};