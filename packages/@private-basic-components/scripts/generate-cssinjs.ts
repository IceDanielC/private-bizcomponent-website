import url from 'node:url';
import path from 'path';
import { globSync } from 'glob';
import React from 'react';

type StyleFn = (prefix?: string) => void;

interface GenCssinjsOptions {
  key: string;
  render: (component: React.FC) => void;
  beforeRender?: (componentName: string) => void;
}

export const styleFiles = globSync(
  path
    .join(
      process.cwd(),
      'components/!(version|config-provider|icon|auto-complete|col|row|time-picker|qrcode)/style/index.?(ts|tsx)'
    )
    .split(path.sep)
    .join('/')
);

export const generateCssinjs = ({ key, beforeRender, render }: GenCssinjsOptions) =>
  Promise.all(
    styleFiles.map(async (file) => {
      const absPath = url.pathToFileURL(file).href;
      const pathArr = file.split('/');
      const styleIndex = pathArr.lastIndexOf('style');
      const componentName = pathArr[styleIndex - 1];
      let useStyle: StyleFn = () => {};

      try {
        if (file.includes('grid')) {
          const { useColStyle, useRowStyle } = await import(absPath);
          useStyle = (prefixCls: string) => {
            useRowStyle(prefixCls);
            useColStyle(prefixCls);
          };
        } else {
          const imported = await import(absPath);
          // 检查导入的模块是否有默认导出，如果没有则尝试使用具名导出
          useStyle = imported.default || imported.useStyle || (() => {});
        }

        const Demo: React.FC = () => {
          useStyle(`${key}-${componentName}`);
          return React.createElement('div');
        };

        beforeRender?.(componentName);
        render?.(Demo);
      } catch (error) {
        console.warn(`Failed to process style for component ${componentName}:`, error);
        // 继续执行，不中断整个流程
      }
    })
  );
