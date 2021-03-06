import { expect } from 'chai';

import { Actions } from '@mm-actions/analytics';
import { analyticsReducer } from '@mm-reducers/analytics';

describe('Analytics Reducer', () => {
  let state;

  beforeEach(() => {
    state = {
      selected: null,
      analyticsModules: []
    };
  });

  it('should not modify state when action isnt recognized', () => {
    const action = { type: 'UNKNOWN' };

    const result = analyticsReducer(state, action);

    expect(result).to.deep.include({
      selected: null,
      analyticsModules: []
    });
  });

  it('should set the analyticsModules in state', () => {
    const data = [ { id: 'targets', label: 'analytics.targets' } ];
    const action = Actions.setAnalyticsModules(data);

    const result = analyticsReducer(state, action);

    expect(result).to.deep.include({
      selected: null,
      analyticsModules: [ { id: 'targets', label: 'analytics.targets' } ]
    });
  });

  it('should update the analyticsModules in state', () => {
    state.analyticsModules = [ { id: 'targets', label: 'analytics.targets' } ];
    const data = [
      {
        id: 'targets',
        label: 'analytics.targets',
        route: ['/', 'analytics', 'targets']
      },
      {
        id: 'target-aggregates',
        label: 'analytics.target.aggregates',
        route: ['/', 'analytics', 'target-aggregates']
      }
    ];
    const action = Actions.setAnalyticsModules(data);

    const result = analyticsReducer(state, action);

    expect(result).to.deep.include({
      selected: null,
      analyticsModules: [
        {
          id: 'targets',
          label: 'analytics.targets',
          route: ['/', 'analytics', 'targets']
        },
        {
          id: 'target-aggregates',
          label: 'analytics.target.aggregates',
          route: ['/', 'analytics', 'target-aggregates']
        }
      ]
    });
  });

  it('should set an empty array in the analyticsModules in state', () => {
    state.analyticsModules = [ { id: 'targets', label: 'analytics.targets' } ];
    const action = Actions.setAnalyticsModules([]);

    const result = analyticsReducer(state, action);

    expect(result).to.deep.include({
      selected: null,
      analyticsModules: []
    });
  });
});
