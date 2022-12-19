import { Reporte } from './../models/Reporte';
const getByMonth = async (req, res) => {
  try {
    const { date } = req.body;
    let reporteList = await Reporte.findAll({
      order: [["date", "asc"]]
    });
    res.json(reporteList);
  } catch (error) {
    
  }
}