import React from 'react'
import PropTypes from 'prop-types'

import { MarkdownContent } from './contentTypes/MarkdownContent'

import { useFeedbackAPI } from '@liquid-labs/catalyst-core-ui'

const UnsupportedContent = ({msg}) => {
  const feedbackAPI = useFeedbackAPI()

  feedbackAPI.addErrorMessage(msg)

  return msg // TODO: make this pretty with an icon and formatting.
}

const Content = ({content, renderProps={}, ...props}) => {
  const type = content.type
  const format = content.format

  // establish a common root element and then hand off to actual renderer.
  return (
    <div {...props}>
      { type === 'TEXT'
        ? format === 'MARKDOWN'
          ? <MarkdownContent text={content.text} {...renderProps} />
          : <UnsupportedContent msg={`Unsupported text format: ${format}`} />
        : <UnsupportedContent msg={`Unsupported content type: ${type}`} />
      }
    </div>
  )
}

if (process.env.NODE_ENV !== 'production') {
  Content.propTypes = {
    content     : PropTypes.object.isRequired,
    renderProps : PropTypes.object,
  }
}

export { Content }
