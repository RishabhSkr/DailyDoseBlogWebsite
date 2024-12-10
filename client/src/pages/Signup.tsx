import { Quotes } from "../components/Quotes"
import { Auth } from "../components/Auth"
export const Signup = () => {
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

