import express from 'express';
import notificationManager from '../../controllers/notificationController';
import ValidateConfig from '../../helpers/notificationConfigSchema';
import auth from '../../middlewares/auth';

const router = express.Router();

router.get('/', auth.checkAuthentication, notificationManager.getNotifications);
router.get('/config', auth.checkAuthentication, notificationManager.getNotificationsConfig);
router.put('/config', auth.checkAuthentication, ValidateConfig.notificationConfigSchema, notificationManager.updateConfig);
router.put('/read/:id', auth.checkAuthentication, notificationManager.readNotification);

export default router;
