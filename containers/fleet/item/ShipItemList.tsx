import Button from '@/components/Button';
import styles from '../fleet.module.css';
import ShipItem from './ShipItem';
import { ShipItemProps } from './ShipProps';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { checkItem } from '../main';

export default function ShipItemList({
  useItem,
  changeUseItem,
  addUseItem,
  kind,
}: {
  useItem: ShipItemProps[];
  changeUseItem: any;
  addUseItem: any;
  kind: ShipItemProps['kind'];
}) {
  checkItem(useItem);

  return (
    <div className={`${styles.wrap}`}>
      <ul className={`${styles.list}`}>
        {useItem.map((item, index) => (
          <ShipItem
            key={index}
            index={index}
            option={item}
            onChange={changeUseItem}
          />
        ))}
        <li className={`${styles.item} ${styles.add}`}>
          <Button onClick={() => addUseItem(kind)}>
            <FontAwesomeIcon icon={faPlus} className="mr-2 text-lg" />
            <span className="text-lg font-semibold">{`추가`}</span>
          </Button>
        </li>
      </ul>
    </div>
  );
}
