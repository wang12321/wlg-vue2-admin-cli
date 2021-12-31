module.exports = {
  root:true,
  extends: [
    "stylelint-config-standard",
    "stylelint-config-recess-order",
    "stylelint-config-prettier",
    "stylelint-config-airbnb"
  ],
  plugins: ["stylelint-scss", "stylelint-order"],
  rules: {
    'at-rule-empty-line-before':null,
    // 不要使用已被 autoprefixer 支持的浏览器前缀
    'media-feature-name-no-vendor-prefix': true,
    'at-rule-no-vendor-prefix': true,
    'selector-no-vendor-prefix': true,
    'property-no-vendor-prefix': true,
    'value-no-vendor-prefix': true,
    // 最多允许嵌套20层，去掉默认的最多2层
    'max-nesting-depth': 20,
    // 颜色值要小写
    'color-hex-case': 'lower',
    // 颜色值能短则短
    'color-hex-length': 'short',
    // 不能用important
    'declaration-no-important': null,
    // 禁用未知的类型选择器
    'selector-type-no-unknown': null,
    //禁止使用未知的伪类选择器
    'selector-pseudo-class-no-unknown': null,
    //禁止使用未知属性
    'property-no-unknown': null,
    'selector-max-id': 1,
    // 禁止低优先级的选择器出现在高优先级的选择器之后
    'no-descending-specificity': null,
    //指定一个在声明中禁止使用的属性和值的黑名单。
    'declaration-property-value-blacklist': null,
    // 'order/properties-order': false,
    // 要求或禁止在 at 规则之前有空行
    // 'rule-empty-line-before': false,
    // 禁止使用未知的伪元素
    'selector-pseudo-element-no-unknown': null,
    "at-rule-no-unknown": [
      true,
      {
        ignoreAtRules: [
          "extend",
          "at-root",
          "debug",
          "warn",
          "error",
          "if",
          "else",
          "for",
          "each",
          "while",
          "mixin",
          "include",
          "content",
          "return",
          "function",
        ],
      },
    ],
  },
};
