import Api from '../Api';
import * as Yup from "yup";

const api = new Api('users');
// const [matchUser, setMatchUser] = useState({})

Yup.addMethod(Yup.string, 'checkEmail', function(message) {
    return this.test('checkEmail', message, async function (value) {
        const user = await api.getUserByEmail(value)
        const matchUser = user[0];
        localStorage.setItem('authorizedUser', JSON.stringify(matchUser));
        return user.length
        });
})

Yup.addMethod(Yup.string, 'checkPassword', function(message) {
    return this.test('checkPassword', message, async function (value) {
        const matchUser = JSON.parse(localStorage.getItem('authorizedUser'));
        return matchUser.password === value
        });
})

const signInSchema = Yup.object().shape({
    email: Yup.string().email('Invalid Email').checkEmail('Email not found').required("Email is required"),
    password: Yup.string()
        .required("Password is required")
        .min(4, "Password is too short - should be 4 chars min")
        .checkPassword('Wrong password'),
});

export default signInSchema;