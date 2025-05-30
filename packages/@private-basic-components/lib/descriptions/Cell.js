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
function notEmpty(val) {
  return val !== undefined && val !== null;
}
const Cell = props => {
  const {
    itemPrefixCls,
    component,
    span,
    className,
    style,
    labelStyle,
    contentStyle,
    bordered,
    label,
    content,
    colon
  } = props;
  const Component = component;
  if (bordered) {
    return /*#__PURE__*/React.createElement(Component, {
      className: (0, _classnames.default)({
        [`${itemPrefixCls}-item-label`]: notEmpty(label),
        [`${itemPrefixCls}-item-content`]: notEmpty(content)
      }, className),
      style: style,
      colSpan: span
    }, notEmpty(label) && /*#__PURE__*/React.createElement("span", {
      style: labelStyle
    }, label), notEmpty(content) && /*#__PURE__*/React.createElement("span", {
      style: contentStyle
    }, content));
  }
  return /*#__PURE__*/React.createElement(Component, {
    className: (0, _classnames.default)(`${itemPrefixCls}-item`, className),
    style: style,
    colSpan: span
  }, /*#__PURE__*/React.createElement("div", {
    className: `${itemPrefixCls}-item-container`
  }, (label || label === 0) && (/*#__PURE__*/React.createElement("span", {
    className: (0, _classnames.default)(`${itemPrefixCls}-item-label`, {
      [`${itemPrefixCls}-item-no-colon`]: !colon
    }),
    style: labelStyle
  }, label)), (content || content === 0) && (/*#__PURE__*/React.createElement("span", {
    className: (0, _classnames.default)(`${itemPrefixCls}-item-content`),
    style: contentStyle
  }, content))));
};
var _default = exports.default = Cell;