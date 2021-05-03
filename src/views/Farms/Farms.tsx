import React, { useCallback } from 'react'
import { Route, useRouteMatch } from 'react-router-dom'
import BigNumber from 'bignumber.js'
import { Image, Heading } from '@pancakeswap-libs/uikit'
import { BLOCKS_PER_YEAR, BACKUP_PER_BLOCK, BACKUP_POOL_PID } from 'config'
import Grid from 'components/layout/Grid'
import { useFarms, usePriceBnbBusd } from 'state/hooks'
import { QuoteToken } from 'config/constants/types'
import useI18n from 'hooks/useI18n'
import Page from 'components/Page'
import FarmCard, { FarmWithStakedValue } from './components/FarmCard'
import FarmTabButtons from './components/FarmTabButtons'
import Divider from './components/Divider'

const Farms: React.FC = () => {
  const { path } = useRouteMatch()
  const TranslateString = useI18n()
  const farmsLP = useFarms()
  const bnbPrice = usePriceBnbBusd()

  const activeFarms = farmsLP.filter((farm) => farm.pid !== 0 && farm.multiplier !== '0X')
  const inactiveFarms = farmsLP.filter((farm) => farm.pid !== 0 && farm.multiplier === '0X')

  const farmsList = useCallback(
    (farmsToDisplay, removed: boolean) => {
      const backupPriceVsBNB = new BigNumber(farmsLP.find((farm) => farm.pid === BACKUP_POOL_PID)?.tokenPriceVsQuote || 0)
      const farmsToDisplayWithAPY: FarmWithStakedValue[] = farmsToDisplay.map((farm) => {
        if (!farm.tokenAmount || !farm.lpTotalInQuoteToken || !farm.lpTotalInQuoteToken) {
          return farm
        }
        const backupRewardPerBlock = BACKUP_PER_BLOCK.times(farm.poolWeight)
        const backupRewardPerYear = backupRewardPerBlock.times(BLOCKS_PER_YEAR)

        let apy = backupPriceVsBNB.times(backupRewardPerYear).div(farm.lpTotalInQuoteToken)

        if (farm.quoteTokenSymbol === QuoteToken.BUSD) {
          apy = backupPriceVsBNB.times(cakeRewardPerYear).div(farm.lpTotalInQuoteToken).times(bnbPrice)
        } else if (farm.quoteTokenSymbol === QuoteToken.BACKUP) {
          apy = backupRewardPerYear.div(farm.lpTotalInQuoteToken)
        } else if (farm.dual) {
          const backupApy =
            farm && cakePriceVsBNB.times(cakeRewardPerBlock).times(BLOCKS_PER_YEAR).div(farm.lpTotalInQuoteToken)
          const dualApy =
            farm.tokenPriceVsQuote &&
            new BigNumber(farm.tokenPriceVsQuote)
              .times(farm.dual.rewardPerBlock)
              .times(BLOCKS_PER_YEAR)
              .div(farm.lpTotalInQuoteToken)

          apy = backupApy && dualApy && backupApy.plus(dualApy)
        }

        return { ...farm, apy }
      })
      return farmsToDisplayWithAPY.map((farm) => <FarmCard key={farm.pid} farm={farm} removed={removed} />)
    },
    [bnbPrice, farmsLP],
  )

  return (
    <Page>
      <Heading as="h1" size="lg" color="secondary" m="50px" style={{ textAlign: 'center' }}>
        {TranslateString(999, 'Stake LP tokens to earn BACKUP')}
      </Heading>
      <FarmTabButtons />
      <Page>
        <Divider />
        <Route exact path={`${path}`}>
          <Grid>{farmsList(activeFarms, false)}</Grid>
        </Route>
        <Route exact path={`${path}/history`}>
          <Grid>{farmsList(inactiveFarms, true)}</Grid>
        </Route>
      </Page>
      <Image src="/images/cakecat.png" alt="Pancake illustration" width={949} height={384} responsive />
    </Page>
  )
}

export default Farms
