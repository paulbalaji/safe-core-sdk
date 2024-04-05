import CreateCallBaseContractWeb3 from '@safe-global/protocol-kit/adapters/web3/contracts/CreateCall/CreateCallBaseContractWeb3'
import Web3Adapter from '@safe-global/protocol-kit/adapters/web3/Web3Adapter'
import { DeepWriteable } from '@safe-global/protocol-kit/adapters/web3/types'
import {
  SafeVersion,
  CreateCallContract_v1_3_0_Abi,
  CreateCallContract_v1_3_0_Contract,
  EncodeFunction,
  EstimateGasFunction,
  GetAddressFunction,
  Web3TransactionOptions,
  Web3TransactionResult,
  createCall_1_3_0_ContractArtifacts
} from '@safe-global/safe-core-sdk-types'
import { toTxResult } from '@safe-global/protocol-kit/adapters/web3/utils'

/**
 * CreateCallContract_V1_3_0_Web3 is the implementation specific to the CreateCall contract version 1.3.0.
 *
 * This class specializes in handling interactions with the CreateCall contract version 1.3.0 using Web3.js.
 *
 * @extends CreateCallBaseContractWeb3<CreateCallContract_v1_3_0_Abi> - Inherits from CreateCallBaseContractWeb3 with ABI specific to CreateCall contract version 1.3.0.
 * @implements CreateCallContract_v1_3_0_Contract - Implements the interface specific to CreateCall contract version 1.3.0.
 */
class CreateCallContract_V1_3_0_Web3
  extends CreateCallBaseContractWeb3<DeepWriteable<CreateCallContract_v1_3_0_Abi>>
  implements CreateCallContract_v1_3_0_Contract
{
  safeVersion: SafeVersion

  /**
   * Constructs an instance of CreateCallContract_V1_3_0_Web3
   *
   * @param chainId - The chain ID where the contract resides.
   * @param web3Adapter - An instance of Web3Adapter.
   * @param customContractAddress - Optional custom address for the contract. If not provided, the address is derived from the CreateCall deployments based on the chainId and safeVersion.
   * @param customContractAbi - Optional custom ABI for the contract. If not provided, the default ABI for version 1.3.0 is used.
   */
  constructor(
    chainId: bigint,
    web3Adapter: Web3Adapter,
    customContractAddress?: string,
    customContractAbi?: DeepWriteable<CreateCallContract_v1_3_0_Abi>
  ) {
    const safeVersion = '1.3.0'
    const defaultAbi =
      createCall_1_3_0_ContractArtifacts.abi as DeepWriteable<CreateCallContract_v1_3_0_Abi>

    super(chainId, web3Adapter, defaultAbi, safeVersion, customContractAddress, customContractAbi)

    this.safeVersion = safeVersion
  }

  getAddress: GetAddressFunction = () => {
    return Promise.resolve(this.contract.options.address)
  }

  encode: EncodeFunction<CreateCallContract_v1_3_0_Abi> = (functionToEncode, args) => {
    return this.contract.methods[functionToEncode](...args).encodeABI()
  }

  estimateGas: EstimateGasFunction<CreateCallContract_v1_3_0_Abi, Web3TransactionOptions> = async (
    functionToEstimate,
    args,
    options = {}
  ) => {
    return (
      await this.contract.methods[functionToEstimate](...args).estimateGas(options)
    ).toString()
  }

  async performCreate(
    args: readonly [value: bigint, deploymentData: string],
    options?: Web3TransactionOptions
  ): Promise<Web3TransactionResult> {
    if (options && !options.gas) {
      options.gas = (await this.estimateGas('performCreate', args, { ...options })).toString()
    }
    const txResponse = this.contract.methods.performCreate(...args).send(options)
    return toTxResult(txResponse, options)
  }

  async performCreate2(
    args: readonly [value: bigint, deploymentData: string, salt: string],
    options?: Web3TransactionOptions
  ): Promise<Web3TransactionResult> {
    if (options && !options.gas) {
      options.gas = (await this.estimateGas('performCreate2', args, { ...options })).toString()
    }
    const txResponse = this.contract.methods.performCreate2(...args).send(options)
    return toTxResult(txResponse, options)
  }
}

export default CreateCallContract_V1_3_0_Web3
