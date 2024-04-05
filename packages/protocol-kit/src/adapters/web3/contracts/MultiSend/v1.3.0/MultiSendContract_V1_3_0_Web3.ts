import MultiSendBaseContractWeb3 from '@safe-global/protocol-kit/adapters/web3/contracts/MultiSend/MultiSendBaseContractWeb3'
import Web3Adapter from '@safe-global/protocol-kit/adapters/web3/Web3Adapter'
import { DeepWriteable } from '@safe-global/protocol-kit/adapters/web3/types'
import {
  SafeVersion,
  MultiSendContract_v1_3_0_Abi,
  MultiSendContract_v1_3_0_Contract,
  multisend_1_3_0_ContractArtifacts,
  GetAddressFunction,
  EncodeFunction
} from '@safe-global/safe-core-sdk-types'

/**
 * MultiSendContract_v1_3_0_Web3 is the implementation specific to the MultiSend contract version 1.3.0.
 *
 * This class specializes in handling interactions with the MultiSend contract version 1.3.0 using Web3.js v6.
 *
 * @extends MultiSendBaseContractWeb3<MultiSendContract_v1_3_0_Abi> - Inherits from MultiSendBaseContractWeb3 with ABI specific to MultiSend contract version 1.3.0.
 * @implements MultiSendContract_v1_3_0_Contract - Implements the interface specific to MultiSend contract version 1.3.0.
 */
class MultiSendContract_v1_3_0_Web3
  extends MultiSendBaseContractWeb3<DeepWriteable<MultiSendContract_v1_3_0_Abi>>
  implements MultiSendContract_v1_3_0_Contract
{
  safeVersion: SafeVersion

  /**
   * Constructs an instance of MultiSendContract_v1_3_0_Web3
   *
   * @param chainId - The chain ID where the contract resides.
   * @param web3Adapter - An instance of Web3Adapter.
   * @param customContractAddress - Optional custom address for the contract. If not provided, the address is derived from the MultiSend deployments based on the chainId and safeVersion.
   * @param customContractAbi - Optional custom ABI for the contract. If not provided, the default ABI for version 1.3.0 is used.
   */
  constructor(
    chainId: bigint,
    web3Adapter: Web3Adapter,
    customContractAddress?: string,
    customContractAbi?: DeepWriteable<MultiSendContract_v1_3_0_Abi>
  ) {
    const safeVersion = '1.3.0'
    const defaultAbi =
      multisend_1_3_0_ContractArtifacts.abi as DeepWriteable<MultiSendContract_v1_3_0_Abi>

    super(chainId, web3Adapter, defaultAbi, safeVersion, customContractAddress, customContractAbi)

    this.safeVersion = safeVersion
  }

  getAddress: GetAddressFunction = () => {
    return Promise.resolve(this.contract.options.address)
  }

  encode: EncodeFunction<MultiSendContract_v1_3_0_Abi> = (functionToEncode, args) => {
    return this.contract.methods[functionToEncode](...args).encodeABI()
  }
}

export default MultiSendContract_v1_3_0_Web3
