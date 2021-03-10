export interface BaseMessage<T extends string> {
  /**
   * Date string in ISO 8601 format.
   */
  created_at: string;
  id: string;
  kind: T;
}
