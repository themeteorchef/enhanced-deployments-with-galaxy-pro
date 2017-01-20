import { BrowserPolicy } from 'meteor/browser-policy-common';

BrowserPolicy.content.allowOriginForAll('www.fillmurray.com');
BrowserPolicy.content.allowOriginForAll('fillmurray.com');
BrowserPolicy.content.allowOriginForAll('*.google-analytics.com');
BrowserPolicy.content.allowOriginForAll('*.amazonaws.com');
