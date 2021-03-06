/**
 * API错误名称
 */
var ApiErrorNames = {};

ApiErrorNames.UNKNOW_ERROR = "unknowError";
ApiErrorNames.USER_NOT_EXIST = "userNotExist";
ApiErrorNames.ILLEGAL_PARAMS = 'illegalParameters'
ApiErrorNames.Internal_Error = 'internalError'

/**
 * API错误名称对应的错误信息
 */
const ERROR_MAP = new Map();

ERROR_MAP.set(ApiErrorNames.UNKNOW_ERROR, { code: -1, message: 'unknow error', info: '未知错误' });
ERROR_MAP.set(ApiErrorNames.USER_NOT_EXIST, { code: 101, message: 'user not exist', info: '用户不存在' });
ERROR_MAP.set(ApiErrorNames.ILLEGAL_PARAMS, { code: 400002, message: 'illegal parameters', info: '非法参数' });
// ERROR_MAP.set(ApiErrorNames.UNKNOW_ERROR, { code: , message: '', info: '' });
// ERROR_MAP.set(ApiErrorNames.UNKNOW_ERROR, { code: , message: '', info: '' });
// ERROR_MAP.set(ApiErrorNames.UNKNOW_ERROR, { code: , message: '', info: '' });
// ERROR_MAP.set(ApiErrorNames.UNKNOW_ERROR, { code: , message: '', info: '' });
// ERROR_MAP.set(ApiErrorNames.UNKNOW_ERROR, { code: , message: '', info: '' });
// ERROR_MAP.set(ApiErrorNames.UNKNOW_ERROR, { code: , message: '', info: '' });
// ERROR_MAP.set(ApiErrorNames.UNKNOW_ERROR, { code: , message: '', info: '' });
// ERROR_MAP.set(ApiErrorNames.UNKNOW_ERROR, { code: , message: '', info: '' });
// ERROR_MAP.set(ApiErrorNames.UNKNOW_ERROR, { code: , message: '', info: '' });
// ERROR_MAP.set(ApiErrorNames.UNKNOW_ERROR, { code: , message: '', info: '' });
ERROR_MAP.set(ApiErrorNames.Internal_Error, { code: 500000, message: 'internal error', info: '内部错误' });

//根据错误名称获取错误信息
ApiErrorNames.getErrorInfo = (error_name) => {

    var error_info;

    if (error_name) {
        error_info = ERROR_MAP.get(error_name);
    }

    //如果没有对应的错误信息，默认'未知错误'
    if (!error_info) {
        error_name = UNKNOW_ERROR;
        error_info = ERROR_MAP.get(error_name);
    }

    return error_info;
}

module.exports = ApiErrorNames;