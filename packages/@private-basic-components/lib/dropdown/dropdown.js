"use strict";
"use client";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var React = _interopRequireWildcard(require("react"));
var _RightOutlined = _interopRequireDefault(require("@ant-design/icons/RightOutlined"));
var _classnames = _interopRequireDefault(require("classnames"));
var _rcDropdown = _interopRequireDefault(require("rc-dropdown"));
var _rcUtil = require("rc-util");
var _useMergedState = _interopRequireDefault(require("rc-util/lib/hooks/useMergedState"));
var _omit = _interopRequireDefault(require("rc-util/lib/omit"));
var _placements = _interopRequireDefault(require("../_util/placements"));
var _PurePanel = _interopRequireDefault(require("../_util/PurePanel"));
var _reactNode = require("../_util/reactNode");
var _warning = require("../_util/warning");
var _configProvider = require("../config-provider");
var _menu = _interopRequireDefault(require("../menu"));
var _OverrideContext = require("../menu/OverrideContext");
var _internal = require("../theme/internal");
var _style = _interopRequireDefault(require("./style"));
const Placements = ['topLeft', 'topCenter', 'topRight', 'bottomLeft', 'bottomCenter', 'bottomRight', 'top', 'bottom'];
const Dropdown = props => {
  const {
    menu,
    arrow,
    prefixCls: customizePrefixCls,
    children,
    trigger,
    disabled,
    dropdownRender,
    getPopupContainer,
    overlayClassName,
    rootClassName,
    open,
    onOpenChange,
    // Deprecated
    visible,
    onVisibleChange,
    mouseEnterDelay = 0.15,
    mouseLeaveDelay = 0.1,
    autoAdjustOverflow = true,
    placement = '',
    overlay,
    transitionName
  } = props;
  const {
    getPopupContainer: getContextPopupContainer,
    getPrefixCls,
    direction
  } = React.useContext(_configProvider.ConfigContext);
  // Warning for deprecated usage
  const warning = (0, _warning.devUseWarning)('Dropdown');
  if (process.env.NODE_ENV !== 'production') {
    [['visible', 'open'], ['onVisibleChange', 'onOpenChange']].forEach(_ref => {
      let [deprecatedName, newName] = _ref;
      warning.deprecated(!(deprecatedName in props), deprecatedName, newName);
    });
    warning.deprecated(!('overlay' in props), 'overlay', 'menu');
  }
  const memoTransitionName = React.useMemo(() => {
    const rootPrefixCls = getPrefixCls();
    if (transitionName !== undefined) {
      return transitionName;
    }
    if (placement.includes('top')) {
      return `${rootPrefixCls}-slide-down`;
    }
    return `${rootPrefixCls}-slide-up`;
  }, [getPrefixCls, placement, transitionName]);
  const memoPlacement = React.useMemo(() => {
    if (!placement) {
      return direction === 'rtl' ? 'bottomRight' : 'bottomLeft';
    }
    if (placement.includes('Center')) {
      return placement.slice(0, placement.indexOf('Center'));
    }
    return placement;
  }, [placement, direction]);
  if (process.env.NODE_ENV !== 'production') {
    if (placement.includes('Center')) {
      const newPlacement = placement.slice(0, placement.indexOf('Center'));
      process.env.NODE_ENV !== "production" ? warning(!placement.includes('Center'), 'deprecated', `You are using '${placement}' placement in Dropdown, which is deprecated. Try to use '${newPlacement}' instead.`) : void 0;
    }
    [['visible', 'open'], ['onVisibleChange', 'onOpenChange']].forEach(_ref2 => {
      let [deprecatedName, newName] = _ref2;
      warning.deprecated(!(deprecatedName in props), deprecatedName, newName);
    });
  }
  const prefixCls = getPrefixCls('dropdown', customizePrefixCls);
  const [wrapSSR, hashId] = (0, _style.default)(prefixCls);
  const [, token] = (0, _internal.useToken)();
  const child = React.Children.only(children);
  const dropdownTrigger = (0, _reactNode.cloneElement)(child, {
    className: (0, _classnames.default)(`${prefixCls}-trigger`, {
      [`${prefixCls}-rtl`]: direction === 'rtl'
    }, child.props.className),
    disabled
  });
  const triggerActions = disabled ? [] : trigger;
  let alignPoint;
  if (triggerActions && triggerActions.includes('contextMenu')) {
    alignPoint = true;
  }
  // =========================== Open ============================
  const [mergedOpen, setOpen] = (0, _useMergedState.default)(false, {
    value: open !== null && open !== void 0 ? open : visible
  });
  const onInnerOpenChange = (0, _rcUtil.useEvent)(nextOpen => {
    onOpenChange === null || onOpenChange === void 0 ? void 0 : onOpenChange(nextOpen);
    onVisibleChange === null || onVisibleChange === void 0 ? void 0 : onVisibleChange(nextOpen);
    setOpen(nextOpen);
  });
  // =========================== Overlay ============================
  const overlayClassNameCustomized = (0, _classnames.default)(overlayClassName, rootClassName, hashId, {
    [`${prefixCls}-rtl`]: direction === 'rtl'
  });
  const builtinPlacements = (0, _placements.default)({
    arrowPointAtCenter: typeof arrow === 'object' && arrow.pointAtCenter,
    autoAdjustOverflow,
    offset: token.marginXXS,
    arrowWidth: arrow ? token.sizePopupArrow : 0,
    borderRadius: token.borderRadius
  });
  const onMenuClick = React.useCallback(() => {
    setOpen(false);
  }, []);
  const renderOverlay = () => {
    // rc-dropdown already can process the function of overlay, but we have check logic here.
    // So we need render the element to check and pass back to rc-dropdown.
    let overlayNode;
    if (menu === null || menu === void 0 ? void 0 : menu.items) {
      overlayNode = /*#__PURE__*/React.createElement(_menu.default, Object.assign({}, menu));
    } else if (typeof overlay === 'function') {
      overlayNode = overlay();
    } else {
      overlayNode = overlay;
    }
    if (dropdownRender) {
      overlayNode = dropdownRender(overlayNode);
    }
    overlayNode = React.Children.only(typeof overlayNode === 'string' ? /*#__PURE__*/React.createElement("span", null, overlayNode) : overlayNode);
    return /*#__PURE__*/React.createElement(_OverrideContext.OverrideProvider, {
      prefixCls: `${prefixCls}-menu`,
      expandIcon: /*#__PURE__*/React.createElement("span", {
        className: `${prefixCls}-menu-submenu-arrow`
      }, /*#__PURE__*/React.createElement(_RightOutlined.default, {
        className: `${prefixCls}-menu-submenu-arrow-icon`
      })),
      mode: "vertical",
      selectable: false,
      onClick: onMenuClick,
      validator: _ref3 => {
        let {
          mode
        } = _ref3;
        // Warning if use other mode
        process.env.NODE_ENV !== "production" ? warning(!mode || mode === 'vertical', 'usage', `mode="${mode}" is not supported for Dropdown's Menu.`) : void 0;
      }
    }, overlayNode);
  };
  // ============================ Render ============================
  return wrapSSR(/*#__PURE__*/React.createElement(_rcDropdown.default, Object.assign({
    alignPoint: alignPoint
  }, (0, _omit.default)(props, ['rootClassName']), {
    mouseEnterDelay: mouseEnterDelay,
    mouseLeaveDelay: mouseLeaveDelay,
    visible: mergedOpen,
    builtinPlacements: builtinPlacements,
    arrow: !!arrow,
    overlayClassName: overlayClassNameCustomized,
    prefixCls: prefixCls,
    getPopupContainer: getPopupContainer || getContextPopupContainer,
    transitionName: memoTransitionName,
    trigger: triggerActions,
    overlay: renderOverlay,
    placement: memoPlacement,
    onVisibleChange: onInnerOpenChange
  }), dropdownTrigger));
};
function postPureProps(props) {
  return Object.assign(Object.assign({}, props), {
    align: {
      overflow: {
        adjustX: false,
        adjustY: false
      }
    }
  });
}
// We don't care debug panel
const PurePanel = (0, _PurePanel.default)(Dropdown, 'dropdown', prefixCls => prefixCls, postPureProps);
/* istanbul ignore next */
const WrapPurePanel = props => (/*#__PURE__*/React.createElement(PurePanel, Object.assign({}, props), /*#__PURE__*/React.createElement("span", null)));
Dropdown._InternalPanelDoNotUseOrYouWillBeFired = WrapPurePanel;
if (process.env.NODE_ENV !== 'production') {
  Dropdown.displayName = 'Dropdown';
}
var _default = exports.default = Dropdown;