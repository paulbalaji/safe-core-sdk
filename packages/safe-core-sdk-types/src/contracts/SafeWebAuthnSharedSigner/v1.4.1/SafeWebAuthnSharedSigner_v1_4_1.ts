import { ExtractAbiFunctionNames, narrow } from 'abitype'
import safeWebAuthnSharedSigner_v1_4_1_ContractArtifacts from '../../assets/SafeWebAuthnSharedSigner/v1.4.1/safe_webauthn_shared_signer'
import SafeWebAuthnSharedSignerBaseContract from '../SafeWebAuthnSharedSignerBaseContract'
import { ContractFunction } from '../../common/BaseContract'

const safeWebAuthnSharedSigner_v1_4_1_AbiTypes = narrow(
  safeWebAuthnSharedSigner_v1_4_1_ContractArtifacts.abi
)

/**
 * Represents the ABI of the Safe WebAuthn Shared Signer contract version 1.4.1.
 *
 * @type {SafeWebAuthnSharedSignerContract_v1_4_1_Abi}
 */
export type SafeWebAuthnSharedSignerContract_v1_4_1_Abi =
  typeof safeWebAuthnSharedSigner_v1_4_1_AbiTypes

/**
 * Represents the function type derived by the given function name from the SafeWebAuthnSharedSigner contract version 1.4.1 ABI.
 *
 * @template ContractFunctionName - The function name, derived from the ABI.
 * @type {SafeWebAuthnSharedSignerContract_v1_4_1_Function}
 */
export type SafeWebAuthnSharedSignerContract_v1_4_1_Function<
  ContractFunctionName extends ExtractAbiFunctionNames<SafeWebAuthnSharedSignerContract_v1_4_1_Abi>
> = ContractFunction<SafeWebAuthnSharedSignerContract_v1_4_1_Abi, ContractFunctionName>

/**
 * Represents the contract type for a Safe WebAuthn Shared Signer contract version 1.4.1, defining read and write methods.
 * Utilizes the generic SafeWebAuthnSharedSignerBaseContract with the ABI specific to version 1.4.1.
 *
 * @type {SafeWebAuthnSharedSignerContract_v1_4_1_Contract}
 */
export type SafeWebAuthnSharedSignerContract_v1_4_1_Contract =
  SafeWebAuthnSharedSignerBaseContract<SafeWebAuthnSharedSignerContract_v1_4_1_Abi>
