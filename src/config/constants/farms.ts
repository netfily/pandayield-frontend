import contracts from './contracts'
import { FarmConfig, QuoteToken } from './types'

const farms: FarmConfig[] = [
  {
    pid: 0,
    lpSymbol: 'BACKUP',
    lpAddresses: {
      97: '0x9C21123D94b93361a29B2C2EFB3d5CD8B17e0A9e',
      56: '0x48e15ABBcb21C7f564c1B5Ae08A9f7829745F6D7',
    },
    tokenSymbol: 'SUNI',
    tokenAddresses: {
      97: '0xe9e7cea3dedca5984780bafc599bd69add087d56',
      56: '0x48e15ABBcb21C7f564c1B5Ae08A9f7829745F6D7',
    },
    quoteTokenSymbol: QuoteToken.BNB,
    quoteTokenAdresses: contracts.wbnb,
  },
  {
    pid: 1,
    lpSymbol: 'BACKUP-BNB LP',
    lpAddresses: {
      97: '0x2a1e4CdDf51Ab15A90EDeb56C7d132ef7915cCa9',
      56: '0x2a1e4CdDf51Ab15A90EDeb56C7d132ef7915cCa9',
    },
    tokenSymbol: 'BACKUP',
    tokenAddresses: {
      97: '0xe9e7cea3dedca5984780bafc599bd69add087d56',
      56: '0xe9e7cea3dedca5984780bafc599bd69add087d56',
    },
    quoteTokenSymbol: QuoteToken.BNB,
    quoteTokenAdresses: contracts.wbnb,

export default farms
