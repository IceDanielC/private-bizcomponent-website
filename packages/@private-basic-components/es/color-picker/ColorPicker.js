"use client";

import React, { useContext, useMemo, useRef, useState } from 'react';
import classNames from 'classnames';
import useMergedState from "rc-util/es/hooks/useMergedState";
import genPurePanel from '../_util/PurePanel';
import { getStatusClassNames } from '../_util/statusUtils';
import { devUseWarning } from '../_util/warning';
import { ConfigContext } from '../config-provider/context';
import useSize from '../config-provider/hooks/useSize';
import { FormItemInputContext, NoFormStyle } from '../form/context';
import Popover from '../popover';
import { useToken } from '../theme/internal';
import ColorPickerPanel from './ColorPickerPanel';
import ColorTrigger from './components/ColorTrigger';
import useColorState from './hooks/useColorState';
import useStyle from './style/index';
import { customizePrefixCls, genAlphaColor, generateColor, getAlphaColor } from './util';
const ColorPicker = props => {
  const {
    value,
    defaultValue,
    format,
    defaultFormat,
    allowClear = false,
    presets,
    children,
    trigger = 'click',
    open,
    disabled,
    placement = 'bottomLeft',
    arrow = true,
    panelRender,
    showText,
    style,
    className,
    size: customizeSize,
    rootClassName,
    styles,
    disabledAlpha = false,
    onFormatChange,
    onChange,
    onClear,
    onOpenChange,
    onChangeComplete,
    getPopupContainer,
    autoAdjustOverflow = true,
    destroyTooltipOnHide
  } = props;
  const {
    getPrefixCls,
    direction,
    colorPicker
  } = useContext(ConfigContext);
  const [, token] = useToken();
  const [colorValue, setColorValue] = useColorState(token.colorPrimary, {
    value,
    defaultValue
  });
  const [popupOpen, setPopupOpen] = useMergedState(false, {
    value: open,
    postState: openData => !disabled && openData,
    onChange: onOpenChange
  });
  const [formatValue, setFormatValue] = useMergedState(format, {
    value: format,
    defaultValue: defaultFormat,
    onChange: onFormatChange
  });
  const [colorCleared, setColorCleared] = useState(false);
  const prefixCls = getPrefixCls('color-picker', customizePrefixCls);
  const isAlphaColor = useMemo(() => getAlphaColor(colorValue) < 100, [colorValue]);
  // ===================== Form Status =====================
  const {
    status: contextStatus
  } = React.useContext(FormItemInputContext);
  // ===================== Style =====================
  const mergedSize = useSize(customizeSize);
  const [wrapSSR, hashId] = useStyle(prefixCls);
  const rtlCls = {
    [`${prefixCls}-rtl`]: direction
  };
  const mergeRootCls = classNames(rootClassName, rtlCls);
  const mergeCls = classNames(getStatusClassNames(prefixCls, contextStatus), {
    [`${prefixCls}-sm`]: mergedSize === 'small',
    [`${prefixCls}-lg`]: mergedSize === 'large'
  }, colorPicker === null || colorPicker === void 0 ? void 0 : colorPicker.className, mergeRootCls, className, hashId);
  const mergePopupCls = classNames(prefixCls, rtlCls);
  const popupAllowCloseRef = useRef(true);
  // ===================== Warning ======================
  if (process.env.NODE_ENV !== 'production') {
    const warning = devUseWarning('ColorPicker');
    process.env.NODE_ENV !== "production" ? warning(!(disabledAlpha && isAlphaColor), 'usage', '`disabledAlpha` will make the alpha to be 100% when use alpha color.') : void 0;
  }
  const handleChange = (data, type, pickColor) => {
    let color = generateColor(data);
    const isNull = value === null || !value && defaultValue === null;
    if (colorCleared || isNull) {
      setColorCleared(false);
      // ignore alpha slider
      if (getAlphaColor(colorValue) === 0 && type !== 'alpha') {
        color = genAlphaColor(color);
      }
    }
    // ignore alpha color
    if (disabledAlpha && isAlphaColor) {
      color = genAlphaColor(color);
    }
    // Only for drag-and-drop color picking
    if (pickColor) {
      popupAllowCloseRef.current = false;
    } else {
      onChangeComplete === null || onChangeComplete === void 0 ? void 0 : onChangeComplete(color);
    }
    setColorValue(color);
    onChange === null || onChange === void 0 ? void 0 : onChange(color, color.toHexString());
  };
  const handleClear = () => {
    setColorCleared(true);
    onClear === null || onClear === void 0 ? void 0 : onClear();
  };
  const handleChangeComplete = color => {
    popupAllowCloseRef.current = true;
    let changeColor = generateColor(color);
    // ignore alpha color
    if (disabledAlpha && isAlphaColor) {
      changeColor = genAlphaColor(color);
    }
    onChangeComplete === null || onChangeComplete === void 0 ? void 0 : onChangeComplete(changeColor);
  };
  const popoverProps = {
    open: popupOpen,
    trigger,
    placement,
    arrow,
    rootClassName,
    getPopupContainer,
    autoAdjustOverflow,
    destroyTooltipOnHide
  };
  const colorBaseProps = {
    prefixCls,
    color: colorValue,
    allowClear,
    colorCleared,
    disabled,
    disabledAlpha,
    presets,
    panelRender,
    format: formatValue,
    onFormatChange: setFormatValue,
    onChangeComplete: handleChangeComplete
  };
  const mergedStyle = Object.assign(Object.assign({}, colorPicker === null || colorPicker === void 0 ? void 0 : colorPicker.style), style);
  return wrapSSR(/*#__PURE__*/React.createElement(Popover, Object.assign({
    style: styles === null || styles === void 0 ? void 0 : styles.popup,
    overlayInnerStyle: styles === null || styles === void 0 ? void 0 : styles.popupOverlayInner,
    onOpenChange: visible => {
      if (popupAllowCloseRef.current && !disabled) {
        setPopupOpen(visible);
      }
    },
    content: /*#__PURE__*/React.createElement(NoFormStyle, {
      override: true,
      status: true
    }, /*#__PURE__*/React.createElement(ColorPickerPanel, Object.assign({}, colorBaseProps, {
      onChange: handleChange,
      onChangeComplete: handleChangeComplete,
      onClear: handleClear
    }))),
    overlayClassName: mergePopupCls
  }, popoverProps), children || (/*#__PURE__*/React.createElement(ColorTrigger, {
    open: popupOpen,
    className: mergeCls,
    style: mergedStyle,
    color: value ? generateColor(value) : colorValue,
    prefixCls: prefixCls,
    disabled: disabled,
    colorCleared: colorCleared,
    showText: showText,
    format: formatValue
  }))));
};
if (process.env.NODE_ENV !== 'production') {
  ColorPicker.displayName = 'ColorPicker';
}
const PurePanel = genPurePanel(ColorPicker, 'color-picker', /* istanbul ignore next */
prefixCls => prefixCls, props => Object.assign(Object.assign({}, props), {
  placement: 'bottom',
  autoAdjustOverflow: false
}));
ColorPicker._InternalPanelDoNotUseOrYouWillBeFired = PurePanel;
export default ColorPicker;