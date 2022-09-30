export interface ICreate_field {
    portal: string,
    type: string,
    json_depended_field: any,
    list_bitrix_value_and_id: string,
    name_field_in_bitrix: string,
    type_crm: string,
    title: string,
    chooses: any
}

export interface IGetAllFields {
    id: number,
    type: string,
    json_depended_field: any,
    type_crm: string[],
    id_link: null | number,
    lead_id: null | number,
    list_bitrix_value_and_id: [],
    name_field_in_bitrix: []
}