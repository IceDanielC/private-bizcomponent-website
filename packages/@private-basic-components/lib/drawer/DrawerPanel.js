"use strict";
"use client";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _classnames = _interopRequireDefault(require("classnames"));
var React = _interopRequireWildcard(require("react"));
var _useClosable = _interopRequireDefault(require("../_util/hooks/useClosable"));
var _configProvider = require("../config-provider");
const DrawerPanel = props => {
  var _a, _b;
  const {
    prefixCls,
    title,
    footer,
    extra,
    closeIcon,
    closable,
    onClose,
    headerStyle,
    drawerStyle,
    bodyStyle,
    footerStyle,
    children,
    classNames: drawerClassNames,
    styles: drawerStyles
  } = props;
  const {
    drawer: drawerContext
  } = React.useContext(_configProvider.ConfigContext);
  const customCloseIconRender = React.useCallback(icon => (/*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: onClose,
    "aria-label": "Close",
    className: `${prefixCls}-close`
  }, icon)), [onClose]);
  const [mergedClosable, mergedCloseIcon] = (0, _useClosable.default)(closable, closeIcon, customCloseIconRender, undefined, true);
  const headerNode = React.useMemo(() => {
    var _a, _b;
    if (!title && !mergedClosable) {
      return null;
    }
    return /*#__PURE__*/React.createElement("div", {
      style: Object.assign(Object.assign(Object.assign({}, (_a = drawerContext === null || drawerContext === void 0 ? void 0 : drawerContext.styles) === null || _a === void 0 ? void 0 : _a.header), headerStyle), drawerStyles === null || drawerStyles === void 0 ? void 0 : drawerStyles.header),
      className: (0, _classnames.default)(`${prefixCls}-header`, {
        [`${prefixCls}-header-close-only`]: mergedClosable && !title && !extra
      }, (_b = drawerContext === null || drawerContext === void 0 ? void 0 : drawerContext.classNames) === null || _b === void 0 ? void 0 : _b.header, drawerClassNames === null || drawerClassNames === void 0 ? void 0 : drawerClassNames.header)
    }, /*#__PURE__*/React.createElement("div", {
      className: `${prefixCls}-header-title`
    }, mergedCloseIcon, title && /*#__PURE__*/React.createElement("div", {
      className: `${prefixCls}-title`
    }, title)), extra && /*#__PURE__*/React.createElement("div", {
      className: `${prefixCls}-extra`
    }, extra));
  }, [mergedClosable, mergedCloseIcon, extra, headerStyle, prefixCls, title]);
  const footerNode = React.useMemo(() => {
    var _a, _b;
    if (!footer) {
      return null;
    }
    const footerClassName = `${prefixCls}-footer`;
    return /*#__PURE__*/React.createElement("div", {
      className: (0, _classnames.default)(footerClassName, (_a = drawerContext === null || drawerContext === void 0 ? void 0 : drawerContext.classNames) === null || _a === void 0 ? void 0 : _a.footer, drawerClassNames === null || drawerClassNames === void 0 ? void 0 : drawerClassNames.footer),
      style: Object.assign(Object.assign(Object.assign({}, (_b = drawerContext === null || drawerContext === void 0 ? void 0 : drawerContext.styles) === null || _b === void 0 ? void 0 : _b.footer), footerStyle), drawerStyles === null || drawerStyles === void 0 ? void 0 : drawerStyles.footer)
    }, footer);
  }, [footer, footerStyle, prefixCls]);
  return /*#__PURE__*/React.createElement("div", {
    className: `${prefixCls}-wrapper-body`,
    style: drawerStyle
  }, headerNode, /*#__PURE__*/React.createElement("div", {
    className: (0, _classnames.default)(`${prefixCls}-body`, drawerClassNames === null || drawerClassNames === void 0 ? void 0 : drawerClassNames.body, (_a = drawerContext === null || drawerContext === void 0 ? void 0 : drawerContext.classNames) === null || _a === void 0 ? void 0 : _a.body),
    style: Object.assign(Object.assign(Object.assign({}, (_b = drawerContext === null || drawerContext === void 0 ? void 0 : drawerContext.styles) === null || _b === void 0 ? void 0 : _b.body), bodyStyle), drawerStyles === null || drawerStyles === void 0 ? void 0 : drawerStyles.body)
  }, children), footerNode);
};
var _default = exports.default = DrawerPanel;