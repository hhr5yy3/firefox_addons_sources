import { wrapWithIntl } from '@tests/extension/utils/wrapWithIntl';
import MockDate from 'mockdate';
import StarRating, {
  MAX_RATING,
  GOOD_RATING,
  MIN_VAULT_ITEMS, MIN_REGISTRATION_DAYS_DIFF,
} from '@extension/app/components/StarRating/StarRating';
import { fireEvent, waitFor } from '@testing-library/react';
import { LINKS, Storage } from '@extension/common/constants';
import AuthContext from '@extension/app/context/AuthContext';
import { ISubscriptionData } from '@common/utils/parseSubscriptionData/parseSubscriptionData';
import { AuthState } from '@common/store/reducers/authReducer/authConstants';
import StorageApi from '@extension/browser/storageApi';
import { Browser } from '@common/constants';
import { renderWithInitEffects } from '@tests/utils/renderWithInitEffects';
import getBrowser from '@common/utils/getBrowser';
import { openInNewTab } from '@extension/common/utils/openInNewTab';

const starIconTestId = 'star-icon';
const clearIconTestId = 'clear-icon';
const beforeMonthDate = '2021-09-14';
const yesterdayDate = '2021-10-13';
const userUuid = 'random-123';
const rateNordPass = 'How would you rate NordPass?';
const goToChromeStore = 'Go to Chrome Store';
const goToFirefox = 'Go to Firefox';
const storageKey = `${Storage.IsExtensionRatingShown}-${userUuid}` as Storage;
const storageSet = jest.fn();
const getUserUuidMock = jest.fn();

interface IMockProps {
  vaultItemsLength?: number;
  registrationDate?: string;
  storageData?: boolean;
  browser?: Browser;
  userUuid?: string | null;
}

const mockProps = (props?: IMockProps) => ({
  vaultItemsLength: MIN_VAULT_ITEMS,
  registrationDate: beforeMonthDate,
  storageData: false,
  userUuid,
  ...props,
});

const setup = (props = mockProps({ browser: Browser.Chrome })) => {
  (StorageApi.set as jest.Mock).mockImplementation(storageSet);
  (StorageApi.get as jest.Mock).mockResolvedValue({
    [storageKey]: props.storageData,
  });
  (getBrowser as jest.Mock).mockReturnValue(props.browser);
  getUserUuidMock.mockReturnValue(props.userUuid);

  return renderWithInitEffects(wrapWithIntl(
    <AuthContext.Provider
      value={{
        authState: AuthState.Authenticated,
        subscriptionData: { registrationDate: props.registrationDate } as ISubscriptionData,
        email: 'test@test.com',
      }}
    >
      <StarRating vaultItemsLength={props.vaultItemsLength} />
    </AuthContext.Provider>,
  ));
};

jest.mock('@extension/browser/storageApi');
jest.mock('@extension/common/utils/openInNewTab');
jest.mock('@common/utils/getBrowser');
jest.mock('~/api/ExtensionAPI', () => jest.fn().mockReturnValue({ getUserUuid: () => getUserUuidMock }));

MockDate.set(new Date('2021-10-14'));

describe('StarRating', () => {
  beforeEach(jest.clearAllMocks);

  it('should render main window', async () => {
    const { findByText, findAllByTestId, queryByTestId } = await setup();

    expect(await findByText(rateNordPass)).toBeVisible();
    expect(await findAllByTestId(starIconTestId)).toHaveLength(MAX_RATING);
    expect(queryByTestId(clearIconTestId)).toBeNull();
  });

  it('should show thank you message on bad rating select', async () => {
    const { findByText, findByTestId, findAllByTestId } = await setup();
    fireEvent.click((await findAllByTestId(starIconTestId))[GOOD_RATING - 1]);

    expect(await findByTestId(clearIconTestId)).toBeVisible();
    expect(await findByText('Your feedback helps us improve. Thank you.')).toBeVisible();
  });

  it('should suggest rating on chrome store on good rating select', async () => {
    const { findByText, findAllByTestId } = await setup();

    // star order is reversed, so star[0] = Best Rating, star[1] = Good Rating
    fireEvent.click((await findAllByTestId(starIconTestId))[MAX_RATING - GOOD_RATING]);

    expect(await findByText('Rate NordPass on Chrome Store')).toBeVisible();
    expect(await findByText(goToChromeStore)).toBeVisible();
  });

  it('should open Chrome Store on button click', async () => {
    const { findByText, findAllByTestId } = await setup();

    // star order is reversed, so star[0] = Best Rating, star[1] = Good Rating
    fireEvent.click((await findAllByTestId(starIconTestId))[MAX_RATING - GOOD_RATING]);
    fireEvent.click(await findByText(goToChromeStore));

    expect(openInNewTab).toHaveBeenCalledWith(LINKS.CHROME_STORE);
  });

  it('should suggest rating on Firefox Add-Ons Page on good rating select', async () => {
    const { findByText, findAllByTestId } = await setup(mockProps({ browser: Browser.Firefox }));

    // star order is reversed, so star[0] = Best Rating, star[1] = Good Rating
    fireEvent.click((await findAllByTestId(starIconTestId))[MAX_RATING - GOOD_RATING]);

    expect(await findByText('Rate NordPass on Firefox Add-Ons page')).toBeVisible();
    expect(await findByText(goToFirefox)).toBeVisible();
  });

  it('should open Firefox Add-Ons Page on button click', async () => {
    const { findByText, findAllByTestId } = await setup(mockProps({ browser: Browser.Firefox }));

    // star order is reversed, so star[0] = Best Rating, star[1] = Good Rating
    fireEvent.click((await findAllByTestId(starIconTestId))[MAX_RATING - GOOD_RATING]);
    fireEvent.click(await findByText(goToFirefox));

    expect(openInNewTab).toHaveBeenCalledWith(LINKS.FIREFOX_ADDONS_PAGE);
  });

  it.each([
    ['user uuid is null', { userUuid: null }],
    [`registration diff till now is higher than ${MIN_REGISTRATION_DAYS_DIFF}`, { registrationDate: yesterdayDate }],
    [`has vault items less than ${MIN_VAULT_ITEMS}`, { vaultItemsLength: MIN_VAULT_ITEMS - 1 }],
    ['browser is not Chrome or Firefox', { browser: Browser.Safari }],
  ])('should not be visible, when %s', async (_description: string, props: IMockProps) => {
    const { queryByText } = await setup(mockProps(props));
    expect(queryByText(rateNordPass)).toBeNull();
  });

  it('should call StorageApi.set when it was shown', async () => {
    await setup(mockProps({ browser: Browser.Chrome }));

    await waitFor(() => {
      expect(StorageApi.set).toHaveBeenCalledWith({ [storageKey]: true });
    });
  });
});
