import express from 'express';
import reports_middleware from '../middlewares/reports.middleware.js';
import reports_controller from '../controllers/reports.controller.js';

export const reportsRouter = express.Router();

reportsRouter.post(
  '/load_reports',
  reports_middleware.isLogged,
  reports_middleware.isAdmin,
  reports_controller.loadReports
)

reportsRouter.post(
  '/close_report',
  reports_middleware.isLogged,
  reports_middleware.isAdmin,
  reports_middleware.isValidReport,
  reports_controller.closeReport
)