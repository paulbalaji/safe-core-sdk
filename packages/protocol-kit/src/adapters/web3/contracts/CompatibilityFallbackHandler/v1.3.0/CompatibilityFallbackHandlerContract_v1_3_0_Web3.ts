import CompatibilityFallbackHandlerBaseContractWeb3 from '@safe-global/protocol-kit/adapters/web3/contracts/CompatibilityFallbackHandler/CompatibilityFallbackHandlerBaseContractWeb3'
import Web3Adapter from '@safe-global/protocol-kit/adapters/web3/Web3Adapter'
import {
  DeepWriteable,
  SafeVersion,
  CompatibilityFallbackHandlerContract_v1_3_0_Abi,
  CompatibilityFallbackHandlerContract_v1_3_0_Contract,
  compatibilityFallbackHandler_1_3_0_ContractArtifacts
} from '@safe-global/safe-core-sdk-types'

/**
 * CompatibilityFallbackHandlerContract_v1_3_0_Web3 is the implementation specific to the CompatibilityFallbackHandler contract version 1.3.0.
 *
 * This class specializes in handling interactions with the CompatibilityFallbackHandler contract version 1.3.0 using Web3.js.
 *
 * @extends CompatibilityFallbackHandlerBaseContractWeb3<CompatibilityFallbackHandlerContract_v1_3_0_Abi> - Inherits from CompatibilityFallbackHandlerBaseContractWeb3 with ABI specific to CompatibilityFallbackHandler contract version 1.3.0.
 * @implements CompatibilityFallbackHandlerContract_v1_3_0_Contract - Implements the interface specific to CompatibilityFallbackHandler contract version 1.3.0.
 */
class CompatibilityFallbackHandlerContract_v1_3_0_Web3
  extends CompatibilityFallbackHandlerBaseContractWeb3<
    DeepWriteable<CompatibilityFallbackHandlerContract_v1_3_0_Abi>
  >
  implements CompatibilityFallbackHandlerContract_v1_3_0_Contract
{
  safeVersion: SafeVersion

  /**
   * Constructs an instance of CompatibilityFallbackHandlerContract_v1_3_0_Web3
   *
   * @param chainId - The chain ID where the contract resides.
   * @param web3Adapter - An instance of Web3Adapter.
   * @param customContractAddress - Optional custom address for the contract. If not provided, the address is derived from the CompatibilityFallbackHandler deployments based on the chainId and safeVersion.
   * @param customContractAbi - Optional custom ABI for the contract. If not provided, the default ABI for version 1.3.0 is used.
   */
  constructor(
    chainId: bigint,
    web3Adapter: Web3Adapter,
    customContractAddress?: string,
    customContractAbi?: DeepWriteable<CompatibilityFallbackHandlerContract_v1_3_0_Abi>
  ) {
    const safeVersion = '1.3.0'
    const defaultAbi =
      compatibilityFallbackHandler_1_3_0_ContractArtifacts.abi as DeepWriteable<CompatibilityFallbackHandlerContract_v1_3_0_Abi>

    super(chainId, web3Adapter, defaultAbi, safeVersion, customContractAddress, customContractAbi)

    this.safeVersion = safeVersion
  }
}

export default CompatibilityFallbackHandlerContract_v1_3_0_Web3