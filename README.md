# private-bizcomponent-website

一个基于私有组件库（`@private-basic-components`）渲染业务组件的 monorepo 项目。

## 项目结构

```bash
packages
├── @private-basic-components // 私有组件库
├── website // 业务组件网站，主要用于通过storybook展示业务组件
```

## 快速开始

### 依赖安装

```bash
npm install -g nrm
pnpm install
```

### 启动业务组件 storybook 文档网站

```bash
cd website
pnpm storybook
```

### 构建私有组件 RAG 知识文档

```bash
cd @private-basic-components
node ai-docs/format-docs.js
```
