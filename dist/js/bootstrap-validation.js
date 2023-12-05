/*!
 * bootstrap-validation v0.0.1 (https://gitee.com/ajiho/bootstrap-validation)
 * Copyright 2023-2023 ajiho
 * license MIT (https://gitee.com/ajiho/bootstrap-validation/blob/master/LICENSE)
 */

(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('jquery')) :
    typeof define === 'function' && define.amd ? define(['jquery'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.BootstrapValidation = factory(global.jQuery));
})(this, (function ($$1) { 'use strict';

    // 版本号
    const VERSION = '0.5.3';

    //默认选项
    const DEFAULTS = {
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
      excluded: [':disabled', ':hidden', ':not(:visible)'],
      //反馈图标
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
    var Constants = {
      VERSION,
      DEFAULTS
    };

    var Utils = {
      /**
       * 执行回调函数
       *
       * @param {String|Function} functionName Can be
       * - 全局函数的名称
       * - 命名空间函数的名称（如A.B.C）
       * - 函数
       * @param {Array} args 回调参数
       */
      call(functionName, args) {
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
          return typeof context[func] === 'undefined' ? null : context[func].apply(this, args);
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
      format(message, parameters) {
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
      date(year, month, day, notInFuture) {
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
        if (year % 400 === 0 || year % 100 !== 0 && year % 4 === 0) {
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
          return year < currentYear || year === currentYear && month - 1 < currentMonth || year === currentYear && month - 1 === currentMonth && day < currentDay;
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
      luhn(value) {
        let length = value.length,
          mul = 0,
          prodArr = [[0, 1, 2, 3, 4, 5, 6, 7, 8, 9], [0, 2, 4, 6, 8, 1, 3, 5, 7, 9]],
          sum = 0;
        while (length--) {
          sum += prodArr[mul][parseInt(value.charAt(length), 10)];
          mul ^= 1;
        }
        return sum % 10 === 0 && sum > 0;
      },
      /**
       * 实现模数11，10（ISO 7064）算法
       *
       * @param {String} value
       * @returns {Boolean}
       */
      mod11And10(value) {
        let check = 5,
          length = value.length;
        for (let i = 0; i < length; i++) {
          check = ((check || 10) * 2 % 11 + parseInt(value.charAt(i), 10)) % 10;
        }
        return check === 1;
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
      mod37And36(value, alphabet) {
        alphabet = alphabet || '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        let modulus = alphabet.length,
          length = value.length,
          check = Math.floor(modulus / 2);
        for (let i = 0; i < length; i++) {
          check = ((check || modulus) * 2 % (modulus + 1) + alphabet.indexOf(value.charAt(i))) % modulus;
        }
        return check === 1;
      }
    };

    var notEmpty = {
      enableByHtml5($field) {
        let required = $field.attr('required') + '';
        return 'required' === required || 'true' === required;
      },
      /**
       * Check if input value is empty or not
       *
       * @param {BootstrapValidator} validator The validator plugin instance
       * @param {jQuery} $field Field element
       * @param {Object} options
       * @returns {Boolean}
       */
      validate(validator, $field, options) {
        console.log(options);
        let type = $field.attr('type');
        if ('radio' === type || 'checkbox' === type) {
          return validator.getFieldElements($field.attr('data-bv-field')).filter(':checked').length > 0;
        }
        if ('number' === type && $field.get(0).validity && $field.get(0).validity.badInput === true) {
          return true;
        }
        return $.trim($field.val()) !== '';
      }
    };

    var stringLength = {
      html5Attributes: {
        message: 'message',
        min: 'min',
        max: 'max',
        trim: 'trim',
        utf8bytes: 'utf8Bytes'
      },
      enableByHtml5: function ($field) {
        let options = {},
          maxLength = $field.attr('maxlength'),
          minLength = $field.attr('minlength');
        if (maxLength) {
          options.max = parseInt(maxLength, 10);
        }
        if (minLength) {
          options.min = parseInt(minLength, 10);
        }
        return $.isEmptyObject(options) ? false : options;
      },
      /**
       * Check if the length of element value is less or more than given number
       *
       * @param {BootstrapValidator} validator The validator plugin instance
       * @param {jQuery} $field Field element
       * @param {Object} options Consists of following keys:
       * - min
       * - max
       * At least one of two keys is required
       * The min, max keys define the number which the field value compares to. min, max can be
       *      - A number
       *      - Name of field which its value defines the number
       *      - Name of callback function that returns the number
       *      - A callback function that returns the number
       *
       * - message: The invalid message
       * - trim: Indicate the length will be calculated after trimming the value or not. It is false, by default
       * - utf8bytes: Evaluate string length in UTF-8 bytes, default to false
       * @returns {Object}
       */
      validate: function (validator, $field, options) {
        let value = $field.val();
        if (options.trim === true || options.trim === 'true') {
          value = $.trim(value);
        }
        if (value === '') {
          return true;
        }
        let min = $.isNumeric(options.min) ? options.min : validator.getDynamicOption($field, options.min),
          max = $.isNumeric(options.max) ? options.max : validator.getDynamicOption($field, options.max),
          // Credit to http://stackoverflow.com/a/23329386 (@lovasoa) for UTF-8 byte length code
          utf8Length = function (str) {
            let s = str.length;
            for (let i = str.length - 1; i >= 0; i--) {
              let code = str.charCodeAt(i);
              if (code > 0x7f && code <= 0x7ff) {
                s++;
              } else if (code > 0x7ff && code <= 0xffff) {
                s += 2;
              }
              if (code >= 0xDC00 && code <= 0xDFFF) {
                i--;
              }
            }
            return s;
          },
          length = options.utf8Bytes ? utf8Length(value) : value.length,
          isValid = true,
          message = options.message || $.fn.bootstrapValidation.i18n.stringLength['default'];
        if (min && length < parseInt(min, 10) || max && length > parseInt(max, 10)) {
          isValid = false;
        }
        switch (true) {
          case !!min && !!max:
            message = Utils.format(options.message || $.fn.bootstrapValidation.i18n.stringLength.between, [parseInt(min, 10), parseInt(max, 10)]);
            break;
          case !!min:
            message = Utils.format(options.message || $.fn.bootstrapValidation.i18n.stringLength.more, parseInt(min, 10));
            break;
          case !!max:
            message = Utils.format(options.message || $.fn.bootstrapValidation.i18n.stringLength.less, parseInt(max, 10));
            break;
        }
        return {
          valid: isValid,
          message: message
        };
      }
    };

    var Rules = {
      notEmpty,
      stringLength
    };

    const NAME = 'bootstrapValidation';
    class BootstrapValidation {
      // 确定用户更改字段值时激发的事件
      #changeEvent = 'input';
      // 当远程/回调验证器返回时，指示表单已准备好提交的标志
      #submitIfValid = null;
      // 缓存的字段元素
      #cacheFields = {};
      constructor(el, options) {
        this.options = options;
        this.$form = $$1(el);

        //无效字段
        this.$invalidFields = $$1([]); // 无效字段数组
        //提交按钮
        this.$submitButton = null; // 单击以提交表单的提交按钮
        // 隐藏按钮
        this.$hiddenButton = null;

        // 没有验证的
        this.STATUS_NOT_VALIDATED = 'NOT_VALIDATED';
        // 验证中
        this.STATUS_VALIDATING = 'VALIDATING';
        // 验证无效的
        this.STATUS_INVALID = 'INVALID';
        // 验证通过的
        this.STATUS_VALID = 'VALID';

        //调用初始化方法
        this.#init();
      }

      /**
       * 初始化表单
       */
      #init() {
        //that是当前实例,这里取出来是避免下面在各种匿名函数中混淆this指向

        let that = this;

        //默认的选项
        let options = {
          autoFocus: this.$form.attr('data-bv-autofocus'),
          //指示错误信息的css选择器
          container: this.$form.attr('data-bv-container'),
          //事件从属性里读取一遍。
          events: {
            formInit: this.$form.attr('data-bv-events-form-init'),
            formError: this.$form.attr('data-bv-events-form-error'),
            formSuccess: this.$form.attr('data-bv-events-form-success'),
            fieldAdded: this.$form.attr('data-bv-events-field-added'),
            fieldRemoved: this.$form.attr('data-bv-events-field-removed'),
            fieldInit: this.$form.attr('data-bv-events-field-init'),
            fieldError: this.$form.attr('data-bv-events-field-error'),
            fieldSuccess: this.$form.attr('data-bv-events-field-success'),
            fieldStatus: this.$form.attr('data-bv-events-field-status'),
            validatorError: this.$form.attr('data-bv-events-validator-error'),
            validatorSuccess: this.$form.attr('data-bv-events-validator-success')
          },
          //排除验证的字段
          excluded: this.$form.attr('data-bv-excluded'),
          feedbackIcons: {
            valid: this.$form.attr('data-bv-feedbackicons-valid'),
            invalid: this.$form.attr('data-bv-feedbackicons-invalid'),
            validating: this.$form.attr('data-bv-feedbackicons-validating')
          },
          group: this.$form.attr('data-bv-group'),
          live: this.$form.attr('data-bv-live'),
          message: this.$form.attr('data-bv-message'),
          //错误
          onError: this.$form.attr('data-bv-onerror'),
          onSuccess: this.$form.attr('data-bv-onsuccess'),
          //提交的按钮
          submitButtons: this.$form.attr('data-bv-submitbuttons'),
          threshold: this.$form.attr('data-bv-threshold'),
          trigger: this.$form.attr('data-bv-trigger'),
          verbose: this.$form.attr('data-bv-verbose'),
          //验证的字段。
          fields: {}
        };
        this.$form
        // 禁用HTML 5中的客户端验证
        .attr('novalidate', 'novalidate')
        // 给表单添加了一个class '.bv-form'
        .addClass(this.options.elementClass)
        // 监听表单的提交事件，submit.bv 实际上就是等于 submit事件，只是这里给它加了一个命名空间.bv
        .on('submit.bv', function (e) {
          e.preventDefault(); //首先禁用默认提交事件
          that.validate(); //调用验证的方法
        })
        //事件委托给 提交按钮 绑定一个点击事件
        .on('click.bv', this.options.submitButtons, function () {
          //得到 $submitButton
          that.$submitButton = $$1(this);
          // 用户点击提交按钮后，让提交有效标志设置为真
          that.#submitIfValid = true;
        })
        // 查找具有name或data-bv-field属性的所有字段(就是每个表单元素，比如 input等、select等)
        .find('[name], [data-bv-field]')
        //遍历操作
        .each(function () {
          //得到表单字段元素的jquery对象
          let $field = $$1(this);
          //这里是得到所有的字段名称，分别从name或者data-bv-field读取
          let field = $field.attr('name') || $field.attr('data-bv-field');
          //调用方法，从HTML属性分析验证器选项
          let opts = that.#parseOptions2($field);
          if (opts) {
            //给每个表单字段元素设置data-bv-field="xxxx"
            //例子<input type="email" name="email" className="form-control" id="exampleInputEmail1" placeholder="Email" data-bv-field="email">
            $field.attr('data-bv-field', field);
            //只合并到options.fields 这个对象选项上，其它的选项是不会动的
            options.fields[field] = $$1.extend({}, opts, options.fields[field]);
          }
        });

        //合并大选项(到这里已经包括了field字段，但这里仅仅是只有field)
        this.options = $$1.extend(true, this.options, options);
        console.log('这里已经合并了默认选项，和插件初始化时传递过来的所有选项');
        console.log(this.options);

        // 当在表单中的任何字段上按Enter键时，第一个提交按钮将完成其工作
        // 然后表单将会提交
        // 我创建了第一个隐藏的提交按钮
        this.$hiddenButton = $$1('<button/>').attr('type', 'submit').prependTo(this.$form).addClass('bv-hidden-submit').css({
          display: 'none',
          width: 0,
          height: 0
        });

        //再次通过事件委托的方式监听提交按钮被点击后触发事件。
        this.$form.on('click.bv', '[type="submit"]', function (e) {
          //e.isDefaultPrevented() 用来判断 用于检测事件是否已经调用 event.preventDefault() 阻止了默认行为。如果事件调用了 event.preventDefault() 方法，则 e.isDefaultPrevented() 返回 true，否则返回 false
          // e.isDefaultPrevented() 可以用来判断是否执行了默认行为的阻止操作
          // #746: 检查按钮单击处理程序是否返回false
          if (!e.isDefaultPrevented()) {
            //没有阻止默认事件，因为如果用户自己阻止了默认提交事件，我们这里就不能强制让它手动提交了。
            // console.log('!isDefaultPrevented()')
            let $target = $$1(e.target);
            // 按钮可能包含HTML标记，比如按钮内部或者外部有其它的html包裹，所以需要我们判断一下。
            let $button = $target.is('[type="submit"]') ? $target.eq(0) : $target.parent('[type="submit"]').eq(0);

            // 单击提交按钮/输入时不执行验证
            // 判断该按钮不是submitButtons定义的且也不是我们自己生成的hiddenButton
            if (that.options.submitButtons && !$button.is(that.options.submitButtons) && !$button.is(that.$hiddenButton)) {
              that.$form.off('submit.bv').submit(); //模拟表单提交然后移除掉自定义绑定的事件
            }
          }
        });

        //循环初始化每个字段
        for (const field in this.options.fields) {
          //初始化字段
          this.#initField(field);
        }

        //触发表单初始化完成事件
        // console.log(this.options.events.formInit)
        this.$form.trigger($$1.Event(this.options.events.formInit), {
          bv: this,
          options: this.options
        });

        // 准备事件
        if (this.options.onSuccess) {
          this.$form.on(this.options.events.formSuccess, function (e) {
            Utils.call(that.options.onSuccess, [e]);
          });
        }
        if (this.options.onError) {
          this.$form.on(this.options.events.formError, function (e) {
            Utils.call(that.options.onError, [e]);
          });
        }
      }

      /**
       * 从HTML属性分析验证器选项
       *
       * @param {jQuery} $field 字段元素
       * @returns {Object}
       */
      #parseOptions2($field) {
        const field = $field.attr('name') || $field.attr('data-bv-field');
        let validators = {};
        let validator;
        for (const v in $$1.fn.bootstrapValidation.validators) {
          validator = $$1.fn.bootstrapValidation.validators[v];
          const attrName = `data-bv-${v.toLowerCase()}`;
          let enabled = $field.attr(attrName) + '';
          const html5AttrMap = typeof validator.enableByHtml5 === 'function' ? validator.enableByHtml5($field) : null;
          if (html5AttrMap && enabled !== 'false' || html5AttrMap !== true && (enabled === '' || enabled === 'true' || attrName === enabled.toLowerCase())) {
            validator.html5Attributes = {
              message: 'message',
              onerror: 'onError',
              onsuccess: 'onSuccess'
            };
            validators[v] = html5AttrMap === true ? {} : html5AttrMap;
            for (const html5AttrName in validator.html5Attributes) {
              const optionName = validator.html5Attributes[html5AttrName];
              const optionAttrName = `data-bv-${v.toLowerCase()}-${html5AttrName}`;
              const optionValue = $field.attr(optionAttrName);
              if (optionValue) {
                validators[v][optionName] = optionValue === 'true' || optionAttrName === optionValue.toLowerCase();
              }
            }
          }
        }
        const opts = {
          autoFocus: $field.attr('data-bv-autofocus'),
          container: $field.attr('data-bv-container'),
          excluded: $field.attr('data-bv-excluded'),
          feedbackIcons: $field.attr('data-bv-feedbackicons'),
          group: $field.attr('data-bv-group'),
          message: $field.attr('data-bv-message'),
          onError: $field.attr('data-bv-onerror'),
          onStatus: $field.attr('data-bv-onstatus'),
          onSuccess: $field.attr('data-bv-onsuccess'),
          selector: $field.attr('data-bv-selector'),
          threshold: $field.attr('data-bv-threshold'),
          trigger: $field.attr('data-bv-trigger'),
          verbose: $field.attr('data-bv-verbose'),
          validators
        };
        const emptyOptions = $$1.isEmptyObject(opts);
        const emptyValidators = $$1.isEmptyObject(validators);
        if (!emptyValidators || !emptyOptions && this.options.fields && this.options.fields[field]) {
          opts.validators = validators;
          return opts;
        } else {
          return null;
        }
      }

      /**
       * Init字段
       *
       * @param {String|jQuery} field 字段名称或字段元素
       */
      #initField(field) {
        //创建一个空的 jQuery 集合，用于存储和管理元素
        let fields = $$1([]);

        // console.log(fields)

        // console.log(typeof field)
        switch (typeof field) {
          case 'object':
            //如果传递过来的直接是一个字段元素就直接给fields赋值
            fields = field;
            field = field.attr('data-bv-field');
            break;
          case 'string':
            //根据字段名称或者字段元素,并赋值给上面定义的 fields
            fields = this.getFieldElements(field);
            // console.log(fields)
            // console.log(fields);
            fields.attr('data-bv-field', field);
            break;
        }

        // 我们不需要验证不存在的字段
        if (fields.length === 0 || this.options.fields[field] === null || this.options.fields[field].validators === null) {
          return;
        }

        //$.fn.bootstrapValidatio.validators :这里是取对象上所有已经被注册的验证器对象集合
        // console.log($.fn.bootstrapValidatio.validators)
        //Object.keys(this.options.fields[field].validators) 得到的是对象的key值组成的数组，这里得到的是验证器名称数组
        // 这里的作用是把传递进来的每个字段的验证器过滤一下，只保留bootstrapValidator.validators上真正存在的验证器
        Object.keys(this.options.fields[field].validators).forEach(validatorName => {
          if (!$$1.fn.bootstrapValidation.validators[validatorName]) {
            delete this.options.fields[field].validators[validatorName];
          }
        });

        //this.options.fields[field].enabled 可是这里会等于undefined,估计是作者的bug
        if (this.options.fields[field].enabled === null) {
          //判断每个字段上对象上的enabled是否等于null，等于null则设定为true
          console.log('into');
          this.options.fields[field].enabled = true;
        }
        let that = this;

        //字段元素的长度
        let total = fields.length;

        //获取类型，可能是 text radio checkbox
        let type = fields.attr('type');

        // 判断字段元素类型为radio或者checkbox
        let updateAll = total === 1 || 'radio' === type || 'checkbox' === type; //这里目前是永远都等于true

        // 事件类型判断，如果是字段元素是 radio checkbox file SELECT 则用change事件，否则就调用 this.#changeEvent
        let event = 'radio' === type || 'checkbox' === type || 'file' === type || 'SELECT' === fields.eq(0).get(0).tagName ? 'change' : this.#changeEvent;
        //得到字段上的 trigger字符串数组 ,['input']
        let trigger = (this.options.fields[field].trigger || this.options.trigger || event).split(' ');
        // console.log(trigger)

        // 得到 'input.update.bv'
        let events = $$1.map(trigger, function (item) {
          return item + '.update.bv';
        }).join(' ');
        fields.each((index, fieldElement) => {
          let $field = $$1(fieldElement);

          // 字段元素容器选择器
          let group = this.options.fields[field].group || this.options.group;
          // 字段元素容器jq对象
          let $parent = $field.parents(group);

          // 允许用户指示错误消息的显示位置,email: {container:'#errors',...}
          let container = 'function' === typeof (this.options.fields[field].container || this.options.container) ? (this.options.fields[field].container || this.options.container).call(this, $field, this) : this.options.fields[field].container || this.options.container;

          // 得到错误消息容器Jq对象
          let $message = container && container !== 'tooltip' && container !== 'popover' ? $$1(container) : this.#getMessageContainer($field, group);

          //给它加上一个.has-error 类  来自https://getbootstrap.com/docs/3.4/css/#forms
          if (container && container !== 'tooltip' && container !== 'popover') {
            $message.addClass('has-error');
          }

          // 删除所有错误消息和反馈图标
          $message.find('.help-block[data-bv-validator][data-bv-for="' + field + '"]').remove();
          $parent.find('i[data-bv-icon-for="' + field + '"]').remove();

          // 每当用户更改字段值时，将其标记为尚未验证(比如手动修改input的内容时)
          $field.off(events).on(events, function () {
            console.log('input被输入了触发 |' + events + '|that.updateStatus($(this), that.STATUS_NOT_VALIDATED)');
            that.updateStatus($$1(this), that.STATUS_NOT_VALIDATED);
          });

          // 创建用于显示错误消息的帮助块元素
          $field.data('bv.messages', $message);
          Object.keys(this.options.fields[field].validators).forEach(validatorName => {
            $field.data('bv.result.' + validatorName, this.STATUS_NOT_VALIDATED);
            if (!updateAll || index === total - 1) {
              $$1('<small/>').css('display', 'none').addClass('help-block').attr('data-bv-validator', validatorName).attr('data-bv-for', field).attr('data-bv-result', this.STATUS_NOT_VALIDATED).html(this.#getMessage(field, validatorName)).appendTo($message);
            }

            // 初始化验证器,当验证器有init方法的时候，调用init方法
            if ('function' === typeof $$1.fn.bootstrapValidation.validators[validatorName].init) {
              $$1.fn.bootstrapValidation.validators[validatorName].init(this, $field, this.options.fields[field].validators[validatorName]);
            }
          });

          // 准备反馈图标
          // 可以从Bootstrap3.1获取 (http://getbootstrap.com/css/#forms-control-validation)
          if (this.options.fields[field].feedbackIcons !== false && this.options.fields[field].feedbackIcons !== 'false' && this.options.feedbackIcons && this.options.feedbackIcons.validating && this.options.feedbackIcons.invalid && this.options.feedbackIcons.valid && (!updateAll || index === total - 1)) {
            // $parent.removeClass('has-success').removeClass('has-error').addClass('has-feedback');
            // 保留从后端填充的错误消息
            $parent.addClass('has-feedback'); //字段元素容器，再添加一个类 https://getbootstrap.com/docs/3.4/css/#forms

            //在字段元素后面插入这个反馈图标容器 i元素
            let $icon = $$1('<i/>').css('display', 'none').addClass('form-control-feedback').attr('data-bv-icon-for', field).insertAfter($field);

            // 对于复选框和单选框的错误图标要特殊处理
            if ('checkbox' === type || 'radio' === type) {
              //这里得到的是label标签
              let $fieldParent = $field.parent();
              if ($fieldParent.hasClass(type)) {
                //如果有类 比如 class="checkbox"
                $icon.insertAfter($fieldParent); //直接在后面插入
              } else if ($fieldParent.parent().hasClass(type)) {
                //否则判断父类的父类是否有 比如 class="checkbox"
                $icon.insertAfter($fieldParent.parent()); //有的话插入到父类的父类的后面。
              }
            }

            // 如果没有标签，反馈图标将无法正确渲染
            // https://github.com/twbs/bootstrap/issues/12873
            if ($parent.find('label').length === 0) {
              $icon.addClass('bv-no-label');
            }
            // 如果是输入框组的话 反馈图标还要再特殊处理
            if ($parent.find('.input-group').length !== 0) {
              $icon.addClass('bv-icon-input-group').insertAfter($parent.find('.input-group').eq(0));
            }

            // console.log(updateAll);

            // 将图标存储为字段元素的数据
            if (!updateAll) {
              //不是单选或者复选
              console.log($field);
              $field.data('bv.icon', $icon);
            } else if (index === total - 1) {
              //目前只会走这里 下面还有公共api，等等看看会不会走上面
              // 具有相同名称的所有字段都具有相同的图标
              fields.data('bv.icon', $icon);
            }
            if (container) {
              //如果有传递错误消息容器
              $field
              // 当字段获得焦点时显示工具提示/弹出消息
              .off('focus.container.bv').on('focus.container.bv', function () {
                console.log(container);
                switch (container) {
                  //根据错误消息容器，判断是那一种
                  case 'tooltip':
                    $$1(this).data('bv.icon').tooltip('show');
                    break;
                  case 'popover':
                    $$1(this).data('bv.icon').popover('show');
                    break;
                }
              })
              // 并在失去焦点时隐藏它们
              .off('blur.container.bv').on('blur.container.bv', function () {
                switch (container) {
                  case 'tooltip':
                    $$1(this).data('bv.icon').tooltip('hide');
                    break;
                  case 'popover':
                    $$1(this).data('bv.icon').popover('hide');
                    break;
                }
              });
            }
          }
        });

        // 准备事件
        fields.on(this.options.events.fieldSuccess, function (e, data) {
          let onSuccess = that.getOptions(data.field, null, 'onSuccess');
          if (onSuccess) {
            Utils.call(onSuccess, [e, data]);
          }
        }).on(this.options.events.fieldError, function (e, data) {
          let onError = that.getOptions(data.field, null, 'onError');
          if (onError) {
            Utils.call(onError, [e, data]);
          }
        }).on(this.options.events.fieldStatus, function (e, data) {
          let onStatus = that.getOptions(data.field, null, 'onStatus');
          if (onStatus) {
            Utils.call(onStatus, [e, data]);
          }
        }).on(this.options.events.validatorError, function (e, data) {
          let onError = that.getOptions(data.field, data.validator, 'onError');
          if (onError) {
            Utils.call(onError, [e, data]);
          }
        }).on(this.options.events.validatorSuccess, function (e, data) {
          let onSuccess = that.getOptions(data.field, data.validator, 'onSuccess');
          if (onSuccess) {
            Utils.call(onSuccess, [e, data]);
          }
        });

        // 设置实时模式
        events = $$1.map(trigger, function (item) {
          return item + '.live.bv';
        }).join(' ');

        // console.log(events)

        switch (this.options.live) {
          //判断验证模式
          case 'submitted':
            break;
          case 'disabled':
            fields.off(events);
            break;
          case 'enabled':
          /* falls through */
          default:
            // console.log(fields)
            fields.off(events).on(events, function () {
              if (that.#exceedThreshold($$1(this))) {
                //检测是否超过阈值
                that.validateField($$1(this));
              }
            });
            break;
        }
        fields.trigger($$1.Event(this.options.events.fieldInit), {
          bv: this,
          field: field,
          element: fields
        });
      }

      /**
       * 获取用于放置错误消息的元素
       *
       * @param {jQuery} $field 字段元素
       * @param {String} group
       * @returns {jQuery}
       */
      #getMessageContainer($field, group) {
        let $parent = $field.parent();
        if ($parent.is(group)) {
          return $parent;
        }
        let cssClasses = $parent.attr('class');
        if (!cssClasses) {
          return this.#getMessageContainer($parent, group);
        }
        cssClasses = cssClasses.split(' ');
        let n = cssClasses.length;
        for (let i = 0; i < n; i++) {
          if (/^col-(xs|sm|md|lg)-\d+$/.test(cssClasses[i]) || /^col-(xs|sm|md|lg)-offset-\d+$/.test(cssClasses[i])) {
            return $parent;
          }
        }
        return this.#getMessageContainer($parent, group);
      }

      /**
       * 获取给定字段和验证器的错误消息
       *
       * @param {String} field 字段名
       * @param {String} validatorName validator名称
       * @returns {String}
       */
      #getMessage(field, validatorName) {
        if (!this.options.fields[field] || !$$1.fn.bootstrapValidation.validators[validatorName] || !this.options.fields[field].validators || !this.options.fields[field].validators[validatorName]) {
          return '';
        }
        let options = this.options.fields[field].validators[validatorName];
        switch (true) {
          case !!options.message:
            return options.message;
          case !!this.options.fields[field].message:
            return this.options.fields[field].message;
          case !!$$1.fn.bootstrapValidation.i18n[validatorName]:
            return $$1.fn.bootstrapValidation.i18n[validatorName]['default'];
          default:
            return this.options.message;
        }
      }

      /**
       * 检查该字段是否已排除。
       * 返回true表示该字段将不被验证
       *
       * @param {jQuery} $field 字段元素
       * @returns {Boolean}
       */
      #isExcluded($field) {
        let excludedAttr = $field.attr('data-bv-excluded'),
          // I still need to check the 'name' attribute while initializing the field
          field = $field.attr('data-bv-field') || $field.attr('name');
        switch (true) {
          case !!field && this.options.fields && this.options.fields[field] && (this.options.fields[field].excluded === 'true' || this.options.fields[field].excluded === true):
          case excludedAttr === 'true':
          case excludedAttr === '':
            return true;
          case !!field && this.options.fields && this.options.fields[field] && (this.options.fields[field].excluded === 'false' || this.options.fields[field].excluded === false):
          case excludedAttr === 'false':
            return false;
          default:
            if (this.options.excluded) {
              // Convert to array first
              if ('string' === typeof this.options.excluded) {
                this.options.excluded = $$1.map(this.options.excluded.split(','), function (item) {
                  // Trim the spaces
                  return $$1.trim(item);
                });
              }
              let length = this.options.excluded.length;
              for (let i = 0; i < length; i++) {
                if ('string' === typeof this.options.excluded[i] && $field.is(this.options.excluded[i]) || 'function' === typeof this.options.excluded[i] && this.options.excluded[i].call(this, $field, this) === true) {
                  return true;
                }
              }
            }
            return false;
        }
      }

      /**
       * 在验证字段元素后调用
       *
       * @param {jQuery} $field 字段元素
       * @param {String} [validatorName] 验证其名称
       */
      #onFieldValidated($field, validatorName) {
        let field = $field.attr('data-bv-field'),
          validators = this.options.fields[field].validators,
          counter = {},
          numValidators = 0,
          data = {
            bv: this,
            field: field,
            element: $field,
            validator: validatorName,
            result: $field.data('bv.response.' + validatorName)
          };

        // Trigger an event after given validator completes
        if (validatorName) {
          switch ($field.data('bv.result.' + validatorName)) {
            case this.STATUS_INVALID:
              $field.trigger($$1.Event(this.options.events.validatorError), data);
              break;
            case this.STATUS_VALID:
              $field.trigger($$1.Event(this.options.events.validatorSuccess), data);
              break;
          }
        }
        counter[this.STATUS_NOT_VALIDATED] = 0;
        counter[this.STATUS_VALIDATING] = 0;
        counter[this.STATUS_INVALID] = 0;
        counter[this.STATUS_VALID] = 0;
        for (let v in validators) {
          if (validators[v].enabled === false) {
            continue;
          }
          numValidators++;
          let result = $field.data('bv.result.' + v);
          if (result) {
            counter[result]++;
          }
        }
        if (counter[this.STATUS_VALID] === numValidators) {
          // Remove from the list of invalid fields
          this.$invalidFields = this.$invalidFields.not($field);
          $field.trigger($$1.Event(this.options.events.fieldSuccess), data);
        }
        // If all validators are completed and there is at least one validator which doesn't pass
        else if ((counter[this.STATUS_NOT_VALIDATED] === 0 || !this.#isOptionEnabled(field, 'verbose')) && counter[this.STATUS_VALIDATING] === 0 && counter[this.STATUS_INVALID] > 0) {
          // Add to the list of invalid fields
          this.$invalidFields = this.$invalidFields.add($field);
          $field.trigger($$1.Event(this.options.events.fieldError), data);
        }
      }

      /**
       * 检查字段选项是否已启用
       *
       * @param {String} field The field name
       * @param {String} option The option name, "verbose", "autoFocus", for example
       * @returns {Boolean}
       */
      #isOptionEnabled(field, option) {
        if (this.options.fields[field] && (this.options.fields[field][option] === 'true' || this.options.fields[field][option] === true)) {
          return true;
        }
        if (this.options.fields[field] && (this.options.fields[field][option] === 'false' || this.options.fields[field][option] === false)) {
          return false;
        }
        return this.options[option] === 'true' || this.options[option] === true;
      }

      /**
       * 检查字段值的字符数是否超过阈值
       *
       * @param {jQuery} $field 字段元素
       * @returns {Boolean}
       */
      #exceedThreshold($field) {
        let field = $field.attr('data-bv-field'),
          threshold = this.options.fields[field].threshold || this.options.threshold;
        if (!threshold) {
          return true;
        }
        let cannotType = $$1.inArray($field.attr('type'), ['button', 'checkbox', 'file', 'hidden', 'image', 'radio', 'reset', 'submit']) !== -1;
        return cannotType || $field.val().length >= threshold;
      }

      /**
       * 按给定名称检索字段元素
       *
       * @param {String} field 字段名称
       * @returns {null|jQuery[]}
       */
      getFieldElements(field) {
        if (!this.#cacheFields[field]) {
          this.#cacheFields[field] = this.options.fields[field] && this.options.fields[field].selector ? $$1(this.options.fields[field].selector) : this.$form.find('[name="' + field + '"]');
        }
        return this.#cacheFields[field];
      }

      /**
       * 更新字段的所有验证结果
       *
       * @param {String|jQuery} field 字段名称或字段元素
       * @param {String} status 状态。可以是“NOT_VALIDATED”、“VALIDATION”、“INVALID”或“VALID”
       * @param {String} [validatorName] 验证器名称。如果为null，该方法将更新所有验证器的有效性结果
       * @returns {BootstrapValidator}
       */
      updateStatus(field, status, validatorName) {
        // console.log(field)

        let fields = $$1([]);

        // console.log(typeof field)
        switch (typeof field) {
          case 'object':
            fields = field;
            field = field.attr('data-bv-field');
            break;
          case 'string':
            fields = this.getFieldElements(field);
            break;
        }
        if (status === this.STATUS_NOT_VALIDATED) {
          //如果传递进来的状态是无验证的。
          // 重置标志
          // 当延迟验证器在键入时返回true时，防止表单进行提交
          this.#submitIfValid = false;
        }

        //重新接受当前实例
        let that = this;
        //类型

        // console.log(fields)
        let type = fields.attr('type');
        // console.log(type)
        let group = this.options.fields[field].group || this.options.group;
        //如果是单选框或者多选框则长度为1，否则就取字段的长度。
        let total = 'radio' === type || 'checkbox' === type ? 1 : fields.length;

        // console.log(total)

        for (let i = 0; i < total; i++) {
          let $field = fields.eq(i);
          if (this.#isExcluded($field)) {
            //判断是否被排除的字段，如果是排除的字段，直接逃过这次循环。
            continue;
          }
          let $parent = $field.parents(group);
          let $message = $field.data('bv.messages');

          //直接通过属性选择器找到所有的错误信息包裹small
          let $allErrors = $message.find('.help-block[data-bv-validator][data-bv-for="' + field + '"]');

          //错误信息，判断验证器是否有传入，如果有传入则
          let $errors = validatorName ? $allErrors.filter('[data-bv-validator="' + validatorName + '"]') : $allErrors;
          let $icon = $field.data('bv.icon');
          let container = 'function' === typeof (this.options.fields[field].container || this.options.container) ? (this.options.fields[field].container || this.options.container).call(this, $field, this) : this.options.fields[field].container || this.options.container;
          let isValidField = null;

          // 更新状态
          if (validatorName) {
            //如果有验证器名称，就直接更新这一个
            $field.data('bv.result.' + validatorName, status);
          } else {
            //否则更新所有的。

            for (let v in this.options.fields[field].validators) {
              $field.data('bv.result.' + v, status);
            }
          }

          // 显示/隐藏错误元素和反馈图标
          $errors.attr('data-bv-result', status);

          // 确定包含元素的选项卡
          let $tabPane = $field.parents('.tab-pane');
          let tabId;
          let $tab;
          if ($tabPane && (tabId = $tabPane.attr('id'))) {
            $tab = $$1('a[href="#' + tabId + '"][data-toggle="tab"]').parent();
          }
          switch (status) {
            case this.STATUS_VALIDATING:
              //如果是正在验证的状态
              isValidField = null; //清空验证字段
              //禁用提交按钮
              this.disableSubmitButtons(true);
              $parent.removeClass('has-success').removeClass('has-error'); //移除成功或者错误的类
              if ($icon) {
                //移除成功和失败的图标，添加一个正在验证的类，并让这个icon显示
                $icon.removeClass(this.options.feedbackIcons.valid).removeClass(this.options.feedbackIcons.invalid).addClass(this.options.feedbackIcons.validating).show();
              }
              if ($tab) {
                //如果tab存在
                //移除所有的tab成功的类和tab失败的类
                $tab.removeClass('bv-tab-success').removeClass('bv-tab-error');
              }
              break;
            case this.STATUS_INVALID:
              //如果是验证失败的。
              isValidField = false; //是否验证的改成状态为false

              //禁用提交按钮
              this.disableSubmitButtons(true);
              $parent.removeClass('has-success').addClass('has-error'); //移除成功或者错误的类
              if ($icon) {
                //移除成功和失败的图标，添加一个正在验证的类，并让这个icon显示
                $icon.removeClass(this.options.feedbackIcons.valid).removeClass(this.options.feedbackIcons.validating).addClass(this.options.feedbackIcons.invalid).show();
              }
              if ($tab) {
                //移除所有的tab成功的类和tab失败的类
                $tab.removeClass('bv-tab-success').addClass('bv-tab-error');
              }
              break;
            case this.STATUS_VALID:
              // 如果字段有效（通过所有验证器）
              isValidField = $allErrors.filter('[data-bv-result="' + this.STATUS_NOT_VALIDATED + '"]').length === 0 ? $allErrors.filter('[data-bv-result="' + this.STATUS_VALID + '"]').length === $allErrors.length // 所有验证器已完成
              : null; // 有些验证器还没有完成
              if (isValidField !== null) {
                this.disableSubmitButtons(this.$submitButton ? !this.isValid() : !isValidField);
                if ($icon) {
                  $icon.removeClass(this.options.feedbackIcons.invalid).removeClass(this.options.feedbackIcons.validating).removeClass(this.options.feedbackIcons.valid).addClass(isValidField ? this.options.feedbackIcons.valid : this.options.feedbackIcons.invalid).show();
                }
              }
              $parent.removeClass('has-error has-success').addClass(this.isValidContainer($parent) ? 'has-success' : 'has-error');
              if ($tab) {
                $tab.removeClass('bv-tab-success').removeClass('bv-tab-error').addClass(this.isValidContainer($tabPane) ? 'bv-tab-success' : 'bv-tab-error');
              }
              break;
            case this.STATUS_NOT_VALIDATED:
            /* falls through */
            default:
              isValidField = null;
              this.disableSubmitButtons(false);
              $parent.removeClass('has-success').removeClass('has-error');
              if ($icon) {
                $icon.removeClass(this.options.feedbackIcons.valid).removeClass(this.options.feedbackIcons.invalid).removeClass(this.options.feedbackIcons.validating).hide();
              }
              if ($tab) {
                $tab.removeClass('bv-tab-success').removeClass('bv-tab-error');
              }
              break;
          }
          switch (true) {
            // Only show the first error message if it is placed inside a tooltip ...
            case $icon && 'tooltip' === container:
              isValidField === false ? $icon.css('cursor', 'pointer').tooltip('destroy').tooltip({
                container: 'body',
                html: true,
                placement: 'auto top',
                title: $allErrors.filter('[data-bv-result="' + that.STATUS_INVALID + '"]').eq(0).html()
              }) : $icon.css('cursor', '').tooltip('destroy');
              break;
            // ... or popover
            case $icon && 'popover' === container:
              isValidField === false ? $icon.css('cursor', 'pointer').popover('destroy').popover({
                container: 'body',
                content: $allErrors.filter('[data-bv-result="' + that.STATUS_INVALID + '"]').eq(0).html(),
                html: true,
                placement: 'auto top',
                trigger: 'hover click'
              }) : $icon.css('cursor', '').popover('destroy');
              break;
            default:
              status === this.STATUS_INVALID ? $errors.show() : $errors.hide();
              break;
          }

          // Trigger an event
          $field.trigger($$1.Event(this.options.events.fieldStatus), {
            bv: this,
            field: field,
            element: $field,
            status: status
          });
          this.#onFieldValidated($field, validatorName);
        }
        return this;
      }

      /**
       * 禁用/启用提交按钮
       *
       * @param {Boolean} disabled 可以是真的也可以是假的
       * @returns {BootstrapValidator}
       */
      disableSubmitButtons(disabled) {
        if (!disabled) {
          this.$form.find(this.options.submitButtons).removeAttr('disabled');
        } else if (this.options.live !== 'disabled') {
          // Don't disable if the live validating mode is disabled
          this.$form.find(this.options.submitButtons).attr('disabled', 'disabled');
        }
        return this;
      }

      /**
       * 获取字段选项
       *
       * @param {String|jQuery} [field] 字段名称或字段元素。如果未设置，该方法将返回表单选项
       * @param {String} [validator] 验证器的名称。如果为null，则该方法返回表单选项
       * @param {String} [option] 选项名称
       * @return {String|Object}
       */
      getOptions(field, validator, option) {
        if (!field) {
          return option ? this.options[option] : this.options;
        }
        if ('object' === typeof field) {
          field = field.attr('data-bv-field');
        }
        if (!this.options.fields[field]) {
          return null;
        }
        let options = this.options.fields[field];
        if (!validator) {
          return option ? options[option] : options;
        }
        if (!options.validators || !options.validators[validator]) {
          return null;
        }
        return option ? options.validators[validator][option] : options.validators[validator];
      }

      /**
       * 验证给定字段
       *
       * @param {String|jQuery} field 字段名称或字段元素
       * @returns {BootstrapValidator}
       */
      validateField(field) {
        let fields = $$1([]);
        switch (typeof field) {
          case 'object':
            fields = field;
            field = field.attr('data-bv-field');
            break;
          case 'string':
            fields = this.getFieldElements(field);
            break;
        }
        if (fields.length === 0 || !this.options.fields[field] || this.options.fields[field].enabled === false) {
          return this;
        }
        let that = this,
          type = fields.attr('type'),
          total = 'radio' === type || 'checkbox' === type ? 1 : fields.length,
          updateAll = 'radio' === type || 'checkbox' === type,
          validators = this.options.fields[field].validators,
          verbose = this.#isOptionEnabled(field, 'verbose'),
          validatorName,
          validateResult;
        for (let i = 0; i < total; i++) {
          let $field = fields.eq(i);
          if (this.#isExcluded($field)) {
            continue;
          }
          let stop = false;
          for (validatorName in validators) {
            if ($field.data('bv.dfs.' + validatorName)) {
              $field.data('bv.dfs.' + validatorName).reject();
            }
            if (stop) {
              break;
            }

            // Don't validate field if it is already done
            let result = $field.data('bv.result.' + validatorName);
            if (result === this.STATUS_VALID || result === this.STATUS_INVALID) {
              this.#onFieldValidated($field, validatorName);
              continue;
            } else if (validators[validatorName].enabled === false) {
              this.updateStatus(updateAll ? field : $field, this.STATUS_VALID, validatorName);
              continue;
            }
            $field.data('bv.result.' + validatorName, this.STATUS_VALIDATING);
            validateResult = $$1.fn.bootstrapValidation.validators[validatorName].validate(this, $field, validators[validatorName]);

            // validateResult can be a $.Deferred object ...
            if ('object' === typeof validateResult && validateResult.resolve) {
              this.updateStatus(updateAll ? field : $field, this.STATUS_VALIDATING, validatorName);
              $field.data('bv.dfs.' + validatorName, validateResult);
              validateResult.done(function ($f, v, response) {
                // v is validator name
                $f.removeData('bv.dfs.' + v).data('bv.response.' + v, response);
                if (response.message) {
                  that.updateMessage($f, v, response.message);
                }
                that.updateStatus(updateAll ? $f.attr('data-bv-field') : $f, response.valid ? that.STATUS_VALID : that.STATUS_INVALID, v);
                if (response.valid && that.#submitIfValid === true) {
                  // If a remote validator returns true and the form is ready to submit, then do it
                  that._submit();
                } else if (!response.valid && !verbose) {
                  stop = true;
                }
              });
            }
            // ... or object { valid: true/false, message: 'dynamic message' }
            else if ('object' === typeof validateResult && validateResult.valid !== undefined && validateResult.message !== undefined) {
              $field.data('bv.response.' + validatorName, validateResult);
              this.updateMessage(updateAll ? field : $field, validatorName, validateResult.message);
              this.updateStatus(updateAll ? field : $field, validateResult.valid ? this.STATUS_VALID : this.STATUS_INVALID, validatorName);
              if (!validateResult.valid && !verbose) {
                break;
              }
            }
            // ... or a boolean value
            else if ('boolean' === typeof validateResult) {
              $field.data('bv.response.' + validatorName, validateResult);
              this.updateStatus(updateAll ? field : $field, validateResult ? this.STATUS_VALID : this.STATUS_INVALID, validatorName);
              if (!validateResult && !verbose) {
                break;
              }
            }
          }
        }
        return this;
      }

      /**
       * 检查给定容器中的所有字段是否有效。
       * 当使用诸如选项卡、折叠之类的向导时，它很有用
       *
       * @param {String|jQuery} container 容器选择器或元素
       * @returns {Boolean}
       */
      isValidContainer(container) {
        let that = this,
          map = {},
          $container = 'string' === typeof container ? $$1(container) : container;
        if ($container.length === 0) {
          return true;
        }
        $container.find('[data-bv-field]').each(function () {
          let $field = $$1(this),
            field = $field.attr('data-bv-field');
          if (!that.#isExcluded($field) && !map[field]) {
            map[field] = $field;
          }
        });
        for (let field in map) {
          let $f = map[field];
          if ($f.data('bv.messages').find('.help-block[data-bv-validator][data-bv-for="' + field + '"]').filter('[data-bv-result="' + this.STATUS_INVALID + '"]').length > 0) {
            return false;
          }
        }
        return true;
      }

      /**
       * 更新错误消息
       *
       * @param {String|jQuery} field 字段名称或字段元素
       * @param {String} validator 验证器名称
       * @param {String} message 消息
       * @returns {BootstrapValidator}
       */
      updateMessage(field, validator, message) {
        let $fields = $$1([]);
        switch (typeof field) {
          case 'object':
            $fields = field;
            field = field.attr('data-bv-field');
            break;
          case 'string':
            $fields = this.getFieldElements(field);
            break;
        }
        $fields.each(function () {
          $$1(this).data('bv.messages').find('.help-block[data-bv-validator="' + validator + '"][data-bv-for="' + field + '"]').html(message);
        });
      }

      /**
       * 验证表单
       *
       * @returns {BootstrapValidator}
       */
      validate() {
        if (!this.options.fields) {
          return this;
        }
        this.disableSubmitButtons(true);
        this.#submitIfValid = false;
        for (let field in this.options.fields) {
          this.validateField(field);
        }
        this._submit();
        this.#submitIfValid = true;
        return this;
      }

      /**
       * 在完成所有验证时调用
       */
      _submit() {
        let isValid = this.isValid(),
          eventType = isValid ? this.options.events.formSuccess : this.options.events.formError,
          e = $$1.Event(eventType);
        this.$form.trigger(e);

        // Call default handler
        // Check if whether the submit button is clicked
        if (this.$submitButton) {
          isValid ? this.#onSuccess(e) : this.#onError(e);
        }
      }

      /**
       * 检查表格有效性
       *
       * @returns {Boolean}
       */
      isValid() {
        for (let field in this.options.fields) {
          if (!this.isValidField(field)) {
            return false;
          }
        }
        return true;
      }

      /**
       * 检查字段是否有效
       *
       * @param {String|jQuery} field 字段名称或字段元素
       * @returns {Boolean}
       */
      isValidField(field) {
        let fields = $$1([]);
        switch (typeof field) {
          case 'object':
            fields = field;
            field = field.attr('data-bv-field');
            break;
          case 'string':
            fields = this.getFieldElements(field);
            break;
        }
        if (fields.length === 0 || !this.options.fields[field] || this.options.fields[field].enabled === false) {
          return true;
        }
        let type = fields.attr('type'),
          total = 'radio' === type || 'checkbox' === type ? 1 : fields.length,
          $field,
          validatorName,
          status;
        for (let i = 0; i < total; i++) {
          $field = fields.eq(i);
          if (this.#isExcluded($field)) {
            continue;
          }
          for (validatorName in this.options.fields[field].validators) {
            if (this.options.fields[field].validators[validatorName].enabled === false) {
              continue;
            }
            status = $field.data('bv.result.' + validatorName);
            if (status !== this.STATUS_VALID) {
              return false;
            }
          }
        }
        return true;
      }

      /**
       * error.form.bv事件的默认处理程序。
       * 当存在无效字段时将调用它
       *
       * @param {jQuery.Event} e jquery的事件对象
       */
      #onError(e) {
        if (e.isDefaultPrevented()) {
          return;
        }
        if ('submitted' === this.options.live) {
          // Enable live mode
          this.options.live = 'enabled';
          let that = this;
          for (let field in this.options.fields) {
            (function (f) {
              let fields = that.getFieldElements(f);
              if (fields.length) {
                let type = $$1(fields[0]).attr('type'),
                  event = 'radio' === type || 'checkbox' === type || 'file' === type || 'SELECT' === $$1(fields[0]).get(0).tagName ? 'change' : that.#changeEvent,
                  trigger = that.options.fields[field].trigger || that.options.trigger || event,
                  events = $$1.map(trigger.split(' '), function (item) {
                    return item + '.live.bv';
                  }).join(' ');
                fields.off(events).on(events, function () {
                  if (that.#exceedThreshold($$1(this))) {
                    that.validateField($$1(this));
                  }
                });
              }
            })(field);
          }
        }

        // Determined the first invalid field which will be focused on automatically
        for (let i = 0; i < this.$invalidFields.length; i++) {
          let $field = this.$invalidFields.eq(i),
            autoFocus = this.#isOptionEnabled($field.attr('data-bv-field'), 'autoFocus');
          if (autoFocus) {
            // Activate the tab containing the field if exists
            let $tabPane = $field.parents('.tab-pane'),
              tabId;
            if ($tabPane && (tabId = $tabPane.attr('id'))) {
              $$1('a[href="#' + tabId + '"][data-toggle="tab"]').tab('show');
            }

            // Focus the field
            $field.focus();
            break;
          }
        }
      }

      /**
       * success.form.bv事件的默认处理程序。
       * 当所有字段都有效时，将调用它
       *
       * @param {jQuery.Event} e jquery的事件对象
       */
      #onSuccess(e) {
        if (e.isDefaultPrevented()) {
          return;
        }

        // 让按钮被禁用
        this.disableSubmitButtons(true);

        // 使用默认的提交方式提交
        this.defaultSubmit();
      }

      /**
       * 使用默认提交方式提交表单。
       * 它在提交表单时也不执行任何验证
       */
      defaultSubmit() {
        if (this.$submitButton) {
          // Create hidden input to send the submit buttons
          $$1('<input/>').attr('type', 'hidden').attr('data-bv-submit-hidden', '').attr('name', this.$submitButton.attr('name')).val(this.$submitButton.val()).appendTo(this.$form);
        }

        // Submit form
        this.$form.off('submit.bv').submit();
      }
    }
    BootstrapValidation.VERSION = Constants.VERSION;
    BootstrapValidation.DEFAULTS = Constants.DEFAULTS;

    /**
     * jQuery API
     * ====================================================
     */
    $$1.fn[NAME] = function (option) {
      //获取参数
      let params = arguments;
      return this.each(function () {
        let $this = $$1(this);
        let data = $this.data('bootstrapValidation');

        //选项合并
        let options = $$1.extend({}, $$1.fn.bootstrapValidation.defaults, 'object' === typeof option && option);
        if (!data) {
          data = new BootstrapValidation(this, options);
          $this.data('bootstrapValidation', data);
        }
        if ('string' === typeof option) {
          if (typeof data[option] !== 'function') {
            throw new Error(`Unknown method: ${option}`);
          }
          data[option].apply(data, Array.prototype.slice.call(params, 1));
        }
      });
    };
    $$1.fn[NAME].Constructor = BootstrapValidation;
    $$1.fn[NAME].VERSION = Constants.VERSION;
    $$1.fn[NAME].defaults = BootstrapValidation.DEFAULTS;
    $$1.fn[NAME].validators = Rules;
    $$1.fn[NAME].i18n = {};
    $$1.fn[NAME].utils = Utils;

    return BootstrapValidation;

}));
//# sourceMappingURL=bootstrap-validation.js.map
