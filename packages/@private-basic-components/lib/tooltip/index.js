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
var _rcTooltip = _interopRequireDefault(require("rc-tooltip"));
var _useMergedState = _interopRequireDefault(require("rc-util/lib/hooks/useMergedState"));
var _motion = require("../_util/motion");
var _placements = _interopRequireDefault(require("../_util/placements"));
var _reactNode = require("../_util/reactNode");
var _warning = require("../_util/warning");
var _configProvider = require("../config-provider");
var _Compact = require("../space/Compact");
var _internal = require("../theme/internal");
var _PurePanel = _interopRequireDefault(require("./PurePanel"));
var _style = _interopRequireDefault(require("./style"));
var _util = require("./util");
var __rest = void 0 && (void 0).__rest || function (s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};
const Tooltip = /*#__PURE__*/React.forwardRef((props, ref) => {
  var _a, _b;
  const {
    prefixCls: customizePrefixCls,
    openClassName,
    getTooltipContainer,
    overlayClassName,
    color,
    overlayInnerStyle,
    children,
    afterOpenChange,
    afterVisibleChange,
    destroyTooltipOnHide,
    arrow = true,
    title,
    overlay,
    builtinPlacements,
    arrowPointAtCenter = false,
    autoAdjustOverflow = true
  } = props;
  const mergedShowArrow = !!arrow;
  const [, token] = (0, _internal.useToken)();
  const {
    getPopupContainer: getContextPopupContainer,
    getPrefixCls,
    direction
  } = React.useContext(_configProvider.ConfigContext);
  // ============================== Ref ===============================
  const warning = (0, _warning.devUseWarning)('Tooltip');
  const tooltipRef = React.useRef(null);
  const forceAlign = () => {
    var _a;
    (_a = tooltipRef.current) === null || _a === void 0 ? void 0 : _a.forceAlign();
  };
  React.useImperativeHandle(ref, () => ({
    forceAlign,
    forcePopupAlign: () => {
      warning.deprecated(false, 'forcePopupAlign', 'forceAlign');
      forceAlign();
    }
  }));
  // ============================== Warn ==============================
  if (process.env.NODE_ENV !== 'production') {
    [['visible', 'open'], ['defaultVisible', 'defaultOpen'], ['onVisibleChange', 'onOpenChange'], ['afterVisibleChange', 'afterOpenChange'], ['arrowPointAtCenter', 'arrow={{ pointAtCenter: true }}']].forEach(_ref => {
      let [deprecatedName, newName] = _ref;
      warning.deprecated(!(deprecatedName in props), deprecatedName, newName);
    });
    process.env.NODE_ENV !== "production" ? warning(!destroyTooltipOnHide || typeof destroyTooltipOnHide === 'boolean', 'usage', '`destroyTooltipOnHide` no need config `keepParent` anymore. Please use `boolean` value directly.') : void 0;
    process.env.NODE_ENV !== "production" ? warning(!arrow || typeof arrow === 'boolean' || !('arrowPointAtCenter' in arrow), 'deprecated', '`arrowPointAtCenter` in `arrow` is deprecated. Please use `pointAtCenter` instead.') : void 0;
  }
  // ============================== Open ==============================
  const [open, setOpen] = (0, _useMergedState.default)(false, {
    value: (_a = props.open) !== null && _a !== void 0 ? _a : props.visible,
    defaultValue: (_b = props.defaultOpen) !== null && _b !== void 0 ? _b : props.defaultVisible
  });
  const noTitle = !title && !overlay && title !== 0; // overlay for old version compatibility
  const onOpenChange = vis => {
    var _a, _b;
    setOpen(noTitle ? false : vis);
    if (!noTitle) {
      (_a = props.onOpenChange) === null || _a === void 0 ? void 0 : _a.call(props, vis);
      (_b = props.onVisibleChange) === null || _b === void 0 ? void 0 : _b.call(props, vis);
    }
  };
  const tooltipPlacements = React.useMemo(() => {
    var _a, _b;
    let mergedArrowPointAtCenter = arrowPointAtCenter;
    if (typeof arrow === 'object') {
      mergedArrowPointAtCenter = (_b = (_a = arrow.pointAtCenter) !== null && _a !== void 0 ? _a : arrow.arrowPointAtCenter) !== null && _b !== void 0 ? _b : arrowPointAtCenter;
    }
    return builtinPlacements || (0, _placements.default)({
      arrowPointAtCenter: mergedArrowPointAtCenter,
      autoAdjustOverflow,
      arrowWidth: mergedShowArrow ? token.sizePopupArrow : 0,
      borderRadius: token.borderRadius,
      offset: token.marginXXS,
      visibleFirst: true
    });
  }, [arrowPointAtCenter, arrow, builtinPlacements, token]);
  const memoOverlay = React.useMemo(() => {
    if (title === 0) {
      return title;
    }
    return overlay || title || '';
  }, [overlay, title]);
  const memoOverlayWrapper = /*#__PURE__*/React.createElement(_Compact.NoCompactStyle, null, typeof memoOverlay === 'function' ? memoOverlay() : memoOverlay);
  const {
      getPopupContainer,
      placement = 'top',
      mouseEnterDelay = 0.1,
      mouseLeaveDelay = 0.1,
      overlayStyle,
      rootClassName
    } = props,
    otherProps = __rest(props, ["getPopupContainer", "placement", "mouseEnterDelay", "mouseLeaveDelay", "overlayStyle", "rootClassName"]);
  const prefixCls = getPrefixCls('tooltip', customizePrefixCls);
  const rootPrefixCls = getPrefixCls();
  const injectFromPopover = props['data-popover-inject'];
  let tempOpen = open;
  // Hide tooltip when there is no title
  if (!('open' in props) && !('visible' in props) && noTitle) {
    tempOpen = false;
  }
  // ============================= Render =============================
  const child = (0, _reactNode.isValidElement)(children) && !(0, _reactNode.isFragment)(children) ? children : /*#__PURE__*/React.createElement("span", null, children);
  const childProps = child.props;
  const childCls = !childProps.className || typeof childProps.className === 'string' ? (0, _classnames.default)(childProps.className, openClassName || `${prefixCls}-open`) : childProps.className;
  // Style
  const [wrapSSR, hashId] = (0, _style.default)(prefixCls, !injectFromPopover);
  // Color
  const colorInfo = (0, _util.parseColor)(prefixCls, color);
  const arrowContentStyle = colorInfo.arrowStyle;
  const formattedOverlayInnerStyle = Object.assign(Object.assign({}, overlayInnerStyle), colorInfo.overlayStyle);
  const customOverlayClassName = (0, _classnames.default)(overlayClassName, {
    [`${prefixCls}-rtl`]: direction === 'rtl'
  }, colorInfo.className, rootClassName, hashId);
  return wrapSSR(/*#__PURE__*/React.createElement(_rcTooltip.default, Object.assign({}, otherProps, {
    showArrow: mergedShowArrow,
    placement: placement,
    mouseEnterDelay: mouseEnterDelay,
    mouseLeaveDelay: mouseLeaveDelay,
    prefixCls: prefixCls,
    overlayClassName: customOverlayClassName,
    overlayStyle: Object.assign(Object.assign({}, arrowContentStyle), overlayStyle),
    getTooltipContainer: getPopupContainer || getTooltipContainer || getContextPopupContainer,
    ref: tooltipRef,
    builtinPlacements: tooltipPlacements,
    overlay: memoOverlayWrapper,
    visible: tempOpen,
    onVisibleChange: onOpenChange,
    afterVisibleChange: afterOpenChange !== null && afterOpenChange !== void 0 ? afterOpenChange : afterVisibleChange,
    overlayInnerStyle: formattedOverlayInnerStyle,
    arrowContent: /*#__PURE__*/React.createElement("span", {
      className: `${prefixCls}-arrow-content`
    }),
    motion: {
      motionName: (0, _motion.getTransitionName)(rootPrefixCls, 'zoom-big-fast', props.transitionName),
      motionDeadline: 1000
    },
    destroyTooltipOnHide: !!destroyTooltipOnHide
  }), tempOpen ? (0, _reactNode.cloneElement)(child, {
    className: childCls
  }) : child));
});
if (process.env.NODE_ENV !== 'production') {
  Tooltip.displayName = 'Tooltip';
}
Tooltip._InternalPanelDoNotUseOrYouWillBeFired = _PurePanel.default;
var _default = exports.default = Tooltip;