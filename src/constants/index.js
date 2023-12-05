// 版本号
const VERSION = '0.5.3'

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
export default {
    VERSION,
    DEFAULTS,
}
