import { ErrorWrap } from '@/utils/request';
import { useRequest } from 'ahooks';
import type { Options, Plugin, Service } from 'ahooks/es/useRequest/src/types';

/**
 * 基于ahooks的useRequest
 * - 处理了 err 和 res 两个参数,和之前 request 保持一致
 */
const useQMRequest = <TData, TParams extends any[]>(
  service: Service<ErrorWrap<TData>, TParams>,
  options?: Options<ErrorWrap<TData>, TParams>,
  plugins?: Plugin<ErrorWrap<TData>, TParams>[],
) => {
  const { data, error, ...rest } = useRequest<ErrorWrap<TData>, TParams>(service, options, plugins);
  return { res: data?.res, err: error || data?.err, ...rest };
};

export default useQMRequest;