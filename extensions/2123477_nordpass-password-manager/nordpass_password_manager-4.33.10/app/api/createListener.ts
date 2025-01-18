import { createListenerFactory } from '@common/utils/createListenerFactory';
import browserApi from '@extension/browser/browserApi';

export const createListener = createListenerFactory(browserApi);
