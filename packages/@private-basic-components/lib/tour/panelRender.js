"use strict";
"use client";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));
var _CloseOutlined = _interopRequireDefault(require("@ant-design/icons/CloseOutlined"));
var _classnames = _interopRequireDefault(require("classnames"));
var _react = _interopRequireDefault(require("react"));
var _button = _interopRequireDefault(require("../button"));
var _locale = require("../locale");
var _en_US = _interopRequireDefault(require("../locale/en_US"));
var _useClosable = _interopRequireDefault(require("../_util/hooks/useClosable"));
function isValidNode(node) {
  return node !== undefined && node !== null;
}
// Due to the independent design of Panel, it will be too coupled to put in rc-tour,
// so a set of Panel logic is implemented separately in antd.
const TourPanel = _ref => {
  let {
    stepProps,
    current,
    type,
    indicatorsRender,
    closeIcon
  } = _ref;
  var _a, _b;
  const {
    prefixCls,
    total = 1,
    title,
    onClose,
    onPrev,
    onNext,
    onFinish,
    cover,
    description,
    nextButtonProps,
    prevButtonProps,
    type: stepType,
    closeIcon: stepCloseIcon
  } = stepProps;
  const mergedType = stepType !== null && stepType !== void 0 ? stepType : type;
  const mergedCloseIcon = stepCloseIcon !== null && stepCloseIcon !== void 0 ? stepCloseIcon : closeIcon;
  const mergedClosable = mergedCloseIcon !== false && mergedCloseIcon !== null;
  const [closable, mergedDisplayCloseIcon] = (0, _useClosable.default)(mergedClosable, mergedCloseIcon, icon => (/*#__PURE__*/_react.default.createElement("span", {
    onClick: onClose,
    "aria-label": "Close",
    className: `${prefixCls}-close`
  }, icon)), /*#__PURE__*/_react.default.createElement(_CloseOutlined.default, {
    className: `${prefixCls}-close-icon`
  }), true);
  const isLastStep = current === total - 1;
  const prevBtnClick = () => {
    var _a;
    onPrev === null || onPrev === void 0 ? void 0 : onPrev();
    (_a = prevButtonProps === null || prevButtonProps === void 0 ? void 0 : prevButtonProps.onClick) === null || _a === void 0 ? void 0 : _a.call(prevButtonProps);
  };
  const nextBtnClick = () => {
    var _a;
    if (isLastStep) {
      onFinish === null || onFinish === void 0 ? void 0 : onFinish();
    } else {
      onNext === null || onNext === void 0 ? void 0 : onNext();
    }
    (_a = nextButtonProps === null || nextButtonProps === void 0 ? void 0 : nextButtonProps.onClick) === null || _a === void 0 ? void 0 : _a.call(nextButtonProps);
  };
  const headerNode = isValidNode(title) ? (/*#__PURE__*/_react.default.createElement("div", {
    className: `${prefixCls}-header`
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: `${prefixCls}-title`
  }, title))) : null;
  const descriptionNode = isValidNode(description) ? (/*#__PURE__*/_react.default.createElement("div", {
    className: `${prefixCls}-description`
  }, description)) : null;
  const coverNode = isValidNode(cover) ? /*#__PURE__*/_react.default.createElement("div", {
    className: `${prefixCls}-cover`
  }, cover) : null;
  let mergeIndicatorNode;
  if (indicatorsRender) {
    mergeIndicatorNode = indicatorsRender(current, total);
  } else {
    mergeIndicatorNode = (0, _toConsumableArray2.default)(Array.from({
      length: total
    }).keys()).map((stepItem, index) => (/*#__PURE__*/_react.default.createElement("span", {
      key: stepItem,
      className: (0, _classnames.default)(index === current && `${prefixCls}-indicator-active`, `${prefixCls}-indicator`)
    })));
  }
  const mainBtnType = mergedType === 'primary' ? 'default' : 'primary';
  const secondaryBtnProps = {
    type: 'default',
    ghost: mergedType === 'primary'
  };
  const [contextLocale] = (0, _locale.useLocale)('Tour', _en_US.default.Tour);
  return /*#__PURE__*/_react.default.createElement("div", {
    className: `${prefixCls}-content`
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: `${prefixCls}-inner`
  }, closable && mergedDisplayCloseIcon, coverNode, headerNode, descriptionNode, /*#__PURE__*/_react.default.createElement("div", {
    className: `${prefixCls}-footer`
  }, total > 1 && /*#__PURE__*/_react.default.createElement("div", {
    className: `${prefixCls}-indicators`
  }, mergeIndicatorNode), /*#__PURE__*/_react.default.createElement("div", {
    className: `${prefixCls}-buttons`
  }, current !== 0 ? (/*#__PURE__*/_react.default.createElement(_button.default, Object.assign({}, secondaryBtnProps, prevButtonProps, {
    onClick: prevBtnClick,
    size: "small",
    className: (0, _classnames.default)(`${prefixCls}-prev-btn`, prevButtonProps === null || prevButtonProps === void 0 ? void 0 : prevButtonProps.className)
  }), (_a = prevButtonProps === null || prevButtonProps === void 0 ? void 0 : prevButtonProps.children) !== null && _a !== void 0 ? _a : contextLocale === null || contextLocale === void 0 ? void 0 : contextLocale.Previous)) : null, /*#__PURE__*/_react.default.createElement(_button.default, Object.assign({
    type: mainBtnType
  }, nextButtonProps, {
    onClick: nextBtnClick,
    size: "small",
    className: (0, _classnames.default)(`${prefixCls}-next-btn`, nextButtonProps === null || nextButtonProps === void 0 ? void 0 : nextButtonProps.className)
  }), (_b = nextButtonProps === null || nextButtonProps === void 0 ? void 0 : nextButtonProps.children) !== null && _b !== void 0 ? _b : isLastStep ? contextLocale === null || contextLocale === void 0 ? void 0 : contextLocale.Finish : contextLocale === null || contextLocale === void 0 ? void 0 : contextLocale.Next)))));
};
var _default = exports.default = TourPanel;