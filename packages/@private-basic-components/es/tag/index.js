"use client";

var __rest = this && this.__rest || function (s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};
import * as React from 'react';
import CloseOutlined from "@ant-design/icons/es/icons/CloseOutlined";
import classNames from 'classnames';
import { isPresetColor, isPresetStatusColor } from '../_util/colors';
import useClosable from '../_util/hooks/useClosable';
import { devUseWarning } from '../_util/warning';
import Wave from '../_util/wave';
import { ConfigContext } from '../config-provider';
import CheckableTag from './CheckableTag';
import useStyle from './style';
import PresetCmp from './style/presetCmp';
import StatusCmp from './style/statusCmp';
const InternalTag = (tagProps, ref) => {
  const {
      prefixCls: customizePrefixCls,
      className,
      rootClassName,
      style,
      children,
      icon,
      color,
      onClose,
      closeIcon,
      closable,
      bordered = true
    } = tagProps,
    props = __rest(tagProps, ["prefixCls", "className", "rootClassName", "style", "children", "icon", "color", "onClose", "closeIcon", "closable", "bordered"]);
  const {
    getPrefixCls,
    direction,
    tag
  } = React.useContext(ConfigContext);
  const [visible, setVisible] = React.useState(true);
  // Warning for deprecated usage
  if (process.env.NODE_ENV !== 'production') {
    const warning = devUseWarning('Tag');
    warning.deprecated(!('visible' in props), 'visible', 'visible && <Tag />');
  }
  React.useEffect(() => {
    if ('visible' in props) {
      setVisible(props.visible);
    }
  }, [props.visible]);
  const isPreset = isPresetColor(color);
  const isStatus = isPresetStatusColor(color);
  const isInternalColor = isPreset || isStatus;
  const tagStyle = Object.assign(Object.assign({
    backgroundColor: color && !isInternalColor ? color : undefined
  }, tag === null || tag === void 0 ? void 0 : tag.style), style);
  const prefixCls = getPrefixCls('tag', customizePrefixCls);
  // Style
  const [wrapSSR, hashId] = useStyle(prefixCls);
  const tagClassName = classNames(prefixCls, tag === null || tag === void 0 ? void 0 : tag.className, {
    [`${prefixCls}-${color}`]: isInternalColor,
    [`${prefixCls}-has-color`]: color && !isInternalColor,
    [`${prefixCls}-hidden`]: !visible,
    [`${prefixCls}-rtl`]: direction === 'rtl',
    [`${prefixCls}-borderless`]: !bordered
  }, className, rootClassName, hashId);
  const handleCloseClick = e => {
    e.stopPropagation();
    onClose === null || onClose === void 0 ? void 0 : onClose(e);
    if (e.defaultPrevented) {
      return;
    }
    setVisible(false);
  };
  const [, mergedCloseIcon] = useClosable(closable, closeIcon, iconNode => iconNode === null ? (/*#__PURE__*/React.createElement(CloseOutlined, {
    className: `${prefixCls}-close-icon`,
    onClick: handleCloseClick
  })) : (/*#__PURE__*/React.createElement("span", {
    className: `${prefixCls}-close-icon`,
    onClick: handleCloseClick
  }, iconNode)), null, false);
  const isNeedWave = typeof props.onClick === 'function' || children && children.type === 'a';
  const iconNode = icon || null;
  const kids = iconNode ? (/*#__PURE__*/React.createElement(React.Fragment, null, iconNode, children && /*#__PURE__*/React.createElement("span", null, children))) : children;
  const tagNode = /*#__PURE__*/React.createElement("span", Object.assign({}, props, {
    ref: ref,
    className: tagClassName,
    style: tagStyle
  }), kids, mergedCloseIcon, isPreset && /*#__PURE__*/React.createElement(PresetCmp, {
    key: "preset",
    prefixCls: prefixCls
  }), isStatus && /*#__PURE__*/React.createElement(StatusCmp, {
    key: "status",
    prefixCls: prefixCls
  }));
  return wrapSSR(isNeedWave ? /*#__PURE__*/React.createElement(Wave, {
    component: "Tag"
  }, tagNode) : tagNode);
};
const Tag = /*#__PURE__*/React.forwardRef(InternalTag);
if (process.env.NODE_ENV !== 'production') {
  Tag.displayName = 'Tag';
}
Tag.CheckableTag = CheckableTag;
export default Tag;