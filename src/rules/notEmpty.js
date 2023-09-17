export default {

    enableByHtml5($field) {
        let required = $field.attr('required') + '';
        return ('required' === required || 'true' === required);
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
        console.log(options)
        let type = $field.attr('type');
        if ('radio' === type || 'checkbox' === type) {
            return validator
                .getFieldElements($field.attr('data-bv-field'))
                .filter(':checked')
                .length > 0;
        }

        if ('number' === type && $field.get(0).validity && $field.get(0).validity.badInput === true) {
            return true;
        }

        return $.trim($field.val()) !== '';
    }
}
