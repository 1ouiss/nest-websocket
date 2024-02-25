import { useForm } from "react-hook-form";
import AuthService from "../../services/auth.service";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../../context/UserContext";

const SigninPage = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { setUser } = useContext(UserContext);

  const onSubmit = async (data) => {
    console.log(data);
    try {
      console.log("SigninPage");
      const res = await AuthService.signin(data);
      setUser(res.data);
      navigate("/rooms/general");
    } catch (error) {
      console.log("error signin", error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <input
            type="text"
            placeholder="Username"
            {...register("username", { required: true, maxLength: 80 })}
          />
          <p>{errors.username && <span>Username is required</span>}</p>
        </div>
        <div>
          <input
            type="text"
            placeholder="Password"
            {...register("password", { required: true, maxLength: 80 })}
          />
          <p>{errors.password && <span>Password is required</span>}</p>
        </div>

        <input type="submit" />
      </form>
      Pas de compte ? <a href="/auth/signup">Inscrivez-vous</a>
    </div>
  );
};

export default SigninPage;
