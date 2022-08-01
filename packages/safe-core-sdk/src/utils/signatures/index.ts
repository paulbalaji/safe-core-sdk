import {
  EthAdapter,
  SafeSignature,
  SafeTransactionEIP712Args
} from '@gnosis.pm/safe-core-sdk-types'
import { bufferToHex, ecrecover, pubToAddress } from 'ethereumjs-util'
import { sameString } from '../../utils'
import EthSignSignature from './SafeSignature'

export function generatePreValidatedSignature(ownerAddress: string): SafeSignature {
  const signature =
    '0x000000000000000000000000' +
    ownerAddress.slice(2) +
    '0000000000000000000000000000000000000000000000000000000000000000' +
    '01'

  return new EthSignSignature(ownerAddress, signature)
}

export function isTxHashSignedWithPrefix(
  txHash: string,
  signature: string,
  ownerAddress: string
): boolean {
  let hasPrefix
  try {
    const rsvSig = {
      r: Buffer.from(signature.slice(2, 66), 'hex'),
      s: Buffer.from(signature.slice(66, 130), 'hex'),
      v: parseInt(signature.slice(130, 132), 16)
    }
    const recoveredData = ecrecover(
      Buffer.from(txHash.slice(2), 'hex'),
      rsvSig.v,
      rsvSig.r,
      rsvSig.s
    )
    const recoveredAddress = bufferToHex(pubToAddress(recoveredData))
    hasPrefix = !sameString(recoveredAddress, ownerAddress)
  } catch (e) {
    hasPrefix = true
  }
  return hasPrefix
}

type AdjustVOverload = {
  (signingMethod: 'eth_signTypedData', signature: string): string
  (signingMethod: 'eth_sign', signature: string, safeTxHash: string, sender: string): string
}

export const adjustVInSignature: AdjustVOverload = (
  signingMethod: 'eth_sign' | 'eth_signTypedData',
  signature: string,
  safeTxHash?: string,
  signerAddress?: string
): string => {
  const V_VALUES = [0, 1, 27, 28]
  const MIN_VALID_V_VALUE = 27
  let signatureV = parseInt(signature.slice(-2), 16)
  if (!V_VALUES.includes(signatureV)) {
    throw new Error('Invalid signature')
  }
  if (signingMethod === 'eth_sign') {
    /*
      Usually returned V (last 1 byte) is 27 or 28 (valid ethereum value)
      Metamask with ledger returns v = 01, this is not valid for ethereum
      In case V = 0 or 1 we add it to 27 or 28
      Adding 4 is required if signed message was prefixed with "\x19Ethereum Signed Message:\n32"
      Some wallets do that, some wallets don't, V > 30 is used by contracts to differentiate between prefixed and non-prefixed messages
      https://github.com/gnosis/safe-contracts/blob/main/contracts/GnosisSafe.sol#L292
    */
    if (signatureV < MIN_VALID_V_VALUE) {
      signatureV += MIN_VALID_V_VALUE
    }
    const adjustedSignature = signature.slice(0, -2) + signatureV.toString(16)
    const signatureHasPrefix = isTxHashSignedWithPrefix(
      safeTxHash as string,
      adjustedSignature,
      signerAddress as string
    )
    if (signatureHasPrefix) {
      signatureV += 4
    }
  }
  if (signingMethod === 'eth_signTypedData') {
    // Metamask with ledger returns V=0/1 here too, we need to adjust it to be ethereum's valid value (27 or 28)
    if (signatureV < MIN_VALID_V_VALUE) {
      signatureV += MIN_VALID_V_VALUE
    }
  }
  signature = signature.slice(0, -2) + signatureV.toString(16)
  return signature
}

export async function generateSignature(
  ethAdapter: EthAdapter,
  hash: string
): Promise<EthSignSignature> {
  const signerAddress = await ethAdapter.getSignerAddress()
  let signature = await ethAdapter.signMessage(hash)
  signature = adjustVInSignature('eth_sign', signature, hash, signerAddress)
  return new EthSignSignature(signerAddress, signature)
}

export async function generateEIP712Signature(
  ethAdapter: EthAdapter,
  safeTransactionEIP712Args: SafeTransactionEIP712Args,
  methodVersion?: 'v3' | 'v4'
): Promise<EthSignSignature> {
  const signerAddress = await ethAdapter.getSignerAddress()
  let signature = await ethAdapter.signTypedData(safeTransactionEIP712Args, methodVersion)
  signature = adjustVInSignature('eth_signTypedData', signature)
  return new EthSignSignature(signerAddress, signature)
}