import { PasskeyArgType, PasskeyCoordinates } from './passkeys'
import {
  Account,
  Chain,
  PublicClient,
  Transport,
  WalletClient,
  WalletRpcSchema,
  Client,
  WalletActions
} from 'viem'

export type RequestArguments = {
  readonly method: string
  readonly params?: readonly unknown[] | object
}

export type Eip1193Provider = {
  request: (args: RequestArguments) => Promise<unknown>
}

export type GetPasskeyType = {
  rawId: string
  coordinates: PasskeyCoordinates
  verifierAddress: string
  factoryAddress: string
}

export type PasskeyActions = {
  getPasskey: () => GetPasskeyType
}

export type PasskeyClient = Client<
  Transport,
  Chain | undefined,
  Account,
  WalletRpcSchema,
  WalletActions<Chain | undefined, Account> & PasskeyActions
>

export type ExternalSigner = WalletClient<Transport, Chain | undefined, Account> | PasskeyClient
export type ExternalClient = PublicClient | (ExternalSigner & PublicClient)

export type HexAddress = string
export type PrivateKey = string
export type HttpTransport = string
export type SocketTransport = string
export type SafeSigner = HexAddress | PrivateKey | PasskeyClient

export type SafeProviderConfig = {
  /** signerOrProvider - Ethers signer or provider */
  provider: Eip1193Provider | HttpTransport | SocketTransport
  signer?: HexAddress | PrivateKey | PasskeyArgType | PasskeyClient
}

export type SafeProviderTransaction = {
  to: string
  from: string
  data: string
  value?: string
  gasPrice?: number | string
  gasLimit?: number | string | bigint
  maxFeePerGas?: number | string
  maxPriorityFeePerGas?: number | string
}

export type SafeModulesPaginated = {
  modules: string[]
  next: string
}
