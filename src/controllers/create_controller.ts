import {
    create_depended_field_model,
    create_table_if_not_exists_model,
    model_check_exist_chooses_field,
    model_delete_depended_field,
    model_get_all_depended_fields,
    model_get_field,
    model_get_fields_type_crm,
    model_get_list_choose,
    model_put_depended_field
} from "../models/create";
import {ICreate_field} from "../types/create_type";

export const check_exist_user = async (req:any, res:any) => {
    console.log(req.body)
    await create_table_if_not_exists_model(req.body.portal)

    res.status(200).json({result: true})
}

export const controller_create_table = async (req:any, res:any) => {

    const object:ICreate_field = {
        portal: req.body.portal,
        json_depended_field: req.body.json_depended_field,
        type: 'settings',
        type_crm: req.body.type_crm,
        name_field_in_bitrix: req.body.name_field_in_bitrix,
        list_bitrix_value_and_id: req.body.list_bitrix_value_and_id,
        title: req.body.title,
        chooses: req.body.chooses
    }

    await create_depended_field_model(object)

    res.json({result: true})
}

export const controller_get_all_depended_fields = async (req:any, res:any) => {

    const response = await model_get_all_depended_fields(req.body.portal)

    res.json(response)
}

export const controller_get_field = async (req:any, res:any) => {
    const response = await model_get_field(req.params.id, req.body.portal)

    res.json(response)
}

export const controller_get_fields_type_crm = async (req:any, res:any) => {
    const response = await model_get_fields_type_crm(req.body.type, req.body.portal)

    res.json(response)
}

export const controller_delete_depended_field = async (req:any, res:any) => {
    await model_delete_depended_field(req.params.id, req.body.portal)

    res.json({result: true, success: 'Зависимое поле успешно удалено'})
}

export const controller_check_exist_chooses_field = async (req:any, res:any) => {
    console.log(req.body)
    const response = await model_check_exist_chooses_field(req.body.id_link, req.body.portal, req.body.chooses, req.body.lead_id, req.body.type_crm)

    res.json({result: true, success: response})
}

export const controller_get_list_choose = async (req:any, res:any) => {
    const response = await model_get_list_choose(req.body.portal, req.body.id_link, req.body.lead_id, req.body.type_crm)

    res.json(response)
}

export const controller_put_depended_field = async (req:any, res:any) => {
    console.log(req.body)

    await model_put_depended_field(
        req.body.portal,
        req.body.json_depended_field,
        req.body.type_crm,
        req.body.list_bitrix_value_and_id,
        req.body.id,
        req.body.title,
        req.body.chooses
    )

    res.json({result: true})
}