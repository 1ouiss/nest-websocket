import { useForm } from 'react-hook-form';
import AuthService from "../../services/auth.service"
import { useNavigate } from 'react-router-dom';

const SigninPage = () => {
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm();
    
    const onSubmit = async data => {
        console.log(data);
        try {
            console.log("SigninPage");
            await AuthService.signin(data);
            navigate("/rooms/general")
        } catch (error) {
            console.log("error signin", error);
        }
    }
    
    return ( 
        <div>            
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <input type="text" placeholder="Username" {...register("username", {required: true, maxLength: 80})} />
                    <p>
                        {errors.username && <span>Username is required</span>}
                    </p>
                </div>
                <div>
                    <input type="text" placeholder="Password" {...register("password", {required: true, maxLength: 80})} />
                    <p>
                        {errors.password && <span>Password is required</span>}
                    </p>
                </div>

                <input type="submit" />
            </form>
        </div>
     );
}
 
export default SigninPage;