import React, { PropTypes } from 'react';
import marked from 'marked';

export default function Markdown({ content }) {
  const renderer = new marked.Renderer();

  renderer.link = function (href, title, text) {
    return `<a href=${href} title=${title} target="_blank">${text}</a>`;
  };

  return (
    <span
      dangerouslySetInnerHTML={{ __html: marked(content || '', { renderer }) }}
    />
  );
}

Markdown.propTypes = {
  content: PropTypes.string,
};
