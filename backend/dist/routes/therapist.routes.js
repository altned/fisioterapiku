"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const therapist_controller_1 = require("../controllers/therapist.controller");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const router = (0, express_1.Router)();
router.get('/', therapist_controller_1.TherapistController.getAllTherapists);
router.get('/:id', therapist_controller_1.TherapistController.getTherapistById);
router.put('/:id', auth_middleware_1.authenticate, (0, auth_middleware_1.authorize)('THERAPIST', 'ADMIN'), therapist_controller_1.TherapistController.updateTherapist);
router.post('/:id/availability', auth_middleware_1.authenticate, (0, auth_middleware_1.authorize)('THERAPIST', 'ADMIN'), therapist_controller_1.TherapistController.setAvailability);
router.get('/:id/availability', therapist_controller_1.TherapistController.getAvailability);
exports.default = router;
//# sourceMappingURL=therapist.routes.js.map