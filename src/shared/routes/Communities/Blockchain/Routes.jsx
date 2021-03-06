/**
 * Routing of Wipro Community.
 */

/* TODO: This assembly of custom challenge listing page should be split out into
 * a separate component. But, it is good enough for now. */
import ChallengeListingTopBanner from
  'components/tc-communities/communities/blockchain/ChallengeListing/TopBanner';
import ChallengeListingRegisterToSee from
  'components/tc-communities/communities/blockchain/ChallengeListing/RegisterToSee';
import ChallengeDetails from 'routes/ChallengeDetails';
import ChallengeListing from 'routes/Communities/ChallengeListing';
import Error404 from 'components/Error404';
import Footer from 'components/tc-communities/Footer2';
import Header from 'containers/tc-communities/Header';
import Home from 'components/tc-communities/communities/blockchain/Home';
import Learn from 'containers/tc-communities/blockchain/Learn';
import PT from 'prop-types';
import React from 'react';
import Submission from 'routes/Submission';
import SubmissionManagement from 'routes/SubmissionManagement';
import { Route, Switch } from 'react-router-dom';

import Leaderboard from '../Leaderboard';

export default function Routes({ base, member, meta }) {
  return (
    <Route
      component={({ match }) => (
        <div>
          <Header
            baseUrl={base}
            hideJoinNow
            pageId={match.params.pageId || 'home'}
          />
          <Switch>
            <Route
              component={() => (
                <div>
                  <ChallengeListingTopBanner />
                  { member ? (
                    ChallengeListing({
                      challengesUrl: `${base}/challenges`,
                      meta,
                      listingOnly: true,
                      newChallengeDetails: true,
                    })
                  ) : <ChallengeListingRegisterToSee /> }
                </div>
              )}
              exact
              path={`${base}/challenges`}
            />
            <Route
              component={routeProps => ChallengeDetails({
                ...routeProps,
                challengesUrl: `${base}/challenges`,
              })}
              exact
              path={`${base}/challenges/:challengeId(\\d{8})`}
            />
            <Route
              component={routeProps => Submission({
                ...routeProps,
                challengesUrl: `${base}/challenges`,
              })}
              exact
              path={`${base}/challenges/:challengeId(\\d{8})/submit`}
            />
            <Route
              component={routeProps => SubmissionManagement({
                ...routeProps,
                challengesUrl: `${base}/challenges`,
              })}
              exact
              path={`${base}/challenges/:challengeId(\\d{8})/my-submissions`}
            />
            <Route
              component={() => <Leaderboard meta={meta} />}
              exact
              path={`${base}/leaderboard`}
            />
            <Route
              component={() => <Learn baseUrl={base} />}
              exact
              path={`${base}/learn`}
            />
            <Route
              component={Home}
              exact
              path={`${base}/home`}
            />
            <Route
              component={Error404}
              path={`${base}/:any`}
            />
            <Route
              component={Home}
              exact
              path={`${base}`}
            />
          </Switch>
          <Footer />
        </div>
      )}
      path={`${base}/:pageId?`}
    />
  );
}

Routes.defaultProps = {
  base: '',
};

Routes.propTypes = {
  base: PT.string,
  member: PT.bool.isRequired,
  meta: PT.shape().isRequired,
};
