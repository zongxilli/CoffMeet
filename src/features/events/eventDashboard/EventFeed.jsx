import React from 'react';
import { Feed, Header, Segment } from 'semantic-ui-react';

export default function EventsFeed() {
    const image = '/assets/user.png';
    const date = '3 days age';
    const summary = 'BBD joined an event';

    return (
        <>
            <Header attached color='teal' icon='newspaper' content='New feed' />
            <Segment attached='bottom'>
                <Feed>
                    <Feed.Event image={image} date={date} summary={summary} />
                    <Feed.Event image={image} date={date} summary={summary} />
                    <Feed.Event image={image} date={date} summary={summary} />
                    <Feed.Event image={image} date={date} summary={summary} />
                    <Feed.Event image={image} date={date} summary={summary} />
                </Feed>
            </Segment>
        </>
    )
}