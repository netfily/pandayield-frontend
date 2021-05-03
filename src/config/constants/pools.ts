import { PoolConfig, QuoteToken, PoolCategory } from './types'

const pools: PoolConfig[] = [
  {
    sousId: 0,
    tokenName: 'BACKUP',
    stakingTokenName: QuoteToken.BACKUP,
    stakingTokenAddress: '0x48e15ABBcb21C7f564c1B5Ae08A9f7829745F6D7',
    contractAddress: {
      97: '0xd3af5fe61dbaf8f73149bfcfa9fb653ff096029a',
      56: '0xB594eB091B1cC711879Ce5379F5fd06C4b028833',
    },
    poolCategory: PoolCategory.CORE,
    projectLink: 'http://backup.finance/',
    harvest: true,
    tokenPerBlock: '10',
    sortOrder: 1,
    isFinished: false,
    tokenDecimals: 18,
  },
  {
    sousId: 37,
    tokenName: 'FRONT',
    stakingTokenName: QuoteToken.BACKUP,
    stakingTokenAddress: '0x48e15ABBcb21C7f564c1B5Ae08A9f7829745F6D7',
    contractAddress: {
      97: '',
      56: '0xB594eB091B1cC711879Ce5379F5fd06C4b028833',
    },
    poolCategory: PoolCategory.CORE,
    projectLink: 'https://backup.finance/',
    harvest: true,
    tokenPerBlock: '0.2546',
    sortOrder: 999,
    isFinished: false,
    tokenDecimals: 18,
  },
  {
  },
]

export default pools
