"use strict";
"use client";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var React = _interopRequireWildcard(require("react"));
var _classnames = _interopRequireDefault(require("classnames"));
var _rcSelect = _interopRequireWildcard(require("rc-select"));
var _omit = _interopRequireDefault(require("rc-util/lib/omit"));
var _motion = require("../_util/motion");
var _PurePanel = _interopRequireDefault(require("../_util/PurePanel"));
var _statusUtils = require("../_util/statusUtils");
var _warning = require("../_util/warning");
var _configProvider = require("../config-provider");
var _defaultRenderEmpty = _interopRequireDefault(require("../config-provider/defaultRenderEmpty"));
var _DisabledContext = _interopRequireDefault(require("../config-provider/DisabledContext"));
var _useSize = _interopRequireDefault(require("../config-provider/hooks/useSize"));
var _context = require("../form/context");
var _Compact = require("../space/Compact");
var _style = _interopRequireDefault(require("./style"));
var _useBuiltinPlacements = _interopRequireDefault(require("./useBuiltinPlacements"));
var _useShowArrow = _interopRequireDefault(require("./useShowArrow"));
var _useIcons = _interopRequireDefault(require("./useIcons"));
var __rest = void 0 && (void 0).__rest || function (s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};
// TODO: 4.0 - codemod should help to change `filterOption` to support node props.

const SECRET_COMBOBOX_MODE_DO_NOT_USE = 'SECRET_COMBOBOX_MODE_DO_NOT_USE';
const InternalSelect = (_a, ref) => {
  var _b;
  var {
      prefixCls: customizePrefixCls,
      bordered = true,
      className,
      rootClassName,
      getPopupContainer,
      popupClassName,
      dropdownClassName,
      listHeight = 256,
      placement,
      listItemHeight = 24,
      size: customizeSize,
      disabled: customDisabled,
      notFoundContent,
      status: customStatus,
      builtinPlacements,
      dropdownMatchSelectWidth,
      popupMatchSelectWidth,
      direction: propDirection,
      style,
      allowClear
    } = _a,
    props = __rest(_a, ["prefixCls", "bordered", "className", "rootClassName", "getPopupContainer", "popupClassName", "dropdownClassName", "listHeight", "placement", "listItemHeight", "size", "disabled", "notFoundContent", "status", "builtinPlacements", "dropdownMatchSelectWidth", "popupMatchSelectWidth", "direction", "style", "allowClear"]);
  const {
    getPopupContainer: getContextPopupContainer,
    getPrefixCls,
    renderEmpty,
    direction: contextDirection,
    virtual,
    popupMatchSelectWidth: contextPopupMatchSelectWidth,
    popupOverflow,
    select
  } = React.useContext(_configProvider.ConfigContext);
  const prefixCls = getPrefixCls('select', customizePrefixCls);
  const rootPrefixCls = getPrefixCls();
  const direction = propDirection !== null && propDirection !== void 0 ? propDirection : contextDirection;
  const {
    compactSize,
    compactItemClassnames
  } = (0, _Compact.useCompactItemContext)(prefixCls, direction);
  const [wrapSSR, hashId] = (0, _style.default)(prefixCls);
  const mode = React.useMemo(() => {
    const {
      mode: m
    } = props;
    if (m === 'combobox') {
      return undefined;
    }
    if (m === SECRET_COMBOBOX_MODE_DO_NOT_USE) {
      return 'combobox';
    }
    return m;
  }, [props.mode]);
  const isMultiple = mode === 'multiple' || mode === 'tags';
  const showSuffixIcon = (0, _useShowArrow.default)(props.suffixIcon, props.showArrow);
  const mergedPopupMatchSelectWidth = (_b = popupMatchSelectWidth !== null && popupMatchSelectWidth !== void 0 ? popupMatchSelectWidth : dropdownMatchSelectWidth) !== null && _b !== void 0 ? _b : contextPopupMatchSelectWidth;
  // ===================== Form Status =====================
  const {
    status: contextStatus,
    hasFeedback,
    isFormItemInput,
    feedbackIcon
  } = React.useContext(_context.FormItemInputContext);
  const mergedStatus = (0, _statusUtils.getMergedStatus)(contextStatus, customStatus);
  // ===================== Empty =====================
  let mergedNotFound;
  if (notFoundContent !== undefined) {
    mergedNotFound = notFoundContent;
  } else if (mode === 'combobox') {
    mergedNotFound = null;
  } else {
    mergedNotFound = (renderEmpty === null || renderEmpty === void 0 ? void 0 : renderEmpty('Select')) || /*#__PURE__*/React.createElement(_defaultRenderEmpty.default, {
      componentName: "Select"
    });
  }
  // ===================== Icons =====================
  const {
    suffixIcon,
    itemIcon,
    removeIcon,
    clearIcon
  } = (0, _useIcons.default)(Object.assign(Object.assign({}, props), {
    multiple: isMultiple,
    hasFeedback,
    feedbackIcon,
    showSuffixIcon,
    prefixCls,
    showArrow: props.showArrow,
    componentName: 'Select'
  }));
  const mergedAllowClear = allowClear === true ? {
    clearIcon
  } : allowClear;
  const selectProps = (0, _omit.default)(props, ['suffixIcon', 'itemIcon']);
  const rcSelectRtlDropdownClassName = (0, _classnames.default)(popupClassName || dropdownClassName, {
    [`${prefixCls}-dropdown-${direction}`]: direction === 'rtl'
  }, rootClassName, hashId);
  const mergedSize = (0, _useSize.default)(ctx => {
    var _a;
    return (_a = customizeSize !== null && customizeSize !== void 0 ? customizeSize : compactSize) !== null && _a !== void 0 ? _a : ctx;
  });
  // ===================== Disabled =====================
  const disabled = React.useContext(_DisabledContext.default);
  const mergedDisabled = customDisabled !== null && customDisabled !== void 0 ? customDisabled : disabled;
  const mergedClassName = (0, _classnames.default)({
    [`${prefixCls}-lg`]: mergedSize === 'large',
    [`${prefixCls}-sm`]: mergedSize === 'small',
    [`${prefixCls}-rtl`]: direction === 'rtl',
    [`${prefixCls}-borderless`]: !bordered,
    [`${prefixCls}-in-form-item`]: isFormItemInput
  }, (0, _statusUtils.getStatusClassNames)(prefixCls, mergedStatus, hasFeedback), compactItemClassnames, select === null || select === void 0 ? void 0 : select.className, className, rootClassName, hashId);
  // ===================== Placement =====================
  const memoPlacement = React.useMemo(() => {
    if (placement !== undefined) {
      return placement;
    }
    return direction === 'rtl' ? 'bottomRight' : 'bottomLeft';
  }, [placement, direction]);
  const mergedBuiltinPlacements = (0, _useBuiltinPlacements.default)(builtinPlacements, popupOverflow);
  // ====================== Warning ======================
  if (process.env.NODE_ENV !== 'production') {
    const warning = (0, _warning.devUseWarning)('Select');
    warning.deprecated(!dropdownClassName, 'dropdownClassName', 'popupClassName');
    warning.deprecated(dropdownMatchSelectWidth === undefined, 'dropdownMatchSelectWidth', 'popupMatchSelectWidth');
    process.env.NODE_ENV !== "production" ? warning(!('showArrow' in props), 'deprecated', '`showArrow` is deprecated which will be removed in next major version. It will be a default behavior, you can hide it by setting `suffixIcon` to null.') : void 0;
  }
  // ====================== Render =======================
  return wrapSSR(/*#__PURE__*/React.createElement(_rcSelect.default, Object.assign({
    ref: ref,
    virtual: virtual,
    showSearch: select === null || select === void 0 ? void 0 : select.showSearch
  }, selectProps, {
    style: Object.assign(Object.assign({}, select === null || select === void 0 ? void 0 : select.style), style),
    dropdownMatchSelectWidth: mergedPopupMatchSelectWidth,
    builtinPlacements: mergedBuiltinPlacements,
    transitionName: (0, _motion.getTransitionName)(rootPrefixCls, 'slide-up', props.transitionName),
    listHeight: listHeight,
    listItemHeight: listItemHeight,
    mode: mode,
    prefixCls: prefixCls,
    placement: memoPlacement,
    direction: direction,
    suffixIcon: suffixIcon,
    menuItemSelectedIcon: itemIcon,
    removeIcon: removeIcon,
    allowClear: mergedAllowClear,
    notFoundContent: mergedNotFound,
    className: mergedClassName,
    getPopupContainer: getPopupContainer || getContextPopupContainer,
    dropdownClassName: rcSelectRtlDropdownClassName,
    disabled: mergedDisabled
  })));
};
if (process.env.NODE_ENV !== 'production') {
  InternalSelect.displayName = 'Select';
}
const Select = /*#__PURE__*/React.forwardRef(InternalSelect);
// We don't care debug panel
/* istanbul ignore next */
const PurePanel = (0, _PurePanel.default)(Select);
Select.SECRET_COMBOBOX_MODE_DO_NOT_USE = SECRET_COMBOBOX_MODE_DO_NOT_USE;
Select.Option = _rcSelect.Option;
Select.OptGroup = _rcSelect.OptGroup;
Select._InternalPanelDoNotUseOrYouWillBeFired = PurePanel;
if (process.env.NODE_ENV !== 'production') {
  Select.displayName = 'Select';
}
var _default = exports.default = Select;