import { WsEmbedParams, UserInfo, CtorArgs, LoginParams } from '@web3auth/ws-embed'

export type SafeAuthConfig = {
  txServiceUrl?: string
}
export type SafeAuthInitOptions = Omit<WsEmbedParams, 'walletUrls' | 'chainConfig'> & {
  chainConfig?: SafeAuthProviderConfig
} & { web3AuthConfig: CtorArgs }

export type SafeAuthSignInOptions = {
  loginProvider?: LoginParams['loginProvider']
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
