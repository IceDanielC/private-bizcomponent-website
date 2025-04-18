"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.genActiveStyle = exports.default = void 0;
var _internal = require("../../theme/internal");
var _colorBlock = _interopRequireDefault(require("./color-block"));
var _input = _interopRequireDefault(require("./input"));
var _picker = _interopRequireDefault(require("./picker"));
var _presets = _interopRequireDefault(require("./presets"));
const genActiveStyle = (token, borderColor) => ({
  borderInlineEndWidth: token.lineWidth,
  borderColor,
  outline: 0
});
exports.genActiveStyle = genActiveStyle;
const genRtlStyle = token => {
  const {
    componentCls
  } = token;
  return {
    '&-rtl': {
      [`${componentCls}-presets-color`]: {
        '&::after': {
          direction: 'ltr'
        }
      },
      [`${componentCls}-clear`]: {
        '&::after': {
          direction: 'ltr'
        }
      }
    }
  };
};
const genClearStyle = (token, size, extraStyle) => {
  const {
    componentCls,
    borderRadiusSM,
    lineWidth,
    colorSplit,
    red6
  } = token;
  return {
    [`${componentCls}-clear`]: Object.assign(Object.assign({
      width: size,
      height: size,
      borderRadius: borderRadiusSM,
      border: `${lineWidth}px solid ${colorSplit}`,
      position: 'relative',
      cursor: 'pointer',
      overflow: 'hidden'
    }, extraStyle), {
      '&::after': {
        content: '""',
        position: 'absolute',
        insetInlineEnd: lineWidth,
        top: 0,
        display: 'block',
        width: 40,
        height: 2,
        transformOrigin: 'right',
        transform: 'rotate(-45deg)',
        backgroundColor: red6
      }
    })
  };
};
const genStatusStyle = token => {
  const {
    componentCls,
    colorError,
    colorWarning,
    colorErrorHover,
    colorWarningHover
  } = token;
  return {
    [`&${componentCls}-status-error`]: {
      borderColor: colorError,
      '&:hover': {
        borderColor: colorErrorHover
      },
      [`&${componentCls}-trigger-active`]: Object.assign({}, genActiveStyle(token, colorError))
    },
    [`&${componentCls}-status-warning`]: {
      borderColor: colorWarning,
      '&:hover': {
        borderColor: colorWarningHover
      },
      [`&${componentCls}-trigger-active`]: Object.assign({}, genActiveStyle(token, colorWarning))
    }
  };
};
const genSizeStyle = token => {
  const {
    componentCls,
    controlHeightLG,
    controlHeightSM,
    controlHeight,
    controlHeightXS,
    borderRadius,
    borderRadiusSM,
    borderRadiusXS,
    borderRadiusLG,
    fontSizeLG
  } = token;
  return {
    [`&${componentCls}-lg`]: {
      minWidth: controlHeightLG,
      height: controlHeightLG,
      borderRadius: borderRadiusLG,
      [`${componentCls}-color-block, ${componentCls}-clear`]: {
        width: controlHeight,
        height: controlHeight,
        borderRadius
      },
      [`${componentCls}-trigger-text`]: {
        fontSize: fontSizeLG
      }
    },
    [`&${componentCls}-sm`]: {
      minWidth: controlHeightSM,
      height: controlHeightSM,
      borderRadius: borderRadiusSM,
      [`${componentCls}-color-block, ${componentCls}-clear`]: {
        width: controlHeightXS,
        height: controlHeightXS,
        borderRadius: borderRadiusXS
      }
    }
  };
};
const genColorPickerStyle = token => {
  const {
    componentCls,
    colorPickerWidth,
    colorPrimary,
    motionDurationMid,
    colorBgElevated,
    colorTextDisabled,
    colorText,
    colorBgContainerDisabled,
    borderRadius,
    marginXS,
    marginSM,
    controlHeight,
    controlHeightSM,
    colorBgTextActive,
    colorPickerPresetColorSize,
    colorPickerPreviewSize,
    lineWidth,
    colorBorder,
    paddingXXS,
    fontSize,
    colorPrimaryHover
  } = token;
  return [{
    [componentCls]: Object.assign({
      [`${componentCls}-inner-content`]: Object.assign(Object.assign(Object.assign(Object.assign({
        display: 'flex',
        flexDirection: 'column',
        width: colorPickerWidth,
        '&-divider': {
          margin: `${marginSM}px 0 ${marginXS}px`
        },
        [`${componentCls}-panel`]: Object.assign({}, (0, _picker.default)(token))
      }, (0, _colorBlock.default)(token, colorPickerPreviewSize)), (0, _input.default)(token)), (0, _presets.default)(token)), genClearStyle(token, colorPickerPresetColorSize, {
        marginInlineStart: 'auto',
        marginBottom: marginXS
      })),
      '&-trigger': Object.assign(Object.assign(Object.assign(Object.assign({
        minWidth: controlHeight,
        height: controlHeight,
        borderRadius,
        border: `${lineWidth}px solid ${colorBorder}`,
        cursor: 'pointer',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: `all ${motionDurationMid}`,
        background: colorBgElevated,
        padding: paddingXXS - lineWidth,
        [`${componentCls}-trigger-text`]: {
          marginInlineStart: marginXS,
          marginInlineEnd: marginXS - (paddingXXS - lineWidth),
          fontSize,
          color: colorText
        },
        '&:hover': {
          borderColor: colorPrimaryHover
        },
        [`&${componentCls}-trigger-active`]: Object.assign({}, genActiveStyle(token, colorPrimary)),
        '&-disabled': {
          color: colorTextDisabled,
          background: colorBgContainerDisabled,
          cursor: 'not-allowed',
          '&:hover': {
            borderColor: colorBgTextActive
          },
          [`${componentCls}-trigger-text`]: {
            color: colorTextDisabled
          }
        }
      }, genClearStyle(token, controlHeightSM)), (0, _colorBlock.default)(token, controlHeightSM)), genStatusStyle(token)), genSizeStyle(token))
    }, genRtlStyle(token))
  }];
};
var _default = exports.default = (0, _internal.genComponentStyleHook)('ColorPicker', token => {
  const {
    colorTextQuaternary,
    marginSM
  } = token;
  const colorPickerSliderHeight = 8;
  const colorPickerToken = (0, _internal.mergeToken)(token, {
    colorPickerWidth: 234,
    colorPickerHandlerSize: 16,
    colorPickerHandlerSizeSM: 12,
    colorPickerAlphaInputWidth: 44,
    colorPickerInputNumberHandleWidth: 16,
    colorPickerPresetColorSize: 18,
    colorPickerInsetShadow: `inset 0 0 1px 0 ${colorTextQuaternary}`,
    colorPickerSliderHeight,
    colorPickerPreviewSize: colorPickerSliderHeight * 2 + marginSM
  });
  return [genColorPickerStyle(colorPickerToken)];
});