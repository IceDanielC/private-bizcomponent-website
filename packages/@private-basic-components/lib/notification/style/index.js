"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _cssinjs = require("@ant-design/cssinjs");
var _style = require("../../style");
var _internal = require("../../theme/internal");
var _placement = _interopRequireDefault(require("./placement"));
var _stack = _interopRequireDefault(require("./stack"));
const genNotificationStyle = token => {
  const {
    iconCls,
    componentCls,
    // .ant-notification
    boxShadow,
    fontSizeLG,
    notificationMarginBottom,
    borderRadiusLG,
    colorSuccess,
    colorInfo,
    colorWarning,
    colorError,
    colorTextHeading,
    notificationBg,
    notificationPadding,
    notificationMarginEdge,
    motionDurationMid,
    motionEaseInOut,
    fontSize,
    lineHeight,
    width,
    notificationIconSize,
    colorText
  } = token;
  const noticeCls = `${componentCls}-notice`;
  const fadeOut = new _cssinjs.Keyframes('antNotificationFadeOut', {
    '0%': {
      maxHeight: token.animationMaxHeight,
      marginBottom: notificationMarginBottom
    },
    '100%': {
      maxHeight: 0,
      marginBottom: 0,
      paddingTop: 0,
      paddingBottom: 0,
      opacity: 0
    }
  });
  const noticeStyle = {
    position: 'relative',
    width,
    maxWidth: `calc(100vw - ${notificationMarginEdge * 2}px)`,
    marginBottom: notificationMarginBottom,
    marginInlineStart: 'auto',
    background: notificationBg,
    borderRadius: borderRadiusLG,
    boxShadow,
    [noticeCls]: {
      padding: notificationPadding,
      overflow: 'hidden',
      lineHeight,
      wordWrap: 'break-word'
    },
    [`${componentCls}-close-icon`]: {
      fontSize,
      cursor: 'pointer'
    },
    [`${noticeCls}-message`]: {
      marginBottom: token.marginXS,
      color: colorTextHeading,
      fontSize: fontSizeLG,
      lineHeight: token.lineHeightLG
    },
    [`${noticeCls}-description`]: {
      fontSize,
      color: colorText
    },
    [`&${noticeCls}-closable ${noticeCls}-message`]: {
      paddingInlineEnd: token.paddingLG
    },
    [`${noticeCls}-with-icon ${noticeCls}-message`]: {
      marginBottom: token.marginXS,
      marginInlineStart: token.marginSM + notificationIconSize,
      fontSize: fontSizeLG
    },
    [`${noticeCls}-with-icon ${noticeCls}-description`]: {
      marginInlineStart: token.marginSM + notificationIconSize,
      fontSize
    },
    // Icon & color style in different selector level
    // https://github.com/ant-design/ant-design/issues/16503
    // https://github.com/ant-design/ant-design/issues/15512
    [`${noticeCls}-icon`]: {
      position: 'absolute',
      fontSize: notificationIconSize,
      lineHeight: 0,
      // icon-font
      [`&-success${iconCls}`]: {
        color: colorSuccess
      },
      [`&-info${iconCls}`]: {
        color: colorInfo
      },
      [`&-warning${iconCls}`]: {
        color: colorWarning
      },
      [`&-error${iconCls}`]: {
        color: colorError
      }
    },
    [`${noticeCls}-close`]: {
      position: 'absolute',
      top: token.notificationPaddingVertical,
      insetInlineEnd: token.notificationPaddingHorizontal,
      color: token.colorIcon,
      outline: 'none',
      width: token.notificationCloseButtonSize,
      height: token.notificationCloseButtonSize,
      borderRadius: token.borderRadiusSM,
      transition: `background-color ${token.motionDurationMid}, color ${token.motionDurationMid}`,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      '&:hover': {
        color: token.colorIconHover,
        backgroundColor: token.wireframe ? 'transparent' : token.colorFillContent
      }
    },
    [`${noticeCls}-btn`]: {
      float: 'right',
      marginTop: token.marginSM
    }
  };
  return [
  // ============================ Holder ============================
  {
    [componentCls]: Object.assign(Object.assign({}, (0, _style.resetComponent)(token)), {
      position: 'fixed',
      zIndex: token.zIndexPopup,
      marginInlineEnd: notificationMarginEdge,
      [`${componentCls}-hook-holder`]: {
        position: 'relative'
      },
      //  animation
      [`${componentCls}-fade-appear-prepare`]: {
        opacity: '0 !important'
      },
      [`${componentCls}-fade-enter, ${componentCls}-fade-appear`]: {
        animationDuration: token.motionDurationMid,
        animationTimingFunction: motionEaseInOut,
        animationFillMode: 'both',
        opacity: 0,
        animationPlayState: 'paused'
      },
      [`${componentCls}-fade-leave`]: {
        animationTimingFunction: motionEaseInOut,
        animationFillMode: 'both',
        animationDuration: motionDurationMid,
        animationPlayState: 'paused'
      },
      [`${componentCls}-fade-enter${componentCls}-fade-enter-active, ${componentCls}-fade-appear${componentCls}-fade-appear-active`]: {
        animationPlayState: 'running'
      },
      [`${componentCls}-fade-leave${componentCls}-fade-leave-active`]: {
        animationName: fadeOut,
        animationPlayState: 'running'
      },
      // RTL
      '&-rtl': {
        direction: 'rtl',
        [`${noticeCls}-btn`]: {
          float: 'left'
        }
      }
    })
  },
  // ============================ Notice ============================
  {
    [componentCls]: {
      [`${noticeCls}-wrapper`]: Object.assign({}, noticeStyle)
    }
  },
  // ============================= Pure =============================
  {
    [`${noticeCls}-pure-panel`]: Object.assign(Object.assign({}, noticeStyle), {
      margin: 0
    })
  }];
};
// ============================== Export ==============================
var _default = exports.default = (0, _internal.genComponentStyleHook)('Notification', token => {
  const notificationPaddingVertical = token.paddingMD;
  const notificationPaddingHorizontal = token.paddingLG;
  const notificationToken = (0, _internal.mergeToken)(token, {
    notificationBg: token.colorBgElevated,
    notificationPaddingVertical,
    notificationPaddingHorizontal,
    notificationIconSize: token.fontSizeLG * token.lineHeightLG,
    notificationCloseButtonSize: token.controlHeightLG * 0.55,
    notificationMarginBottom: token.margin,
    notificationPadding: `${token.paddingMD}px ${token.paddingContentHorizontalLG}px`,
    notificationMarginEdge: token.marginLG,
    animationMaxHeight: 150,
    notificationStackLayer: 3
  });
  return [genNotificationStyle(notificationToken), (0, _placement.default)(notificationToken), (0, _stack.default)(notificationToken)];
}, token => ({
  zIndexPopup: token.zIndexPopupBase + 50,
  width: 384
}));