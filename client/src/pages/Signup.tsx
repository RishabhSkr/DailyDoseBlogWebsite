import { Quotes } from "../components/Quotes"
import { Auth } from "../components/Auth"
import { useEffect } from "react"
import { useSetRecoilState } from "recoil"
import { userAtomState } from "../store/atoms/userAtom"

export const Signup = () => {
  const setUserState = useSetRecoilState(userAtomState);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");
    
    if (token && userId) {
      setUserState({
        isLoggedIn: true,
        username: userId
      });
    }
  }, [setUserState]);

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2">
        <div>
          <Auth type="signup"/>
        </div>
        <div className="hidden md:block">
          <Quotes />
        </div>
      </div>
    </div>
  )
}

