"use strict";
"use client";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var React = _interopRequireWildcard(require("react"));
var _CloseOutlined = _interopRequireDefault(require("@ant-design/icons/CloseOutlined"));
var _classnames = _interopRequireDefault(require("classnames"));
var _rcDialog = _interopRequireDefault(require("rc-dialog"));
var _useClosable = _interopRequireDefault(require("../_util/hooks/useClosable"));
var _motion = require("../_util/motion");
var _styleChecker = require("../_util/styleChecker");
var _warning = require("../_util/warning");
var _configProvider = require("../config-provider");
var _context = require("../form/context");
var _Compact = require("../space/Compact");
var _context2 = require("../watermark/context");
var _shared = require("./shared");
var _style = _interopRequireDefault(require("./style"));
var __rest = void 0 && (void 0).__rest || function (s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};
let mousePosition;
// ref: https://github.com/ant-design/ant-design/issues/15795
const getClickPosition = e => {
  mousePosition = {
    x: e.pageX,
    y: e.pageY
  };
  // 100ms 内发生过点击事件，则从点击位置动画展示
  // 否则直接 zoom 展示
  // 这样可以兼容非点击方式展开
  setTimeout(() => {
    mousePosition = null;
  }, 100);
};
// 只有点击事件支持从鼠标位置动画展开
if ((0, _styleChecker.canUseDocElement)()) {
  document.documentElement.addEventListener('click', getClickPosition, true);
}
const Modal = props => {
  var _a;
  const {
    getPopupContainer: getContextPopupContainer,
    getPrefixCls,
    direction,
    modal
  } = React.useContext(_configProvider.ConfigContext);
  const handleCancel = e => {
    const {
      onCancel
    } = props;
    onCancel === null || onCancel === void 0 ? void 0 : onCancel(e);
  };
  const handleOk = e => {
    const {
      onOk
    } = props;
    onOk === null || onOk === void 0 ? void 0 : onOk(e);
  };
  if (process.env.NODE_ENV !== 'production') {
    const warning = (0, _warning.devUseWarning)('Modal');
    [['visible', 'open'], ['bodyStyle', 'styles.body'], ['maskStyle', 'styles.mask']].forEach(_ref => {
      let [deprecatedName, newName] = _ref;
      warning.deprecated(!(deprecatedName in props), deprecatedName, newName);
    });
  }
  const {
      prefixCls: customizePrefixCls,
      className,
      rootClassName,
      open,
      wrapClassName,
      centered,
      getContainer,
      closeIcon,
      closable,
      focusTriggerAfterClose = true,
      style,
      // Deprecated
      visible,
      width = 520,
      footer,
      classNames: modalClassNames,
      styles: modalStyles
    } = props,
    restProps = __rest(props, ["prefixCls", "className", "rootClassName", "open", "wrapClassName", "centered", "getContainer", "closeIcon", "closable", "focusTriggerAfterClose", "style", "visible", "width", "footer", "classNames", "styles"]);
  const prefixCls = getPrefixCls('modal', customizePrefixCls);
  const rootPrefixCls = getPrefixCls();
  // Style
  const [wrapSSR, hashId] = (0, _style.default)(prefixCls);
  const wrapClassNameExtended = (0, _classnames.default)(wrapClassName, {
    [`${prefixCls}-centered`]: !!centered,
    [`${prefixCls}-wrap-rtl`]: direction === 'rtl'
  });
  const dialogFooter = footer !== null && (/*#__PURE__*/React.createElement(_shared.Footer, Object.assign({}, props, {
    onOk: handleOk,
    onCancel: handleCancel
  })));
  const [mergedClosable, mergedCloseIcon] = (0, _useClosable.default)(closable, closeIcon, icon => (0, _shared.renderCloseIcon)(prefixCls, icon), /*#__PURE__*/React.createElement(_CloseOutlined.default, {
    className: `${prefixCls}-close-icon`
  }), true);
  // ============================ Refs ============================
  // Select `ant-modal-content` by `panelRef`
  const panelRef = (0, _context2.usePanelRef)(`.${prefixCls}-content`);
  // =========================== Render ===========================
  return wrapSSR(/*#__PURE__*/React.createElement(_Compact.NoCompactStyle, null, /*#__PURE__*/React.createElement(_context.NoFormStyle, {
    status: true,
    override: true
  }, /*#__PURE__*/React.createElement(_rcDialog.default, Object.assign({
    width: width
  }, restProps, {
    getContainer: getContainer === undefined ? getContextPopupContainer : getContainer,
    prefixCls: prefixCls,
    rootClassName: (0, _classnames.default)(hashId, rootClassName),
    footer: dialogFooter,
    visible: open !== null && open !== void 0 ? open : visible,
    mousePosition: (_a = restProps.mousePosition) !== null && _a !== void 0 ? _a : mousePosition,
    onClose: handleCancel,
    closable: mergedClosable,
    closeIcon: mergedCloseIcon,
    focusTriggerAfterClose: focusTriggerAfterClose,
    transitionName: (0, _motion.getTransitionName)(rootPrefixCls, 'zoom', props.transitionName),
    maskTransitionName: (0, _motion.getTransitionName)(rootPrefixCls, 'fade', props.maskTransitionName),
    className: (0, _classnames.default)(hashId, className, modal === null || modal === void 0 ? void 0 : modal.className),
    style: Object.assign(Object.assign({}, modal === null || modal === void 0 ? void 0 : modal.style), style),
    classNames: Object.assign(Object.assign({
      wrapper: wrapClassNameExtended
    }, modal === null || modal === void 0 ? void 0 : modal.classNames), modalClassNames),
    styles: Object.assign(Object.assign({}, modal === null || modal === void 0 ? void 0 : modal.styles), modalStyles),
    panelRef: panelRef
  })))));
};
var _default = exports.default = Modal;