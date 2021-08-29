// FontAwesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faReact,
	faChrome,
	faHornbill,
	faScribd,
} from '@fortawesome/free-brands-svg-icons';

// Dependencies
import React from 'react';
import {
	Button,
	Container,
	Header,
	Icon,
	Image,
	Segment,
} from 'semantic-ui-react';

export default function HomePage({ history }) {
	return (
		<Segment
			inverted
			textAlign='center'
			vertical
			className='masthead'
		>
			<Container>
				<Header as='h1' inverted>
					<FontAwesomeIcon
						icon={faHornbill}
						color='white'
						opacity='1'
						style={{ marginRight: '0.5rem' }}
						spin
					/>
					CoffMeet
				</Header>
				<Button
					animated='fade'
					size='huge'
					inverted
					onClick={() => history.push('/events')}
				>
					<Button.Content visible>Get Started</Button.Content>

					<Button.Content hidden>
						<Icon name='right arrow' color='black' inverted />
					</Button.Content>
				</Button>
			</Container>
		</Segment>
	);
}
