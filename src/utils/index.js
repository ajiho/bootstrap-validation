export default {
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
      return functionName.apply(this, args)
    } else if ('string' === typeof functionName) {
      if ('()' === functionName.substring(functionName.length - 2)) {
        functionName = functionName.substring(0, functionName.length - 2)
      }
      let ns = functionName.split('.'),
        func = ns.pop(),
        context = window
      for (let i = 0; i < ns.length; i++) {
        context = context[ns[i]]
      }
      return typeof context[func] === 'undefined'
        ? null
        : context[func].apply(this, args)
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
      parameters = [parameters]
    }

    for (let i in parameters) {
      message = message.replace('%s', parameters[i])
    }

    return message
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
      return false
    }
    if (day.length > 2 || month.length > 2 || year.length > 4) {
      return false
    }

    day = parseInt(day, 10)
    month = parseInt(month, 10)
    year = parseInt(year, 10)

    if (year < 1000 || year > 9999 || month <= 0 || month > 12) {
      return false
    }
    let numDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
    // Update the number of days in Feb of leap year
    if (year % 400 === 0 || (year % 100 !== 0 && year % 4 === 0)) {
      numDays[1] = 29
    }

    // Check the day
    if (day <= 0 || day > numDays[month - 1]) {
      return false
    }

    if (notInFuture === true) {
      let currentDate = new Date(),
        currentYear = currentDate.getFullYear(),
        currentMonth = currentDate.getMonth(),
        currentDay = currentDate.getDate()
      return (
        year < currentYear ||
        (year === currentYear && month - 1 < currentMonth) ||
        (year === currentYear && month - 1 === currentMonth && day < currentDay)
      )
    }

    return true
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
      prodArr = [
        [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
        [0, 2, 4, 6, 8, 1, 3, 5, 7, 9],
      ],
      sum = 0

    while (length--) {
      sum += prodArr[mul][parseInt(value.charAt(length), 10)]
      mul ^= 1
    }

    return sum % 10 === 0 && sum > 0
  },

  /**
   * 实现模数11，10（ISO 7064）算法
   *
   * @param {String} value
   * @returns {Boolean}
   */
  mod11And10(value) {
    let check = 5,
      length = value.length
    for (let i = 0; i < length; i++) {
      check = ((((check || 10) * 2) % 11) + parseInt(value.charAt(i), 10)) % 10
    }
    return check === 1
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
    alphabet = alphabet || '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    let modulus = alphabet.length,
      length = value.length,
      check = Math.floor(modulus / 2)
    for (let i = 0; i < length; i++) {
      check =
        ((((check || modulus) * 2) % (modulus + 1)) +
          alphabet.indexOf(value.charAt(i))) %
        modulus
    }
    return check === 1
  },

  isEmptyObject(obj) {
    return Object.keys(obj).length === 0 && obj.constructor === Object
  },

  isObj(value) {
    return (
      value &&
      Object.prototype.toString.call(value) === '[object Object]' &&
      !Array.isArray(value)
    )
  },

  extend(target, ...sources) {
    if (!sources.length) return target
    const source = sources.shift()

    if (this.isObj(target) && this.isObj(source)) {
      for (const key in source) {
        if (this.isObj(source[key])) {
          if (!target[key]) Object.assign(target, { [key]: {} })
          this.extend(target[key], source[key])
        } else {
          Object.assign(target, { [key]: source[key] })
        }
      }
    }

    return this.extend(target, ...sources)
  },

  utf8Length(str) {
    let s = str.length
    for (let i = str.length - 1; i >= 0; i--) {
      let code = str.charCodeAt(i)
      if (code > 0x7f && code <= 0x7ff) {
        s++
      } else if (code > 0x7ff && code <= 0xffff) {
        s += 2
      }
      if (code >= 0xdc00 && code <= 0xdfff) {
        i--
      }
    }
    return s
  },

  /**
   * 批量判断某个对象上是否存在指定的属性
   * @param {Object} obj
   * @param {Array} props
   * @returns {Boolean} 如果有任何一个属性不存在，则返回 false；否则返回 true
   */
  checkProps(obj, props) {
    for (let i = 0; i < props.length; i++) {
      if (!(props[i] in obj)) {
        return false
      }
    }
    return true
  },
}
