"use strict";
"use client";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "List", {
  enumerable: true,
  get: function () {
    return _rcFieldForm.List;
  }
});
exports.default = void 0;
Object.defineProperty(exports, "useForm", {
  enumerable: true,
  get: function () {
    return _useForm.default;
  }
});
Object.defineProperty(exports, "useWatch", {
  enumerable: true,
  get: function () {
    return _rcFieldForm.useWatch;
  }
});
var _classnames = _interopRequireDefault(require("classnames"));
var _rcFieldForm = _interopRequireWildcard(require("rc-field-form"));
var _react = _interopRequireWildcard(require("react"));
var React = _react;
var _configProvider = require("../config-provider");
var _DisabledContext = _interopRequireWildcard(require("../config-provider/DisabledContext"));
var _SizeContext = require("../config-provider/SizeContext");
var _useSize = _interopRequireDefault(require("../config-provider/hooks/useSize"));
var _context = require("./context");
var _useForm = _interopRequireDefault(require("./hooks/useForm"));
var _useFormWarning = _interopRequireDefault(require("./hooks/useFormWarning"));
var _style = _interopRequireDefault(require("./style"));
var _validateMessagesContext = _interopRequireDefault(require("./validateMessagesContext"));
var __rest = void 0 && (void 0).__rest || function (s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};
const InternalForm = (props, ref) => {
  const contextDisabled = React.useContext(_DisabledContext.default);
  const {
    getPrefixCls,
    direction,
    form: contextForm
  } = React.useContext(_configProvider.ConfigContext);
  const {
      prefixCls: customizePrefixCls,
      className,
      rootClassName,
      size,
      disabled = contextDisabled,
      form,
      colon,
      labelAlign,
      labelWrap,
      labelCol,
      wrapperCol,
      hideRequiredMark,
      layout = 'horizontal',
      scrollToFirstError,
      requiredMark,
      onFinishFailed,
      name,
      style,
      feedbackIcons
    } = props,
    restFormProps = __rest(props, ["prefixCls", "className", "rootClassName", "size", "disabled", "form", "colon", "labelAlign", "labelWrap", "labelCol", "wrapperCol", "hideRequiredMark", "layout", "scrollToFirstError", "requiredMark", "onFinishFailed", "name", "style", "feedbackIcons"]);
  const mergedSize = (0, _useSize.default)(size);
  const contextValidateMessages = React.useContext(_validateMessagesContext.default);
  if (process.env.NODE_ENV !== 'production') {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    (0, _useFormWarning.default)(props);
  }
  const mergedRequiredMark = (0, _react.useMemo)(() => {
    if (requiredMark !== undefined) {
      return requiredMark;
    }
    if (contextForm && contextForm.requiredMark !== undefined) {
      return contextForm.requiredMark;
    }
    if (hideRequiredMark) {
      return false;
    }
    return true;
  }, [hideRequiredMark, requiredMark, contextForm]);
  const mergedColon = colon !== null && colon !== void 0 ? colon : contextForm === null || contextForm === void 0 ? void 0 : contextForm.colon;
  const prefixCls = getPrefixCls('form', customizePrefixCls);
  // Style
  const [wrapSSR, hashId] = (0, _style.default)(prefixCls);
  const formClassName = (0, _classnames.default)(prefixCls, `${prefixCls}-${layout}`, {
    [`${prefixCls}-hide-required-mark`]: mergedRequiredMark === false,
    [`${prefixCls}-rtl`]: direction === 'rtl',
    [`${prefixCls}-${mergedSize}`]: mergedSize
  }, hashId, contextForm === null || contextForm === void 0 ? void 0 : contextForm.className, className, rootClassName);
  const [wrapForm] = (0, _useForm.default)(form);
  const {
    __INTERNAL__
  } = wrapForm;
  __INTERNAL__.name = name;
  const formContextValue = (0, _react.useMemo)(() => ({
    name,
    labelAlign,
    labelCol,
    labelWrap,
    wrapperCol,
    vertical: layout === 'vertical',
    colon: mergedColon,
    requiredMark: mergedRequiredMark,
    itemRef: __INTERNAL__.itemRef,
    form: wrapForm,
    feedbackIcons
  }), [name, labelAlign, labelCol, wrapperCol, layout, mergedColon, mergedRequiredMark, wrapForm, feedbackIcons]);
  React.useImperativeHandle(ref, () => wrapForm);
  const scrollToField = (options, fieldName) => {
    if (options) {
      let defaultScrollToFirstError = {
        block: 'nearest'
      };
      if (typeof options === 'object') {
        defaultScrollToFirstError = options;
      }
      wrapForm.scrollToField(fieldName, defaultScrollToFirstError);
    }
  };
  const onInternalFinishFailed = errorInfo => {
    onFinishFailed === null || onFinishFailed === void 0 ? void 0 : onFinishFailed(errorInfo);
    if (errorInfo.errorFields.length) {
      const fieldName = errorInfo.errorFields[0].name;
      if (scrollToFirstError !== undefined) {
        scrollToField(scrollToFirstError, fieldName);
        return;
      }
      if (contextForm && contextForm.scrollToFirstError !== undefined) {
        scrollToField(contextForm.scrollToFirstError, fieldName);
      }
    }
  };
  return wrapSSR(/*#__PURE__*/React.createElement(_DisabledContext.DisabledContextProvider, {
    disabled: disabled
  }, /*#__PURE__*/React.createElement(_SizeContext.SizeContextProvider, {
    size: mergedSize
  }, /*#__PURE__*/React.createElement(_context.FormProvider, {
    // This is not list in API, we pass with spread
    validateMessages: contextValidateMessages
  }, /*#__PURE__*/React.createElement(_context.FormContext.Provider, {
    value: formContextValue
  }, /*#__PURE__*/React.createElement(_rcFieldForm.default, Object.assign({
    id: name
  }, restFormProps, {
    name: name,
    onFinishFailed: onInternalFinishFailed,
    form: wrapForm,
    style: Object.assign(Object.assign({}, contextForm === null || contextForm === void 0 ? void 0 : contextForm.style), style),
    className: formClassName
  })))))));
};
const Form = /*#__PURE__*/React.forwardRef(InternalForm);
if (process.env.NODE_ENV !== 'production') {
  Form.displayName = 'Form';
}
var _default = exports.default = Form;