import { Keyframes } from '@ant-design/cssinjs';
const genNotificationPlacementStyle = token => {
  const {
    componentCls,
    notificationMarginEdge,
    animationMaxHeight
  } = token;
  const noticeCls = `${componentCls}-notice`;
  const rightFadeIn = new Keyframes('antNotificationFadeIn', {
    '0%': {
      transform: `translate3d(100%, 0, 0)`,
      opacity: 0
    },
    '100%': {
      transform: `translate3d(0, 0, 0)`,
      opacity: 1
    }
  });
  const topFadeIn = new Keyframes('antNotificationTopFadeIn', {
    '0%': {
      top: -animationMaxHeight,
      opacity: 0
    },
    '100%': {
      top: 0,
      opacity: 1
    }
  });
  const bottomFadeIn = new Keyframes('antNotificationBottomFadeIn', {
    '0%': {
      bottom: -animationMaxHeight,
      opacity: 0
    },
    '100%': {
      bottom: 0,
      opacity: 1
    }
  });
  const leftFadeIn = new Keyframes('antNotificationLeftFadeIn', {
    '0%': {
      transform: `translate3d(-100%, 0, 0)`,
      opacity: 0
    },
    '100%': {
      transform: `translate3d(0, 0, 0)`,
      opacity: 1
    }
  });
  return {
    [componentCls]: {
      [`&${componentCls}-top, &${componentCls}-bottom`]: {
        marginInline: 0,
        [noticeCls]: {
          marginInline: 'auto auto'
        }
      },
      [`&${componentCls}-top`]: {
        [`${componentCls}-fade-enter${componentCls}-fade-enter-active, ${componentCls}-fade-appear${componentCls}-fade-appear-active`]: {
          animationName: topFadeIn
        }
      },
      [`&${componentCls}-bottom`]: {
        [`${componentCls}-fade-enter${componentCls}-fade-enter-active, ${componentCls}-fade-appear${componentCls}-fade-appear-active`]: {
          animationName: bottomFadeIn
        }
      },
      [`&${componentCls}-topRight, &${componentCls}-bottomRight`]: {
        [`${componentCls}-fade-enter${componentCls}-fade-enter-active, ${componentCls}-fade-appear${componentCls}-fade-appear-active`]: {
          animationName: rightFadeIn
        }
      },
      [`&${componentCls}-topLeft, &${componentCls}-bottomLeft`]: {
        marginInlineEnd: 0,
        marginInlineStart: notificationMarginEdge,
        [noticeCls]: {
          marginInlineEnd: 'auto',
          marginInlineStart: 0
        },
        [`${componentCls}-fade-enter${componentCls}-fade-enter-active, ${componentCls}-fade-appear${componentCls}-fade-appear-active`]: {
          animationName: leftFadeIn
        }
      }
    }
  };
};
export default genNotificationPlacementStyle;