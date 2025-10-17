import bcrypt from 'bcrypt'
import { v4 as uuidv4 } from 'uuid'
import { sessions } from '../../utils/sessions'


const storedPasswordHash = '$2b$10$9p83p0GVcax/6RQSyzhKTOjiZWucQ/h6veBvFo5JM.gP1QUQvlqZq'

const loginRoute = defineEventHandler(async (event) => {
    console.log(event.context.authenticated)
    if (event.context.authenticated) {
        return { success: true }
    }
    const body = await readBody(event) as { password: string }
    const enteredPassword = body.password

    //bcrypt.hash("password", 10).then((hash) => console.log(hash))

    const isPasswordCorrect = await bcrypt.compare(enteredPassword, storedPasswordHash)

    if (isPasswordCorrect) {

        const sessionId = uuidv4()

        sessions.set(sessionId, true)

        setCookie(event, 'sessionId', sessionId, {
            httpOnly: true,
            secure: true,
            sameSite: 'strict',
            path: '/admin',
            maxAge: 60 * 60 * 24 * 7 // 1 week
        })

        return { success: true }
    } else {
        return { success: false }
    }

})

export default loginRoute