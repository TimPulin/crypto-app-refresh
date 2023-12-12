import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { parsStringToWalletList } from '../../utils/parse-string-to-wallet-list';
import Form from '../form/Form';
import { addWallet } from '../../store/slicers/wallets-form-state-slice';

const STYLE_DRUG_ZONE_ACTIVE = 'drug-wallet-zone--active';

export default function DrugWalletZone() {
  const dispatch = useDispatch();
  const [isDrugOver, setIsDrugOver] = useState(false);

  const styleActive = () => (isDrugOver ? STYLE_DRUG_ZONE_ACTIVE : '');

  const onDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDrugOver(true);
  };

  const onDragLeave = (event:React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDrugOver(false);
  };

  const onDragCapture = (event:React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDrugOver(false);

    if (event.dataTransfer.files.length > 0) {
      const file = event.dataTransfer.files[0];

      if (file.type === 'text/csv') {
        const reader = new FileReader();
        reader.readAsText(file);
        reader.onloadend = () => {
          if (typeof reader.result === 'string') {
            const data = reader.result;
            const walletList = parsStringToWalletList(data);
            dispatch(addWallet(walletList));
          }
        };
      } else {
        console.log(`формат файла должен быть "csv", получили ${file.type}`);
      }
    }
  };

  return (
    <div
      className={`drug-wallet-zone ${styleActive()}`}
      onDragOver={onDragOver}
      onDrop={onDragCapture}
      onDragLeave={onDragLeave}
    >
      <Form />
    </div>
  );
}
