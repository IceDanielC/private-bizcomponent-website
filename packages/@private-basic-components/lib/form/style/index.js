"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.prepareToken = exports.default = void 0;
var _style = require("../../style");
var _motion = require("../../style/motion");
var _internal = require("../../theme/internal");
var _explain = _interopRequireDefault(require("./explain"));
const resetForm = token => ({
  legend: {
    display: 'block',
    width: '100%',
    marginBottom: token.marginLG,
    padding: 0,
    color: token.colorTextDescription,
    fontSize: token.fontSizeLG,
    lineHeight: 'inherit',
    border: 0,
    borderBottom: `${token.lineWidth}px ${token.lineType} ${token.colorBorder}`
  },
  label: {
    fontSize: token.fontSize
  },
  'input[type="search"]': {
    boxSizing: 'border-box'
  },
  // Position radios and checkboxes better
  'input[type="radio"], input[type="checkbox"]': {
    lineHeight: 'normal'
  },
  'input[type="file"]': {
    display: 'block'
  },
  // Make range inputs behave like textual form controls
  'input[type="range"]': {
    display: 'block',
    width: '100%'
  },
  // Make multiple select elements height not fixed
  'select[multiple], select[size]': {
    height: 'auto'
  },
  // Focus for file, radio, and checkbox
  [`input[type='file']:focus,
  input[type='radio']:focus,
  input[type='checkbox']:focus`]: {
    outline: 0,
    boxShadow: `0 0 0 ${token.controlOutlineWidth}px ${token.controlOutline}`
  },
  // Adjust output element
  output: {
    display: 'block',
    paddingTop: 15,
    color: token.colorText,
    fontSize: token.fontSize,
    lineHeight: token.lineHeight
  }
});
const genFormSize = (token, height) => {
  const {
    formItemCls
  } = token;
  return {
    [formItemCls]: {
      [`${formItemCls}-label > label`]: {
        height
      },
      [`${formItemCls}-control-input`]: {
        minHeight: height
      }
    }
  };
};
const genFormStyle = token => {
  const {
    componentCls
  } = token;
  return {
    [token.componentCls]: Object.assign(Object.assign(Object.assign({}, (0, _style.resetComponent)(token)), resetForm(token)), {
      [`${componentCls}-text`]: {
        display: 'inline-block',
        paddingInlineEnd: token.paddingSM
      },
      // ================================================================
      // =                             Size                             =
      // ================================================================
      '&-small': Object.assign({}, genFormSize(token, token.controlHeightSM)),
      '&-large': Object.assign({}, genFormSize(token, token.controlHeightLG))
    })
  };
};
const genFormItemStyle = token => {
  const {
    formItemCls,
    iconCls,
    componentCls,
    rootPrefixCls,
    labelRequiredMarkColor,
    labelColor,
    labelFontSize,
    labelHeight,
    labelColonMarginInlineStart,
    labelColonMarginInlineEnd,
    itemMarginBottom
  } = token;
  return {
    [formItemCls]: Object.assign(Object.assign({}, (0, _style.resetComponent)(token)), {
      marginBottom: itemMarginBottom,
      verticalAlign: 'top',
      '&-with-help': {
        transition: 'none'
      },
      [`&-hidden,
        &-hidden.${rootPrefixCls}-row`]: {
        // https://github.com/ant-design/ant-design/issues/26141
        display: 'none'
      },
      '&-has-warning': {
        [`${formItemCls}-split`]: {
          color: token.colorError
        }
      },
      '&-has-error': {
        [`${formItemCls}-split`]: {
          color: token.colorWarning
        }
      },
      // ==============================================================
      // =                            Label                           =
      // ==============================================================
      [`${formItemCls}-label`]: {
        flexGrow: 0,
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        textAlign: 'end',
        verticalAlign: 'middle',
        '&-left': {
          textAlign: 'start'
        },
        '&-wrap': {
          overflow: 'unset',
          lineHeight: `${token.lineHeight} - 0.25em`,
          whiteSpace: 'unset'
        },
        '> label': {
          position: 'relative',
          display: 'inline-flex',
          alignItems: 'center',
          maxWidth: '100%',
          height: labelHeight,
          color: labelColor,
          fontSize: labelFontSize,
          [`> ${iconCls}`]: {
            fontSize: token.fontSize,
            verticalAlign: 'top'
          },
          // Required mark
          [`&${formItemCls}-required:not(${formItemCls}-required-mark-optional)::before`]: {
            display: 'inline-block',
            marginInlineEnd: token.marginXXS,
            color: labelRequiredMarkColor,
            fontSize: token.fontSize,
            fontFamily: 'SimSun, sans-serif',
            lineHeight: 1,
            content: '"*"',
            [`${componentCls}-hide-required-mark &`]: {
              display: 'none'
            }
          },
          // Optional mark
          [`${formItemCls}-optional`]: {
            display: 'inline-block',
            marginInlineStart: token.marginXXS,
            color: token.colorTextDescription,
            [`${componentCls}-hide-required-mark &`]: {
              display: 'none'
            }
          },
          // Optional mark
          [`${formItemCls}-tooltip`]: {
            color: token.colorTextDescription,
            cursor: 'help',
            writingMode: 'horizontal-tb',
            marginInlineStart: token.marginXXS
          },
          '&::after': {
            content: '":"',
            position: 'relative',
            marginBlock: 0,
            marginInlineStart: labelColonMarginInlineStart,
            marginInlineEnd: labelColonMarginInlineEnd
          },
          [`&${formItemCls}-no-colon::after`]: {
            content: '"\\a0"'
          }
        }
      },
      // ==============================================================
      // =                            Input                           =
      // ==============================================================
      [`${formItemCls}-control`]: {
        ['--ant-display']: 'flex',
        flexDirection: 'column',
        flexGrow: 1,
        [`&:first-child:not([class^="'${rootPrefixCls}-col-'"]):not([class*="' ${rootPrefixCls}-col-'"])`]: {
          width: '100%'
        },
        '&-input': {
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          minHeight: token.controlHeight,
          '&-content': {
            flex: 'auto',
            maxWidth: '100%'
          }
        }
      },
      // ==============================================================
      // =                           Explain                          =
      // ==============================================================
      [formItemCls]: {
        '&-explain, &-extra': {
          clear: 'both',
          color: token.colorTextDescription,
          fontSize: token.fontSize,
          lineHeight: token.lineHeight
        },
        '&-explain-connected': {
          width: '100%'
        },
        '&-extra': {
          minHeight: token.controlHeightSM,
          transition: `color ${token.motionDurationMid} ${token.motionEaseOut}` // sync input color transition
        },
        '&-explain': {
          '&-error': {
            color: token.colorError
          },
          '&-warning': {
            color: token.colorWarning
          }
        }
      },
      [`&-with-help ${formItemCls}-explain`]: {
        height: 'auto',
        opacity: 1
      },
      // ==============================================================
      // =                        Feedback Icon                       =
      // ==============================================================
      [`${formItemCls}-feedback-icon`]: {
        fontSize: token.fontSize,
        textAlign: 'center',
        visibility: 'visible',
        animationName: _motion.zoomIn,
        animationDuration: token.motionDurationMid,
        animationTimingFunction: token.motionEaseOutBack,
        pointerEvents: 'none',
        '&-success': {
          color: token.colorSuccess
        },
        '&-error': {
          color: token.colorError
        },
        '&-warning': {
          color: token.colorWarning
        },
        '&-validating': {
          color: token.colorPrimary
        }
      }
    })
  };
};
const genHorizontalStyle = token => {
  const {
    componentCls,
    formItemCls
  } = token;
  return {
    [`${componentCls}-horizontal`]: {
      [`${formItemCls}-label`]: {
        flexGrow: 0
      },
      [`${formItemCls}-control`]: {
        flex: '1 1 0',
        // https://github.com/ant-design/ant-design/issues/32777
        // https://github.com/ant-design/ant-design/issues/33773
        minWidth: 0
      },
      // Do not change this to `ant-col-24`! `-24` match all the responsive rules
      // https://github.com/ant-design/ant-design/issues/32980
      // https://github.com/ant-design/ant-design/issues/34903
      // https://github.com/ant-design/ant-design/issues/44538
      [`${formItemCls}-label[class$='-24'], ${formItemCls}-label[class*='-24 ']`]: {
        [`& + ${formItemCls}-control`]: {
          minWidth: 'unset'
        }
      }
    }
  };
};
const genInlineStyle = token => {
  const {
    componentCls,
    formItemCls
  } = token;
  return {
    [`${componentCls}-inline`]: {
      display: 'flex',
      flexWrap: 'wrap',
      [formItemCls]: {
        flex: 'none',
        marginInlineEnd: token.margin,
        marginBottom: 0,
        '&-row': {
          flexWrap: 'nowrap'
        },
        [`> ${formItemCls}-label,
        > ${formItemCls}-control`]: {
          display: 'inline-block',
          verticalAlign: 'top'
        },
        [`> ${formItemCls}-label`]: {
          flex: 'none'
        },
        [`${componentCls}-text`]: {
          display: 'inline-block'
        },
        [`${formItemCls}-has-feedback`]: {
          display: 'inline-block'
        }
      }
    }
  };
};
const makeVerticalLayoutLabel = token => ({
  padding: token.verticalLabelPadding,
  margin: token.verticalLabelMargin,
  whiteSpace: 'initial',
  textAlign: 'start',
  '> label': {
    margin: 0,
    '&::after': {
      // https://github.com/ant-design/ant-design/issues/43538
      visibility: 'hidden'
    }
  }
});
const makeVerticalLayout = token => {
  const {
    componentCls,
    formItemCls,
    rootPrefixCls
  } = token;
  return {
    [`${formItemCls} ${formItemCls}-label`]: makeVerticalLayoutLabel(token),
    [componentCls]: {
      [formItemCls]: {
        flexWrap: 'wrap',
        [`${formItemCls}-label, ${formItemCls}-control`]: {
          // When developer pass `xs: { span }`,
          // It should follow the `xs` screen config
          // ref: https://github.com/ant-design/ant-design/issues/44386
          [`&:not([class*=" ${rootPrefixCls}-col-xs"])`]: {
            flex: '0 0 100%',
            maxWidth: '100%'
          }
        }
      }
    }
  };
};
const genVerticalStyle = token => {
  const {
    componentCls,
    formItemCls,
    rootPrefixCls
  } = token;
  return {
    [`${componentCls}-vertical`]: {
      [formItemCls]: {
        '&-row': {
          flexDirection: 'column'
        },
        '&-label > label': {
          height: 'auto'
        },
        [`${componentCls}-item-control`]: {
          width: '100%'
        }
      }
    },
    [`${componentCls}-vertical ${formItemCls}-label,
      .${rootPrefixCls}-col-24${formItemCls}-label,
      .${rootPrefixCls}-col-xl-24${formItemCls}-label`]: makeVerticalLayoutLabel(token),
    [`@media (max-width: ${token.screenXSMax}px)`]: [makeVerticalLayout(token), {
      [componentCls]: {
        [`.${rootPrefixCls}-col-xs-24${formItemCls}-label`]: makeVerticalLayoutLabel(token)
      }
    }],
    [`@media (max-width: ${token.screenSMMax}px)`]: {
      [componentCls]: {
        [`.${rootPrefixCls}-col-sm-24${formItemCls}-label`]: makeVerticalLayoutLabel(token)
      }
    },
    [`@media (max-width: ${token.screenMDMax}px)`]: {
      [componentCls]: {
        [`.${rootPrefixCls}-col-md-24${formItemCls}-label`]: makeVerticalLayoutLabel(token)
      }
    },
    [`@media (max-width: ${token.screenLGMax}px)`]: {
      [componentCls]: {
        [`.${rootPrefixCls}-col-lg-24${formItemCls}-label`]: makeVerticalLayoutLabel(token)
      }
    }
  };
};
// ============================== Export ==============================
const prepareToken = (token, rootPrefixCls) => {
  const formToken = (0, _internal.mergeToken)(token, {
    formItemCls: `${token.componentCls}-item`,
    rootPrefixCls
  });
  return formToken;
};
exports.prepareToken = prepareToken;
var _default = exports.default = (0, _internal.genComponentStyleHook)('Form', (token, _ref) => {
  let {
    rootPrefixCls
  } = _ref;
  const formToken = prepareToken(token, rootPrefixCls);
  return [genFormStyle(formToken), genFormItemStyle(formToken), (0, _explain.default)(formToken), genHorizontalStyle(formToken), genInlineStyle(formToken), genVerticalStyle(formToken), (0, _motion.genCollapseMotion)(formToken), _motion.zoomIn];
}, token => ({
  labelRequiredMarkColor: token.colorError,
  labelColor: token.colorTextHeading,
  labelFontSize: token.fontSize,
  labelHeight: token.controlHeight,
  labelColonMarginInlineStart: token.marginXXS / 2,
  labelColonMarginInlineEnd: token.marginXS,
  itemMarginBottom: token.marginLG,
  verticalLabelPadding: `0 0 ${token.paddingXS}px`,
  verticalLabelMargin: 0
}), {
  // Let From style before the Grid
  // ref https://github.com/ant-design/ant-design/issues/44386
  order: -1000
});