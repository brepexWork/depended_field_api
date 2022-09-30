"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.controller_put_depended_field = exports.controller_get_list_choose = exports.controller_check_exist_chooses_field = exports.controller_delete_depended_field = exports.controller_get_fields_type_crm = exports.controller_get_field = exports.controller_get_all_depended_fields = exports.controller_create_table = exports.check_exist_user = void 0;
const create_1 = require("../models/create");
const check_exist_user = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.body);
    yield (0, create_1.create_table_if_not_exists_model)(req.body.portal);
    res.status(200).json({ result: true });
});
exports.check_exist_user = check_exist_user;
const controller_create_table = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const object = {
        portal: req.body.portal,
        json_depended_field: req.body.json_depended_field,
        type: 'settings',
        type_crm: req.body.type_crm,
        name_field_in_bitrix: req.body.name_field_in_bitrix,
        list_bitrix_value_and_id: req.body.list_bitrix_value_and_id,
        title: req.body.title,
        chooses: req.body.chooses
    };
    yield (0, create_1.create_depended_field_model)(object);
    res.json({ result: true });
});
exports.controller_create_table = controller_create_table;
const controller_get_all_depended_fields = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield (0, create_1.model_get_all_depended_fields)(req.body.portal);
    res.json(response);
});
exports.controller_get_all_depended_fields = controller_get_all_depended_fields;
const controller_get_field = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield (0, create_1.model_get_field)(req.params.id, req.body.portal);
    res.json(response);
});
exports.controller_get_field = controller_get_field;
const controller_get_fields_type_crm = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield (0, create_1.model_get_fields_type_crm)(req.body.type, req.body.portal);
    res.json(response);
});
exports.controller_get_fields_type_crm = controller_get_fields_type_crm;
const controller_delete_depended_field = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, create_1.model_delete_depended_field)(req.params.id, req.body.portal);
    res.json({ result: true, success: 'Зависимое поле успешно удалено' });
});
exports.controller_delete_depended_field = controller_delete_depended_field;
const controller_check_exist_chooses_field = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.body);
    const response = yield (0, create_1.model_check_exist_chooses_field)(req.body.id_link, req.body.portal, req.body.chooses, req.body.lead_id, req.body.type_crm);
    res.json({ result: true, success: response });
});
exports.controller_check_exist_chooses_field = controller_check_exist_chooses_field;
const controller_get_list_choose = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield (0, create_1.model_get_list_choose)(req.body.portal, req.body.id_link, req.body.lead_id, req.body.type_crm);
    res.json(response);
});
exports.controller_get_list_choose = controller_get_list_choose;
const controller_put_depended_field = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.body);
    yield (0, create_1.model_put_depended_field)(req.body.portal, req.body.json_depended_field, req.body.type_crm, req.body.list_bitrix_value_and_id, req.body.id, req.body.title, req.body.chooses);
    res.json({ result: true });
});
exports.controller_put_depended_field = controller_put_depended_field;
