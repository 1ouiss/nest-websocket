import { useForm } from 'react-hook-form';
import AuthService from "../../services/auth.service"
import { useNavigate } from 'react-router-dom';

const SignupPage = () => {
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm();
    
    const onSubmit = async data => {
        console.log(data);
        try {
            await AuthService.signup(data);
            navigate("/auth/signin")
        } catch (error) {
            console.log(error);
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
 
export default SignupPage;