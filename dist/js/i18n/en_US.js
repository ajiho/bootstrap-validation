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
      default: 'Please enter a value'
    },
    stringLength: {
      default: 'Please enter a value with valid length',
      less: 'Please enter less than %s characters',
      more: 'Please enter more than %s characters',
      between: 'Please enter value between %s and %s characters long'
    }
  });

}));
