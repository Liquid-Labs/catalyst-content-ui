import React from 'react'
import PropTypes from 'prop-types'

import Markdown from 'react-markdown'
import * as Sqrl from 'squirrelly'

const MarkdownContent = ({text, parameters, ...props}) => {

  const firstPass = Sqrl.Render(text, parameters)

  return <Markdown source={firstPass} {...props} />
}

if (process.env.NODE_ENV !== 'production') {
  MarkdownContent.propTypes = {
    text       : PropTypes.string.isRequired,
    parameters : PropTypes.object,
  }
}

export { MarkdownContent }
