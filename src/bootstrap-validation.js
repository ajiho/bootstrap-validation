import $ from 'jquery'
import Constants from "./constants";
import Utils from "./utils";
import Rules from "./rules";


class BootstrapValidation {
    constructor(el, options) {
        this.options = options
        this.$form = $(el)

        //无效字段
        this.$invalidFields = $([]);    // 无效字段数组

        //提交按钮
        this.$submitButton = null;     // 单击以提交表单的提交按钮
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

        // 确定用户更改字段值时激发的事件
        this._changeEvent = 'input';

        // 当远程/回调验证器返回时，指示表单已准备好提交的标志
        this._submitIfValid = null;

        // 缓存的字段元素
        this._cacheFields = {};

        //调用初始化方法
        this._init();

    }

    /**
     * 初始化表单
     */
    _init() {

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
                e.preventDefault();//首先禁用默认提交事件
                that.validate();//调用验证的方法
            })
            //事件委托给 提交按钮 绑定一个点击事件
            .on('click.bv', this.options.submitButtons, function () {

                //得到 $submitButton
                that.$submitButton = $(this);
                // 用户点击提交按钮后，让提交有效标志设置为真
                that._submitIfValid = true;


            })
            // 查找具有name或data-bv-field属性的所有字段(就是每个表单元素，比如 input等、select等)
            .find('[name], [data-bv-field]')
            //遍历操作
            .each(function () {
                //得到表单字段元素的jquery对象
                let $field = $(this);
                //这里是得到所有的字段名称，分别从name或者data-bv-field读取
                let field = $field.attr('name') || $field.attr('data-bv-field');
                //调用方法，从HTML属性分析验证器选项
                let opts = that._parseOptions2($field);

                if (opts) {
                    //给每个表单字段元素设置data-bv-field="xxxx"
                    //例子<input type="email" name="email" className="form-control" id="exampleInputEmail1" placeholder="Email" data-bv-field="email">
                    $field.attr('data-bv-field', field);
                    //只合并到options.fields 这个对象选项上，其它的选项是不会动的
                    options.fields[field] = $.extend({}, opts, options.fields[field]);
                }
            });


        //合并大选项(到这里已经包括了field字段，但这里仅仅是只有field)
        this.options = $.extend(true, this.options, options);

        console.log('这里已经合并了默认选项，和插件初始化时传递过来的所有选项')
        console.log(this.options)


        // 当在表单中的任何字段上按Enter键时，第一个提交按钮将完成其工作
        // 然后表单将会提交
        // 我创建了第一个隐藏的提交按钮
        this.$hiddenButton = $('<button/>')
            .attr('type', 'submit')
            .prependTo(this.$form)
            .addClass('bv-hidden-submit')
            .css({display: 'none', width: 0, height: 0});

        //再次通过事件委托的方式监听提交按钮被点击后触发事件。
        this.$form
            .on('click.bv', '[type="submit"]', function (e) {


                //e.isDefaultPrevented() 用来判断 用于检测事件是否已经调用 event.preventDefault() 阻止了默认行为。如果事件调用了 event.preventDefault() 方法，则 e.isDefaultPrevented() 返回 true，否则返回 false
                // e.isDefaultPrevented() 可以用来判断是否执行了默认行为的阻止操作
                // #746: 检查按钮单击处理程序是否返回false
                if (!e.isDefaultPrevented()) {//没有阻止默认事件，因为如果用户自己阻止了默认提交事件，我们这里就不能强制让它手动提交了。
                    // console.log('!isDefaultPrevented()')
                    let $target = $(e.target);
                    // 按钮可能包含HTML标记，比如按钮内部或者外部有其它的html包裹，所以需要我们判断一下。
                    let $button = $target.is('[type="submit"]') ? $target.eq(0) : $target.parent('[type="submit"]').eq(0);

                    // 单击提交按钮/输入时不执行验证
                    // 判断该按钮不是submitButtons定义的且也不是我们自己生成的hiddenButton
                    if (that.options.submitButtons && !$button.is(that.options.submitButtons) && !$button.is(that.$hiddenButton)) {
                        that.$form.off('submit.bv').submit();//模拟表单提交然后移除掉自定义绑定的事件
                    }
                }
            });

        //循环初始化每个字段
        for (const field in this.options.fields) {
            //初始化字段
            this._initField(field);
        }

        //触发表单初始化完成事件
        // console.log(this.options.events.formInit)
        this.$form.trigger($.Event(this.options.events.formInit), {
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
    _parseOptions2($field) {
        const field = $field.attr('name') || $field.attr('data-bv-field');
        let validators = {};
        let validator;

        for (const v in $.fn.bootstrapValidation.validators) {
            validator = $.fn.bootstrapValidation.validators[v];
            const attrName = `data-bv-${v.toLowerCase()}`;
            let enabled = $field.attr(attrName) + '';
            const html5AttrMap = typeof validator.enableByHtml5 === 'function' ? validator.enableByHtml5($field) : null;

            if ((html5AttrMap && enabled !== 'false') || (html5AttrMap !== true && (enabled === '' || enabled === 'true' || attrName === enabled.toLowerCase()))) {
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

        const emptyOptions = $.isEmptyObject(opts);
        const emptyValidators = $.isEmptyObject(validators);

        if (!emptyValidators || (!emptyOptions && this.options.fields && this.options.fields[field])) {
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
    _initField(field) {
        //创建一个空的 jQuery 集合，用于存储和管理元素
        let fields = $([]);

        // console.log(fields)

        // console.log(typeof field)
        switch (typeof field) {
            case 'object': //如果传递过来的直接是一个字段元素就直接给fields赋值
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
            default:
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
            if (!$.fn.bootstrapValidation.validators[validatorName]) {
                delete this.options.fields[field].validators[validatorName];
            }
        });


        //this.options.fields[field].enabled 可是这里会等于undefined,估计是作者的bug
        if (this.options.fields[field].enabled === null) {//判断每个字段上对象上的enabled是否等于null，等于null则设定为true
            console.log('into');
            this.options.fields[field].enabled = true;
        }


        let that = this;

        //字段元素的长度
        let total = fields.length;


        //获取类型，可能是 text radio checkbox
        let type = fields.attr('type');


        // 判断字段元素类型为radio或者checkbox
        let updateAll = (total === 1) || ('radio' === type) || ('checkbox' === type);//这里目前是永远都等于true


        // 事件类型判断，如果是字段元素是 radio checkbox file SELECT 则用change事件，否则就调用 this._changeEvent
        let event = ('radio' === type || 'checkbox' === type || 'file' === type || 'SELECT' === fields.eq(0).get(0).tagName) ? 'change' : this._changeEvent;
        //得到字段上的 trigger字符串数组 ,['input']
        let trigger = (this.options.fields[field].trigger || this.options.trigger || event).split(' ');
        // console.log(trigger)

        // 得到 'input.update.bv'
        let events = $.map(trigger, function (item) {
            return item + '.update.bv';
        }).join(' ');


        fields.each((index, fieldElement) => {

            let $field = $(fieldElement);


            // 字段元素容器选择器
            let group = this.options.fields[field].group || this.options.group;
            // 字段元素容器jq对象
            let $parent = $field.parents(group);

            // 允许用户指示错误消息的显示位置,email: {container:'#errors',...}
            let container = ('function' === typeof (this.options.fields[field].container || this.options.container)) ? (this.options.fields[field].container || this.options.container).call(this, $field, this) : (this.options.fields[field].container || this.options.container);


            // 得到错误消息容器Jq对象
            let $message = (container && container !== 'tooltip' && container !== 'popover') ? $(container) : this._getMessageContainer($field, group);

            //给它加上一个.has-error 类  来自https://getbootstrap.com/docs/3.4/css/#forms
            if (container && container !== 'tooltip' && container !== 'popover') {
                $message.addClass('has-error');
            }

            // 删除所有错误消息和反馈图标
            $message.find('.help-block[data-bv-validator][data-bv-for="' + field + '"]').remove();
            $parent.find('i[data-bv-icon-for="' + field + '"]').remove();

            // 每当用户更改字段值时，将其标记为尚未验证(比如手动修改input的内容时)
            $field.off(events).on(events, function () {
                console.log('input被输入了触发 |' + events + '|that.updateStatus($(this), that.STATUS_NOT_VALIDATED)')
                that.updateStatus($(this), that.STATUS_NOT_VALIDATED);
            });

            // 创建用于显示错误消息的帮助块元素
            $field.data('bv.messages', $message);

            Object.keys(this.options.fields[field].validators).forEach(validatorName => {
                $field.data('bv.result.' + validatorName, this.STATUS_NOT_VALIDATED);

                if (!updateAll || index === total - 1) {
                    $('<small/>')
                        .css('display', 'none')
                        .addClass('help-block')
                        .attr('data-bv-validator', validatorName)
                        .attr('data-bv-for', field)
                        .attr('data-bv-result', this.STATUS_NOT_VALIDATED)
                        .html(this._getMessage(field, validatorName))
                        .appendTo($message);
                }


                // 初始化验证器,当验证器有init方法的时候，调用init方法
                if ('function' === typeof $.fn.bootstrapValidation.validators[validatorName].init) {
                    $.fn.bootstrapValidation.validators[validatorName].init(this, $field, this.options.fields[field].validators[validatorName]);
                }
            });


            // 准备反馈图标
            // 可以从Bootstrap3.1获取 (http://getbootstrap.com/css/#forms-control-validation)
            if (this.options.fields[field].feedbackIcons !== false && this.options.fields[field].feedbackIcons !== 'false'
                && this.options.feedbackIcons
                && this.options.feedbackIcons.validating && this.options.feedbackIcons.invalid && this.options.feedbackIcons.valid
                && (!updateAll || index === total - 1)) {
                // $parent.removeClass('has-success').removeClass('has-error').addClass('has-feedback');
                // 保留从后端填充的错误消息
                $parent.addClass('has-feedback'); //字段元素容器，再添加一个类 https://getbootstrap.com/docs/3.4/css/#forms

                //在字段元素后面插入这个反馈图标容器 i元素
                let $icon = $('<i/>')
                    .css('display', 'none')
                    .addClass('form-control-feedback')
                    .attr('data-bv-icon-for', field)
                    .insertAfter($field);

                // 对于复选框和单选框的错误图标要特殊处理
                if ('checkbox' === type || 'radio' === type) {

                    //这里得到的是label标签
                    let $fieldParent = $field.parent();

                    if ($fieldParent.hasClass(type)) {//如果有类 比如 class="checkbox"
                        $icon.insertAfter($fieldParent); //直接在后面插入
                    } else if ($fieldParent.parent().hasClass(type)) {//否则判断父类的父类是否有 比如 class="checkbox"
                        $icon.insertAfter($fieldParent.parent());//有的话插入到父类的父类的后面。
                    }
                }

                // 如果没有标签，反馈图标将无法正确渲染
                // https://github.com/twbs/bootstrap/issues/12873
                if ($parent.find('label').length === 0) {
                    $icon.addClass('bv-no-label');
                }
                // 如果是输入框组的话 反馈图标还要再特殊处理
                if ($parent.find('.input-group').length !== 0) {
                    $icon.addClass('bv-icon-input-group')
                        .insertAfter($parent.find('.input-group').eq(0));
                }

                // console.log(updateAll);

                // 将图标存储为字段元素的数据
                if (!updateAll) {//不是单选或者复选
                    console.log($field)
                    $field.data('bv.icon', $icon);
                } else if (index === total - 1) { //目前只会走这里 下面还有公共api，等等看看会不会走上面
                    // 具有相同名称的所有字段都具有相同的图标
                    fields.data('bv.icon', $icon);
                }

                if (container) {//如果有传递错误消息容器
                    $field
                        // 当字段获得焦点时显示工具提示/弹出消息
                        .off('focus.container.bv')
                        .on('focus.container.bv', function () {
                            console.log(container)
                            switch (container) {//根据错误消息容器，判断是那一种
                                case 'tooltip':
                                    $(this).data('bv.icon').tooltip('show');
                                    break;
                                case 'popover':
                                    $(this).data('bv.icon').popover('show');
                                    break;
                                default:
                                    break;
                            }
                        })
                        // 并在失去焦点时隐藏它们
                        .off('blur.container.bv')
                        .on('blur.container.bv', function () {
                            switch (container) {
                                case 'tooltip':
                                    $(this).data('bv.icon').tooltip('hide');
                                    break;
                                case 'popover':
                                    $(this).data('bv.icon').popover('hide');
                                    break;
                                default:
                                    break;
                            }
                        });
                }
            }
        })


        // 准备事件
        fields
            .on(this.options.events.fieldSuccess, function (e, data) {
                let onSuccess = that.getOptions(data.field, null, 'onSuccess');
                if (onSuccess) {

                    Utils.call(onSuccess, [e, data]);
                }
            })
            .on(this.options.events.fieldError, function (e, data) {
                let onError = that.getOptions(data.field, null, 'onError');
                if (onError) {
                    Utils.call(onError, [e, data]);
                }
            })
            .on(this.options.events.fieldStatus, function (e, data) {
                let onStatus = that.getOptions(data.field, null, 'onStatus');
                if (onStatus) {
                    Utils.call(onStatus, [e, data]);
                }
            })
            .on(this.options.events.validatorError, function (e, data) {
                let onError = that.getOptions(data.field, data.validator, 'onError');
                if (onError) {
                    Utils.call(onError, [e, data]);
                }
            })
            .on(this.options.events.validatorSuccess, function (e, data) {
                let onSuccess = that.getOptions(data.field, data.validator, 'onSuccess');
                if (onSuccess) {
                    Utils.call(onSuccess, [e, data]);
                }
            });

        // 设置实时模式
        events = $.map(trigger, function (item) {
            return item + '.live.bv';
        }).join(' ');

        // console.log(events)

        switch (this.options.live) {//判断验证模式
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
                    if (that._exceedThreshold($(this))) { //检测是否超过阈值
                        that.validateField($(this));
                    }
                });
                break;
        }

        fields.trigger($.Event(this.options.events.fieldInit), {
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
    _getMessageContainer($field, group) {
        let $parent = $field.parent();
        if ($parent.is(group)) {
            return $parent;
        }

        let cssClasses = $parent.attr('class');
        if (!cssClasses) {
            return this._getMessageContainer($parent, group);
        }

        cssClasses = cssClasses.split(' ');
        let n = cssClasses.length;
        for (let i = 0; i < n; i++) {
            if (/^col-(xs|sm|md|lg)-\d+$/.test(cssClasses[i]) || /^col-(xs|sm|md|lg)-offset-\d+$/.test(cssClasses[i])) {
                return $parent;
            }
        }

        return this._getMessageContainer($parent, group);
    }


    /**
     * 获取给定字段和验证器的错误消息
     *
     * @param {String} field 字段名
     * @param {String} validatorName validator名称
     * @returns {String}
     */
    _getMessage(field, validatorName) {
        if (!this.options.fields[field] || !$.fn.bootstrapValidation.validators[validatorName]
            || !this.options.fields[field].validators || !this.options.fields[field].validators[validatorName]) {
            return '';
        }

        let options = this.options.fields[field].validators[validatorName];
        switch (true) {
            case (!!options.message):
                return options.message;
            case (!!this.options.fields[field].message):
                return this.options.fields[field].message;
            case (!!$.fn.bootstrapValidation.i18n[validatorName]):
                return $.fn.bootstrapValidation.i18n[validatorName]['default'];
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
    _isExcluded($field) {
        let excludedAttr = $field.attr('data-bv-excluded'),
            // I still need to check the 'name' attribute while initializing the field
            field = $field.attr('data-bv-field') || $field.attr('name');

        switch (true) {
            case (!!field && this.options.fields && this.options.fields[field] && (this.options.fields[field].excluded === 'true' || this.options.fields[field].excluded === true)):
            case (excludedAttr === 'true'):
            case (excludedAttr === ''):
                return true;

            case (!!field && this.options.fields && this.options.fields[field] && (this.options.fields[field].excluded === 'false' || this.options.fields[field].excluded === false)):
            case (excludedAttr === 'false'):
                return false;

            default:
                if (this.options.excluded) {
                    // Convert to array first
                    if ('string' === typeof this.options.excluded) {
                        this.options.excluded = $.map(this.options.excluded.split(','), function (item) {
                            // Trim the spaces
                            return $.trim(item);
                        });
                    }

                    let length = this.options.excluded.length;
                    for (let i = 0; i < length; i++) {
                        if (('string' === typeof this.options.excluded[i] && $field.is(this.options.excluded[i]))
                            || ('function' === typeof this.options.excluded[i] && this.options.excluded[i].call(this, $field, this) === true)) {
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
    _onFieldValidated($field, validatorName) {
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
                    $field.trigger($.Event(this.options.events.validatorError), data);
                    break;
                case this.STATUS_VALID:
                    $field.trigger($.Event(this.options.events.validatorSuccess), data);
                    break;
                default:
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

            $field.trigger($.Event(this.options.events.fieldSuccess), data);
        }
        // If all validators are completed and there is at least one validator which doesn't pass
        else if ((counter[this.STATUS_NOT_VALIDATED] === 0 || !this._isOptionEnabled(field, 'verbose')) && counter[this.STATUS_VALIDATING] === 0 && counter[this.STATUS_INVALID] > 0) {
            // Add to the list of invalid fields
            this.$invalidFields = this.$invalidFields.add($field);

            $field.trigger($.Event(this.options.events.fieldError), data);
        }
    }


    /**
     * 检查字段选项是否已启用
     *
     * @param {String} field The field name
     * @param {String} option The option name, "verbose", "autoFocus", for example
     * @returns {Boolean}
     */
    _isOptionEnabled(field, option) {
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
    _exceedThreshold($field) {
        let field = $field.attr('data-bv-field'),
            threshold = this.options.fields[field].threshold || this.options.threshold;
        if (!threshold) {
            return true;
        }
        let cannotType = $.inArray($field.attr('type'), ['button', 'checkbox', 'file', 'hidden', 'image', 'radio', 'reset', 'submit']) !== -1;
        return (cannotType || $field.val().length >= threshold);
    }


    /**
     * 按给定名称检索字段元素
     *
     * @param {String} field 字段名称
     * @returns {null|jQuery[]}
     */
    getFieldElements(field) {
        if (!this._cacheFields[field]) {
            this._cacheFields[field] = (this.options.fields[field] && this.options.fields[field].selector)
                ? $(this.options.fields[field].selector)
                : this.$form.find('[name="' + field + '"]');
        }
        return this._cacheFields[field];
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

        let fields = $([]);

        // console.log(typeof field)
        switch (typeof field) {
            case 'object':
                fields = field;
                field = field.attr('data-bv-field');
                break;
            case 'string':
                fields = this.getFieldElements(field);
                break;
            default:
                break;
        }

        if (status === this.STATUS_NOT_VALIDATED) {//如果传递进来的状态是无验证的。
            // 重置标志
            // 当延迟验证器在键入时返回true时，防止表单进行提交
            this._submitIfValid = false;
        }

        //重新接受当前实例
        let that = this;
        //类型

        // console.log(fields)
        let type = fields.attr('type');
        // console.log(type)
        let group = this.options.fields[field].group || this.options.group;
        //如果是单选框或者多选框则长度为1，否则就取字段的长度。
        let total = ('radio' === type || 'checkbox' === type) ? 1 : fields.length;

        // console.log(total)

        for (let i = 0; i < total; i++) {
            let $field = fields.eq(i);


            if (this._isExcluded($field)) {//判断是否被排除的字段，如果是排除的字段，直接逃过这次循环。
                continue;
            }

            let $parent = $field.parents(group);
            let $message = $field.data('bv.messages');

            //直接通过属性选择器找到所有的错误信息包裹small
            let $allErrors = $message.find('.help-block[data-bv-validator][data-bv-for="' + field + '"]');

            //错误信息，判断验证器是否有传入，如果有传入则
            let $errors = validatorName ? $allErrors.filter('[data-bv-validator="' + validatorName + '"]') : $allErrors;


            let $icon = $field.data('bv.icon');
            let container = ('function' === typeof (this.options.fields[field].container || this.options.container)) ? (this.options.fields[field].container || this.options.container).call(this, $field, this) : (this.options.fields[field].container || this.options.container);
            let isValidField = null;

            // 更新状态
            if (validatorName) {//如果有验证器名称，就直接更新这一个
                $field.data('bv.result.' + validatorName, status);
            } else {//否则更新所有的。

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
                $tab = $('a[href="#' + tabId + '"][data-toggle="tab"]').parent();
            }

            switch (status) {
                case this.STATUS_VALIDATING://如果是正在验证的状态
                    isValidField = null;//清空验证字段
                    //禁用提交按钮
                    this.disableSubmitButtons(true);
                    $parent.removeClass('has-success').removeClass('has-error');//移除成功或者错误的类
                    if ($icon) {//移除成功和失败的图标，添加一个正在验证的类，并让这个icon显示
                        $icon.removeClass(this.options.feedbackIcons.valid).removeClass(this.options.feedbackIcons.invalid).addClass(this.options.feedbackIcons.validating).show();
                    }
                    if ($tab) {//如果tab存在
                        //移除所有的tab成功的类和tab失败的类
                        $tab.removeClass('bv-tab-success').removeClass('bv-tab-error');
                    }
                    break;

                case this.STATUS_INVALID://如果是验证失败的。
                    isValidField = false;//是否验证的改成状态为false

                    //禁用提交按钮
                    this.disableSubmitButtons(true);
                    $parent.removeClass('has-success').addClass('has-error');//移除成功或者错误的类
                    if ($icon) {//移除成功和失败的图标，添加一个正在验证的类，并让这个icon显示
                        $icon.removeClass(this.options.feedbackIcons.valid).removeClass(this.options.feedbackIcons.validating).addClass(this.options.feedbackIcons.invalid).show();
                    }
                    if ($tab) {//移除所有的tab成功的类和tab失败的类
                        $tab.removeClass('bv-tab-success').addClass('bv-tab-error');
                    }
                    break;

                case this.STATUS_VALID:
                    // 如果字段有效（通过所有验证器）
                    isValidField = ($allErrors.filter('[data-bv-result="' + this.STATUS_NOT_VALIDATED + '"]').length === 0)
                        ? ($allErrors.filter('[data-bv-result="' + this.STATUS_VALID + '"]').length === $allErrors.length)  // 所有验证器已完成
                        : null;                                                                                            // 有些验证器还没有完成
                    if (isValidField !== null) {
                        this.disableSubmitButtons(this.$submitButton ? !this.isValid() : !isValidField);
                        if ($icon) {
                            $icon
                                .removeClass(this.options.feedbackIcons.invalid).removeClass(this.options.feedbackIcons.validating).removeClass(this.options.feedbackIcons.valid)
                                .addClass(isValidField ? this.options.feedbackIcons.valid : this.options.feedbackIcons.invalid)
                                .show();
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
                case ($icon && 'tooltip' === container):
                    (isValidField === false)
                        ? $icon.css('cursor', 'pointer').tooltip('destroy').tooltip({
                            container: 'body',
                            html: true,
                            placement: 'auto top',
                            title: $allErrors.filter('[data-bv-result="' + that.STATUS_INVALID + '"]').eq(0).html()
                        })
                        : $icon.css('cursor', '').tooltip('destroy');
                    break;
                // ... or popover
                case ($icon && 'popover' === container):
                    (isValidField === false)
                        ? $icon.css('cursor', 'pointer').popover('destroy').popover({
                            container: 'body',
                            content: $allErrors.filter('[data-bv-result="' + that.STATUS_INVALID + '"]').eq(0).html(),
                            html: true,
                            placement: 'auto top',
                            trigger: 'hover click'
                        })
                        : $icon.css('cursor', '').popover('destroy');
                    break;
                default:
                    (status === this.STATUS_INVALID) ? $errors.show() : $errors.hide();
                    break;
            }

            // Trigger an event
            $field.trigger($.Event(this.options.events.fieldStatus), {
                bv: this,
                field: field,
                element: $field,
                status: status
            });
            this._onFieldValidated($field, validatorName);
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
        let fields = $([]);
        switch (typeof field) {
            case 'object':
                fields = field;
                field = field.attr('data-bv-field');
                break;
            case 'string':
                fields = this.getFieldElements(field);
                break;
            default:
                break;
        }

        if (fields.length === 0 || !this.options.fields[field] || this.options.fields[field].enabled === false) {
            return this;
        }

        let that = this,
            type = fields.attr('type'),
            total = ('radio' === type || 'checkbox' === type) ? 1 : fields.length,
            updateAll = ('radio' === type || 'checkbox' === type),
            validators = this.options.fields[field].validators,
            verbose = this._isOptionEnabled(field, 'verbose'),
            validatorName,
            validateResult;

        for (let i = 0; i < total; i++) {
            let $field = fields.eq(i);
            if (this._isExcluded($field)) {
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
                    this._onFieldValidated($field, validatorName);
                    continue;
                } else if (validators[validatorName].enabled === false) {
                    this.updateStatus(updateAll ? field : $field, this.STATUS_VALID, validatorName);
                    continue;
                }

                $field.data('bv.result.' + validatorName, this.STATUS_VALIDATING);
                validateResult = $.fn.bootstrapValidation.validators[validatorName].validate(this, $field, validators[validatorName]);

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

                        if (response.valid && that._submitIfValid === true) {
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
            $container = ('string' === typeof container) ? $(container) : container;
        if ($container.length === 0) {
            return true;
        }

        $container.find('[data-bv-field]').each(function () {
            let $field = $(this),
                field = $field.attr('data-bv-field');
            if (!that._isExcluded($field) && !map[field]) {
                map[field] = $field;
            }
        });

        for (let field in map) {
            let $f = map[field];
            if ($f.data('bv.messages')
                .find('.help-block[data-bv-validator][data-bv-for="' + field + '"]')
                .filter('[data-bv-result="' + this.STATUS_INVALID + '"]')
                .length > 0) {
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
        let $fields = $([]);
        switch (typeof field) {
            case 'object':
                $fields = field;
                field = field.attr('data-bv-field');
                break;
            case 'string':
                $fields = this.getFieldElements(field);
                break;
            default:
                break;
        }

        $fields.each(function () {
            $(this).data('bv.messages').find('.help-block[data-bv-validator="' + validator + '"][data-bv-for="' + field + '"]').html(message);
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

        this._submitIfValid = false;
        for (let field in this.options.fields) {
            this.validateField(field);
        }

        this._submit();
        this._submitIfValid = true;

        return this;
    }

    /**
     * 在完成所有验证时调用
     */
    _submit() {
        let isValid = this.isValid(),
            eventType = isValid ? this.options.events.formSuccess : this.options.events.formError,
            e = $.Event(eventType);

        this.$form.trigger(e);

        // Call default handler
        // Check if whether the submit button is clicked
        if (this.$submitButton) {
            isValid ? this._onSuccess(e) : this._onError(e);
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
        let fields = $([]);
        switch (typeof field) {
            case 'object':
                fields = field;
                field = field.attr('data-bv-field');
                break;
            case 'string':
                fields = this.getFieldElements(field);
                break;
            default:
                break;
        }
        if (fields.length === 0 || !this.options.fields[field] || this.options.fields[field].enabled === false) {
            return true;
        }

        let type = fields.attr('type'),
            total = ('radio' === type || 'checkbox' === type) ? 1 : fields.length,
            $field, validatorName, status;
        for (let i = 0; i < total; i++) {
            $field = fields.eq(i);
            if (this._isExcluded($field)) {
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
    _onError(e) {
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
                        let type = $(fields[0]).attr('type'),
                            event = ('radio' === type || 'checkbox' === type || 'file' === type || 'SELECT' === $(fields[0]).get(0).tagName) ? 'change' : that._changeEvent,
                            trigger = that.options.fields[field].trigger || that.options.trigger || event,
                            events = $.map(trigger.split(' '), function (item) {
                                return item + '.live.bv';
                            }).join(' ');

                        fields.off(events).on(events, function () {
                            if (that._exceedThreshold($(this))) {
                                that.validateField($(this));
                            }
                        });
                    }
                })(field);
            }
        }

        // Determined the first invalid field which will be focused on automatically
        for (let i = 0; i < this.$invalidFields.length; i++) {
            let $field = this.$invalidFields.eq(i),
                autoFocus = this._isOptionEnabled($field.attr('data-bv-field'), 'autoFocus');
            if (autoFocus) {
                // Activate the tab containing the field if exists
                let $tabPane = $field.parents('.tab-pane'), tabId;
                if ($tabPane && (tabId = $tabPane.attr('id'))) {
                    $('a[href="#' + tabId + '"][data-toggle="tab"]').tab('show');
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
    _onSuccess(e) {
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
            $('<input/>')
                .attr('type', 'hidden')
                .attr('data-bv-submit-hidden', '')
                .attr('name', this.$submitButton.attr('name'))
                .val(this.$submitButton.val())
                .appendTo(this.$form);
        }

        // Submit form
        this.$form.off('submit.bv').submit();
    }

}


BootstrapValidation.VERSION = Constants.VERSION
BootstrapValidation.DEFAULTS = Constants.DEFAULTS


// 定义插件
$.fn.bootstrapValidation = function (option) {
    //获取参数
    let params = arguments;


    return this.each(function () {


        let $this = $(this);
        let data = $this.data('bootstrapValidation');

        //选项合并
        let options = $.extend({}, $.fn.bootstrapValidation.defaults, 'object' === typeof option && option);

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


$.fn.bootstrapValidation.Constructor = BootstrapValidation;
$.fn.bootstrapValidation.VERSION = Constants.VERSION
$.fn.bootstrapValidation.defaults = BootstrapValidation.DEFAULTS
$.fn.bootstrapValidation.validators = Rules;
$.fn.bootstrapValidation.i18n = {};
$.fn.bootstrapValidation.utils = Utils


export default BootstrapValidation;