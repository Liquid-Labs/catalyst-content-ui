import React, { useMemo } from 'react'
import PropTypes from 'prop-types'

// import { AccessChecker } from '@liquid-labs/catalyst-users-ui'
import { Content } from '../widgets/Content'
import {
  ItemContext,
  ItemControls,
  ItemFetcher,
  useAppControlsAPI,
  useItemContextAPI } from '@liquid-labs/catalyst-core-ui'
import { ValidationContext } from '@liquid-labs/react-validation'

// const accessCond = () => true

const ControlsManager = ({children}) => {
  const appCtrlsAPI = useAppControlsAPI()
  const itemContextAPI = useItemContextAPI()

  const isItemReady = itemContextAPI.isItemReady()
  useMemo(() => {
    appCtrlsAPI.setControls(isItemReady ? <ItemControls /> : null)
  }, [ isItemReady ])

  return children
}

const ContentView = ({location, ...props}) => {
  // <AccessChecker check={accessCond}>
  return (
    <ValidationContext>
      <ItemContext>
        <ControlsManager>
          <ItemFetcher itemUrl={location.pathname} itemKey='content'>
            {({content}) =>
              <Content content={content} {...props} />}
          </ItemFetcher>
        </ControlsManager>
      </ItemContext>
    </ValidationContext>
  )
}

if (process.env.NODE_ENV !== 'production') {
  ContentView.propTypes = {
    location : PropTypes.object.isRequired
  }
}

export { ContentView }
