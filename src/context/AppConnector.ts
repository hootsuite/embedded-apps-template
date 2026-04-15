/**
 * AppConnector - strongly typed data bridge for iframe communication
 */

export type EmbeddedAppContext =
  | InboxAppContext
  | AnalyticsAppContext
  | PlannerAppContext
  | ComposerAppContext
  | AmplifyAppContext;

export type InboxAppContext = {
  conversationId?: string;
  contactAttributes?: Record<string, unknown>[];
  contactAttributeDefinitions?: Record<string, unknown>[];
};

export type AnalyticsAppContext = {
  dateRange?: {
    startDate?: number;
    endDate?: number;
  };
  socialProfileIds?: Record<string, string[]>;
};

export type PlannerAppContext = {
  dateRange?: {
    startDate?: number;
    endDate?: number;
  };
  viewType?: string;
};

export type ComposerAppContext = {
  textContent?: string;
  tags?: string[];
  networkTypes?: SocialNetwork[];
  socialProfileIds?: SocialProfileIds;
  mediaAttachments?: MediaAttachment[];
};

export type AmplifyAppContext = {
  locale?: string;
};

/* Surface types */
export enum EmbeddedAppsSurfaceType {
  INBOX = 'inbox',
  ANALYTICS = 'analytics',
  AMPLIFY = 'amplify',
  PLANNER = 'planner',
  COMPOSER = 'composer',
}

/* Social profile types */
export type SocialProfileIds = {
  [key in SocialNetwork]?: string[];
};

type SocialNetwork =
  | 'FACEBOOK'
  | 'TWITTER'
  | 'LINKEDIN'
  | 'LINKEDINCOMPANY'
  | 'TIKTOKBUSINESS'
  | 'INSTAGRAMBUSINESS'
  | 'INSTAGRAM'
  | 'YOUTUBECHANNEL'
  | 'PINTEREST'
  | 'THREADS'
  | 'BLUESKY'
  | 'INSTAGRAMPROFESSIONAL';

export type MediaAttachment = {
  mimeType: string;
  url: string;
};

/**
 * Message envelope that wraps all postMessage communications
 */
type MessageEnvelope<T = unknown> = {
  type: string;
  event: string;
  payload?: T;
  timestamp: number;
  id: string;
};

/**
 * Event handler function type
 */
export type EventHandler<T = unknown> = (payload: T, event: MessageEvent) => void;

/**
 * Event registry type - maps event names to their payload types
 * Extend this interface to add your own event types
 */
interface EventRegistry {
  // Put auth events here
  accessTokenRequest: never;
  accessTokenResponse: { accessToken: string };
  accessTokenError: { error: string };
  authorizationRequest: never;
  authorizationResponse: { accessToken: string };
  authorizationError: { error: string };
  isAuthorizing: { isAuthorizing: boolean };
  // App init events
  appReadyRequest: never;
  appReadyError: { error: string; code?: number; details?: Record<string, unknown> };
  // Context events
  contextUpdateRequest: never;
  contextUpdateError: { error: string };
}

/**
 * Specific type/intent can have own events extending default registry
 */
export interface InboxAppEvents extends EventRegistry {
  // App init events
  appReadyResponse: {
    context: InboxAppContext;
    authentication?: { accessToken?: string };
  };
  // Context events
  contextUpdateResponse: { context: InboxAppContext };
}

export interface AnalyticsAppEvents extends EventRegistry {
  // App init events
  appReadyResponse: {
    context: AnalyticsAppContext;
    authentication?: { accessToken?: string };
  };
  // Context events
  contextUpdateResponse: { context: AnalyticsAppContext };
}

export interface PlannerAppEvents extends EventRegistry {
  // App init events
  appReadyResponse: {
    context: PlannerAppContext;
    authentication?: { accessToken?: string };
  };
  // Context events
  contextUpdateResponse: { context: PlannerAppContext };
}

export interface ComposerAppEvents extends EventRegistry {
  // App init events
  appReadyResponse: {
    context: ComposerAppContext;
    authentication?: { accessToken?: string };
  };
  // Context events
  contextUpdateResponse: { context: ComposerAppContext };
}

export interface AmplifyAppEvents extends EventRegistry {
  // App init events
  appReadyResponse: {
    context: AmplifyAppContext;
    authentication?: { accessToken?: string };
  };
  // Context events
  contextUpdateResponse: { context: AmplifyAppContext };
}

export type AppEvents =
  | InboxAppEvents
  | AnalyticsAppEvents
  | PlannerAppEvents
  | ComposerAppEvents
  | AmplifyAppEvents;

/**
 * Configuration options for the data bridge
 */
export interface AppConnectorConfig {
  /**
   * Unique identifier for the data bridge
   */
  appId?: string;
  /**
   * Target origin for postMessage (for security)
   * Use '*' for development, but specify exact origin in production
   */
  targetOrigin?: string;

  /**
   * Whether this instance is running in the parent window (true) or iframe (false)
   */
  isParent?: boolean;

  /**
   * Optional iframe reference (required if isParent is true)
   */
  iframe?: HTMLIFrameElement | null;

  /**
   * Optional parent window reference (required if isParent is false)
   */
  parentWindow?: Window | null;

  /**
   * Enable debug logging
   */
  debug?: boolean;
}

/**
 * AppConnector class - handles communication between parent and iframe
 */
export class AppConnector<TEventRegistry extends EventRegistry = EventRegistry> {
  private eventHandlers: Map<string, Set<EventHandler>> = new Map();
  private config: Required<Omit<AppConnectorConfig, 'iframe' | 'parentWindow'>> &
    Pick<AppConnectorConfig, 'iframe' | 'parentWindow'>;
  private isDestroyed: boolean = false;
  private _messageHandler?: (event: MessageEvent) => void;

  constructor(config: AppConnectorConfig) {
    this.config = {
      appId: config.appId ?? '',
      targetOrigin: config.targetOrigin ?? '*',
      iframe: config.iframe ?? null,
      parentWindow: config.parentWindow ?? (typeof window !== 'undefined' ? window.parent : null),
      debug: config.debug ?? false,
      isParent: config.isParent ?? false,
      ...config,
    };

    this.setupMessageListener();
  }

  /**
   * Subscribe to an event
   * @param eventName - The name of the event to listen for
   * @param handler - The handler function to call when the event is received
   * @returns A function to unsubscribe from the event
   */
  on<K extends keyof TEventRegistry>(
    eventName: K,
    handler: EventHandler<TEventRegistry[K]>
  ): () => void {
    if (this.isDestroyed) {
      throw new Error('AppConnector has been destroyed');
    }

    const eventKey = String(eventName);

    if (!this.eventHandlers.has(eventKey)) {
      this.eventHandlers.set(eventKey, new Set());
    }

    const handlerSet = this.eventHandlers.get(eventKey)!;
    handlerSet.add(handler as EventHandler);

    this.log(`Subscribed to event: ${eventKey}`);

    // Return unsubscribe function
    return () => {
      handlerSet.delete(handler as EventHandler);
      if (handlerSet.size === 0) {
        this.eventHandlers.delete(eventKey);
      }
      this.log(`Unsubscribed from event: ${eventKey}`);
    };
  }

  /**
   * Unsubscribe from an event
   * @param eventName - The name of the event to unsubscribe from
   * @param handler - The specific handler to remove (optional, removes all if not provided)
   */
  off<K extends keyof TEventRegistry>(
    eventName: K,
    handler?: EventHandler<TEventRegistry[K]>
  ): void {
    const eventKey = String(eventName);
    const handlerSet = this.eventHandlers.get(eventKey);

    if (!handlerSet) {
      return;
    }

    if (handler) {
      handlerSet.delete(handler as EventHandler);
      if (handlerSet.size === 0) {
        this.eventHandlers.delete(eventKey);
      }
    } else {
      // Remove all handlers for this event
      this.eventHandlers.delete(eventKey);
    }

    this.log(`Unsubscribed from event: ${eventKey}`);
  }

  /**
   * Emit an event to the other side (parent or iframe)
   * @param eventName - The name of the event to emit
   * @param payload - The payload data to send with the event
   */
  emit<K extends keyof TEventRegistry>(eventName: K, payload?: TEventRegistry[K]): void {
    if (this.isDestroyed) {
      throw new Error('AppConnector has been destroyed');
    }

    const eventKey = String(eventName);

    const messageId = this.generateMessageId();

    const envelope: MessageEnvelope<TEventRegistry[K]> = {
      type: 'AppConnector',
      event: eventKey,
      payload,
      timestamp: Date.now(),
      id: messageId,
    };

    try {
      const serialized = JSON.stringify(envelope);
      const targetWindow = this.getTargetWindow();

      if (!targetWindow) {
        throw new Error(
          this.config.isParent
            ? 'No iframe reference provided'
            : 'No parent window reference available'
        );
      }

      targetWindow.postMessage(serialized, this.config.targetOrigin);
      this.log(`Emitted event: ${eventKey}`, payload);
    } catch (error) {
      this.logError(`Error emitting event ${eventKey}:`, error);
      throw error;
    }
  }

  /**
   * Get the target window for postMessage
   */
  private getTargetWindow(): Window | null {
    if (this.config.isParent) {
      return this.config.iframe?.contentWindow ?? null;
    } else {
      return this.config.parentWindow ?? null;
    }
  }

  /**
   * Setup the message event listener
   */
  private setupMessageListener(): void {
    if (typeof window === 'undefined') {
      return;
    }

    const messageHandler = (event: MessageEvent) => {
      // Security: Verify origin if configured
      if (this.config.targetOrigin !== '*' && event.origin !== this.config.targetOrigin) {
        this.log(`Ignoring message from unauthorized origin: ${event.origin}`);
        return;
      }

      try {
        // Handle both string and already-parsed messages
        const data: MessageEnvelope =
          typeof event.data === 'string' ? JSON.parse(event.data) : event.data;

        // Verify this is a message from our bridge`
        if (!data || data.type !== 'AppConnector') {
          return;
        }

        const { event: eventName, payload } = data;
        this.handleIncomingEvent(eventName, payload, event);
      } catch (error) {
        this.logError('Error handling incoming message:', error);
      }
    };

    window.addEventListener('message', messageHandler);

    // Store handler for cleanup
    this._messageHandler = messageHandler;
  }

  /**
   * Handle an incoming event
   */
  private handleIncomingEvent(
    eventName: string,
    payload: unknown,
    originalEvent: MessageEvent
  ): void {
    const handlerSet = this.eventHandlers.get(eventName);

    if (!handlerSet || handlerSet.size === 0) {
      this.log(`No handlers registered for event: ${eventName}`);
      return;
    }

    this.log(`Received event: ${eventName}`, payload);

    // Call all registered handlers
    handlerSet.forEach((handler) => {
      try {
        handler(payload, originalEvent);
      } catch (error) {
        this.logError(`Error in handler for event ${eventName}:`, error);
      }
    });
  }

  /**
   * Generate a unique message ID
   */
  private generateMessageId(): string {
    return `msg_${Date.now()}_${this.config.appId}`;
  }

  /**
   * Debug logging
   */
  private log(message: string, data?: unknown): void {
    if (this.config.debug) {
      const prefix = this.config.isParent ? '[AppConnector:Parent]' : '[AppConnector:Iframe]';
      console.log(`${prefix} ${message}`, data ?? '');
    }
  }

  /**
   * Error logging
   */
  private logError(message: string, error: unknown): void {
    const prefix = this.config.isParent ? '[AppConnector:Parent]' : '[AppConnector:Iframe]';
    console.error(`${prefix} ${message}`, error);
  }

  /**
   * Destroy the bridge and clean up resources
   */
  destroy(): void {
    if (this.isDestroyed) {
      return;
    }

    this.isDestroyed = true;
    this.eventHandlers.clear();

    if (typeof window !== 'undefined' && this._messageHandler) {
      window.removeEventListener('message', this._messageHandler);
      this._messageHandler = undefined;
    }

    this.log('AppConnector destroyed');
  }
}

/**
 * Create a new AppConnector instance
 *
 * @example
 * // In parent window:
 * const appConnector = createAppConnector({
 *   isParent: true,
 *   iframe: document.getElementById('my-iframe'),
 *   targetOrigin: 'https://example.com',
 *   debug: true
 * });
 *
 * appConnector.on('userData', (data) => {
 *   console.log('Received user data:', data);
 * });
 *
 * appConnector.emit('requestData', { userId: 123 });
 *
 * @example
 * // In iframe:
 * const appConnector = createAppConnector({
 *   isParent: false,
 *   targetOrigin: 'https://parent-domain.com',
 *   debug: true
 * });
 *
 * appConnector.emit('userData', { name: 'John', age: 30 });
 */
export function createAppConnector<TEventRegistry extends EventRegistry = EventRegistry>(
  config: AppConnectorConfig
): AppConnector<TEventRegistry> {
  return new AppConnector<TEventRegistry>(config);
}

export default createAppConnector;
