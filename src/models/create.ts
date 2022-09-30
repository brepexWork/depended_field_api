import mysql from 'mysql2/promise'
import {connectData} from "./connection";
import {ICreate_field, IGetAllFields} from "../types/create_type";
import {type} from "os";

export const create_table_if_not_exists_model = async (portal:string) => {
    const connection = await mysql.createConnection(connectData)
    await connection.execute("CREATE TABLE IF NOT EXISTS `" + portal + "` ( `id` INT(15) NOT NULL AUTO_INCREMENT,`title` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL, `chooses` JSON NULL DEFAULT NULL, `type` VARCHAR(40) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL , `json_depended_field` JSON NULL DEFAULT NULL ,`type_crm` JSON NULL DEFAULT NULL , `id_link` INT(15) NULL DEFAULT NULL ,`lead_id` INT(20) NULL DEFAULT NULL , `list_bitrix_value_and_id` JSON NULL DEFAULT NULL , `name_field_in_bitrix` JSON NULL DEFAULT NULL, UNIQUE (`id`)) ENGINE =MyISAM CHARSET=utf8 COLLATE utf8_general_ci;")
}

export const create_depended_field_model = async ({portal, json_depended_field, type, type_crm, name_field_in_bitrix, list_bitrix_value_and_id, title, chooses}:ICreate_field) => {
    const connection = await mysql.createConnection(connectData)
    await connection.execute("insert into `" + portal + "` (type, json_depended_field,name_field_in_bitrix, list_bitrix_value_and_id, type_crm, title, chooses) values(?, ?, ?, ?, ?, ?, ?)", [type, json_depended_field, name_field_in_bitrix, list_bitrix_value_and_id, type_crm, title, chooses])
}

export const model_get_all_depended_fields = async (portal:string) => {
    const connection = await mysql.createConnection(connectData)
    const [rows] = await connection.execute("select * from `" + portal + "` where type = ?", ['settings'])

    return rows
}

export const model_get_field = async (id: number, portal: string) => {
    const connection = await mysql.createConnection(connectData)
    const [rows] = await connection.execute("select * from `" + portal + "` where id = ? and type = ?", [id, "settings"])

    return rows
}

export const model_get_fields_type_crm = async (type:string, portal: string) => {
    const connection = await mysql.createConnection(connectData)
    const [rows] = await connection.execute("select * from `" + portal + "` where type_crm like \"%" + type + "%\" and type = ?", ["settings"])

    return rows
}

export const model_delete_depended_field = async (id:number, portal:string) =>{
    const connection = await mysql.createConnection(connectData)
    await connection.execute("delete from `" + portal + "` where id = ? or id_link = ?", [id, id])
}

export const model_check_exist_chooses_field = async (id_link:number, portal:string, chooses:[], lead_id: number, type_crm:string) => {
    const connection = await mysql.createConnection(connectData)
    const [rows] = await connection.execute("select * from `" + portal + "` where id_link = ? and lead_id = ?", [id_link, lead_id])

    if(Array.isArray(rows) && rows.length == 0) {
        await model_create_new_choose_field(portal, id_link, chooses, lead_id, type_crm)
        return 'Поле успешно установлено'
    } else {
        await model_update_choose_field(portal, chooses, id_link, lead_id, type_crm)
        return 'Поле успешно обновлено'
    }
}

const model_create_new_choose_field = async (portal: string, id_link:number, chooses:[], lead_id:number, type_crm:string) => {
    const connection = await mysql.createConnection(connectData)
    await connection.execute("insert into `" + portal + "` (type, id_link, chooses, lead_id, type_crm) values(?, ?, ?, ?, ?)", ["chooses", id_link, chooses, lead_id, [type_crm]])
}

const model_update_choose_field = async (portal:string, chooses: [], id_link:number, lead_id:number, type_crm:string) => {
    const connection = await mysql.createConnection(connectData)
    await connection.execute("update `" + portal + "` set chooses = ? where id_link = ? and lead_id = ? and type_crm like '%" + type_crm + "%'", [chooses, id_link, lead_id])
}

export const model_get_list_choose = async (portal:string, id_link:number, lead_id:number, type_crm:string) => {
    const connection = await mysql.createConnection(connectData)
    const [rows] = await connection.execute("select * from `" + portal + "` where lead_id = ? and id_link = ? and type_crm like '%" + type_crm + "%'", [lead_id, id_link])

    return rows
}

export const model_put_depended_field = async (portal:string, json_depended_field:any, type_crm:[], list_bitrix_value_and_id:[], id:number, title:string, chooses: any) => {
    const connection = await mysql.createConnection(connectData)
    await connection.execute("update `" + portal + "` set json_depended_field = ?, type_crm = ?, list_bitrix_value_and_id = ?, title = ?, chooses = ? where id = ?", [json_depended_field, type_crm, list_bitrix_value_and_id, title, chooses, id])
}
