import { TranslationsService } from '@extension/app/utils/translations/translationsServiceClass';
import storageApi from '@extension/browser/storageApi';
import { createListener } from '@extension/app/api/createListener';

export const translationsService = new TranslationsService(storageApi, createListener);
