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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.model_put_depended_field = exports.model_get_list_choose = exports.model_check_exist_chooses_field = exports.model_delete_depended_field = exports.model_get_fields_type_crm = exports.model_get_field = exports.model_get_all_depended_fields = exports.create_depended_field_model = exports.create_table_if_not_exists_model = void 0;
const promise_1 = __importDefault(require("mysql2/promise"));
const connection_1 = require("./connection");
const create_table_if_not_exists_model = (portal) => __awaiter(void 0, void 0, void 0, function* () {
    const connection = yield promise_1.default.createConnection(connection_1.connectData);
    yield connection.execute("CREATE TABLE IF NOT EXISTS `" + portal + "` ( `id` INT(15) NOT NULL AUTO_INCREMENT,`title` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL, `chooses` JSON NULL DEFAULT NULL, `type` VARCHAR(40) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL , `json_depended_field` JSON NULL DEFAULT NULL ,`type_crm` JSON NULL DEFAULT NULL , `id_link` INT(15) NULL DEFAULT NULL ,`lead_id` INT(20) NULL DEFAULT NULL , `list_bitrix_value_and_id` JSON NULL DEFAULT NULL , `name_field_in_bitrix` JSON NULL DEFAULT NULL, UNIQUE (`id`)) ENGINE =MyISAM CHARSET=utf8 COLLATE utf8_general_ci;");
    yield connection.end();
});
exports.create_table_if_not_exists_model = create_table_if_not_exists_model;
const create_depended_field_model = ({ portal, json_depended_field, type, type_crm, name_field_in_bitrix, list_bitrix_value_and_id, title, chooses }) => __awaiter(void 0, void 0, void 0, function* () {
    const connection = yield promise_1.default.createConnection(connection_1.connectData);
    yield connection.execute("insert into `" + portal + "` (type, json_depended_field,name_field_in_bitrix, list_bitrix_value_and_id, type_crm, title, chooses) values(?, ?, ?, ?, ?, ?, ?)", [type, json_depended_field, name_field_in_bitrix, list_bitrix_value_and_id, type_crm, title, chooses]);
    yield connection.end();
});
exports.create_depended_field_model = create_depended_field_model;
const model_get_all_depended_fields = (portal) => __awaiter(void 0, void 0, void 0, function* () {
    const connection = yield promise_1.default.createConnection(connection_1.connectData);
    const [rows] = yield connection.execute("select * from `" + portal + "` where type = ?", ['settings']);
    yield connection.end();
    return rows;
});
exports.model_get_all_depended_fields = model_get_all_depended_fields;
const model_get_field = (id, portal) => __awaiter(void 0, void 0, void 0, function* () {
    const connection = yield promise_1.default.createConnection(connection_1.connectData);
    const [rows] = yield connection.execute("select * from `" + portal + "` where id = ? and type = ?", [id, "settings"]);
    return rows;
});
exports.model_get_field = model_get_field;
const model_get_fields_type_crm = (type, portal) => __awaiter(void 0, void 0, void 0, function* () {
    const connection = yield promise_1.default.createConnection(connection_1.connectData);
    const [rows] = yield connection.execute("select * from `" + portal + "` where type_crm like \"%" + type + "%\" and type = ?", ["settings"]);
    yield connection.end();
    return rows;
});
exports.model_get_fields_type_crm = model_get_fields_type_crm;
const model_delete_depended_field = (id, portal) => __awaiter(void 0, void 0, void 0, function* () {
    const connection = yield promise_1.default.createConnection(connection_1.connectData);
    yield connection.execute("delete from `" + portal + "` where id = ? or id_link = ?", [id, id]);
    yield connection.end();
});
exports.model_delete_depended_field = model_delete_depended_field;
const model_check_exist_chooses_field = (id_link, portal, chooses, lead_id, type_crm) => __awaiter(void 0, void 0, void 0, function* () {
    const connection = yield promise_1.default.createConnection(connection_1.connectData);
    const [rows] = yield connection.execute("select * from `" + portal + "` where id_link = ? and lead_id = ?", [id_link, lead_id]);
    yield connection.end();
    if (Array.isArray(rows) && rows.length == 0) {
        yield model_create_new_choose_field(portal, id_link, chooses, lead_id, type_crm);
        return 'Поле успешно установлено';
    }
    else {
        yield model_update_choose_field(portal, chooses, id_link, lead_id, type_crm);
        return 'Поле успешно обновлено';
    }
});
exports.model_check_exist_chooses_field = model_check_exist_chooses_field;
const model_create_new_choose_field = (portal, id_link, chooses, lead_id, type_crm) => __awaiter(void 0, void 0, void 0, function* () {
    const connection = yield promise_1.default.createConnection(connection_1.connectData);
    yield connection.execute("insert into `" + portal + "` (type, id_link, chooses, lead_id, type_crm) values(?, ?, ?, ?, ?)", ["chooses", id_link, chooses, lead_id, [type_crm]]);
    yield connection.end();
});
const model_update_choose_field = (portal, chooses, id_link, lead_id, type_crm) => __awaiter(void 0, void 0, void 0, function* () {
    const connection = yield promise_1.default.createConnection(connection_1.connectData);
    yield connection.execute("update `" + portal + "` set chooses = ? where id_link = ? and lead_id = ? and type_crm like '%" + type_crm + "%'", [chooses, id_link, lead_id]);
    yield connection.end();
});
const model_get_list_choose = (portal, id_link, lead_id, type_crm) => __awaiter(void 0, void 0, void 0, function* () {
    const connection = yield promise_1.default.createConnection(connection_1.connectData);
    const [rows] = yield connection.execute("select * from `" + portal + "` where lead_id = ? and id_link = ? and type_crm like '%" + type_crm + "%'", [lead_id, id_link]);
    yield connection.end();
    return rows;
});
exports.model_get_list_choose = model_get_list_choose;
const model_put_depended_field = (portal, json_depended_field, type_crm, list_bitrix_value_and_id, id, title, chooses) => __awaiter(void 0, void 0, void 0, function* () {
    const connection = yield promise_1.default.createConnection(connection_1.connectData);
    yield connection.execute("update `" + portal + "` set json_depended_field = ?, type_crm = ?, list_bitrix_value_and_id = ?, title = ?, chooses = ? where id = ?", [json_depended_field, type_crm, list_bitrix_value_and_id, title, chooses, id]);
    yield connection.end();
});
exports.model_put_depended_field = model_put_depended_field;
