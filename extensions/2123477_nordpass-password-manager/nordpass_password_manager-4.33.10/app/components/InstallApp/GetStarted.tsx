import { useState } from 'react';
import cx from 'classnames';
import { Button, Col, Image, Link, Row, Text, SVG } from '@nord/ui';
import { FormattedMessage } from 'react-intl';
import { getOs, TOperatingSystem } from '@common/services/getOs';
import { LINKS } from '@extension/common/constants';
import windowsIcon from '@icons/24/windows.svg';
import macosIcon from '@icons/24/macos.svg';
import linuxIcon from '@icons/24/linux.svg';
import { api } from '@extension/app/api';
import { ROUTES } from '@common/constants';

const os = getOs();

function isWin64() {
  return navigator.userAgent.includes('WOW64') || navigator.userAgent.includes('Win64');
}

const archSufix = os === 'Win' && isWin64() ? '' : '_x86'; // only show 32 bit install when we specifically detect it

const firstStepComponent = <FormattedMessage id="getStartedInstallStep" />;
const afterInstallText = <FormattedMessage id="getStartedAfterInstallStep" />;
const loginText = <FormattedMessage id="logIntoAccount" />;

const buttons: Array<{ os: TOperatingSystem; image: string; text: string }> = [
  {
    os: 'Win',
    image: windowsIcon,
    text: 'Windows',
  },
  {
    os: 'Mac',
    image: macosIcon,
    text: 'Mac',
  },
  {
    os: 'Linux',
    image: linuxIcon,
    text: 'Linux',
  },
];

const data: Record<TOperatingSystem, { button?: any; steps: Array<any> }> = {
  Win: {
    button: {
      text: <FormattedMessage id="winGetStartedText" />,
      subText: <FormattedMessage id="winGetStartedSubText" />,
      file: `windows${archSufix}/NordPassSetup${archSufix}.exe`,
    },
    steps: [
      {
        image: '/assets/app-win-01',
        title: <FormattedMessage id="winGetStartedStep" />,
        text: firstStepComponent,
      },
      {
        image: '/assets/app-win-02',
        title: loginText,
        text: afterInstallText,
      },
    ],
  },
  Mac: {
    button: {
      text: <FormattedMessage id="macGetStartedText" />,
      subText: <FormattedMessage id="macGetStartedSubText" />,
      file: 'mac/NordPass.dmg',
    },
    steps: [
      {
        image: '/assets/app-mac-01',
        title: <FormattedMessage id="getNordPassDesktopApp" />,
        text: firstStepComponent,
      },
      {
        image: '/assets/app-mac-02',
        title: loginText,
        text: afterInstallText,
      },
    ],
  },
  Linux: {
    steps: [
      {
        image: '/assets/app-linux-01',
        title: <FormattedMessage id="linuxGetStartedStep" />,
        text: (
          <div>
            <FormattedMessage id="linuxGetStartedStepText" />
            <div className="bg-white p-2 mb-1 mt-2 font-bold">snap install nordpass</div>
          </div>
        ),
      },
      {
        image: '/assets/app-linux-02',
        title: loginText,
        text: afterInstallText,
      },
    ],
  },
};

const GetStarted = () => {
  const [selected, setSelected] = useState(os || 'Win');

  const clickOpenHandler = () => {
    api.extension.openApp({ url: ROUTES.VAULT });
  };

  return (
    <>
      <div className="mb-4 flex justify-center">
        {buttons.map(button => (
          <button
            key={button.os}
            onClick={() => setSelected(button.os)}
            type="button"
            className={cx(
              'outline-none flex items-center mx-2 py-2',
              selected === button.os && 'border-b-2 border-black',
            )}
          >
            <span className="leading-zero mr-2">
              <SVG src={button.image} noLazy />
            </span>
            <span className={cx('mr-1', selected !== button.os && 'text-grey')}>{button.text}</span>
          </button>
        ))}
      </div>

      {data[selected] && (
        <>
          {data[selected].button && (
            <div className="mb-4 flex flex-col justify-center">
              <Link
                colorClassName="hover:text-grey-dark ml-1"
                href={`${LINKS.DOWNLOADS_APP}/${data[selected].button.file}`}
                isTargetBlank
              >
                <Button color="teal">{data[selected].button.text}</Button>
              </Link>
              <Text className="text-grey-dark py-1" variant="overline">
                {data[selected].button.subText}
              </Text>
            </div>
          )}

          <p className="text-teal text-small mb-11 -letter-spacing-001">
            <FormattedMessage id="alreadyHaveApp" />
            &nbsp;
            <button type="button" className="underline" onClick={clickOpenHandler}>
              <FormattedMessage id="openNow" />
            </button>
          </p>

          <Row justify="between" className="text-left text-small mb-9">
            {data[selected].steps.map((item, index) => (
              <Col key={item.image} xs={12} md={6}>
                <Image
                  src={`${item.image}.jpg`}
                  className="w-full"
                  srcSet={{ '2x': `${item.image}@2x.jpg` }}
                />
                <div className="font-bold mt-4 mb-1">
                  <span className="text-teal">{`Step ${index + 1}.  `}</span>
                  {item.title}
                </div>
                <div className="text-grey-darker">{item.text}</div>
              </Col>
            ))}
          </Row>
        </>
      )}
    </>
  );
};

export default GetStarted;
