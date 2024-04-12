import SafeBaseContractEthers from '@safe-global/protocol-kit/adapters/ethers/contracts/Safe/SafeBaseContractEthers'
import SafeProvider from '@safe-global/protocol-kit/adapters/ethers/SafeProvider'
import {
  EthersTransactionOptions,
  EthersTransactionResult
} from '@safe-global/protocol-kit/adapters/ethers/types'
import SafeContract_v1_2_0_Contract, {
  SafeContract_v1_2_0_Abi
} from '@safe-global/protocol-kit/contracts/AbiType/Safe/v1.2.0/SafeContract_v1_2_0'
import { toTxResult } from '@safe-global/protocol-kit/adapters/ethers/utils'
import safe_1_2_0_ContractArtifacts from '@safe-global/protocol-kit/contracts/AbiType/assets/Safe/v1.2.0/gnosis_safe'
import { SafeTransaction, SafeTransactionData, SafeVersion } from '@safe-global/safe-core-sdk-types'
import {
  EncodeSafeFunction,
  EstimateGasSafeFunction
} from '@safe-global/protocol-kit/contracts/AbiType/Safe/SafeBaseContract'
import { AbstractSigner } from 'ethers'

/**
 * SafeContract_v1_2_0_Ethers is the implementation specific to the Safe contract version 1.2.0.
 *
 * This class specializes in handling interactions with the Safe contract version 1.2.0 using Ethers.js v6.
 *
 * @extends SafeBaseContractEthers<SafeContract_v1_2_0_Abi> - Inherits from SafeBaseContractEthers with ABI specific to Safe contract version 1.2.0.
 * @implements SafeContract_v1_2_0_Contract - Implements the interface specific to Safe contract version 1.2.0.
 */
class SafeContract_v1_2_0_Ethers
  extends SafeBaseContractEthers<SafeContract_v1_2_0_Abi>
  implements SafeContract_v1_2_0_Contract
{
  safeVersion: SafeVersion

  /**
   * Constructs an instance of SafeContract_v1_2_0_Ethers
   *
   * @param chainId - The chain ID where the contract resides.
   * @param safeProvider - An instance of SafeProvider.
   * @param isL1SafeSingleton - A flag indicating if the contract is a L1 Safe Singleton.
   * @param customContractAddress - Optional custom address for the contract. If not provided, the address is derived from the Safe deployments based on the chainId and safeVersion.
   * @param customContractAbi - Optional custom ABI for the contract. If not provided, the default ABI for version 1.2.0 is used.
   */
  constructor(
    chainId: bigint,
    signer: AbstractSigner,
    isL1SafeSingleton = false,
    customContractAddress?: string,
    customContractAbi?: SafeContract_v1_2_0_Abi
  ) {
    const safeVersion = '1.2.0'
    const defaultAbi = safe_1_2_0_ContractArtifacts.abi

    super(
      chainId,
      signer,
      defaultAbi,
      safeVersion,
      isL1SafeSingleton,
      customContractAddress,
      customContractAbi
    )

    this.safeVersion = safeVersion
  }

  async NAME(): Promise<[string]> {
    return [await this.contract.NAME()]
  }

  async VERSION(): Promise<[string]> {
    return [await this.contract.VERSION()]
  }

  async approvedHashes([owner, txHash]: readonly [string, string]): Promise<[bigint]> {
    return [await this.contract.approvedHashes(owner, txHash)]
  }

  async domainSeparator(): Promise<[string]> {
    return [await this.contract.domainSeparator()]
  }

  async getModules(): Promise<[string[]]> {
    return [await this.contract.getModules()]
  }

  async getModulesPaginated(
    args: readonly [start: string, pageSize: bigint]
  ): Promise<[modules: string[], next: string]> {
    const res = await this.contract.getModulesPaginated(...args)
    return [res.array, res.next]
  }

  async getOwners(): Promise<[string[]]> {
    return [await this.contract.getOwners()]
  }

  async getThreshold(): Promise<[bigint]> {
    return [await this.contract.getThreshold()]
  }

  async isModuleEnabled(args: readonly [moduleAddress: string]): Promise<[boolean]> {
    return [await this.contract.isModuleEnabled(...args)]
  }

  async isOwner(args: readonly [address: string]): Promise<[boolean]> {
    return [await this.contract.isOwner(...args)]
  }

  async nonce(): Promise<[bigint]> {
    return [await this.contract.nonce()]
  }

  async signedMessages(args: readonly [messageHash: string]): Promise<[bigint]> {
    return [await this.contract.signedMessages(...args)]
  }

  async getMessageHash(args: readonly [message: string]): Promise<[string]> {
    return [await this.contract.getMessageHash(...args)]
  }

  async encodeTransactionData(
    args: readonly [
      to: string,
      value: bigint,
      data: string,
      operation: number,
      safeTxGas: bigint,
      baseGas: bigint,
      gasPrice: bigint,
      gasToken: string,
      refundReceiver: string,
      _nonce: bigint
    ]
  ): Promise<[string]> {
    return [await this.contract.encodeTransactionData(...args)]
  }

  async getTransactionHash(
    args: readonly [
      to: string,
      value: bigint,
      data: string,
      operation: number,
      safeTxGas: bigint,
      baseGas: bigint,
      gasPrice: bigint,
      gasToken: string,
      refundReceiver: string,
      _nonce: bigint
    ]
  ): Promise<[string]> {
    return [await this.contract.getTransactionHash(...args)]
  }

  encode: EncodeSafeFunction<SafeContract_v1_2_0_Abi> = (functionToEncode, args) => {
    return this.contract.interface.encodeFunctionData(functionToEncode, args)
  }

  estimateGas: EstimateGasSafeFunction<SafeContract_v1_2_0_Abi, EthersTransactionOptions> = (
    functionToEstimate,
    args,
    options = {}
  ) => {
    return this.contract.getFunction(functionToEstimate).estimateGas(...args, options)
  }

  // Custom method (not defined in the Safe Contract)
  async approveHash(
    hash: string,
    options?: EthersTransactionOptions
  ): Promise<EthersTransactionResult> {
    const gasLimit = options?.gasLimit || (await this.estimateGas('approveHash', [hash], options))
    const txResponse = await this.contract.approveHash(hash, { ...options, gasLimit })

    return toTxResult(txResponse, options)
  }

  // Custom method (not defined in the Safe Contract)
  async execTransaction(
    safeTransaction: SafeTransaction,
    options?: EthersTransactionOptions
  ): Promise<EthersTransactionResult> {
    const gasLimit =
      options?.gasLimit ||
      (await this.estimateGas(
        'execTransaction',
        [
          safeTransaction.data.to,
          BigInt(safeTransaction.data.value),
          safeTransaction.data.data,
          safeTransaction.data.operation,
          BigInt(safeTransaction.data.safeTxGas),
          BigInt(safeTransaction.data.baseGas),
          BigInt(safeTransaction.data.gasPrice),
          safeTransaction.data.gasToken,
          safeTransaction.data.refundReceiver,
          safeTransaction.encodedSignatures()
        ],
        options
      ))

    const txResponse = await this.contract.execTransaction(
      safeTransaction.data.to,
      safeTransaction.data.value,
      safeTransaction.data.data,
      safeTransaction.data.operation,
      safeTransaction.data.safeTxGas,
      safeTransaction.data.baseGas,
      safeTransaction.data.gasPrice,
      safeTransaction.data.gasToken,
      safeTransaction.data.refundReceiver,
      safeTransaction.encodedSignatures(),
      { ...options, gasLimit }
    )

    return toTxResult(txResponse, options)
  }

  // Custom method (not defined in the Safe Contract)
  async getAddress(): Promise<string> {
    return this.contract.getAddress()
  }

  // Custom method (not defined in the Safe Contract)
  async getChainId(): Promise<[bigint]> {
    return [await this.contract.getChainId()]
  }

  // Custom method (not defined in the Safe Contract)
  async isValidTransaction(
    safeTransaction: SafeTransaction,
    options: EthersTransactionOptions = {}
  ) {
    try {
      const gasLimit =
        options?.gasLimit ||
        (await this.estimateGas(
          'execTransaction',
          [
            safeTransaction.data.to,
            BigInt(safeTransaction.data.value),
            safeTransaction.data.data,
            safeTransaction.data.operation,
            BigInt(safeTransaction.data.safeTxGas),
            BigInt(safeTransaction.data.baseGas),
            BigInt(safeTransaction.data.gasPrice),
            safeTransaction.data.gasToken,
            safeTransaction.data.refundReceiver,
            safeTransaction.encodedSignatures()
          ],
          options
        ))

      return await this.contract.execTransaction.staticCall(
        safeTransaction.data.to,
        BigInt(safeTransaction.data.value),
        safeTransaction.data.data,
        safeTransaction.data.operation,
        BigInt(safeTransaction.data.safeTxGas),
        BigInt(safeTransaction.data.baseGas),
        BigInt(safeTransaction.data.gasPrice),
        safeTransaction.data.gasToken,
        safeTransaction.data.refundReceiver,
        safeTransaction.encodedSignatures(),
        { ...options, gasLimit }
      )
    } catch (error) {
      return false
    }
  }

  // TODO: Remove this mapper after remove Typechain
  mapToTypechainContract(): any {
    return {
      contract: this.contract,

      setup: (): any => {
        // setup function is labelled as `external` on the contract code, but not present on type SafeContract_v1_2_0_Contract
        return
      },

      approveHash: this.approveHash.bind(this),

      isValidTransaction: this.isValidTransaction.bind(this),

      execTransaction: this.execTransaction.bind(this),

      getAddress: this.getAddress.bind(this),

      getModules: async () => (await this.getModules())[0],

      isModuleEnabled: async (moduleAddress: string) =>
        (await this.isModuleEnabled([moduleAddress]))[0],

      getVersion: async () => (await this.VERSION())[0] as SafeVersion,

      getNonce: async () => Number((await this.nonce())[0]),

      getThreshold: async () => Number((await this.getThreshold())[0]),

      getOwners: async () => (await this.getOwners())[0],

      isOwner: async (address: string) => (await this.isOwner([address]))[0],

      getTransactionHash: async (safeTransactionData: SafeTransactionData) => {
        return (
          await this.getTransactionHash([
            safeTransactionData.to,
            BigInt(safeTransactionData.value),
            safeTransactionData.data,
            safeTransactionData.operation,
            BigInt(safeTransactionData.safeTxGas),
            BigInt(safeTransactionData.baseGas),
            BigInt(safeTransactionData.gasPrice),
            safeTransactionData.gasToken,
            safeTransactionData.refundReceiver,
            BigInt(safeTransactionData.nonce)
          ])
        )[0]
      },

      approvedHashes: async (ownerAddress: string, hash: string) =>
        (await this.approvedHashes([ownerAddress, hash]))[0],

      encode: this.encode.bind(this),

      estimateGas: this.estimateGas.bind(this)
    }
  }
}

export default SafeContract_v1_2_0_Ethers