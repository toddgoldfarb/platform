import React, { PropTypes } from 'react';
import Markdown from './Markdown.jsx';
import {
  Card,
  Embed,
  Image,
} from 'semantic-ui-react';
import { durationString } from '../../util/time-functions.js';
import { parseYoutubeUrl } from '../../util/parseYoutubeUrl.js';

export default function EventPreview({ event }) {
  if (!event) {
    return null;
  }
  return (
    <Card fluid >
      <Card.Content>
        <Card.Header>{event.title}</Card.Header>
        <Card.Meta>{durationString(event)}</Card.Meta>
      </Card.Content>
      <div>
        {event.contentType === 'mp3' ? (
           <div>
             <audio
               style={{ width: '100%' }}
               controls
               src={event.trackUrl}
             />
             <Image
               fluid
               src={event.imageUrl}
               className={event.published ? '' : 'grayscale'}
             />
           </div>
         ) : (
           <Embed
             id={parseYoutubeUrl(event.youtubeUrl)}
             source="youtube"
             active
             autoplay={false}
           />
         )}
      </div>
      <Card.Content>
        <Card.Description>
          <Markdown content={event.description} />
        </Card.Description>
      </Card.Content>
    </Card>
  );
}

EventPreview.propTypes = {
  event: PropTypes.object,
  onClickEdit: PropTypes.func,
};
