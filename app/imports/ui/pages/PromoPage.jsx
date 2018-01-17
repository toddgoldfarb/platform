import React, { PropTypes } from 'react';
import MobileNavContainer from '../containers/MobileNavContainer.jsx';
import DesktopHeaderContainer from '../containers/DesktopHeaderContainer.jsx';
import PurchasePlanButton from '../components/PurchasePlanButton';
import { plans } from '../content/plans.js';

import {
  Button,
  Container,
  Header,
  Image,
  Segment,
} from 'semantic-ui-react';

const PurchaseButton = (props) => (
  <Segment basic textAlign="center">
    <PurchasePlanButton
      plan={plans.iAwakeMembershipPromo}
    >
      <Button
        primary
        size="huge"
        content="Purchase"
        {...props}
      />
    </PurchasePlanButton>
  </Segment>
);

export default function PromoPage(props, context) {
  return (
    <div>
      {!context.isMobile && <DesktopHeaderContainer />}
      <Container text>
        <Segment size="big" style={{ marginTop: '1em' }}>

          <Header size="large" textAlign="center">
            Join Our Digital Temple!
          </Header>

          <p>
            The Amplifield is a digital platform designed to make you
            feel more connected with a global community of people like
            you - folks passionately craving to amplify love, healing
            and kindness in our world.
          </p>
          <p>
            We host a continuous series of synchronized meditations
            and prayers, while also putting forth a world-class
            collection of content you can stream anywhere, anytime.
          </p>
          <p>
            For a limited time you’ll gain access to hundreds of
            tracks for only $79&nbsp;/&nbsp;year.  New content will be
            added each month, and you’ll be locked in at this
            discounted price for the lifetime of your membership:
          </p>

          <PurchaseButton content="Become AMP Member Today!" />
          <p>
            Below is a description of our inaugural partners + the
            library of awesome tracks waiting for you!  Join our
            digital movement and let’s amplify love, peace and
            generosity by practicing together...
          </p>
          <p>
            Gratefully, <br />
            Todd &amp; Team
          </p>
        </Segment>

        <Segment size="big">
          <Image
            size="medium"
            src="https://s3-us-west-2.amazonaws.com/amplifield-dev/image/LOGO_technologies.jpg"
            floated="right"
          />
          <Header size="large">iAwake Technologies</Header>
          <p>
            Dozens of powerful brainwave entrainment tracks that will
            help you accelerate the benefits of your meditation
            practice, increase focus / concentration, and drop you
            into powerful states of euphoria and relaxation.  Tracks
            include:
          </p>
          <ul>
            <li>Heartwave</li>
            <li>Profound Meditation</li>
            <li>Deep Delta</li>
            <li>Harmonic Resonance</li>
            <li>Gamma Burst</li>
            <li>Deep Recovery</li>
            <li>Digital Euphoria</li>
            <li>Audio Serenity</li>
            <li>Flow State</li>
            <li>Many more...</li>
          </ul>

          <PurchaseButton content="Stream iAwake Now" />
        </Segment>

        <Segment size="big">
          <Image
            size="medium"
            src="https://amplifield-dev.s3-us-west-2.amazonaws.com/image/1498776216827-img1.png"
            floated="right"
          />
          <Header size="large">11 Breathing Meditations for Love & Happiness</Header>
          <p>
            Enjoy a powerful ensemble of guided meditations from world
            renowned teacher Tony Samara.  By consistently putting
            these breathing meditations into practice it is possible
            to improve your:
          </p>
          <ul>
            <li>emotional well-being</li>
            <li>overall state of relaxation</li>
            <li>ability to manage stress levels </li>
            <li>mental strength and focus</li>
            <li>energy levels in the body </li>
            <li>immune system's ability to fend off disease</li>
          </ul>

          <p>
            The meditations range from 30 minutes to 45 minutes in length, enjoy!
          </p>

          <PurchaseButton content="Stream Now" />
        </Segment>

        <Segment size="big">
          <Image
            size="medium"
            src="https://lh5.googleusercontent.com/0aORMEKsDc8pEiDtyD9PUPsZd91XMhkq85K4w5EaWMVXDj5HjkDNANFnHVuSaGV8hekBQzXISAjTtU454_rMDf30g1pvAZkgPKz5G6ap3S8OqH2-d5NIVS-NWD_oe57PhtWdclhp"
            floated="right"
          />
          <Header size="large">Global Oneness Day (2016)</Header>
          <p>
            The complete set of interviews, meditations and dialogues
            from Global Oneness Day featuring 20+ sessions from
            luminaries in spirituality, science, personal growth and
            more!  Some of the speakers you’ll hear:
          </p>
          <ul>
            <li>Deepak Chopra</li>
            <li>Michael Bernard Beckwith</li>
            <li>Barbara Marx Hubbard</li>
            <li>Gregg Braden</li>
            <li>Jean Houston</li>
            <li>Ervin Laszlo</li>
            <li>Ken Wilber</li>
            <li>Many others...</li>
          </ul>
          <PurchaseButton content="Stream Global Oneness!" />
        </Segment>

        <Segment size="big">
          <Image
            size="medium"
            src="https://lh4.googleusercontent.com/jkPnV7tzOyuAsrmp8xLcH11SqdxU_KrgHwANr10cJ2kY5PLF_syqBw32bN7QigG_SUfRDIaO6SZSrzezjI-zOwqBqesoQYI4lWleWlPOkDbD9i54GthijqVBGb5pa4jf5m6dLKyo"
            floated="right"
          />
          <Header size="large">21-Day Consciousness Accelerator Program</Header>
          <p>
            A powerful guided meditation program designed to
            accelerate your awareness dramatically in 21 days.
            Culminating with a beautiful finale by Barbara Marx
            Hubbard, various teachers guide you into a powerful states
            using spoken word, silence and brainwave entrainment
            enhancers.  The program works to amplify different
            qualities each day, including:
          </p>
          <ul>
            <li>Harmony & tranquility</li>
            <li>Curiosity</li>
            <li>Joy</li>
            <li>Energy & revitalization</li>
            <li>Compassion & empathy</li>
            <li>Oneness</li>
            <li>Accessing the global heart</li>
          </ul>
          <PurchaseButton content="Stream Now!" />
        </Segment>

        <Segment size="big">
          <Image
            size="medium"
            src="https://lh6.googleusercontent.com/TwiZ9ecCu3lr5uSe7uNryiBhIw1YEfrZqa2vI4czPfYtzSc2HAMYJm4VocX1xFbCFaIl9rEfbPxmyvNttKDEx5EaRpdU-Lv8q17eJKo3JG_EUxyn8j7d98ZhNvMrr1CiHdOLe0yF"
            floated="right"
          />
          <Header size="large">Guided Meditations</Header>
          <p>
            An assortment guided meditations, prayers, visualizations
            and breathwork led by world-renowned teachers and a few
            up-and-comers.  Themes include:
          </p>
          <ul>
            <li>Compassion</li>
            <li>Activating chakras</li>
            <li>Dissolving inner critic</li>
            <li>Transformational breathwork - practice</li>
            <li>Indigo Sound Healing</li>
            <li>Ahimsa prayer (by the wonderful Michael Bernard Beckwith)</li>
            <li>Many more...</li>
          </ul>
          <PurchaseButton content="Stream Now!" />
        </Segment>

        <Segment size="big">
          <Image
            size="medium"
            src="https://amplifield-dev.s3-us-west-2.amazonaws.com/image/1498776221928-img2.png"
            floated="right"
          />
          <Header size="large">11 Meditations for Joy & Freedom</Header>
          <p>
            A beautiful grouping of meditations from Tony Samara that are designed to help you:
          </p>
          <ul>
            <li>let go of the past</li>
            <li>become compassionate and kind</li>
            <li>align with the vibration of consciousness</li>
            <li>transform old habits</li>
            <li>deeply connect to life</li>
          </ul>

          <PurchaseButton content="Stream Now" />
        </Segment>

        <Segment size="big">
          <Header size="large">Community & More</Header>
          <p>
            We'll be adding tons of new content every month into the
            membership library, including:
          </p>
          <ul>
            <li>Brainwave entrainment packages</li>
            <li>Guided meditations & visualizations</li>
            <li>Gorgeous music</li>
            <li>An assortment of personal growth courses</li>
            <li>Much, much more</li>
          </ul>
          <p>
            Perhaps the best part is that you’ll be joining a
            community of people who want to amplify the frequencies of
            love and healing in our world.  EVERY track in your
            library can be shared and experienced with friends (even
            if they are not a member)!
          </p>
          <p>
            So what are you waiting for?  This is a limited time
            offer, so take advantage and secure this deal right now:
          </p>
          <PurchaseButton content="Become AMP Member For Only $79/year" />

          <Image
            src="https://lh4.googleusercontent.com/JYFZh28Z2yN96xsHzSFjD8P16iYHlvfvXzqGS9JLBO7WUxx3zxET5OrlNV9DQI8UZkF-Dr6H9nMtyOOgf77B5Gu_xHPQogVpzuJSg_9DRAmLvvdJpWpcpyfMLV7SxUUoM9dkuf1D"
            fluid
          />
        </Segment>

      </Container>
      {context.isMobile && <MobileNavContainer />}
    </div>
  );
}

PromoPage.contextTypes = {
  isMobile: PropTypes.bool.isRequired,
};
