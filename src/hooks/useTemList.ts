import { getTemLists } from "@/apis/temList";
import { getWorkList } from "@/apis/user";

export default (callBack?: (data: any) => void): any => {
  const _getTemLists = async (params: { type: string }): Promise<void> => {
    const res = await getTemLists(params);
    if (res?.code === 200) {
      callBack && callBack(res?.data);
    }
  };

  const _getWorkList = async (params: { userId: string }): Promise<void> => {
    const res = await getWorkList(params);
    if (res?.code === 200) {
      callBack && callBack(res?.data);
    }
  };

  return {
    _getTemLists,
    _getWorkList,
  };
};
