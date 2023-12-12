/*!
 * bootstrap-validation v0.0.1 (https://gitee.com/ajiho/bootstrap-validation)
 * Copyright 2023-2023 ajiho
 * license MIT (https://gitee.com/ajiho/bootstrap-validation/blob/master/LICENSE)
 */

(function (factory) {
  typeof define === 'function' && define.amd ? define(factory) :
  factory();
})((function () { 'use strict';

  $.fn.bootstrapValidation.i18n = $.extend(true, $.fn.bootstrapValidation.i18n, {
    require: {
      default: '请填写必填项目2'
    },
    stringLength: {
      default: '请输入符合长度限制的值',
      less: '最多只能输入 %s 个字符',
      more: '需要输入至少 %s 个字符',
      between: '请输入 %s 至 %s 个字符'
    }
  });

}));
