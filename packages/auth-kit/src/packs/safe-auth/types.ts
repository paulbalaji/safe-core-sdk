import { WsEmbedParams, UserInfo } from '@web3auth/ws-embed'

export type SafeAuthConfig = {
  txServiceUrl?: string
}
export type SafeAuthInitOptions = Omit<WsEmbedParams, 'walletUrls' | 'chainConfig'> & {
  chainConfig?: SafeAuthProviderConfig
}
export declare const LOGIN_PROVIDER: {
  readonly GOOGLE: 'google'
  readonly FACEBOOK: 'facebook'
  readonly REDDIT: 'reddit'
  readonly DISCORD: 'discord'
  readonly TWITCH: 'twitch'
  readonly APPLE: 'apple'
  readonly LINE: 'line'
  readonly GITHUB: 'github'
  readonly KAKAO: 'kakao'
  readonly LINKEDIN: 'linkedin'
  readonly TWITTER: 'twitter'
  readonly WEIBO: 'weibo'
  readonly WECHAT: 'wechat'
  readonly EMAIL_PASSWORDLESS: 'email_passwordless'
  readonly SMS_PASSWORDLESS: 'sms_passwordless'
}
export type LOGIN_PROVIDER_TYPE = (typeof LOGIN_PROVIDER)[keyof typeof LOGIN_PROVIDER]
export type SafeAuthSignInOptions = {
  loginProvider?: LOGIN_PROVIDER_TYPE
  login_hint?: string
}
export type SafeAuthSignOutOptions = { reset: boolean }
export type SafeAuthUserInfo = UserInfo
export type SafeAuthEvent = 'accountsChanged' | 'chainChanged'
export type SafeAuthEventListener = (...args: any[]) => void

export type SafeAuthProviderConfig = {
  blockExplorerUrl?: string
  logo?: string
  tickerName?: string
  ticker?: string
  rpcTarget: string
  wcTarget?: string
  chainId: string
  displayName?: string
  isTestnet?: boolean
}
