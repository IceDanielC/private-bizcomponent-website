/* eslint-disable no-redeclare */
import { useContext } from 'react';
import { useStyleRegister } from '@ant-design/cssinjs';
import { warning } from 'rc-util';
import { ConfigContext } from '../../config-provider/context';
import { genCommonStyle, genLinkStyle } from '../../style';
import useToken from '../useToken';
import statisticToken, { merge as mergeToken } from './statistic';
import useResetIconStyle from './useResetIconStyle';
export default function genComponentStyleHook(componentName, styleFn, getDefaultToken) {
  let options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
  const cells = Array.isArray(componentName) ? componentName : [componentName, componentName];
  const [component] = cells;
  const concatComponent = cells.join('-');
  return prefixCls => {
    const [theme, token, hashId] = useToken();
    const {
      getPrefixCls,
      iconPrefixCls,
      csp
    } = useContext(ConfigContext);
    const rootPrefixCls = getPrefixCls();
    // Shared config
    const sharedConfig = {
      theme,
      token,
      hashId,
      nonce: () => csp === null || csp === void 0 ? void 0 : csp.nonce,
      clientOnly: options.clientOnly,
      // antd is always at top of styles
      order: options.order || -999
    };
    // Generate style for all a tags in antd component.
    useStyleRegister(Object.assign(Object.assign({}, sharedConfig), {
      clientOnly: false,
      path: ['Shared', rootPrefixCls]
    }), () => [{
      // Link
      '&': genLinkStyle(token)
    }]);
    // Generate style for icons
    useResetIconStyle(iconPrefixCls);
    return [useStyleRegister(Object.assign(Object.assign({}, sharedConfig), {
      path: [concatComponent, prefixCls, iconPrefixCls]
    }), () => {
      const {
        token: proxyToken,
        flush
      } = statisticToken(token);
      const customComponentToken = Object.assign({}, token[component]);
      if (options.deprecatedTokens) {
        const {
          deprecatedTokens
        } = options;
        deprecatedTokens.forEach(_ref => {
          let [oldTokenKey, newTokenKey] = _ref;
          var _a;
          if (process.env.NODE_ENV !== 'production') {
            process.env.NODE_ENV !== "production" ? warning(!(customComponentToken === null || customComponentToken === void 0 ? void 0 : customComponentToken[oldTokenKey]), `The token '${String(oldTokenKey)}' of ${component} had deprecated, use '${String(newTokenKey)}' instead.`) : void 0;
          }
          // Should wrap with `if` clause, or there will be `undefined` in object.
          if ((customComponentToken === null || customComponentToken === void 0 ? void 0 : customComponentToken[oldTokenKey]) || (customComponentToken === null || customComponentToken === void 0 ? void 0 : customComponentToken[newTokenKey])) {
            (_a = customComponentToken[newTokenKey]) !== null && _a !== void 0 ? _a : customComponentToken[newTokenKey] = customComponentToken === null || customComponentToken === void 0 ? void 0 : customComponentToken[oldTokenKey];
          }
        });
      }
      const defaultComponentToken = typeof getDefaultToken === 'function' ? getDefaultToken(mergeToken(proxyToken, customComponentToken !== null && customComponentToken !== void 0 ? customComponentToken : {})) : getDefaultToken;
      const mergedComponentToken = Object.assign(Object.assign({}, defaultComponentToken), customComponentToken);
      const componentCls = `.${prefixCls}`;
      const mergedToken = mergeToken(proxyToken, {
        componentCls,
        prefixCls,
        iconCls: `.${iconPrefixCls}`,
        antCls: `.${rootPrefixCls}`
      }, mergedComponentToken);
      const styleInterpolation = styleFn(mergedToken, {
        hashId,
        prefixCls,
        rootPrefixCls,
        iconPrefixCls,
        overrideComponentToken: customComponentToken
      });
      flush(component, mergedComponentToken);
      return [options.resetStyle === false ? null : genCommonStyle(token, prefixCls), styleInterpolation];
    }), hashId];
  };
}
export const genSubStyleComponent = (componentName, styleFn, getDefaultToken, options) => {
  const useStyle = genComponentStyleHook(componentName, styleFn, getDefaultToken, Object.assign({
    resetStyle: false,
    // Sub Style should default after root one
    order: -998
  }, options));
  const StyledComponent = _ref2 => {
    let {
      prefixCls
    } = _ref2;
    useStyle(prefixCls);
    return null;
  };
  if (process.env.NODE_ENV !== 'production') {
    StyledComponent.displayName = `SubStyle_${Array.isArray(componentName) ? componentName.join('.') : componentName}`;
  }
  return StyledComponent;
};