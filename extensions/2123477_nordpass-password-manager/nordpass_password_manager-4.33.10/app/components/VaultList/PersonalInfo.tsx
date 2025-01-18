import { TitlePicker } from '@common/components/TitlePicker/TitlePicker';
import { FC, memo } from 'react';
import { IPersonalInfoItem } from '@common/contracts/contracts';
import TrashItemActions from '@extension/app/components/VaultList/TrashItemActions';
import { IItemTypeProps } from '@extension/app/components/VaultList/VaultList';
import ItemMenu from './ItemMenu/ItemMenu';

const PersonalInfo: FC<IItemTypeProps<IPersonalInfoItem>> = ({ item, isTrash }) => (
  <>
    <div className="w-third flex flex-1 items-center overflow-hidden">
      <TitlePicker item={item} shouldShowShareIndication />
    </div>
    <div className="vault-item-actions">
      {isTrash ? <TrashItemActions item={item} /> : <ItemMenu item={item} />}
    </div>
  </>
);

export default memo(PersonalInfo);
