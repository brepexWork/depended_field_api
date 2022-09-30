import express from "express";
import {
    check_exist_user,
    controller_check_exist_chooses_field,
    controller_create_table,
    controller_delete_depended_field,
    controller_get_all_depended_fields,
    controller_get_field,
    controller_get_fields_type_crm,
    controller_get_list_choose,
    controller_put_depended_field
} from "../controllers/create_controller";

const router = express.Router()

router.post('/check_portal', check_exist_user)
router.post('/create_field', controller_create_table)
router.post('/get_list_fields', controller_get_all_depended_fields)
router.post('/get_field/:id', controller_get_field)
router.post('/get_fields_list_type_crm', controller_get_fields_type_crm)
router.delete('/delete_depended_field/:id', controller_delete_depended_field)
router.post('/set_or_change_value_for_entity', controller_check_exist_chooses_field)
router.post('/get_choose_depended_field', controller_get_list_choose)
router.put('/change_depended_field', controller_put_depended_field)


export default router

