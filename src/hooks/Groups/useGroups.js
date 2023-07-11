import { usersList } from "api/controllers/grupos";
import { useCallback, useMemo, useState } from "react";

export function useGroups() {
  const [groups, setgroups] = useState([]);
  const [loading, setloading] = useState(false);
  const [error, seterror] = useState(false);

  const getGroups = useCallback(async () => {
    try {
      setloading(true);
      seterror(null);
      const groupList = await usersList();
      setgroups(groupList)
      window.localStorage.setItem('groups', JSON.stringify(groupList));  
    } catch (error) {
      seterror(error.message);
    } finally {
      setloading(false);
    }
  }, []);

  
 

  return { groups,setgroups, getGroups, loading, error };
}