import Utils from "../utils";

export default {
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

        if ((min && length < parseInt(min, 10)) || (max && length > parseInt(max, 10))) {
            isValid = false;
        }

        switch (true) {
            case (!!min && !!max):
                message = Utils.format(options.message || $.fn.bootstrapValidation.i18n.stringLength.between, [parseInt(min, 10), parseInt(max, 10)]);
                break;

            case (!!min):
                message = Utils.format(options.message || $.fn.bootstrapValidation.i18n.stringLength.more, parseInt(min, 10));
                break;

            case (!!max):
                message = Utils.format(options.message || $.fn.bootstrapValidation.i18n.stringLength.less, parseInt(max, 10));
                break;

            default:
                break;
        }

        return {valid: isValid, message: message};
    }
}
