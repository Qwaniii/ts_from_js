import useServices from './use-services';
import Store from '../store/index'

/**
 * Хук для доступа к объекту хранилища
 */
export default function useStore(): Store {
  return useServices().store;
}