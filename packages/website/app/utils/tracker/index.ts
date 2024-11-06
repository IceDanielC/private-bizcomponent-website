interface TrackerEvent {
  eventType: string; // 事件类型
  eventName: string; // 事件名称
  pageUrl: string; // 页面URL
  timestamp: number; // 时间戳
  userId?: string; // 用户ID（可选）
  deviceInfo?: {
    // 设备信息
    userAgent: string;
    screenResolution: string;
    platform: string;
  };
  properties?: Record<string, unknown>; // 自定义属性
}

class Tracker {
  private readonly endpoint: string; // 数据上报的接口地址
  private userId: string | null;

  constructor(endpoint: string) {
    this.endpoint = endpoint;
    this.userId = this.getUserId();
    this.initAutoTrack();
  }

  // 获取或生成用户ID
  private getUserId(): string {
    let userId = localStorage.getItem('tracker_user_id');
    if (!userId) {
      userId = 'user_' + Math.random().toString(36).substr(2, 9);
      localStorage.setItem('tracker_user_id', userId);
    }
    return userId;
  }

  // 获取设备信息
  private getDeviceInfo() {
    return {
      userAgent: navigator.userAgent,
      screenResolution: `${window.screen.width}x${window.screen.height}`,
      platform: navigator.platform
    };
  }

  // 发送数据到服务器
  private async send(data: TrackerEvent) {
    try {
      if (navigator.sendBeacon) {
        // 优先使用 sendBeacon，它更可靠且不会阻塞页面卸载
        navigator.sendBeacon(this.endpoint, JSON.stringify(data));
      } else {
        // 降级使用 fetch
        await fetch(this.endpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data),
          // 使用 keepalive 确保数据发送完成
          keepalive: true
        });
      }
    } catch (error) {
      console.error('Tracking error:', error);
    }
  }

  // 初始化自动追踪
  private initAutoTrack() {
    // 页面访问追踪
    this.track('page_view', 'page_view');

    // 点击事件追踪
    document.addEventListener('click', (e) => {
      const target = e.target as HTMLElement;
      if (target.hasAttribute('data-track')) {
        this.track('click', target.getAttribute('data-track') || 'unknown_element');
      }
    });

    // 页面停留时间追踪
    const startTime = Date.now();
    window.addEventListener('beforeunload', () => {
      const duration = Date.now() - startTime;
      this.track('page_duration', 'page_leave', { duration });
    });
  }

  // 公共追踪方法
  public track(eventType: string, eventName: string, properties?: Record<string, unknown>) {
    const event: TrackerEvent = {
      eventType,
      eventName,
      pageUrl: window.location.href,
      timestamp: Date.now(),
      userId: this.userId || undefined,
      deviceInfo: this.getDeviceInfo(),
      properties
    };

    this.send(event);
  }

  // 设置用户ID
  public setUserId(userId: string) {
    this.userId = userId;
    localStorage.setItem('tracker_user_id', userId);
  }
}

// 创建单例
export const tracker = new Tracker('https://your-analytics-api.com/collect');
