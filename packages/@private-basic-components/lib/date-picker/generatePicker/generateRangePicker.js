"use strict";
"use client";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = generateRangePicker;
var _react = _interopRequireWildcard(require("react"));
var React = _react;
var _CalendarOutlined = _interopRequireDefault(require("@ant-design/icons/CalendarOutlined"));
var _ClockCircleOutlined = _interopRequireDefault(require("@ant-design/icons/ClockCircleOutlined"));
var _CloseCircleFilled = _interopRequireDefault(require("@ant-design/icons/CloseCircleFilled"));
var _SwapRightOutlined = _interopRequireDefault(require("@ant-design/icons/SwapRightOutlined"));
var _classnames = _interopRequireDefault(require("classnames"));
var _rcPicker = require("rc-picker");
var _statusUtils = require("../../_util/statusUtils");
var _warning = require("../../_util/warning");
var _configProvider = require("../../config-provider");
var _DisabledContext = _interopRequireDefault(require("../../config-provider/DisabledContext"));
var _useSize = _interopRequireDefault(require("../../config-provider/hooks/useSize"));
var _context = require("../../form/context");
var _locale = require("../../locale");
var _Compact = require("../../space/Compact");
var _en_US = _interopRequireDefault(require("../locale/en_US"));
var _style = _interopRequireDefault(require("../style"));
var _util = require("../util");
var _Components = _interopRequireDefault(require("./Components"));
var __rest = void 0 && (void 0).__rest || function (s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};
function generateRangePicker(generateConfig) {
  const RangePicker = /*#__PURE__*/(0, _react.forwardRef)((props, ref) => {
    const {
        prefixCls: customizePrefixCls,
        getPopupContainer: customGetPopupContainer,
        className,
        placement,
        size: customizeSize,
        disabled: customDisabled,
        bordered = true,
        placeholder,
        popupClassName,
        dropdownClassName,
        status: customStatus,
        clearIcon,
        allowClear,
        rootClassName
      } = props,
      restProps = __rest(props, ["prefixCls", "getPopupContainer", "className", "placement", "size", "disabled", "bordered", "placeholder", "popupClassName", "dropdownClassName", "status", "clearIcon", "allowClear", "rootClassName"]);
    const innerRef = React.useRef(null);
    const {
      getPrefixCls,
      direction,
      getPopupContainer
    } = (0, _react.useContext)(_configProvider.ConfigContext);
    const prefixCls = getPrefixCls('picker', customizePrefixCls);
    const {
      compactSize,
      compactItemClassnames
    } = (0, _Compact.useCompactItemContext)(prefixCls, direction);
    const {
      format,
      showTime,
      picker
    } = props;
    const rootPrefixCls = getPrefixCls();
    const [wrapSSR, hashId] = (0, _style.default)(prefixCls);
    const additionalOverrideProps = Object.assign(Object.assign({}, showTime ? (0, _util.getTimeProps)(Object.assign({
      format,
      picker
    }, showTime)) : {}), picker === 'time' ? (0, _util.getTimeProps)(Object.assign(Object.assign({
      format
    }, props), {
      picker
    })) : {});
    // =================== Warning =====================
    if (process.env.NODE_ENV !== 'production') {
      const warning = (0, _warning.devUseWarning)('DatePicker.RangePicker');
      warning.deprecated(!dropdownClassName, 'dropdownClassName', 'popupClassName');
    }
    // ===================== Size =====================
    const mergedSize = (0, _useSize.default)(ctx => {
      var _a;
      return (_a = customizeSize !== null && customizeSize !== void 0 ? customizeSize : compactSize) !== null && _a !== void 0 ? _a : ctx;
    });
    // ===================== Disabled =====================
    const disabled = React.useContext(_DisabledContext.default);
    const mergedDisabled = customDisabled !== null && customDisabled !== void 0 ? customDisabled : disabled;
    // ===================== FormItemInput =====================
    const formItemContext = (0, _react.useContext)(_context.FormItemInputContext);
    const {
      hasFeedback,
      status: contextStatus,
      feedbackIcon
    } = formItemContext;
    const suffixNode = /*#__PURE__*/React.createElement(React.Fragment, null, picker === 'time' ? /*#__PURE__*/React.createElement(_ClockCircleOutlined.default, null) : /*#__PURE__*/React.createElement(_CalendarOutlined.default, null), hasFeedback && feedbackIcon);
    (0, _react.useImperativeHandle)(ref, () => ({
      focus: () => {
        var _a;
        return (_a = innerRef.current) === null || _a === void 0 ? void 0 : _a.focus();
      },
      blur: () => {
        var _a;
        return (_a = innerRef.current) === null || _a === void 0 ? void 0 : _a.blur();
      }
    }));
    const [contextLocale] = (0, _locale.useLocale)('Calendar', _en_US.default);
    const locale = Object.assign(Object.assign({}, contextLocale), props.locale);
    return wrapSSR(/*#__PURE__*/React.createElement(_rcPicker.RangePicker, Object.assign({
      separator: /*#__PURE__*/React.createElement("span", {
        "aria-label": "to",
        className: `${prefixCls}-separator`
      }, /*#__PURE__*/React.createElement(_SwapRightOutlined.default, null)),
      disabled: mergedDisabled,
      ref: innerRef,
      dropdownAlign: (0, _util.transPlacement2DropdownAlign)(direction, placement),
      placeholder: (0, _util.getRangePlaceholder)(locale, picker, placeholder),
      suffixIcon: suffixNode,
      prevIcon: /*#__PURE__*/React.createElement("span", {
        className: `${prefixCls}-prev-icon`
      }),
      nextIcon: /*#__PURE__*/React.createElement("span", {
        className: `${prefixCls}-next-icon`
      }),
      superPrevIcon: /*#__PURE__*/React.createElement("span", {
        className: `${prefixCls}-super-prev-icon`
      }),
      superNextIcon: /*#__PURE__*/React.createElement("span", {
        className: `${prefixCls}-super-next-icon`
      }),
      transitionName: `${rootPrefixCls}-slide-up`
    }, restProps, additionalOverrideProps, {
      className: (0, _classnames.default)({
        [`${prefixCls}-${mergedSize}`]: mergedSize,
        [`${prefixCls}-borderless`]: !bordered
      }, (0, _statusUtils.getStatusClassNames)(prefixCls, (0, _statusUtils.getMergedStatus)(contextStatus, customStatus), hasFeedback), hashId, compactItemClassnames, className, rootClassName),
      locale: locale.lang,
      prefixCls: prefixCls,
      getPopupContainer: customGetPopupContainer || getPopupContainer,
      generateConfig: generateConfig,
      components: _Components.default,
      direction: direction,
      dropdownClassName: (0, _classnames.default)(hashId, popupClassName || dropdownClassName, rootClassName),
      allowClear: (0, _util.mergeAllowClear)(allowClear, clearIcon, /*#__PURE__*/React.createElement(_CloseCircleFilled.default, null))
    })));
  });
  if (process.env.NODE_ENV !== 'production') {
    RangePicker.displayName = 'RangePicker';
  }
  return RangePicker;
}