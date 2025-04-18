"use strict";
"use client";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = useNotification;
exports.useInternalNotification = useInternalNotification;
var React = _interopRequireWildcard(require("react"));
var _classnames = _interopRequireDefault(require("classnames"));
var _rcNotification = require("rc-notification");
var _warning = require("../_util/warning");
var _configProvider = require("../config-provider");
var _PurePanel = require("./PurePanel");
var _style = _interopRequireDefault(require("./style"));
var _util = require("./util");
var _internal = require("../theme/internal");
var __rest = void 0 && (void 0).__rest || function (s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};
const DEFAULT_OFFSET = 24;
const DEFAULT_DURATION = 4.5;
const DEFAULT_PLACEMENT = 'topRight';
const Wrapper = _ref => {
  let {
    children,
    prefixCls
  } = _ref;
  const [, hashId] = (0, _style.default)(prefixCls);
  return /*#__PURE__*/React.createElement(_rcNotification.NotificationProvider, {
    classNames: {
      list: hashId,
      notice: hashId
    }
  }, children);
};
const renderNotifications = (node, _ref2) => {
  let {
    prefixCls,
    key
  } = _ref2;
  return /*#__PURE__*/React.createElement(Wrapper, {
    prefixCls: prefixCls,
    key: key
  }, node);
};
const Holder = /*#__PURE__*/React.forwardRef((props, ref) => {
  const {
    top,
    bottom,
    prefixCls: staticPrefixCls,
    getContainer: staticGetContainer,
    maxCount,
    rtl,
    onAllRemoved,
    stack
  } = props;
  const {
    getPrefixCls,
    getPopupContainer,
    notification
  } = React.useContext(_configProvider.ConfigContext);
  const [, token] = (0, _internal.useToken)();
  const prefixCls = staticPrefixCls || getPrefixCls('notification');
  // =============================== Style ===============================
  const getStyle = placement => (0, _util.getPlacementStyle)(placement, top !== null && top !== void 0 ? top : DEFAULT_OFFSET, bottom !== null && bottom !== void 0 ? bottom : DEFAULT_OFFSET);
  const getClassName = () => (0, _classnames.default)({
    [`${prefixCls}-rtl`]: rtl
  });
  // ============================== Motion ===============================
  const getNotificationMotion = () => (0, _util.getMotion)(prefixCls);
  // ============================== Origin ===============================
  const [api, holder] = (0, _rcNotification.useNotification)({
    prefixCls,
    style: getStyle,
    className: getClassName,
    motion: getNotificationMotion,
    closable: true,
    closeIcon: (0, _PurePanel.getCloseIcon)(prefixCls),
    duration: DEFAULT_DURATION,
    getContainer: () => (staticGetContainer === null || staticGetContainer === void 0 ? void 0 : staticGetContainer()) || (getPopupContainer === null || getPopupContainer === void 0 ? void 0 : getPopupContainer()) || document.body,
    maxCount,
    onAllRemoved,
    renderNotifications,
    stack: stack === false ? false : {
      threshold: typeof stack === 'object' ? stack === null || stack === void 0 ? void 0 : stack.threshold : undefined,
      offset: 8,
      gap: token.margin
    }
  });
  // ================================ Ref ================================
  React.useImperativeHandle(ref, () => Object.assign(Object.assign({}, api), {
    prefixCls,
    notification
  }));
  return holder;
});
// ==============================================================================
// ==                                   Hook                                   ==
// ==============================================================================
function useInternalNotification(notificationConfig) {
  const holderRef = React.useRef(null);
  const warning = (0, _warning.devUseWarning)('Notification');
  // ================================ API ================================
  const wrapAPI = React.useMemo(() => {
    // Wrap with notification content
    // >>> Open
    const open = config => {
      var _a;
      if (!holderRef.current) {
        process.env.NODE_ENV !== "production" ? warning(false, 'usage', 'You are calling notice in render which will break in React 18 concurrent mode. Please trigger in effect instead.') : void 0;
        return;
      }
      const {
        open: originOpen,
        prefixCls,
        notification
      } = holderRef.current;
      const noticePrefixCls = `${prefixCls}-notice`;
      const {
          message,
          description,
          icon,
          type,
          btn,
          className,
          style,
          role = 'alert',
          closeIcon
        } = config,
        restConfig = __rest(config, ["message", "description", "icon", "type", "btn", "className", "style", "role", "closeIcon"]);
      const realCloseIcon = (0, _PurePanel.getCloseIcon)(noticePrefixCls, closeIcon);
      return originOpen(Object.assign(Object.assign({
        // use placement from props instead of hard-coding "topRight"
        placement: (_a = notificationConfig === null || notificationConfig === void 0 ? void 0 : notificationConfig.placement) !== null && _a !== void 0 ? _a : DEFAULT_PLACEMENT
      }, restConfig), {
        content: (/*#__PURE__*/React.createElement(_PurePanel.PureContent, {
          prefixCls: noticePrefixCls,
          icon: icon,
          type: type,
          message: message,
          description: description,
          btn: btn,
          role: role
        })),
        className: (0, _classnames.default)(type && `${noticePrefixCls}-${type}`, className, notification === null || notification === void 0 ? void 0 : notification.className),
        style: Object.assign(Object.assign({}, notification === null || notification === void 0 ? void 0 : notification.style), style),
        closeIcon: realCloseIcon,
        closable: !!realCloseIcon
      }));
    };
    // >>> destroy
    const destroy = key => {
      var _a, _b;
      if (key !== undefined) {
        (_a = holderRef.current) === null || _a === void 0 ? void 0 : _a.close(key);
      } else {
        (_b = holderRef.current) === null || _b === void 0 ? void 0 : _b.destroy();
      }
    };
    const clone = {
      open,
      destroy
    };
    const keys = ['success', 'info', 'warning', 'error'];
    keys.forEach(type => {
      clone[type] = config => open(Object.assign(Object.assign({}, config), {
        type
      }));
    });
    return clone;
  }, []);
  // ============================== Return ===============================
  return [wrapAPI, /*#__PURE__*/React.createElement(Holder, Object.assign({
    key: "notification-holder"
  }, notificationConfig, {
    ref: holderRef
  }))];
}
function useNotification(notificationConfig) {
  return useInternalNotification(notificationConfig);
}