"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const create_controller_1 = require("../controllers/create_controller");
const router = express_1.default.Router();
router.post('/check_portal', create_controller_1.check_exist_user);
router.post('/create_field', create_controller_1.controller_create_table);
router.post('/get_list_fields', create_controller_1.controller_get_all_depended_fields);
router.post('/get_field/:id', create_controller_1.controller_get_field);
router.post('/get_fields_list_type_crm', create_controller_1.controller_get_fields_type_crm);
router.delete('/delete_depended_field/:id', create_controller_1.controller_delete_depended_field);
router.post('/set_or_change_value_for_entity', create_controller_1.controller_check_exist_chooses_field);
router.post('/get_choose_depended_field', create_controller_1.controller_get_list_choose);
router.put('/change_depended_field', create_controller_1.controller_put_depended_field);
exports.default = router;
