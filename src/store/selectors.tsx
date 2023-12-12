import { useSelector } from 'react-redux';
import { RootStateType } from './index';

export const useWalletsFormState = () => useSelector((state:RootStateType) => state.walletsFormInstance.value);
