/**
 * Interface for JWT token payload
 * @export
 * @interface TokenPayloadInterface
 */
 export interface TokenPayloadInterface {
    userId: string;
    isNewUser: boolean;
    expiresAt: number;
    twitchUserId?: string;
    googleUserId?: string;
    fbUserId?: string;
}
