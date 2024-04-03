const reportModel = require("../../models/reportModel");
const userModel = require("../../models/userModel");

const getAllReports = async () => {
  try {
    const reports = await reportModel.find().sort({ createdat: -1 });
    for (const report of reports) {
      const userid = report.get("userid");
      if (userid) {
        const user = await userModel.findById(userid);
        report.username = user?.username;
      }
    }
    // console.log(reports);
    return reports;
  } catch (error) {
    return error;
  }
};

//ban report
const banReport = async (id) => {
  try {
    const report = await reportModel.findById(id);
    if (report) {
      report.status = !report.status;
    }
    return await report.save();
  } catch (error) {
    return error;
  }
};
module.exports = { getAllReports, banReport };
