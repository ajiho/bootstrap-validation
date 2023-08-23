
class BootstrapValidation {
    constructor(el,option) {
        console.log('constructor')
        console.log(el)
        console.log(option)
    }
}


console.log('ssssssssssssssssssssssssssssssss')

// 定义插件
$.fn.bootstrapValidation = function (option) {
    let params = arguments;

    console.log('eee')
    console.log(params)

    return this.each(function () {

        console.log('fdsfsfsfdsdfsdfs')


        let $this = $(this),
            data = $this.data('bootstrapValidation'),
            options = 'object' === typeof option && option;

        console.log($this,data,options)

        if (!data) {
            data = new BootstrapValidation(this, options);
            $this.data('bootstrapValidation', data);
        }

        // 允许调用插件方法
        if ('string' === typeof option) {
            data[option].apply(data, Array.prototype.slice.call(params, 1));
        }
    });
};

// 默认选项
// 按字母顺序排序
$.fn.bootstrapValidation.DEFAULT_OPTIONS = {
    // 第一个无效字段将自动聚焦
    autoFocus: true,

    //错误消息容器。可以是:
    // - 'tooltip' 如果要使用引导工具提示显示错误消息
    // - 'popover' 如果要使用引导弹出窗口显示错误消息
    // - css选择器指定的容器
    // 在前两种情况下，由于工具提示/popover应该足够小，因此插件只显示一条错误消息
    // 您还可以为特定字段定义消息容器
    container: null,

    // 表单CSS类
    elementClass: 'bv-form',

    // 使用自定义事件名称以避免jQuery调用window.onerror
    // See https://github.com/nghuuphuoc/bootstrapvalidator/issues/630
    events: {
        formInit: 'init.form.bv',
        formError: 'error.form.bv',
        formSuccess: 'success.form.bv',
        fieldAdded: 'added.field.bv',
        fieldRemoved: 'removed.field.bv',
        fieldInit: 'init.field.bv',
        fieldError: 'error.field.bv',
        fieldSuccess: 'success.field.bv',
        fieldStatus: 'status.field.bv',
        validatorError: 'error.validator.bv',
        validatorSuccess: 'success.validator.bv'
    },

    // 指示将不被验证的字段
    // 默认情况下，插件不会验证以下类型的字段：
    // - disabled
    // - hidden
    // - invisible
    //
    // 该设置由jQuery过滤器组成。接受3种格式：
    // - A string. Use a comma to separate filter
    // - An array. Each element is a filter
    // - An array. Each element can be a callback function
    //      function($field, validator) {
    //          $field is jQuery object representing the field element
    //          validator is the BootstrapValidation instance
    //          return true or false;
    //      }
    //
    // 以下3个设置是等效的：
    //
    // 1) ':disabled, :hidden, :not(:visible)'
    // 2) [':disabled', ':hidden', ':not(:visible)']
    // 3) [':disabled', ':hidden', function($field) {
    //        return !$field.is(':visible');
    //    }]
    excluded: [':disabled', ':hidden', ':not(:visible)'],

    // 根据字段有效性显示确定/错误/加载图标
    // This feature requires Bootstrap v3.1.0 or later (http://getbootstrap.com/css/#forms-control-validation).
    // 由于Bootstrap不提供任何方法来了解其版本，因此此选项无法自动打开/关闭。
    // 换句话说，要使用此功能，您必须将引导程序升级到v3.1.0或更高版本。
    //
    // 例子:
    // - 使用 Glyphicons icons:
    //  feedbackIcons: {
    //      valid: 'glyphicon glyphicon-ok',
    //      invalid: 'glyphicon glyphicon-remove',
    //      validating: 'glyphicon glyphicon-refresh'
    //  }
    // - 使用 FontAwesome icons:
    //  feedbackIcons: {
    //      valid: 'fa fa-check',
    //      invalid: 'fa fa-times',
    //      validating: 'fa fa-refresh'
    //  }
    feedbackIcons: {
        valid: null,
        invalid: null,
        validating: null
    },

    // 使用验证器规则映射字段名称
    fields: null,

    // 用于指示元素的CSS选择器由字段组成
    // 默认情况下，每个字段都放置在<div class=“form group”></div>中
    // 如果您的表单组包含许多字段，但并非所有字段都需要验证，则应调整此选项
    group: '.form-group',

    // 实时验证选项
    // 可以是3个值之一:
    // - enabled: 该插件在字段更改后立即验证字段
    // - disabled: 禁用实时验证。只有在提交表单后才会显示错误消息
    // - submitted: 表单提交后启用实时验证
    live: 'enabled',

    // 默认无效消息
    message: 'This value is not valid',

    // 提交按钮选择器
    // 这些按钮将被禁用，以防止有效表单多次提交
    submitButtons: '[type="submit"]',

    // 如果字段长度小于此字符数，则不会对其进行实时验证
    threshold: null,

    // 验证字段时是否详细.
    // 可能值:
    // - true:  当一个字段有多个验证器时，将分别检查所有验证器，如果多个验证器中出现错误，则将向用户显示所有验证器
    // - false: 当一个字段有多个验证器时，该字段的验证将在第一次遇到错误时终止。因此，只有与该字段相关的第一条错误消息才会显示给用户
    verbose: true
};

// 可用验证器
$.fn.bootstrapValidation.validators = {};

// i18n
$.fn.bootstrapValidation.i18n = {};

$.fn.bootstrapValidation.Constructor = BootstrapValidation;

// 可以在验证器类中使用的Helper方法
$.fn.bootstrapValidation.helpers = {
    /**
     * 执行回调函数
     *
     * @param {String|Function} functionName Can be
     * - 全局函数的名称
     * - 命名空间函数的名称（如A.B.C）
     * - 函数
     * @param {Array} args 回调参数
     */
    call: function (functionName, args) {
        if ('function' === typeof functionName) {
            return functionName.apply(this, args);
        } else if ('string' === typeof functionName) {
            if ('()' === functionName.substring(functionName.length - 2)) {
                functionName = functionName.substring(0, functionName.length - 2);
            }
            let ns = functionName.split('.'),
                func = ns.pop(),
                context = window;
            for (let i = 0; i < ns.length; i++) {
                context = context[ns[i]];
            }
            return (typeof context[func] === 'undefined') ? null : context[func].apply(this, args);
        }
    },

    /**
     * 设置字符串格式
     * 它用于格式化错误消息
     * format（“字段必须介于%s和%s之间”，[10，20]）=“字段必须在10和20之间”
     *
     * @param {String} message
     * @param {Array} parameters
     * @returns {String}
     */
    format: function (message, parameters) {
        if (!$.isArray(parameters)) {
            parameters = [parameters];
        }

        for (let i in parameters) {
            message = message.replace('%s', parameters[i]);
        }

        return message;
    },

    /**
     * 验证日期
     *
     * @param {Number} year 4位数的全年
     * @param {Number} month 月份编号
     * @param {Number} day 日期编号
     * @param {Boolean} [notInFuture] 如果为true，则日期不得在将来
     * @returns {Boolean}
     */
    date: function (year, month, day, notInFuture) {
        if (isNaN(year) || isNaN(month) || isNaN(day)) {
            return false;
        }
        if (day.length > 2 || month.length > 2 || year.length > 4) {
            return false;
        }

        day = parseInt(day, 10);
        month = parseInt(month, 10);
        year = parseInt(year, 10);

        if (year < 1000 || year > 9999 || month <= 0 || month > 12) {
            return false;
        }
        let numDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        // Update the number of days in Feb of leap year
        if (year % 400 === 0 || (year % 100 !== 0 && year % 4 === 0)) {
            numDays[1] = 29;
        }

        // Check the day
        if (day <= 0 || day > numDays[month - 1]) {
            return false;
        }

        if (notInFuture === true) {
            let currentDate = new Date(),
                currentYear = currentDate.getFullYear(),
                currentMonth = currentDate.getMonth(),
                currentDay = currentDate.getDate();
            return (year < currentYear
                || (year === currentYear && month - 1 < currentMonth)
                || (year === currentYear && month - 1 === currentMonth && day < currentDay));
        }

        return true;
    },

    /**
     * 实现Luhn验证算法
     * Credit to https://gist.github.com/ShirtlessKirk/2134376
     *
     * @see http://en.wikipedia.org/wiki/Luhn
     * @param {String} value
     * @returns {Boolean}
     */
    luhn: function (value) {
        let length = value.length,
            mul = 0,
            prodArr = [[0, 1, 2, 3, 4, 5, 6, 7, 8, 9], [0, 2, 4, 6, 8, 1, 3, 5, 7, 9]],
            sum = 0;

        while (length--) {
            sum += prodArr[mul][parseInt(value.charAt(length), 10)];
            mul ^= 1;
        }

        return (sum % 10 === 0 && sum > 0);
    },

    /**
     * 实现模数11，10（ISO 7064）算法
     *
     * @param {String} value
     * @returns {Boolean}
     */
    mod11And10: function (value) {
        let check = 5,
            length = value.length;
        for (let i = 0; i < length; i++) {
            check = (((check || 10) * 2) % 11 + parseInt(value.charAt(i), 10)) % 10;
        }
        return (check === 1);
    },

    /**
     * 实施Mod 37、36（ISO 7064）算法
     * Usages:
     * mod37And36('A12425GABC1234002M')
     * mod37And36('002006673085', '0123456789')
     *
     * @param {String} value
     * @param {String} [alphabet]
     * @returns {Boolean}
     */
    mod37And36: function (value, alphabet) {
        alphabet = alphabet || '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        let modulus = alphabet.length,
            length = value.length,
            check = Math.floor(modulus / 2);
        for (let i = 0; i < length; i++) {
            check = (((check || modulus) * 2) % (modulus + 1) + alphabet.indexOf(value.charAt(i))) % modulus;
        }
        return (check === 1);
    }
};


export default BootstrapValidation;
