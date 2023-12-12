import $ from 'jquery'
import Constants from './constants'
import Utils from './utils'
import Rules from './rules'

import popoverAction from './core/popoverAction'
import tooltipAction from './core/tooltipAction'

class BootstrapValidation {
  //表单jQ对象
  #$form

  //选项
  #options

  // 无效字段数组
  #$invalidFields = $([])

  //单击以提交表单的提交按钮
  #$submitButton

  //隐藏的按钮
  #$hiddenButton

  //验证状态(已经封装到常量里)

  //事件
  #changeEvent = 'input'

  //当远程/回调验证器返回时，指示表单已准备好提交的标志
  #submitIfValid

  //缓存字段
  #cacheFields = {}

  //静态变量
  static VERSION = Constants.VERSION
  static DEFAULTS = Constants.DEFAULTS

  constructor(el, options) {
    //这里的options是已经合并过默认选项的
    this.#options = options
    this.#$form = $(el)

    //初始化
    this.#init()
  }

  //初始化方法
  #init() {
    //保存this
    const that = this

    //从html属性上取一次参数
    let options = { ...that.#getOptionsfromHtml(), fields: {} }
    // console.log(options);

    that.#$form
      // 禁用HTML 5中的客户端验证
      .attr('novalidate', 'novalidate')
      //添加一个class
      .addClass(this.#options.elementClass)
      // 首先禁用默认提交
      .on('submit.bv', function (e) {
        e.preventDefault()

        //验证方法，先注释
        that.validate()
      })
      .on('click.bv', this.#options.submitButtons, function () {
        //保存提交按钮的JQ对象
        that.#$submitButton = $(this)
        // 用户只需点击提交按钮
        that.#submitIfValid = true
      })
      // 查找所有具有“name”或“data bv field”属性的字段
      .find('[name], [data-bv-field]')
      .each(function () {
        //得到该字段元素的jQuery对象。
        let $field = $(this)

        //从新获取字段
        let field = $field.attr('name') || $field.attr('data-bv-field')
        // console.log($field,field);

        let opts = that.#parseOptions($field)

        if (opts) {
          $field.attr('data-bv-field', field)
          options.fields[field] = $.extend({}, opts, options.fields[field])
        }
      })

    //合并最大的选项
    this.#options = $.extend(true, this.#options, options)
    // console.log(this.#options);

    //当在表单中的任何字段上按Enter键时，第一个提交按钮将完成其工作。
    //然后将提交表格。
    //我创建了第一个隐藏的提交按钮
    this.#$hiddenButton = $('<button/>')
      .attr('type', 'submit')
      .prependTo(this.#$form)
      .addClass('bv-hidden-submit')
      .css({ display: 'none', width: 0, height: 0 })

    this.#$form.on('click.bv', '[type="submit"]', function (e) {
      //e.isDefaultPrevented() 用来判断 用于检测事件是否已经调用 event.preventDefault() 阻止了默认行为。如果事件调用了 event.preventDefault() 方法，则 e.isDefaultPrevented() 返回 true，否则返回 false
      // e.isDefaultPrevented() 可以用来判断是否执行了默认行为的阻止操作
      // 检查按钮单击处理程序是否返回false
      if (!e.isDefaultPrevented()) {
        //没有阻止默认事件，因为如果用户自己阻止了默认提交事件，我们这里就不能强制让它手动提交了。

        const $target = $(e.target)
        // 按钮可能包含HTML标记
        const $button = $target.is('[type="submit"]')
          ? $target.eq(0)
          : $target.parent('[type="submit"]').eq(0)

        // 单击提交按钮/输入时不执行验证
        // 不是由“submitButtons”选项定义的
        if (
          that.#options.submitButtons &&
          !$button.is(that.#options.submitButtons) &&
          !$button.is(that.#$hiddenButton)
        ) {
          that.#$form.off('submit.bv').submit()
        }
      }
    })

    //循环初始化每个字段
    for (let field in this.#options.fields) {
      // console.log(field);
      this.#initField(field)
    }

    //插件初始化表单后触发
    this.#$form.trigger($.Event(this.#options.events.formInit), {
      bv: this,
      options: this.#options,
    })

    // 准备事件
    if (this.#options.onSuccess) {
      this.#$form.on(this.#options.events.formSuccess, function (e) {
        Utils.call(that.#options.onSuccess, [e])
      })
    }

    if (this.#options.onError) {
      this.#$form.on(this.#options.events.formError, function (e) {
        Utils.call(that.#options.onError, [e])
      })
    }
  }

  /**
   * 初始化字段
   * @param {String|jQuery} field  字段名称或字段元素
   */
  #initField(field) {
    //保存this
    let that = this

    let { fields, matchedField } = this.#getFields(field)
    field = matchedField

    // 这里有的字段提供的可能是这种有多个选择的单选框
    //   fields: {
    //     'hobby[]': {
    //         message: '这是无效的。',
    //         rules: {
    //             notEmpty: {
    //                 message: '必须选择一个，这里会覆盖上面的message的默认值。'
    //             },
    //         }
    //     }
    // }
    //  因为html可能是这样的。 注意 ：name="hobby[]"
    //     <div class="form-group">
    //     <label class="col-lg-3 control-label">爱好</label>
    //     <div class="col-lg-5">
    //         <div class="radio">
    //             <label>
    //                 <input type="radio" name="hobby[]" id="hobby1" value="option1">
    //                 跑步
    //             </label>
    //         </div>
    //         <div class="radio">
    //             <label>
    //                 <input type="radio" name="hobby[]" id="hobby2" value="option2">
    //                 篮球
    //             </label>
    //         </div>
    //         <div class="radio disabled">
    //             <label>
    //                 <input type="radio" name="hobby[]" id="hobby3" value="option3" disabled>
    //                 乒乓球
    //             </label>
    //         </div>
    //     </div>
    // </div>

    // 因此fields里面可能会包含多个type 为 radio 的 input的jQuery对象为下面的代码做铺垫。

    //我们不需要验证不存在的字段
    if (
      fields.length === 0 ||
      this.#options.fields[field] === null ||
      this.#options.fields[field].rules === null
    ) {
      return false
    }

    /**
     * 过滤选项上传递的一些不存在的验证规则
     * fields:{
     *  username:{
     *    rules:{
     *      notEmpty:{},
     *      notEmptyqqxx:{},//这种rule在 bootstrapValidation 内置的rules中 肯定是不存在的，需要把它过滤掉，避免无意义的循环
     *    }
     *  }
     * }
     */
    Object.keys(this.#options.fields[field].rules).forEach((ruleName) => {
      if (!$.fn[Constants.NAME].rules[ruleName]) {
        delete this.#options.fields[field].rules[ruleName]
      }
    })

    //是否启用字段的验证，没有设置默认给设置称true，true:表示开启。
    if (this.#options.fields[field].enabled === null) {
      this.#options.fields[field].enabled = true
    }

    //字段元素jQ集合的长度，上面已经解释过了。它不会总是等于1
    let total = fields.length

    // console.log(total);

    //获取类型
    let type = fields.attr('type')
    // console.log(type,field);

    //该判断是为了区分多个元素是否具有同样的name
    // <div class="form-group">
    //   <label class="col-lg-3 control-label">Editors</label>
    //   <div class="col-lg-5">
    //       <input class="form-control" type="text" name="editors[]" />
    //   </div>
    //   </div>
    //   <div class="form-group">
    //       <div class="col-lg-offset-3 col-lg-5">
    //           <input class="form-control" type="text" name="editors[]" />
    //       </div>
    //   </div>
    //   <div class="form-group">
    //       <div class="col-lg-offset-3 col-lg-5">
    //           <input class="form-control" type="text" name="editors[]" />
    //       </div>
    //   </div>
    //   <div class="form-group">
    //       <div class="col-lg-offset-3 col-lg-5">
    //           <input class="form-control" type="text" name="editors[]" />
    //       </div>
    //   </div>
    // 像上面这种结果该判断就会变成false
    let updateAll = total === 1 || 'radio' === type || 'checkbox' === type
    // console.log(updateAll,field);

    // 事件类型判断，如果是字段元素是 radio checkbox file SELECT 则用change事件，否则就调用 this.#changeEvent
    let event =
      'radio' === type ||
      'checkbox' === type ||
      'file' === type ||
      'SELECT' === fields.eq(0).get(0).tagName
        ? 'change'
        : this.#changeEvent
    //获取字段触发验证的事件，并生成数组 ['focus','blur']
    let trigger = (
      this.#options.fields[field].trigger ||
      this.#options.trigger ||
      event
    ).split(' ')
    // console.log(trigger)
    // 得到带有命名空间的事件 'focus.update.bv blur.update.bv',注意:这种格式的事件在jquery上也是可以触发的。
    let events = trigger
      .map((item) => {
        return item + '.update.bv'
      })
      .join(' ')

    for (let i = 0; i < total; i++) {
      //当前字段元素
      let $field = fields.eq(i)

      // 字段元素容器选择器,先从字段选项上的group开始取，如果没有则在大选项中取
      let group = this.#options.fields[field].group || this.#options.group

      //然后通过group参数取到jQuery对象
      let $parent = $field.parents(group)

      // 字段错误消息的容器,如果传递的选项是一个函数，则使用call方式调用。
      let container =
        'function' ===
        typeof (
          this.#options.fields[field].container || this.#options.container
        )
          ? (
              this.#options.fields[field].container || this.#options.container
            ).call(this, $field, this)
          : this.#options.fields[field].container || this.#options.container
      // 得到错误消息容器jQuery对象,如果container设置了且不等于tooltip和popover 那么就通过jQuery选择器查找元素,否则调用getMessageContainer()自动查找
      let $message =
        container && container !== 'tooltip' && container !== 'popover'
          ? $(container)
          : this.#getMessageContainer($field, group)

      //如果container为真，且不等于tooltip或者popover则给错误容器添加一个.has-error
      //#https://getbootstrap.com/docs/3.4/css/#forms-control-validation
      if (container && container !== 'tooltip' && container !== 'popover') {
        $message.addClass('has-error')
      }

      //删除所有错误消息和反馈图标
      $message
        .find('.help-block[data-bv-rule][data-bv-for="' + field + '"]')
        .remove()
      $parent.find('i[data-bv-icon-for="' + field + '"]').remove()

      // 每当用户更新字段值时，将其标记为尚未验证
      $field.off(events).on(events, function () {
        that.updateStatus($(this), Constants.STATUS_NOT_VALIDATED)
      })

      //保存错误消息容器到$field上
      $field.data('bv.messages', $message) //updateStatus要用

      for (let ruleName in this.#options.fields[field].rules) {
        //将所有的验证规则标记为未验证  bv.result.notEmpty bv.result.stringLength bv.result.emailAddress
        $field.data('bv.result.' + ruleName, Constants.STATUS_NOT_VALIDATED)

        //!updateAll：如果具有多个除了类型为radio，checkbox相同的name的字段元素时
        // || i === total - 1  如果类型是radio，checkbox 或者 total长度为1的字段元素 则等待外层循环到最后一次时再执行if内语句
        // 如果你这样有点不太好理解，可以换成这样
        // if (!updateAll) {
        //   $('<small/>')
        //     .css('display', 'none')
        //     .addClass('help-block')
        //     .attr('data-bv-rule', ruleName)
        //     .attr('data-bv-for', field)
        //     .attr('data-bv-result', Constants.STATUS_NOT_VALIDATED)
        //     .html(this.#getMessage(field, ruleName))
        //     .appendTo($message);
        // } else if (i === total - 1) { //这个判断是等待外层循环到最后一次时再执行
        //   $('<small/>')
        //     .css('display', 'none')
        //     .addClass('help-block')
        //     .attr('data-bv-rule', ruleName)
        //     .attr('data-bv-for', field)
        //     .attr('data-bv-result', Constants.STATUS_NOT_VALIDATED)
        //     .html(this.#getMessage(field, ruleName))
        //     .appendTo($message);
        // }
        if (!updateAll || i === total - 1) {
          $('<small/>')
            .css('display', 'none')
            .addClass('help-block')
            .attr('data-bv-rule', ruleName)
            .attr('data-bv-for', field)
            .attr('data-bv-result', Constants.STATUS_NOT_VALIDATED)
            .html(this.#getMessage(field, ruleName))
            .appendTo($message)
        }

        // 初始化验证器
        if ('function' === typeof $.fn[Constants.NAME].rules[ruleName].init) {
          //如果验证规则中 定义了init方法，那么调用它。
          $.fn[Constants.NAME].rules[ruleName].init(
            this,
            $field,
            this.options.fields[field].rules[ruleName],
          )
        }
      }

      //准备反馈图标
      // 可用图标 https://getbootstrap.com/docs/3.4/css/#forms-control-validation
      //该判断是先判断字段是否已经先设置图标，字段没有，那就从大选项中去找
      if (
        this.#options.fields[field].feedbackIcons !== false &&
        this.#options.fields[field].feedbackIcons !== 'false' &&
        this.#options.feedbackIcons &&
        this.#options.feedbackIcons.validating &&
        this.#options.feedbackIcons.invalid &&
        this.#options.feedbackIcons.valid &&
        (!updateAll || i === total - 1)
      ) {
        // $parent.removeClass('has-success').removeClass('has-error').addClass('has-feedback');

        // 如果是带有图标的设置，那么根据bootstrap3.x的官网可以得出结论，是需要在父级添加.has-feedback类的。
        //   <div class="form-group has-success has-feedback">
        //     <label class="control-label" for="inputGroupSuccess1">带成功状态的input-group</label>
        //     <div class="input-group">
        //         <span class="input-group-addon">@</span>
        //         <input type="text" class="form-control" id="inputGroupSuccess1"
        //             aria-describedby="inputGroupSuccess1Status">
        //     </div>
        //     <span class="glyphicon glyphicon-ok form-control-feedback" aria-hidden="true"></span>
        //     <span id="inputGroupSuccess1Status" class="sr-only">(success)</span>
        // </div>
        // 实际上就是给.form-group所在的元素添加一个.has-feedback
        $parent.addClass('has-feedback')

        //创建图标元素。插入到字段元素的后面$field
        let $icon = $('<i/>')
          .css('display', 'none')
          .addClass('form-control-feedback')
          .attr('data-bv-icon-for', field)
          .insertAfter($field)

        // console.log($icon);

        // 如果是单选框和复选框放在的容器后面
        // <div class="form-group">
        //   <label class="col-lg-3 control-label">爱好</label>
        //     <div class="col-lg-5">
        //         <div class="radio">
        //             <label>
        //                 <input type="radio" name="hobby[]" id="hobby1" value="option1">
        //                 跑步
        //             </label>
        //         </div>
        //         <div class="radio">
        //             <label>
        //                 <input type="radio" name="hobby[]" id="hobby2" value="option2">
        //                 篮球
        //             </label>
        //         </div>
        //         <div class="radio disabled">
        //             <label>
        //                 <input type="radio" name="hobby[]" id="hobby3" value="option3" disabled>
        //                 乒乓球
        //             </label>
        //         </div>
        //     </div>
        // </div>
        // $field其实就是上面的每一个input框 <input type="radio" name="hobby[]" id="hobby2" value="option2">
        if ('checkbox' === type || 'radio' === type) {
          let $fieldParent = $field.parent() //得到的是 <label>xxx</label>
          if ($fieldParent.hasClass(type)) {
            //既然得到的是<label>xxx</label> 那么它肯定是没有这个radio或者是chekcbox类(bootstrap的单选/复选设计如此)
            $icon.insertAfter($fieldParent) //如果有就直接插入到该字段元素的父级元素后面。
          } else if ($fieldParent.parent().hasClass(type)) {
            //进入该判断，则判断父级的父级是否有该类
            $icon.insertAfter($fieldParent.parent()) //有的话就插入到后面。
          }
        }

        // 如果没有标签，则反馈图标无法正确渲染
        // https://github.com/twbs/bootstrap/issues/12873
        if ($parent.find('label').length === 0) {
          $icon.addClass('bv-no-label')
        }

        // 修复输入组中的反馈图标
        if ($parent.find('.input-group').length !== 0) {
          $icon
            .addClass('bv-icon-input-group')
            .insertAfter($parent.find('.input-group').eq(0))
        }

        // 将图标存储为字段元素的数据
        if (!updateAll) {
          $field.data('bv.icon', $icon)
        } else if (i === total - 1) {
          // 具有相同名称的所有字段都具有相同的图标
          fields.data('bv.icon', $icon)
        }

        if (container) {
          //如果有指示错误消息容器。
          $field
            // 当字段获得焦点时显示工具提示/弹出消息
            .off('focus.container.bv')
            .on('focus.container.bv', function () {
              switch (container) {
                case 'tooltip':
                  $(this).data('bv.icon').tooltip('show')
                  break
                case 'popover':
                  $(this).data('bv.icon').popover('show')
                  break
                default:
                  break
              }
            })
            // 并在失去焦点时隐藏它们
            .off('blur.container.bv')
            .on('blur.container.bv', function () {
              switch (container) {
                case 'tooltip':
                  $(this).data('bv.icon').tooltip('hide')
                  break
                case 'popover':
                  $(this).data('bv.icon').popover('hide')
                  break
                default:
                  break
              }
            })
        }
      }
    }

    // 准备事件
    fields
      .on(this.#options.events.fieldSuccess, function (e, data) {
        let onSuccess = that.getOptions(data.field, null, 'onSuccess')
        if (onSuccess) {
          Utils.call(onSuccess, [e, data])
        }
      })
      .on(this.#options.events.fieldError, function (e, data) {
        let onError = that.getOptions(data.field, null, 'onError')
        if (onError) {
          Utils.call(onError, [e, data])
        }
      })
      .on(this.#options.events.fieldStatus, function (e, data) {
        let onStatus = that.getOptions(data.field, null, 'onStatus')
        if (onStatus) {
          Utils.call(onStatus, [e, data])
        }
      })
      .on(this.#options.events.validatorError, function (e, data) {
        let onError = that.getOptions(data.field, data.validator, 'onError')
        if (onError) {
          Utils.call(onError, [e, data])
        }
      })
      .on(this.#options.events.validatorSuccess, function (e, data) {
        let onSuccess = that.getOptions(data.field, data.validator, 'onSuccess')
        if (onSuccess) {
          Utils.call(onSuccess, [e, data])
        }
      })

    // 根据选项传入过来的模式选项来开始设置事件。 focus.live.bv blur.live.bv  change.live.bv input.live.bv
    events = $.map(trigger, function (item) {
      return item + '.live.bv'
    }).join(' ')

    if (this.#options.live === 'disabled') {
      // 提交表单后才会显示错误消息
      fields.off(events)
    } else if (this.#options.live !== 'submitted') {
      // 意思就是 this.#options.live === 'enabled' 或者其它乱七八糟的字符串

      fields.off(events).on(events, function () {
        if (that.#exceedThreshold($(this))) {
          that.validateField($(this))
        }
      })
    }

    fields.trigger($.Event(this.#options.events.fieldInit), {
      bv: this,
      field: field,
      element: fields,
    })
  }

  /**
   * 验证表单
   *
   * @returns {BootstrapValidation}
   */
  validate() {
    if (!this.#options.fields) {
      return this
    }

    this.disableSubmitButtons(true)

    this.#submitIfValid = false

    for (let field in this.#options.fields) {
      this.validateField(field)
    }

    this.#submit()
    this.#submitIfValid = true

    return this
  }

  /**
   * 验证字段
   *
   * @param {String|jQuery} field 字段名称或者字段元素
   * @returns {BootstrapValidation}
   */
  validateField(field) {
    let { fields, matchedField } = this.#getFields(field)
    field = matchedField

    if (!this.#isExistField(fields, matchedField)) {
      return this
    }

    let that = this
    let type = fields.attr('type')
    let total = 'radio' === type || 'checkbox' === type ? 1 : fields.length
    let updateAll = 'radio' === type || 'checkbox' === type
    let rules = this.#options.fields[field].rules
    let verbose = this.#isOptionEnabled(field, 'verbose')

    for (let i = 0; i < total; i++) {
      let $field = fields.eq(i)

      if (this.#isExcluded($field)) {
        //如果是排除的字段则跳过当前循环
        continue
      }

      let stop = false

      for (let ruleName in rules) {
        if ($field.data('bv.dfs.' + ruleName)) {
          $field.data('bv.dfs.' + ruleName).reject()
        }

        if (stop) {
          break
        }

        //如果已验证字段，则不验证该字段
        let result = $field.data('bv.result.' + ruleName)

        if (
          result === Constants.STATUS_VALID ||
          result === Constants.STATUS_INVALID
        ) {
          //如果是通过，或是无效
          this.#onFieldValidated($field, ruleName)
          continue
        } else if (rules[ruleName].enabled === false) {
          this.updateStatus(
            updateAll ? field : $field,
            Constants.STATUS_VALID,
            ruleName,
          )
          continue
        }

        //保存验证的结果
        $field.data('bv.result.' + ruleName, Constants.STATUS_VALIDATING)
        //调用内置的验证规则并返回结果
        let validateResult = $.fn[Constants.NAME].rules[ruleName].rule(
          this,
          $field,
          rules[ruleName],
        )

        console.log(validateResult)

        //如果返回的结果布尔类型
        if ('boolean' === typeof validateResult) {
          $field.data('bv.response.' + ruleName, validateResult)

          //如果是单选框和复选框
          const updateField = updateAll ? field : $field
          //验证结果为真则验证状态设置为通过。
          const status = validateResult
            ? Constants.STATUS_VALID
            : Constants.STATUS_INVALID

          //跟新状态
          this.updateStatus(updateField, status, ruleName)

          //如果没通过，verbose===false的时候就直接终止循环，只显示一条错误关系
          if (!validateResult && !verbose) {
            break
          }
        }
        // 如果是一个对象 { valid: true/false, message: 'dynamic message' }
        else if (
          Utils.isObj(validateResult) &&
          Utils.checkProps(validateResult, ['valid', 'message'])
        ) {
          $field.data('bv.response.' + ruleName, validateResult)

          //更新错误信息
          this.updateMessage(
            updateAll ? field : $field,
            ruleName,
            validateResult.message,
          )

          //更新状态
          this.updateStatus(
            updateAll ? field : $field,
            validateResult.valid
              ? Constants.STATUS_VALID
              : Constants.STATUS_INVALID,
            ruleName,
          )

          if (!validateResult.valid && !verbose) {
            break
          }
        } else if (Utils.isObj(validateResult) && validateResult.resolve) {
          //如果是dfd对象

          //更新状态
          this.updateStatus(
            updateAll ? field : $field,
            Constants.STATUS_VALIDATING,
            ruleName,
          )
          // 字段上存返回结果
          $field.data('bv.dfs.' + ruleName, validateResult)

          //注册回调函数
          validateResult.done(function ($field, ruleName, response) {
            $field
              .removeData('bv.dfs.' + ruleName)
              .data('bv.response.' + ruleName, response)

            if (response.message) {
              that.updateMessage($field, ruleName, response.message)
            }

            that.updateStatus(
              updateAll ? $field.attr('data-bv-field') : $field,
              response.valid
                ? Constants.STATUS_VALID
                : Constants.STATUS_INVALID,
              ruleName,
            )

            if (response.valid && that.#submitIfValid === true) {
              // 如果远程验证器返回true并且表单已准备好提交，则执行此操作
              that.#submit()
            } else if (!response.valid && !verbose) {
              stop = true
            }
          })
        }
      }
    }
  }

  /**
   * Called when all validations are completed
   */
  #submit() {
    let isValid = this.isValid()
    let eventType = isValid
      ? this.#options.events.formSuccess
      : this.#options.events.formError
    let e = $.Event(eventType)

    this.#$form.trigger(e)

    // 调用默认处理程序
    // 检查是否单击了提交按钮
    if (this.#$submitButton) {
      isValid ? this.#onSuccess(e) : this.#onError(e)
    }
  }

  /**
   * success.form.bv事件的默认处理程序。
   * 当所有字段都有效时，将调用它
   *
   * @param {Object} e jQuery事件对象
   */
  #onSuccess(e) {
    if (e.isDefaultPrevented()) {
      return
    }

    // 提交表单
    this.disableSubmitButtons(true).defaultSubmit()
  }

  /**
   * success.form.bv事件的默认处理程序。
   * 当所有字段都有效时，将调用它
   *
   * @param {Object} e jQuery事件对象
   */
  #onError(e) {
    if (e.isDefaultPrevented()) {
      return
    }

    if ('submitted' === this.#options.live) {
      // 设置成 enabled 模式
      this.#options.live = 'enabled'

      //保存this
      let that = this

      for (let field in this.#options.fields) {
        let fields = this.getFieldElements(field)

        if (fields.length) {
          let type = $(fields[0]).attr('type')
          let event =
            'radio' === type ||
            'checkbox' === type ||
            'file' === type ||
            'SELECT' === $(fields[0]).get(0).tagName
              ? 'change'
              : that.#changeEvent
          let trigger =
            that.#options.fields[field].trigger ||
            that.#options.trigger ||
            event
          let events = $.map(trigger.split(' '), function (item) {
            return item + '.live.bv'
          }).join(' ')

          fields.off(events).on(events, function () {
            if (that.#exceedThreshold($(this))) {
              that.validateField($(this))
            }
          })
        }
      }
    }

    // 已确定将自动关注的第一个无效字段
    for (let i = 0; i < this.#$invalidFields.length; i++) {
      let $field = this.#$invalidFields.eq(i)
      let autoFocus = this.#isOptionEnabled(
        $field.attr('data-bv-field'),
        'autoFocus',
      )
      if (autoFocus) {
        // 激活包含字段的选项卡（如果存在）
        let $tabPane = $field.parents('.tab-pane')
        let tabId

        if ($tabPane && (tabId = $tabPane.attr('id'))) {
          $('a[href="#' + tabId + '"][data-toggle="tab"]').tab('show')
        }
        // 给字段聚焦
        $field.focus()
        break
      }
    }
  }

  /**
   * 更新错误信息
   *
   * @param {String|jQuery} field 字段名称或字段元素
   * @param {String} rule 验证规则名称
   * @param {String} message 信息
   * @returns {BootstrapValidation}
   */
  updateMessage(field, rule, message) {
    let { fields, matchedField } = this.#getFields(field)

    fields.each(function () {
      $(this)
        .data('bv.messages')
        .find(
          '.help-block[data-bv-rule="' +
            rule +
            '"][data-bv-for="' +
            matchedField +
            '"]',
        )
        .html(message)
    })
  }

  /**
   * 更新字段的所有验证结果
   *
   * @param {String|jQuery} field 字段名称或字段元素
   * @param {String} status 状态  可用值 'NOT_VALIDATED', 'VALIDATING', 'INVALID' , 'VALID'
   * @param {String} [ruleName] 验证器名称。如果为null，该方法将更新所有验证器的有效性结果
   * @returns {BootstrapValidation}
   */
  updateStatus(field, status, ruleName) {
    //保存 this
    let that = this

    let { fields, matchedField } = this.#getFields(field)
    field = matchedField

    if (status === Constants.STATUS_NOT_VALIDATED) {
      // 重置标志
      // 当延迟验证器在键入时返回true时，防止表单进行提交
      this.#submitIfValid = false
    }

    let type = fields.attr('type')
    let group = this.#options.fields[field].group || this.#options.group
    let total = 'radio' === type || 'checkbox' === type ? 1 : fields.length

    for (let i = 0; i < total; i++) {
      let $field = fields.eq(i)
      if (this.#isExcluded($field)) {
        continue
      }

      let $parent = $field.parents(group)
      let $message = $field.data('bv.messages')
      let $allErrors = $message.find(
        '.help-block[data-bv-rule][data-bv-for="' + field + '"]',
      )
      let $errors = ruleName
        ? $allErrors.filter('[data-bv-rule="' + ruleName + '"]')
        : $allErrors
      let $icon = $field.data('bv.icon')
      let condition1 =
        'function' ===
        typeof (
          this.#options.fields[field].container || this.#options.container
        )
      let container = condition1
        ? (
            this.#options.fields[field].container || this.#options.container
          ).call(this, $field, this)
        : this.#options.fields[field].container || this.#options.container
      let isValidField = null

      // 更新状态
      if (ruleName) {
        $field.data('bv.result.' + ruleName, status)
      } else {
        for (let ruleName in this.#options.fields[field].rules) {
          $field.data('bv.result.' + ruleName, status)
        }
      }

      // 显示隐藏 错误元素和反馈图标
      $errors.attr('data-bv-result', status)

      //确定包含元素的选项卡
      let $tabPane = $field.parents('.tab-pane')
      let tabId
      let $tab

      if ($tabPane && (tabId = $tabPane.attr('id'))) {
        $tab = $('a[href="#' + tabId + '"][data-toggle="tab"]').parent()
      }

      const statusActions = {
        [Constants.STATUS_VALIDATING]: () => {
          //验证中

          isValidField = null
          //禁用提交按钮
          this.disableSubmitButtons(true)
          //移除成功状态添加错误状态
          $parent.removeClass('has-success').removeClass('has-error')

          if ($icon) {
            //有图标

            $icon
              .removeClass(this.#options.feedbackIcons.valid)
              .removeClass(this.#options.feedbackIcons.invalid)
              .addClass(this.#options.feedbackIcons.validating)
              .show()
          }

          if ($tab) {
            $tab.removeClass('bv-tab-success').removeClass('bv-tab-error')
          }
        },
        [Constants.STATUS_INVALID]: () => {
          //无效

          isValidField = false
          this.disableSubmitButtons(true)

          $parent.removeClass('has-success').addClass('has-error')

          if ($icon) {
            $icon
              .removeClass(this.#options.feedbackIcons.valid)
              .removeClass(this.#options.feedbackIcons.validating)
              .addClass(this.#options.feedbackIcons.invalid)
              .show()
          }

          if ($tab) {
            $tab.removeClass('bv-tab-success').addClass('bv-tab-error')
          }
        },
        [Constants.STATUS_VALID]: () => {
          //通过

          let not_validated =
            $allErrors.filter(
              '[data-bv-result="' + Constants.STATUS_NOT_VALIDATED + '"]',
            ).length === 0
          //所有验证器已完成
          let all_completed =
            $allErrors.filter(
              '[data-bv-result="' + Constants.STATUS_VALID + '"]',
            ).length === $allErrors.length

          isValidField = not_validated ? all_completed : null

          if (isValidField !== null) {
            this.disableSubmitButtons(
              this.#$submitButton ? !this.isValid() : !isValidField,
            )

            if ($icon) {
              $icon
                .removeClass(this.#options.feedbackIcons.invalid)
                .removeClass(this.#options.feedbackIcons.validating)
                .removeClass(this.#options.feedbackIcons.valid)
                .addClass(
                  isValidField
                    ? this.#options.feedbackIcons.valid
                    : this.#options.feedbackIcons.invalid,
                )
                .show()
            }
          }

          $parent
            .removeClass('has-error has-success')
            .addClass(
              this.isValidContainer($parent) ? 'has-success' : 'has-error',
            )
          if ($tab) {
            $tab
              .removeClass('bv-tab-success')
              .removeClass('bv-tab-error')
              .addClass(
                this.isValidContainer($tabPane)
                  ? 'bv-tab-success'
                  : 'bv-tab-error',
              )
          }
        },

        [Constants.STATUS_NOT_VALIDATED]: () => {
          //未验证
          isValidField = null

          this.disableSubmitButtons(false)

          $parent.removeClass('has-success').removeClass('has-error')

          if ($icon) {
            $icon
              .removeClass(this.#options.feedbackIcons.valid)
              .removeClass(this.#options.feedbackIcons.invalid)
              .removeClass(this.#options.feedbackIcons.validating)
              .hide()
          }

          if ($tab) {
            $tab.removeClass('bv-tab-success').removeClass('bv-tab-error')
          }
        },

        default: () => {
          // 默认情况的处理逻辑
          statusActions[Constants.STATUS_NOT_VALIDATED]()
        },
      }

      // console.log(statusActions[status]);

      ;(statusActions[status] || statusActions.default)()

      // 判断图标且容器类型
      if ($icon && 'tooltip' === container) {
        const title = $allErrors
          .filter(`[data-bv-result="${Constants.STATUS_INVALID}"]`)
          .eq(0)
          .html()

        isValidField === false
          ? tooltipAction.show($icon, title)
          : tooltipAction.hide($icon)
      } else if ($icon && 'popover' === container) {
        const content = $allErrors
          .filter(`[data-bv-result="${Constants.STATUS_INVALID}"]`)
          .eq(0)
          .html()

        isValidField === false
          ? popoverAction.show($icon, content)
          : popoverAction.hide($icon)
      } else {
        status === Constants.STATUS_INVALID ? $errors.show() : $errors.hide()
      }

      // 触发事件
      $field.trigger($.Event(this.#options.events.fieldStatus), {
        bv: this,
        field: field,
        element: $field,
        status: status,
      })

      // 验证字段后调用。
      this.#onFieldValidated($field, ruleName)
    }
    return this
  }

  /**
   * 检查表单有效性
   *
   * @returns {Boolean}
   */
  isValid() {
    for (let field in this.#options.fields) {
      if (!this.isValidField(field)) {
        return false
      }
    }

    return true
  }

  /**
   * 检查字段是否有效
   *
   * @param {String|jQuery} field 字段名称或字段元素
   * @returns {Boolean}
   */
  isValidField(field) {
    let { fields, matchedField } = this.#getFields(field)

    if (!this.#isExistField(fields, matchedField)) {
      return true
    }

    let type = fields.attr('type')
    let total = 'radio' === type || 'checkbox' === type ? 1 : fields.length
    for (let i = 0; i < total; i++) {
      let $field = fields.eq(i)
      if (this.#isExcluded($field)) {
        continue
      }

      for (let ruleName in this.#options.fields[field].rules) {
        if (this.#options.fields[field].rules[ruleName].enabled === false) {
          continue
        }

        let status = $field.data('bv.result.' + ruleName)
        if (status !== Constants.STATUS_VALID) {
          return false
        }
      }
    }

    return true
  }

  /**
   * 获取字段匹配结果 {fields,matchedField}  fields:是一个字段元素的jQuery集合 matchedField:字段名称
   * @param {String|jQuery} field  字段名称或字段元素
   * @returns {Object}
   */
  #getFields(field) {
    let fields = $([])

    const fieldMapping = {
      object: () => {
        fields = field
        field = field.attr('data-bv-field')
      },
      string: () => {
        fields = this.getFieldElements(field)
      },
    }

    //可选链运算符 ?.
    fieldMapping[typeof field]?.()

    return {
      fields,
      matchedField: field,
    }
  }

  /**
   * 检查给定容器内的所有字段是否有效.
   * 当使用诸如选项卡、折叠之类的向导时，它很有用
   *
   * @param {String|jQuery} container 容器选择器或元素
   * @returns {Boolean}
   */
  isValidContainer(container) {
    let that = this
    let map = {}
    let $container = 'string' === typeof container ? $(container) : container

    if ($container.length === 0) {
      return true
    }

    $container.find('[data-bv-field]').each(function () {
      let $field = $(this)
      let field = $field.attr('data-bv-field')
      if (!that.#isExcluded($field) && !map[field]) {
        map[field] = $field
      }
    })

    for (let field in map) {
      let $f = map[field]

      if (
        $f
          .data('bv.messages')
          .find('.help-block[data-bv-rule][data-bv-for="' + field + '"]')
          .filter('[data-bv-result="' + Constants.STATUS_INVALID + '"]')
          .length > 0
      ) {
        return false
      }
    }

    return true
  }

  /**
   * 检查字段是否存在
   * @param {JQuery} fields
   * @param {String} matchedField
   * @returns {Boolean}
   */
  #isExistField(fields, matchedField) {
    if (
      fields.length === 0 ||
      !this.#options.fields[matchedField] ||
      this.#options.fields[matchedField].enabled === false
    ) {
      return false
    }

    return true
  }

  /**
   * 禁用或启用提交按钮
   *
   * @param {Boolean} disabled ture  false
   * @returns {BootstrapValidation}
   */
  disableSubmitButtons(disabled) {
    if (!disabled) {
      this.#$form.find(this.#options.submitButtons).removeAttr('disabled')
    } else if (this.#options.live !== 'disabled') {
      // 如果禁用了实时验证模式，则不要禁用
      this.#$form.find(this.#options.submitButtons).attr('disabled', 'disabled')
    }

    return this
  }

  /**
   * 在验证字段元素后调用
   *
   * @param {jQuery} $field 字段元素
   * @param {String} [ruleName] 规则名
   */
  #onFieldValidated($field, ruleName) {
    let field = $field.attr('data-bv-field')
    let rules = this.#options.fields[field].rules
    let counter = {}
    let numValidators = 0
    let data = {
      bv: this,
      field: field,
      element: $field,
      validator: ruleName,
      result: $field.data('bv.response.' + ruleName),
    }

    // 在给定的验证器完成后触发事件
    if (ruleName) {
      const ruleMapping = {
        [Constants.STATUS_INVALID]: () => {
          //xxxx
          $field.trigger($.Event(this.#options.events.ruleError), data)
        },

        [Constants.STATUS_VALID]: () => {
          //xxx
          $field.trigger($.Event(this.#options.events.ruleSuccess), data)
        },
      }

      ruleMapping[$field.data('bv.result.' + ruleName)]?.()
    }

    counter[Constants.STATUS_NOT_VALIDATED] = 0
    counter[Constants.STATUS_VALIDATING] = 0
    counter[Constants.STATUS_INVALID] = 0
    counter[Constants.STATUS_VALID] = 0

    for (let rule in rules) {
      if (rules[rule].enabled === false) {
        continue
      }
      numValidators++
      let result = $field.data('bv.result.' + rule)
      if (result) {
        counter[result]++
      }
    }

    //如果所有验证器都已完成，并且至少有一个验证器未通过
    let condition =
      (counter[Constants.STATUS_NOT_VALIDATED] === 0 ||
        !this.#isOptionEnabled(field, 'verbose')) &&
      counter[Constants.STATUS_VALIDATING] === 0 &&
      counter[Constants.STATUS_INVALID] > 0

    if (counter[Constants.STATUS_VALID] === numValidators) {
      //从无效字段列表中删除
      this.#$invalidFields = this.#$invalidFields.not($field)
      $field.trigger($.Event(this.#options.events.fieldSuccess), data)
    } else if (condition) {
      // 添加到无效字段列表
      this.#$invalidFields = this.#$invalidFields.add($field)
      $field.trigger($.Event(this.#options.events.fieldError), data)
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
    let excludedAttr = $field.attr('data-bv-excluded')
    // 再次取字段
    let field = $field.attr('data-bv-field') || $field.attr('name')

    //确保有该字段。
    let hasField =
      Boolean(field) && this.#options.fields && this.#options.fields[field]
    // 确保字段选项上有设置 excluded
    let hasExcludedOption =
      this.#options.fields[field].excluded === 'true' ||
      this.#options.fields[field].excluded === true
    let withoutExcludedOption =
      this.#options.fields[field].excluded === 'false' ||
      this.#options.fields[field].excluded === false

    if (
      (hasField && hasExcludedOption) ||
      excludedAttr === 'true' ||
      excludedAttr === ''
    ) {
      return true
    } else if (
      (hasField && withoutExcludedOption) ||
      excludedAttr === 'false'
    ) {
      return false
    } else {
      if (this.#options.excluded) {
        // excluded的格式可以是下面三种情况
        // 数组，元素是字符串:
        // [':disabled', ':hidden', ':not(:visible)']
        // 字符串数组，使用逗号分隔:
        // ':disabled, :hidden, :not(:visible)'
        // 数组，元素可以是一个callback，其中callback内必须返回true/false
        // [':disabled', ':hidden', function ($field, validation) {
        //   // 不验证不可见元素
        //   return !$field.is(':visible');
        // }]

        // 如果是字符串格式 ':disabled, :hidden, :not(:visible)'
        // 先统一转换成数组的格式
        if ('string' === typeof this.#options.excluded) {
          this.#options.excluded = this.#options.excluded
            .split(',')
            .map((item) => {
              return item.trim()
            })
        }

        for (const excludedItem of this.#options.excluded) {
          //如果是字符串，就判断字段元素 是否符合excluded选择器
          // 如果是函数，那就执行回调。
          if (
            ('string' === typeof excludedItem && $field.is(excludedItem)) ||
            ('function' === typeof excludedItem &&
              excludedItem.call(this, $field, this) === true)
          ) {
            return true
          }
        }
      }

      return false
    }
  }

  /**
   * 检查字段选项是否已启用
   *
   * @param {String} field 字段名称
   * @param {String} option 选项名称, 例如:"verbose", "autoFocus"
   * @returns {Boolean}
   */
  #isOptionEnabled(field, option) {
    if (
      this.#options.fields[field] &&
      (this.#options.fields[field][option] === 'true' ||
        this.#options.fields[field][option] === true)
    ) {
      return true
    }
    if (
      this.#options.fields[field] &&
      (this.#options.fields[field][option] === 'false' ||
        this.#options.fields[field][option] === false)
    ) {
      return false
    }
    return this.#options[option] === 'true' || this.#options[option] === true
  }

  /**
   * 检查字段值的字符数是否超过阈值
   *
   * @param {jQuery} $field 字段元素
   * @returns {Boolean}
   */
  #exceedThreshold($field) {
    let field = $field.attr('data-bv-field')
    let threshold =
      this.#options.fields[field].threshold || this.#options.threshold

    if (!threshold) {
      return true
    }

    let cannotType =
      $.inArray($field.attr('type'), [
        'button',
        'checkbox',
        'file',
        'hidden',
        'image',
        'radio',
        'reset',
        'submit',
      ]) !== -1
    return cannotType || $field.val().length >= threshold
  }

  /**
   * 获取字段选项
   *
   * @param {String|jQuery} [field] 字段名称或字段元素。如果未设置，该方法将返回表单选项
   * @param {String} [validator] 规则的名称。如果为null，则该方法返回表单选项
   * @param {String} [option] 选项名称
   * @return {String|Object}
   */
  getOptions(field, rule, option) {
    if (!field) {
      return option ? this.#options[option] : this.#options
    }

    if ('object' === typeof field) {
      field = field.attr('data-bv-field')
    }

    if (!this.#options.fields[field]) {
      return null
    }

    let options = this.#options.fields[field]
    if (!rule) {
      return option ? options[option] : options
    }

    if (!options.rules || !options.rules[rule]) {
      return null
    }

    return option ? options.rules[rule][option] : options.rules[rule]
  }

  /**
   * 获取给定字段和验证器的错误消息
   *
   * @param {String} field 字段名称
   * @param {String} ruleName 规则名称
   * @returns {String}
   */
  #getMessage(field, ruleName) {
    if (
      !this.#options.fields[field] ||
      !$.fn[Constants.NAME].rules[ruleName] ||
      !this.#options.fields[field].rules ||
      !this.#options.fields[field].rules[ruleName]
    ) {
      return ''
    }

    let options = this.#options.fields[field].rules[ruleName]

    switch (true) {
      case !!options.message:
        return options.message
      case !!this.#options.fields[field].message:
        return this.#options.fields[field].message
      case !!$.fn[Constants.NAME].i18n[ruleName]:
        return $.fn[Constants.NAME].i18n[ruleName]['default']
      default:
        return this.#options.message
    }
  }

  /**
   * 获取用于放置错误消息的元素
   * @param {jQuery} $field  字段元素
   * @param {String} group  字段元素容器选择器
   */
  #getMessageContainer($field, group) {
    let $parent = $field.parent()

    if ($parent.is(group)) {
      return $parent
    }

    let cssClasses = $parent.attr('class')
    if (!cssClasses) {
      return this.#getMessageContainer($parent, group)
    }

    cssClasses = cssClasses.split(' ')
    let n = cssClasses.length
    for (let i = 0; i < n; i++) {
      if (
        /^col-(xs|sm|md|lg)-\d+$/.test(cssClasses[i]) ||
        /^col-(xs|sm|md|lg)-offset-\d+$/.test(cssClasses[i])
      ) {
        return $parent
      }
    }
    return this.#getMessageContainer($parent, group)
  }

  /**
   * 按给定名称检索字段元素
   * @param {String} field 字段名
   * @returns
   */
  getFieldElements(field) {
    if (!this.#cacheFields[field]) {
      this.#cacheFields[field] =
        this.#options.fields[field] && this.#options.fields[field].selector
          ? $(this.#options.fields[field].selector)
          : this.#$form.find('[name="' + field + '"]')
    }

    return this.#cacheFields[field]
  }

  /**
   * 从HTML属性分析验证器选项
   * @param {JQuery} $field 字段元素
   */
  #parseOptions($field) {
    let field = $field.attr('name') || $field.attr('data-bv-field')
    // console.log($.fn[Constants.NAME].rules);

    //验证规则
    let rules = {}

    for (const [ruleName, rule] of Object.entries($.fn[Constants.NAME].rules)) {
      //有几个验证规则，这里就要循环几次
      // console.log(ruleName,rule);

      let attrName = 'data-bv-' + ruleName.toLowerCase()

      //然后从字段元素上取  data-bv-notempty 或者 data-bv-stringlength data-bv-xxx 属性,强制转换为string
      let enabled = String($field.attr(attrName))

      let html5AttrMap =
        'function' === typeof rule.enableByHtml5
          ? rule.enableByHtml5($field)
          : null

      // console.log(attrName,enabled,typeof enabled,html5AttrMap,$field);

      //启用html5属性，同时是通过data-bv-xxx来设置验证规则的。
      let condition = html5AttrMap && enabled !== 'false'

      // 没有启用html5的属性 但是有通过data-bv-xxx来设置验证规则的。
      //例子1:<input  type="text" class="form-control" name="username" data-bv-notempty data-bv-stringlength="true" />
      // 例子1解释: 它有data-bv-notempty  data-bv-stringlength="true" 这样的方式来设置rule属性 condition2就会为true
      // 例子2：<input  type="text" class="form-control" name="username" require  />
      // 例子2解释：如果设置了，html5的属性 require 或者 没有通过 data-bv-xxx 这种方式来设置验证规则，则enabled肯定会等于undefined 则condition2 就会变成false
      let condition2 =
        html5AttrMap !== true &&
        ('' === enabled ||
          'true' === enabled ||
          attrName === enabled.toLowerCase())
      // console.log("condition2:",condition2);

      if (condition || condition2) {
        //尝试通过属性解析选项

        // 合并验证规则 rule 的 html5的属性。下面要用来循环取值
        // 比如stringLength的html5属性默认有min、max、trim、utf8bytes、message
        // {message: 'message', onerror: 'onError', onsuccess: 'onSuccess', min: 'min', max: 'max'}
        rule.html5Attributes = $.extend(
          {},
          { message: 'message', onerror: 'onError', onsuccess: 'onSuccess' },
          rule.html5Attributes,
        )
        // console.log(rule.html5Attributes,$field);

        rules[ruleName] = $.extend(
          {},
          html5AttrMap === true ? {} : html5AttrMap,
          rules[ruleName],
        )
        // console.log(rules);

        //解析验证规则的子选项
        // 例子：<input  type="text" class="form-control" name="username" data-bv-notempty data-bv-stringlength="true" data-bv-stringlength-min="2" data-bv-stringlength-max="10" />
        // 这段代码解析的就是 data-bv-stringlength-min data-bv-stringlength-max 这种验证规则的子选项
        for (const [html5AttrName, optionName] of Object.entries(
          rule.html5Attributes,
        )) {
          let optionAttrName =
            'data-bv-' + ruleName.toLowerCase() + '-' + html5AttrName
          let optionValue = $field.attr(optionAttrName)
          // console.log(optionAttrName,optionValue);
          if (optionValue) {
            // 如果有设置
            if (
              'true' === optionValue ||
              optionAttrName === optionValue.toLowerCase()
            ) {
              //如果设置的值为true
              optionValue = true
            } else if ('false' === optionValue) {
              //如果为false
              optionValue = false
            }

            // 则分别给不同的验证规则添加上验证规则的选项。
            //比如原来该规则是空对象 stringLength: {}   添加过后则变成 stringLength: {min: '2', max: '10' }
            rules[ruleName][optionName] = optionValue
          }
        }
      }
    }

    //获取字段选项
    const opts = {
      feedbackIcons: $field.attr('data-bv-feedbackicons'),
      onStatus: $field.attr('data-bv-onstatus'),
      selector: $field.attr('data-bv-selector'),
      ...this.#getCommonDataOptions($field),
      rules,
    }

    //检查字段选项是否使用HTML属性设置
    let emptyOptions = $.isEmptyObject(opts)
    //检查字段验证器是否使用HTML属性设置
    let emptyRules = $.isEmptyObject(rules)

    if (
      !emptyRules ||
      (!emptyOptions && this.#options.fields && this.#options.fields[field])
    ) {
      opts.rules = rules
      return opts
    } else {
      return null
    }
  }

  /**
   * 从html属性上获取属性
   * @returns {Object} 选项
   */
  #getOptionsfromHtml() {
    return {
      events: {
        formInit: this.#$form.attr('data-bv-events-form-init'),
        formError: this.#$form.attr('data-bv-events-form-error'),
        formSuccess: this.#$form.attr('data-bv-events-form-success'),
        fieldAdded: this.#$form.attr('data-bv-events-field-added'),
        fieldRemoved: this.#$form.attr('data-bv-events-field-removed'),
        fieldInit: this.#$form.attr('data-bv-events-field-init'),
        fieldError: this.#$form.attr('data-bv-events-field-error'),
        fieldSuccess: this.#$form.attr('data-bv-events-field-success'),
        fieldStatus: this.#$form.attr('data-bv-events-field-status'),
        validatorError: this.#$form.attr('data-bv-events-validator-error'),
        validatorSuccess: this.#$form.attr('data-bv-events-validator-success'),
      },
      feedbackIcons: {
        valid: this.#$form.attr('data-bv-feedbackicons-valid'),
        invalid: this.#$form.attr('data-bv-feedbackicons-invalid'),
        validating: this.#$form.attr('data-bv-feedbackicons-validating'),
      },
      live: this.#$form.attr('data-bv-live'),
      submitButtons: this.#$form.attr('data-bv-submitbuttons'),
      ...this.#getCommonDataOptions(this.#$form),
    }
  }

  /**
   * 获取表单和字段元素都可以设置的选项
   * @param {JQuery} $type 表单元素/字段元素
   * @returns
   */
  #getCommonDataOptions($type) {
    return {
      autoFocus: $type.attr('data-bv-autofocus'),
      container: $type.attr('data-bv-container'),
      excluded: $type.attr('data-bv-excluded'),
      group: $type.attr('data-bv-group'),
      message: $type.attr('data-bv-message'),
      onError: $type.attr('data-bv-onerror'),
      onSuccess: $type.attr('data-bv-onsuccess'),
      threshold: $type.attr('data-bv-threshold'),
      trigger: $type.attr('data-bv-trigger'),
      verbose: $type.attr('data-bv-verbose'),
    }
  }

  /**
   * 一些验证规则可以选择其值是动态的。
   * 例如，zipCode验证器具有国家选项，该选项可能会由select元素动态更改。
   *
   * @param {jQuery|String} field 字段名称或元素
   * @param {String|Function} option 可通过以下方式确定的选项:
   * - 字符串
   * - 定义值的字段的名称
   * - 返回值的函数的名称
   * - 函数返回值
   *
   * 回调函数的格式为
   *      callback: function(value, validation, $field) {
   *          // value 是字段的值
   *          // validation  是BootstrapValidation 实例
   *          // $field 是字段元素
   *      }
   *
   * @returns {String}
   */
  #getDynamicOption(field, option) {
    let $field =
      'string' === typeof field ? this.getFieldElements(field) : field
    let value = $field.val()

    if ('function' === typeof option) {
      return Utils.call(option, [value, this, $field])
    } else if ('string' === typeof option) {
      let $f = this.getFieldElements(option)

      if ($f.length) {
        return $f.val()
      } else {
        return Utils.call(option, [value, this, $field]) || option
      }
    }

    return null
  }
}

/**
 * jQuery API
 * ====================================================
 */
$.fn[Constants.NAME] = function (option) {
  //获取参数
  let params = arguments
  return this.each(function () {
    let $this = $(this)
    let data = $this.data(Constants.NAME)

    //选项合并
    let options = $.extend(
      {},
      $.fn[Constants.NAME].defaults,
      'object' === typeof option && option,
    )
    //如果不存在就创建一个实例,然后存到data属性
    if (!data) {
      data = new BootstrapValidation(this, options)
      $this.data(Constants.NAME, data)
    }

    if ('string' === typeof option) {
      if (typeof data[option] !== 'function') {
        throw new Error(`Unknown method: ${option}`)
      }
      data[option].apply(data, Array.prototype.slice.call(params, 1))
    }
  })
}

$.fn[Constants.NAME].Constructor = BootstrapValidation
$.fn[Constants.NAME].VERSION = BootstrapValidation.VERSION
$.fn[Constants.NAME].defaults = BootstrapValidation.DEFAULTS
$.fn[Constants.NAME].rules = Rules
$.fn[Constants.NAME].i18n = {}
$.fn[Constants.NAME].utils = Utils

export default BootstrapValidation
